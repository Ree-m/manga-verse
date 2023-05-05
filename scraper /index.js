const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const mangas = await page.$$eval(
    ".body-site .container-chapter-reader",
    (elements) => {
      const images = elements[0].querySelectorAll("img"); //nodelist
      return Array.from(images).map((img) => ({
        img: img.src || img.getAttribute("data-src"),
      })); //make array and map
    }
  );
  console.log(mangas);
  await browser.close();
  return mangas;
}

app.get("/", async (req, res) => {
  try {
    const mangas = await run(
      "https://ww5.manganelo.tv/chapter/manga-ng952689/chapter-1"
    );
    res.json(mangas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(8000, () => {
  console.log("server runing");
});
