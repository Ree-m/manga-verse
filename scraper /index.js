const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');


app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // for parsing application/json



async function scrapeChapter(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url);

  const images = await page.$$eval(
    ".body-site .container-chapter-reader img",
    (imgs) => {
      return Array.from(imgs).map((img) => ({
        img: img.src || img.getAttribute("data-src"),
      }));
    }
  );

  await browser.close();
  return images;
}

async function scrapeManga(mangaUrl) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(mangaUrl);

  const chapterLinks = await page.$$eval(
    ".panel-story-chapter-list .row-content-chapter li a",
    (links) => {
      return Array.from(links).map((link) => link.href);
    }
  );

  // console.log(chapterLinks, "chapterLinks");

  const images = [];
  for (const chapterLink of chapterLinks) {
    const chapterImages = await scrapeChapter(chapterLink);
    // console.log(chapterImages, "chapterImages");

    images.push(chapterImages);
  }
  console.log("images",images);

  fs.writeFile("images.json", JSON.stringify(images), (err) => {
    if (err) throw err;
    console.log("File saved");
  });

  await browser.close();
  return images;
}


app.post("/", async (req, res) => {
  try {
    const mangaUrl = req.body.url;
    const images = await scrapeManga(mangaUrl);
    console.log("images2",images)
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(8000, () => {
  console.log("server runing");
});
