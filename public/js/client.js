// client.js - Frontend logic

// Get DOM elements
const fetchUserBtn = document.getElementById('fetchUserBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

const userSection = document.getElementById('userSection');
const countrySection = document.getElementById('countrySection');
const exchangeSection = document.getElementById('exchangeSection');
const newsSection = document.getElementById('newsSection');

// User data storage
let currentUserData = null;

// Event listener for fetch user button
fetchUserBtn.addEventListener('click', fetchAllData);

// Main function to fetch all data
async function fetchAllData() {
  try {
    showLoading(true);
    hideError();
    hideSections();

    // Step 1: Fetch random user
    const userData = await fetchRandomUser();
    if (!userData) return;

    currentUserData = userData;
    displayUserData(userData);
    showSection(userSection);

    // Step 2: Fetch country information
    const countryData = await fetchCountryInfo(userData.country);
    if (countryData) {
      displayCountryData(countryData);
      showSection(countrySection);

      // Step 3: Fetch exchange rates
      if (countryData.currency && countryData.currency !== 'N/A') {
        const exchangeData = await fetchExchangeRates(countryData.currency);
        if (exchangeData) {
          displayExchangeRates(exchangeData);
          showSection(exchangeSection);
        }
      }
    }

    // Step 4: Fetch news
    const newsData = await fetchNews(userData.country);
    if (newsData && newsData.length > 0) {
      displayNews(newsData);
      showSection(newsSection);
    }

  } catch (error) {
    showError('An unexpected error occurred. Please try again.');
    console.error('Error in fetchAllData:', error);
  } finally {
    showLoading(false);
  }
}

// Fetch random user from API
async function fetchRandomUser() {
  try {
    const response = await fetch('/api/random-user');
    const data = await response.json();

    if (!data.success) {
      showError(data.error || 'Failed to fetch user data');
      return null;
    }

    return data.data;
  } catch (error) {
    showError('Failed to connect to the server');
    console.error('Error fetching user:', error);
    return null;
  }
}

// Fetch country information
async function fetchCountryInfo(countryName) {
  try {
    const response = await fetch(`/api/country/${encodeURIComponent(countryName)}`);
    const data = await response.json();

    if (!data.success) {
      console.warn('Country data not available:', data.error);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching country info:', error);
    return null;
  }
}

// Fetch exchange rates
async function fetchExchangeRates(currency) {
  try {
    const response = await fetch(`/api/exchange-rate/${encodeURIComponent(currency)}`);
    const data = await response.json();

    if (!data.success) {
      console.warn('Exchange rate data not available:', data.error);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

// Fetch news
async function fetchNews(country) {
  try {
    const response = await fetch(`/api/news/${encodeURIComponent(country)}`);
    const data = await response.json();

    if (!data.success) {
      console.warn('News data not available:', data.error);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

// Display user data
function displayUserData(userData) {
  document.getElementById('userPicture').src = userData.picture;
  document.getElementById('userPicture').alt = `${userData.firstName} ${userData.lastName}`;
  document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
  document.getElementById('userGender').textContent = capitalizeFirstLetter(userData.gender);
  document.getElementById('userAge').textContent = `${userData.age} years`;
  document.getElementById('userDob').textContent = formatDate(userData.dateOfBirth);
  document.getElementById('userAddress').textContent = userData.address;
  document.getElementById('userCity').textContent = userData.city;
  document.getElementById('userCountry').textContent = userData.country;
}

// Display country data
function displayCountryData(countryData) {
  document.getElementById('countryName').textContent = countryData.name;
  document.getElementById('countryCapital').textContent = countryData.capital;
  document.getElementById('countryLanguages').textContent = countryData.languages;
  document.getElementById('countryCurrency').textContent = countryData.currency;
  
  const flagImg = document.getElementById('countryFlag');
  if (countryData.flag) {
    flagImg.src = countryData.flag;
    flagImg.alt = `${countryData.name} flag`;
  } else {
    flagImg.style.display = 'none';
  }
}

// Display exchange rates
function displayExchangeRates(exchangeData) {
  const baseCurrency = exchangeData.baseCurrency;
  document.getElementById('exchangeUSD').textContent = 
    `1 ${baseCurrency} = ${exchangeData.usd} USD`;
  document.getElementById('exchangeKZT').textContent = 
    `1 ${baseCurrency} = ${exchangeData.kzt} KZT`;
}

// Display news
function displayNews(newsArticles) {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '';

  newsArticles.forEach(article => {
    const newsCard = createNewsCard(article);
    newsContainer.appendChild(newsCard);
  });
}

// Create news card element
function createNewsCard(article) {
  const card = document.createElement('div');
  card.className = 'news-card';

  const imageHtml = article.image 
    ? `<img src="${article.image}" alt="News image" class="news-image">`
    : '<div class="news-image" style="background-color: #ddd; display: flex; align-items: center; justify-content: center; color: #999;">No image available</div>';

  card.innerHTML = `
    ${imageHtml}
    <div class="news-content">
      <h3 class="news-title">${escapeHtml(article.title)}</h3>
      <p class="news-description">${escapeHtml(article.description)}</p>
      <p class="news-source">Source: ${escapeHtml(article.source)}</p>
      <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-link">
        Read full article →
      </a>
    </div>
  `;

  return card;
}

// Utility functions
function showLoading(show) {
  if (show) {
    loading.classList.remove('hidden');
    fetchUserBtn.disabled = true;
  } else {
    loading.classList.add('hidden');
    fetchUserBtn.disabled = false;
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

function hideError() {
  errorMessage.classList.add('hidden');
}

function hideSections() {
  userSection.classList.add('hidden');
  countrySection.classList.add('hidden');
  exchangeSection.classList.add('hidden');
  newsSection.classList.add('hidden');
}

function showSection(section) {
  section.classList.remove('hidden');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}