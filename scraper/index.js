const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectMongo = require("./utils/connectMongo.js");
const MangaChapters = require("./models/MangaChapters.js");
require("dotenv").config({ path: "../.env.local" });

connectMongo();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(bodyParser.json());

async function scrapeMangaLink(mangaTitle) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://ww5.manganelo.tv/search/${mangaTitle}`);
  await page.setCacheEnabled(false);

  const mangaLink = await page.$eval(
    ".panel-search-story .search-story-item a",
    (links) => {
      return links.href;
    }
  );

  await browser.close();
  return mangaLink;
}

async function scrapeChapters(mangaTitle) {
  const mangaExists = await MangaChapters.findOne({ mangaTitle });

  if (mangaExists && mangaExists.chapterLinks.length > 0) {
    console.log("get chapterLinks from db");
    return mangaExists.chapterLinks;
  } else {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const mangaLink = await scrapeMangaLink(mangaTitle);
    await page.goto(mangaLink);
    await page.setCacheEnabled(false);

    const chapterLinks = await page.$$eval(
      ".panel-story-chapter-list .row-content-chapter li a",
      (links) => {
        return Array.from(links).map((link) => link.href);
      }
    );
    await MangaChapters.create({
      mangaTitle,
      chapterLinks,
    });
    console.log("added to db");
    await browser.close();
    return chapterLinks;
  }
}

async function scrapeChapterImages(chapterUrl, mangaTitle, chapter) {
  const mangaExists = await MangaChapters.findOne({ mangaTitle });

  if (mangaExists) {
    const matchingChapter = mangaExists.chapterImages.find(
      (chapterObj) => chapterObj.chapter === chapter
    );
    if (matchingChapter && matchingChapter.images.length > 0) {
      console.log("get images from db");
      return matchingChapter.images;
    }
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(chapterUrl);
  await page.setCacheEnabled(false);

  const images = await page.$$eval(
    ".body-site .container-chapter-reader img",
    (imgs) => {
      return Array.from(imgs).map((img) => ({
        img: img.src || img.getAttribute("data-src"),
      }));
    }
  );

  if (mangaExists) {
    await MangaChapters.updateOne(
      { mangaTitle },
      {
        $push: {
          chapterImages: {
            chapter,
            images,
          },
        },
      }
    );
    console.log("saved images to db");
  } else {
    await MangaChapters.create({
      mangaTitle,
      chapterImages: [
        {
          chapter,
          images,
        },
      ],
    });
    console.log("created new manga entry with chapter images");
  }

  await browser.close();
  console.log("scraped images");
  return images;
}

app.get("/healthCheck", async (res, res) => {
  try {
    res.json("OK");
  } catch (error) {
    res.json(`Scraper health check error: ${error}`);
  }
});

app.get("/chapters", async (req, res) => {
  try {
    const mangaTitle = req.query.title;

    console.log(mangaTitle, req.body);
    const manga = await MangaChapters.findOne({ mangaTitle });
    if (manga && manga.chapterLinks.length > 0) {
      console.log("get chapter links from the database");
      res.json(manga.chapterLinks);
    } else {
      const chapterLinks = await scrapeChapters(mangaTitle);
      res.json(chapterLinks);
    }
  } catch (error) {
    res.status(500).send(`Get chapters error: ${error}`);
  }
});

app.get("/chapterImages", async (req, res) => {
  try {
    console.log("starting chapterImages");
    const chapter = req.query.chapter;

    const mangaTitle = req.query?.title;

    const manga = await MangaChapters.findOne({
      mangaTitle,
    });

    if (manga) {
      const matchingChapter = manga.chapterImages.find(
        (chapterObj) => chapterObj.chapter === chapter
      );
      if (matchingChapter && matchingChapter.images.length > 0) {
        console.log("get images from db");
        res.json(matchingChapter.images);
      } else {
        console.log("manga is there but chapter isnt");
        const mangaLink = await scrapeMangaLink(mangaTitle);
        const mangaId = mangaLink.split("-").pop();
        const chapterImages = await scrapeChapterImages(
          `https://ww5.manganelo.tv/chapter/manga-${mangaId}/${chapter}`,
          mangaTitle,
          chapter
        );
        console.log("chapter not there in db,197");
        res.json(chapterImages);
      }
    } else {
      const mangaLink = await scrapeMangaLink(mangaTitle);
      const mangaId = mangaLink.split("-").pop();
      const chapterImages = await scrapeChapterImages(
        `https://ww5.manganelo.tv/chapter/manga-${mangaId}/${chapter}`,
        mangaTitle,
        chapter
      );
      console.log("chapter not there in db");
      res.json(chapterImages);
    }
  } catch (error) {
    console.error(`ChapterImages error: ${error}`);
    res.status(500).send(`Server error:${error}`);
  }
});

app.listen(process.env.PORT || 9000, () => {
  console.log("server running");
});
