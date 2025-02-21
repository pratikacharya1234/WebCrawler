const express = require("express");
const { Builder, By } = require("selenium-webdriver");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/crawl", async (req, res) => {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ error: "URL is required" });

    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get(url);
        let title = await driver.getTitle();
        
        // Extract body text
        let pageSource = await driver.getPageSource();
        let $ = cheerio.load(pageSource);
        let text = $("body").text().replace(/\s+/g, " ").trim();
        let summary = text.split(".").slice(1, 10).join(".") + "."; // Get first 3 sentences
        let image = $("img").attr("src");

        // Detect technologies used
        let scripts = $("script").map((i, el) => $(el).attr("src")).get();
        let styles = $("link[rel='stylesheet']").map((i, el) => $(el).attr("href")).get();

        let technologies = [];
        if (scripts.some(src => src && src.includes("react"))) technologies.push("React.js");
        if (scripts.some(src => src && src.includes("vue"))) technologies.push("Vue.js");
        if (scripts.some(src => src && src.includes("jquery"))) technologies.push("jQuery");
        if (styles.some(src => src && src.includes("bootstrap"))) technologies.push("Bootstrap");
        if (styles.some(src => src && src.includes("angular"))) technologies.push("Angular.js");
        if (pageSource.includes("wp-content")) technologies.push("WordPress");

        res.json({ title, summary, technologies });
    } catch (error) {
        res.status(500).json({ error: "Failed to crawl website" });
    } finally {
        await driver.quit();
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
