import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.REACT_APP_NOTION_API_KEY });

export async function fetchBriefings() {
    try {
        const res = await fetch("http://localhost:5000/api/briefings");
        return await res.json();
    } catch (error) {
        console.error("❌ Error fetching briefings:", error);
        return [];
    }
}

