const puppeteer = require("puppeteer");
const chromium = require("'chrome-aws-lambda'");

const getImage = async (url) => {
    // const browser = await puppeteer.launch({'args' : [
    // '--no-sandbox',
    // '--disable-setuid-sandbox'
    // ]
    // });
    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url);

    try{
        await page.waitForSelector(".PostGallery__image");
        const images = await page.evaluate(() => {
            return  Array.from(
                document.querySelectorAll(".PostGallery__image")
            ).map((image) => image.getAttribute("src"));
        });
        return [...new Set(images)];
    }catch (e) {
        console.log(e.message);
    }


    try{
        await page.waitForSelector(".PostImage__image");
        const images = await page.evaluate(() => {
            return  Array.from(
                document.querySelectorAll(".PostImage__image")
            ).map((image) => image.getAttribute("src"));
        });
        return images;
    }catch (e) {
        console.log(e.message)
    }

    await browser.close();

    return [];
}

const getVideo = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    try{
        await page.waitForSelector(".PostVideo__video");
        const videos = await page.evaluate(() => {
            return  Array.from(
                document.querySelectorAll(".PostVideo__video")
            ).map((video) => video.getAttribute("src"));
        });
        return [...new Set(videos)];
    }catch (e) {
        console.log(e.message)
    }

    return [];
}

module.exports = { getImage, getVideo };