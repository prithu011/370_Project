import React, { useEffect, useState, useCallback, memo } from 'react'
import axios from 'axios'

const NewsCard = memo(({ article }) => (
  <a
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
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null
          e.target.src = 'fallback-image-url.jpg'
        }}
      />
    )}
    <h3 className="text-md font-semibold text-white mb-1">
      {article.title || 'No Title Available'}
    </h3>
    <p className="text-sm text-gray-300">
      {article.description || 'No description available.'}
    </p>
    <p className="text-xs text-gray-400 mt-2">
      {new Date(article.publishedAt).toLocaleDateString()}
    </p>
  </a>
))

NewsCard.displayName = 'NewsCard'

const NewsFeed = () => {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Using axios instead of fetch for better error handling
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          q: 'football',
          apiKey: '92255cba58fa485386623988fc68c14b',
          language: 'en',
          pageSize: 12,
        },
        timeout: 5000, // 5 seconds timeout
      })

      if (response.data?.articles) {
        // Filter out articles without images or titles
        const validArticles = response.data.articles.filter(
          (article) => article.urlToImage && article.title
        )
        setNews(validArticles)
      } else {
        throw new Error('No articles found')
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setError(
        error.response?.status === 429
          ? 'Rate limit exceeded. Please try again later.'
          : 'Failed to load news. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      if (mounted) {
        await fetchNews()
      }
    }

    fetchData()

    // Fetch new data every 5 minutes instead of 30 seconds to avoid rate limiting
    const interval = setInterval(fetchData, 300000)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [fetchNews])

  if (isLoading) {
    return (
      <div className="p-4 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">
          Loading latest football news...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">
          {error}
          <button
            onClick={fetchNews}
            className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Latest Football News
      </h2>
      {news.length === 0 ? (
        <div className="text-center text-gray-400">
          No news articles available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {news.map((article, idx) => (
            <NewsCard key={article.url || `article-${idx}`} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(NewsFeed)
