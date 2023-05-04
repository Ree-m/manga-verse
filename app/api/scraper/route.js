import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.traversymedia.com/");
    console.log("starting");
    const courses = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
        title: e.querySelector(".card-body h3").innerText,
        level: e.querySelector(".card-body .level").innerText,
        link: e.querySelector(".card-footer a").href,
        img: e.querySelector("img").src,
      }))
    );

    console.log("ok");
    await browser.close();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(error);
  }
}
