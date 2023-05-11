const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

async function scrapeMangaLink(mangaTitle) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`https://ww5.manganelo.tv/search/${mangaTitle}`);

  const mangaLink = await page.$eval(
    ".panel-search-story .search-story-item a",
    (links) => {
      console.log("links.href", links.href);
      return links.href;
    }
  );

  console.log("mangaLink line 20", mangaLink);
  await browser.close();
  return mangaLink;
}

async function scrapeChapters(mangaTitle) {
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
  // console.log("chapterLinks line 37", chapterLinks);
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
  try {
    const mangaTitle = req.body.title;
    // const mangaLink = await scrapeMangaLink(mangaTitle);
    console.log("mangaTitle line 64", mangaTitle, req.body);
    const chapterLinks = await scrapeChapters(mangaTitle);
    res.json(chapterLinks);
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
