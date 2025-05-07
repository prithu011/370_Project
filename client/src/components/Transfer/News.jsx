import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("/api/transfer-news"); 
        setNews(res.data);
      } catch (error) {
        console.error("Error fetching transfer news:", error);
      }
    };

    fetchNews();

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % (news.length || 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-white text-3xl font-bold">Transfer News</h1>
      {news.length > 0 ? (
        <p className="text-xl text-white">{news[index].headline}</p>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default News;
