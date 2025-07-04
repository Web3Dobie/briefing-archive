import React from "react";

function DayBriefing({ briefing }) {
    console.log("🧪", briefing.properties);

    const name = briefing.properties?.Name?.title?.[0]?.plain_text || "Untitled";
    const pdfUrl = briefing.properties?.["Tweet URL"]?.url;
    const tweetUrl = briefing.properties?.["Tweet URL"]?.url;

    return (
        <div>
            <strong>{name}</strong>
            {pdfUrl && (
                <>
                    {" "}
                    – <a href={pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</a>
                </>
            )}
            {tweetUrl && (
                <>
                    {" "}
                    | <a href={tweetUrl} target="_blank" rel="noopener noreferrer">View Tweet</a>
                </>
            )}
        </div>
    );
}

export default DayBriefing;
