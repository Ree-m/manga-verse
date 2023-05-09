const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // for parsing application/json

async function scrapeChapter(chapterUrl) {
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
console.log("in pupeteer",images)
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



  console.log(chapterLinks, "chapterLinks");

  await browser.close();
  return chapterLinks;
}

// async function getMangaAppMangaIds() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(mangaAppUrl);

//   // TODO: Use Puppeteer or Cheerio to scrape the manganelo website and retrieve the mangaIds
// const mangaAppId =await page.$$eval(".panel-content-genres genres-item-info h3 a",(ids)=>{
//   return Array.from(ids).map((id)=>id.href)
// })
// console.log("mangaAppId",mangaAppId)
//   await browser.close();

//   // Return an object with the manga titles as keys and the mangaIds as values
//   return {
//     mangaAppId,
//     apiId
//   };
// }

// async function getMangaAppMangaIds() {
//   const browser = await puppeteer.launch({headless:"new"});
//   const page = await browser.newPage();

//   await page.goto("https://ww5.manganelo.tv/genre");

  // TODO: Use Puppeteer or Cheerio to scrape the manganelo website and retrieve the mangaIds
// const mangaAppId =await page.$$eval(".panel-content-genres genres-item-info h3 a",(ids)=>{
//   return Array.from(ids).map((id)=>id.href)
// })
// console.log("mangaAppId",mangaAppId)
//   await browser.close();

//   // Return an object with the manga titles as keys and the mangaIds as values
//   return {
//     mangaAppId  };
// }


// // Call the function to generate the mapping file before starting the server
// (async () => {
//   const mapping = await getMangaAppMangaIds();
//   fs.writeFileSync("mapping.json", JSON.stringify(mapping, null, 2));
// })();

app.post("/chapters", async (req, res) => {
  try {
    const mangaUrl = req.body.url;
    const chapterLinks = await scrapeManga(mangaUrl);
    res.json(chapterLinks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/chapterImages", async (req, res) => {
  try {
    console.log("chapterUrl", req.body.chapterUrl);
    const chapterUrl = req.body.chapterUrl;
    const chapterImages = await scrapeChapter(chapterUrl);
    res.json(chapterImages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(9000, () => {
  console.log("server runing");
});
