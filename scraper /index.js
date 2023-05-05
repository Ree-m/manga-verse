const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

async function run(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const courses = await page.$$eval("#cscourses .card", (elements) =>
    elements.map((e) => ({
      title: e.querySelector(".card-body h3").innerText,
      level: e.querySelector(".card-body .level").innerText,
      link: e.querySelector(".card-footer a").href,
      img: e.querySelector("img").src,
    }))
  );

  await browser.close();
  return courses;
}

app.get("/", async (req, res) => {
  try {
    const courses = await run("https://www.traversymedia.com/");
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(8000, () => {
  console.log("server runing");
});
