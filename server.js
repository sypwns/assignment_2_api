// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Main route - render homepage
app.get('/', (req, res) => {
  res.render('index');
});

// API Route 1: Get Random User
app.get('/api/random-user', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    
    const userData = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      picture: user.picture.large,
      age: user.dob.age,
      dateOfBirth: user.dob.date,
      city: user.location.city,
      country: user.location.country,
      address: `${user.location.street.number} ${user.location.street.name}`
    };
    
    res.json({ success: true, data: userData });
  } catch (error) {
    console.error('Error fetching random user:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch user data' });
  }
});

// API Route 2: Get Country Information
app.get('/api/country/:countryName', async (req, res) => {
  try {
    const countryName = req.params.countryName;
    const apiKey = process.env.COUNTRYLAYER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'CountryLayer API key not configured' 
      });
    }
    
    const response = await axios.get(
      `http://api.countrylayer.com/v2/name/${countryName}?access_key=${apiKey}`
    );
    
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Country not found' 
      });
    }
    
    const country = response.data[0];
    
    const countryData = {
      name: country.name || 'N/A',
      capital: country.capital || 'N/A',
      languages: country.languages ? country.languages.map(l => l.name).join(', ') : 'N/A',
      currency: country.currencies ? country.currencies[0].code : 'N/A',
      flag: country.flag || ''
    };
    
    res.json({ success: true, data: countryData });
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch country data' 
    });
  }
});

// API Route 3: Get Exchange Rates (FREE - no key needed)
app.get('/api/exchange-rate/:currency', async (req, res) => {
  try {
    const currency = req.params.currency;
    
    // Using free API without key requirement
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/${currency}`
    );
    
    if (response.data.result === 'error') {
      return res.status(400).json({ 
        success: false, 
        error: 'Currency not found' 
      });
    }
    
    const rates = response.data.rates;
    
    const exchangeData = {
      baseCurrency: currency,
      usd: rates.USD ? rates.USD.toFixed(2) : 'N/A',
      kzt: rates.KZT ? rates.KZT.toFixed(2) : 'N/A'
    };
    
    res.json({ success: true, data: exchangeData });
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch exchange rates' 
    });
  }
});

// API Route 4: Get News Headlines
app.get('/api/news/:country', async (req, res) => {
  try {
    const country = req.params.country;
    const apiKey = process.env.NEWS_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        success: false, 
        error: 'News API key not configured' 
      });
    }
    
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: country,
        language: 'en',
        pageSize: 5,
        sortBy: 'publishedAt',
        apiKey: apiKey
      }
    });
    
    const articles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description || 'No description available',
      image: article.urlToImage || '',
      url: article.url,
      source: article.source.name
    }));
    
    res.json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch news data' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});