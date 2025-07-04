import React, { useEffect, useState } from "react";
import { fetchBriefings } from "./api/NotionAPI";
import { groupBriefingsByYearMonth } from "./utils/groupByDate";
import BriefingList from "./components/BriefingList";

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
