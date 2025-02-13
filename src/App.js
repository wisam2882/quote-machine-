import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [quotesData, setQuotesData] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const data = await response.json();
      setQuotesData(data.quotes);
      // Get initial quote on first load
      getRandomQuote(data.quotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const getRandomQuote = (quotes) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
  };

  const handleNewQuote = () => {
    if (quotesData.length > 0) {
      getRandomQuote(quotesData);
    }
  };

  return (
<div id="quote-box" className="quote-box">
  <div id="text" className="quote-text">{quote}</div>
  <div id="author" className="quote-author">- {author}</div>
  <div className="button-group">
    <button id="new-quote" className="new-quote-btn" onClick={handleNewQuote}>
      New Quote
    </button>
    <a
      id="tweet-quote"
      className="tweet-quote-btn"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-twitter"></i> Tweet
    </a>
  </div>
</div>
  );
}

export default App;