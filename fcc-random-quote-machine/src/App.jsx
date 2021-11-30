import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { FaTwitter } from 'react-icons/fa'

import ReactFCCtest from 'react-fcctest'

const api = axios.create({
  baseURL: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
})

const App = () => {
  const [quotes, setQuotes] = useState([])
  const [currQuoteIndex, setCurrQuoteIndex] = useState(0)

  useEffect(() => {
    api.get('/')
      .then(res => {
        setQuotes(res.data.quotes)
      })
      .catch(err => {
        throw err
      })
  }, [])

  const getRandomIndex = (num) => {
    return Math.floor(Math.random() * num)
  }

  const handleClick = (e) => {
    e.preventDefault();
    const newQuoteIndex = getRandomIndex(quotes.length);
    console.log("newQuoteIndex", newQuoteIndex)
    setCurrQuoteIndex(newQuoteIndex)
  }
  return (
    <div className="App" >
      <ReactFCCtest />
      <div className="quote-box" id="quote-box">
        {quotes.length > 0 &&
          <Quote
            quoteText={quotes[currQuoteIndex].quote}
            author={quotes[currQuoteIndex].author} />}
        <button id="new-quote" onClick={handleClick}>New Quote</button>
      </div>
    </div >
  )
}



const Quote = ({ quoteText, author }) => {
  return (
    <>
      <div className="quote-container">
        <p id="text"><span>"</span>{quoteText}</p>
        <p id="author">- {author} -</p>
      </div>
      <div className="social-media">
        <a
          id="tweet-quote"
          className="tooltip-container"
          href={`https://twitter.com/intent/tweet?text=${quoteText} - ${author}`}>
          <div
            id="tweet-quote-hint"
            aria-hidden="false"
            className="tooltip-text">Tweet this quote!</div>
          <FaTwitter />
        </a>
      </div>
    </>
  )
}

export default App
