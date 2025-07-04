export function groupBriefingsByYearMonth(briefings) {
    const groups = {};

    briefings.forEach((page) => {
        const dateStr = page?.properties?.Date?.date?.start;
        if (!dateStr) return;

        const dateObj = new Date(dateStr);
        const year = dateObj.getFullYear();
        const month = dateObj.toLocaleString("default", { month: "long" });
        const day = String(dateObj.getDate()).padStart(2, "0");

        if (!groups[year]) groups[year] = {};
        if (!groups[year][month]) groups[year][month] = {};
        if (!groups[year][month][day]) groups[year][month][day] = [];

        groups[year][month][day].push(page);
    });

    return groups;
}
