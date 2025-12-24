const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.render('index', { user: null, country: null, exchange: null, news: null });
});

// API для получения случайного пользователя и всех данных
app.get('/api/getUser', async (req, res) => {
  try {
    // 1️⃣ Random User API
    const userResponse = await axios.get('https://randomuser.me/api/');
    const userData = userResponse.data.results[0];

    const user = {
      firstName: userData.name.first,
      lastName: userData.name.last,
      gender: userData.gender,
      age: userData.dob.age,
      dob: userData.dob.date.split('T')[0],
      city: userData.location.city,
      country: userData.location.country,
      street: `${userData.location.street.number} ${userData.location.street.name}`,
      picture: userData.picture.large
    };

    // 2️⃣ REST Countries API
    const countryResp = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(user.country)}?fullText=true`);
    const countryData = countryResp.data[0];

    const country = {
      name: countryData.name.common,
      capital: countryData.capital ? countryData.capital[0] : 'N/A',
      languages: countryData.languages ? Object.values(countryData.languages).join(', ') : 'N/A',
      currency: countryData.currencies ? Object.keys(countryData.currencies)[0] : 'N/A',
      flag: countryData.flags ? countryData.flags.png : ''
    };

    // 3️⃣ Exchange Rate API
    const exchangeResp = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${country.currency}`);
    const rates = exchangeResp.data.conversion_rates;

    const exchange = {
      USD: rates.USD.toFixed(2),
      KZT: rates.KZT.toFixed(2)
    };

    // 4️⃣ News API
    const newsResp = await axios.get(`https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(user.country)}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5&language=en`);
    const news = newsResp.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage
    }));

    // Отправляем данные в шаблон
    res.render('index', { user, country, exchange, news });

  } catch (err) {
    console.error(err);
    res.send('Error fetching data. Please try again later.');
  }
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server works on port ${PORT}!`));
