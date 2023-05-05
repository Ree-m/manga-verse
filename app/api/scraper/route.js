import { NextResponse } from "next/server";
// import chromium from "chrome-aws-lambda";
// import playwright from "playwright-core";

export async function GET() {
  return NextResponse.json("ok")
  try {
    const browser = await playwright.chromium.launch({
      args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
      executablePath: chromium.executablePath,
      headless: true, // Set this to true in development mode
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://www.traversymedia.com/");

    const courses = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
        title: e.querySelector(".card-body h3").innerText,
        level: e.querySelector(".card-body .level").innerText,
        link: e.querySelector(".card-footer a").href,
        img: e.querySelector("img").src,
      }))
    );
    await browser.close();
    return NextResponse.json(courses);

   
  } catch (error) {
    return NextResponse.json(error);
  }
}
