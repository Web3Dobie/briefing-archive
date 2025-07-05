import React, { useState, useEffect } from "react";
import { groupBriefingsByYearMonth } from "../utils/groupByDate";
import "./BriefingList.css";

function BriefingList({ rawBriefings }) {
    const grouped = groupBriefingsByYearMonth(rawBriefings);
    const [openYears, setOpenYears] = useState({});
    const [openMonths, setOpenMonths] = useState({});
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pdfParam = params.get("pdf");
        if (pdfParam) {
            setSelectedPdfUrl(pdfParam);
        }
    }, []);

    const toggleYear = (year) => {
        setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
    };

    const toggleMonth = (year, month) => {
        const key = `${year}-${month}`;
        setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const renderPdfViewer = () => (
        <div className="pdf-viewer">
            <button
                onClick={() => {
                    window.history.replaceState({}, "", window.location.pathname);
                    setSelectedPdfUrl(null);
                }}
                className="back-button"
            >
                ← Back to Archive
            </button>
            <h3 style={{ marginTop: "1rem" }}>
                {selectedPdfUrl && decodeURIComponent(selectedPdfUrl.split("/").pop())}
            </h3>
            <iframe
                src={selectedPdfUrl}
                width="100%"
                height="800px"
                title="Briefing PDF"
                frameBorder="0"
            />
        </div>
    );

    if (selectedPdfUrl) {
        return renderPdfViewer();
    }

    return (
        <div>
            <h3 className="archive-section-header">Year</h3>
            {Object.entries(grouped).map(([year, months]) => (
                <div key={year}>
                    <h3
                        onClick={() => toggleYear(year)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                    >
                        {openYears[year] ? "▼" : "▶"} {year}
                    </h3>
                    {openYears[year] && (
                        <>
                            <h4 className="archive-section-header" style={{ marginLeft: "1rem" }}>
                                Month
                            </h4>
                            {Object.entries(months).map(([month, days]) => {
                                const key = `${year}-${month}`;
                                return (
                                    <div key={key} style={{ paddingLeft: "1rem" }}>
                                        <h4
                                            onClick={() => toggleMonth(year, month)}
                                            style={{ cursor: "pointer", userSelect: "none" }}
                                        >
                                            {openMonths[key] ? "▼" : "▶"} {month}
                                        </h4>
                                        {openMonths[key] && (
                                            <>
                                                <div className="archive-section-header" style={{ marginLeft: "2rem" }}>
                                                    Date
                                                </div>
                                                {Object.entries(days).map(([day, items]) => (
                                                    <div key={day} style={{ paddingLeft: "1rem" }}>
                                                        <strong>{day}</strong>
                                                        <div className="briefing-cards">
                                                            {items.map((briefing) => (
                                                                <div className="briefing-card narrow" key={briefing.id}>
                                                                    <div className="briefing-title">
                                                                        {briefing.properties?.Name?.title?.[0]?.plain_text || "Untitled"}
                                                                    </div>
                                                                    <div className="briefing-links">
                                                                        <button
                                                                            onClick={() =>
                                                                                setSelectedPdfUrl(briefing.properties?.["PDF Link"]?.url)
                                                                            }
                                                                            className="link-button"
                                                                            type="button"
                                                                        >
                                                                            View PDF
                                                                        </button>
                                                                        <span className="link-separator">|</span>
                                                                        <a
                                                                            href={briefing.properties?.["Tweet URL"]?.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="link-anchor"
                                                                        >
                                                                            View Tweet
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BriefingList;
