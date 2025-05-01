import React, { useEffect, useState } from "react";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?q=football&apiKey=078f4779835e4074b1eb95eabbd54bb2"
      );
      const data = await response.json();
      if (data.articles) {
        setNews(data.articles.slice(0, 12));
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews(); 
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Latest Football News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {news.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded shadow-md hover:shadow-xl transition duration-300 p-3 flex flex-col"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-md font-semibold text-white mb-1">
              {article.title || "No Title Available"}
            </h3>
            <p className="text-sm text-gray-300">
              {article.description || "No description available."}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
