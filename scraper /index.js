const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectMongo = require("../utils/connectMongo.js");
const MangaChapters = require("../models/MangaChapters.js");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

async function scrapeMangaLink(mangaTitle) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://ww5.manganelo.tv/search/${mangaTitle}`);

  const mangaLink = await page.$eval(
    ".panel-search-story .search-story-item a",
    (links) => {
      console.log("links.href", links);
      return links.href;
    }
  );

  console.log("mangaLink line 20", mangaLink);
  await browser.close();
  return mangaLink;
}

async function scrapeChapters(mangaTitle) {
  connectMongo();

  const mangaExists = await MangaChapters.findOne({ mangaTitle });

  if (mangaExists && mangaExists.chapterLinks.length > 0) {
    console.log("get chapterLinks from db");
    return mangaExists.chapterLinks;
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const mangaLink = await scrapeMangaLink(mangaTitle);
  await page.goto(mangaLink);

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

async function scrapeChapterImages(chapterUrl) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(chapterUrl);

  const images = await page.$$eval(
    ".body-site .container-chapter-reader img",
    (imgs) => {
      return Array.from(imgs).map((img) => ({
        img: img.src || img.getAttribute("data-src"),
      }));
    }
  );
  console.log("in pupeteer", images);
  await browser.close();
  return images;
}

app.post("/chapters", async (req, res) => {
  connectMongo()
  try {
    const mangaTitle = req.body.title;

    console.log("mangaTitle line 64", mangaTitle, req.body);
    const manga = await MangaChapters.findOne({ mangaTitle });
    if (manga && manga.chapterLinks.length > 0) {
      console.log("get chapter links from the database");
      res.json(manga.chapterLinks);
    } else {
      const chapterLinks = await scrapeChapters(mangaTitle);
      res.json(chapterLinks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/chapterImages", async (req, res) => {
  try {
    const chapter = req.body.chapter;
    const mangaTitle = req.body?.title;
    const mangaLink = await scrapeMangaLink(mangaTitle);
    const mangaId = mangaLink.split("-").pop();
    console.log("mangaId images line 79", mangaId);
    const chapterImages = await scrapeChapterImages(
      `https://ww5.manganelo.tv/chapter/manga-${mangaId}/${chapter}`
    );
    res.json(chapterImages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(9000, () => {
  console.log("server runing");
});
