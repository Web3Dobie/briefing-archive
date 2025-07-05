const express = require("express");
const cors = require("cors");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Setup Notion
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

app.use(cors());

app.get("/api/briefings", async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [{ property: "Date", direction: "descending" }],
        });

        res.json(response.results);
    } catch (err) {
        console.error("❌ Notion fetch error:", err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
});
