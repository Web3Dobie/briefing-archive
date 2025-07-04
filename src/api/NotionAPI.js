export async function fetchBriefings() {
    try {
        const res = await fetch("http://localhost:5000/api/briefings");
        return await res.json();
    } catch (error) {
        console.error("❌ Error fetching briefings:", error);
        return [];
    }
}

