const BASE_URL = "https://briefing-server-chhhgvh7gadkgugr.swedencentral-01.azurewebsites.net";

export async function fetchBriefings() {
    try {
        const res = await fetch(`${BASE_URL}/api/briefings`);
        return await res.json();
    } catch (error) {
        console.error("❌ Error fetching briefings:", error);
        return [];
    }
}


