import React, { useEffect, useState } from "react";
import { fetchBriefings } from "./api/NotionAPI";
import BriefingList from "./components/BriefingList";

// Trigger redeployment - no actual change

function App() {
  const [briefings, setBriefings] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchBriefings();
      console.log("📦 Notion data:", data);  // Add this
      setBriefings(data);
    }
    loadData();
  }, []);


  return (
    <div>
      <h1>📄 Briefing Archive</h1>
      <BriefingList rawBriefings={briefings} />
    </div>
  );
}

export default App;
