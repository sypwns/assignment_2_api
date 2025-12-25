#  Random User Information Portal


A comprehensive web application that integrates multiple APIs to display random user profiles, country information, real-time exchange rates, and latest news headlines. Built with Node.js, Express, and modern web technologies.

##  Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Technologies Used](#-technologies-used)
- [APIs Integrated](#-apis-integrated)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Design Decisions](#-design-decisions)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

##  Features

-  **Random User Generation** - Generate random user profiles with complete personal details
-  **Country Information** - Display comprehensive country data including flag, capital, languages, and currency
-  **Real-time Exchange Rates** - Show live currency conversion rates to USD and KZT
-  **Latest News** - Fetch and display 5 recent news articles related to the user's country
-  **Responsive Design** - Fully responsive interface that works seamlessly on all devices
-  **Modern UI/UX** - Clean, intuitive, and visually appealing design with smooth animations
-  **Server-side API Processing** - All API calls handled securely on the backend

##  Demo

Visit the application at: `http://localhost:4000`

**How to use:**
1. Click the "Generate Random User" button
2. View the user's personal information
3. Explore country details with flag
4. Check currency exchange rates
5. Read latest news from the user's country

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
- **EJS** - Embedded JavaScript templating

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - Client-side interactivity
- **Fetch API** - Asynchronous HTTP requests

### Development Tools
- **nodemon** - Auto-restart development server
- **npm** - Package manager

## 🌐 APIs Integrated

| API | Purpose | Authentication |
|-----|---------|----------------|
| [Random User API](https://randomuser.me/) | Generate random user profiles | No key required |
| [CountryLayer API](https://countrylayer.com/) | Fetch country information | API Key required |
| [Exchange Rate API](https://open.er-api.com/) | Get real-time exchange rates | No key required |
| [News API](https://newsapi.org/) | Retrieve news headlines | API Key required |

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- API Keys (see [Configuration](#-configuration))

### Step-by-Step Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/assignment_2_api.git
cd assignment_2_api
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables** (see next section)

4. **Start the server**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

5. **Open in browser**
```
http://localhost:4000
```

##  Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=4000
COUNTRYLAYER_API_KEY=your_countrylayer_api_key_here
NEWS_API_KEY=your_news_api_key_here
```

### Getting API Keys

#### 1. CountryLayer API Key
1. Visit [CountryLayer Signup](https://manage.countrylayer.com/signup/free)
2. Create a free account
3. Copy your API key from the dashboard
4. Paste it in the `.env` file

#### 2. News API Key
1. Visit [News API Register](https://newsapi.org/register)
2. Create a free account
3. Verify your email
4. Copy your API key from [Account Page](https://newsapi.org/account)
5. Paste it in the `.env` file

**Note:** Exchange Rate API does not require a key as we use the free open API.

##  Usage

### Running the Application

**Development Mode** (recommended for development):
```bash
npm run dev
```
- Auto-restarts on file changes
- Shows detailed error messages

**Production Mode:**
```bash
npm start
```
- Optimized for production
- No auto-restart

### Testing the Application

1. **Test Random User API:**
   - Click "Generate Random User"
   - Verify user information displays correctly

2. **Test Country API:**
   - Check if country flag appears
   - Verify capital, languages, and currency are shown

3. **Test Exchange Rate API:**
   - Confirm USD and KZT exchange rates display
   - Rates should be formatted to 2 decimal places

4. **Test News API:**
   - Verify 5 news articles appear
   - Check that articles are in English
   - Ensure article images and links work

## Project Structure

```
assignment_2_api/
│
├── public/                      # Static files
│   ├── css/
│   │   └── style.css           # Application styles
│   └── js/
│       └── client.js           # Frontend JavaScript logic
│
├── views/
│   └── index.ejs               # Main HTML template
│
├── node_modules/               # Dependencies (not in repo)
│
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
├── server.js                   # Express server and API routes
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

##  API Endpoints

### 1. Get Random User
```
GET /api/random-user
```
**Response:**
```json
{
  "success": true,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "picture": "https://...",
    "age": 30,
    "dateOfBirth": "1994-05-15T00:00:00.000Z",
    "city": "London",
    "country": "United Kingdom",
    "address": "123 Main St"
  }
}
```

### 2. Get Country Information
```
GET /api/country/:countryName
```
**Example:** `/api/country/Germany`

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Germany",
    "capital": "Berlin",
    "languages": "German",
    "currency": "EUR",
    "flag": "https://..."
  }
}
```

### 3. Get Exchange Rates
```
GET /api/exchange-rate/:currency
```
**Example:** `/api/exchange-rate/EUR`

**Response:**
```json
{
  "success": true,
  "data": {
    "baseCurrency": "EUR",
    "usd": "1.08",
    "kzt": "495.20"
  }
}
```

### 4. Get News Headlines
```
GET /api/news/:country
```
**Example:** `/api/news/Germany`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "News headline...",
      "description": "Article description...",
      "image": "https://...",
      "url": "https://...",
      "source": "BBC News"
    }
  ]
}
```

##  Design Decisions

### Architecture

**Server-side API Calls:**
- All external API requests are made from the backend
- Protects API keys from exposure in client-side code
- Enables data processing and filtering before sending to frontend
- Improves security and rate limit management

**RESTful API Design:**
- Clean and intuitive endpoint structure
- Consistent response format (`{success: boolean, data: object}`)
- Proper HTTP status codes for errors

### Frontend Design

**Progressive Enhancement:**
- Data loads and displays incrementally
- Loading indicators for better UX
- Graceful error handling with user-friendly messages

**Responsive Layout:**
- Mobile-first approach using CSS Grid and Flexbox
- Breakpoints at 768px for tablet/mobile devices
- Touch-friendly buttons and interactive elements

**Visual Design:**
- Card-based layout for organized information display
- Gradient backgrounds and smooth animations
- High contrast for accessibility
- Consistent color scheme throughout

### Code Organization

**Separation of Concerns:**
- Backend logic in `server.js`
- Frontend logic in `client.js`
- Styles in `style.css`
- Templates in `index.ejs`

**Modular Functions:**
- Each API call has its own dedicated function
- Reusable utility functions for common tasks
- Clear naming conventions

**Error Handling:**
- Try-catch blocks for all async operations
- User-friendly error messages
- Console logging for debugging

##  Troubleshooting

### Common Issues

**Problem: Server won't start**
- **Solution:** Check if port 4000 is already in use
- Try changing PORT in `.env` file
- Kill any processes using port 4000

**Problem: API data not loading**
- **Solution:** Verify API keys are correctly set in `.env`
- Check internet connection
- Verify API services are operational
- Check browser console for error messages (F12)

**Problem: News or country data missing**
- **Solution:** Some countries may not be available in APIs
- News API has rate limits (100 requests/day on free tier)
- CountryLayer free tier has usage limits

**Problem: CSS or JavaScript not loading**
- **Solution:** Ensure files are in correct directories
- Check file names match exactly (case-sensitive)
- Clear browser cache (Ctrl + Shift + R)

**Problem: Exchange rates not displaying**
- **Solution:** Currency code must be valid (EUR, USD, GBP, etc.)
- Check if country has a recognized currency

### Debug Mode

Enable detailed logging by checking the browser console (F12) and server terminal for error messages.

## Dependencies

```json
{
  "express": "^4.18.2",
  "axios": "^1.6.0",
  "dotenv": "^16.3.1",
  "ejs": "^3.1.9",
  "nodemon": "^3.0.1"
}
```

##  Security

- API keys stored in `.env` file (not committed to repository)
- All external API calls made server-side
- Input sanitization for user data
- HTTPS used for all external API requests

##  Future Enhancements

- [ ] Add user favorites/bookmarks
- [ ] Implement caching for API responses
- [ ] Add more language options
- [ ] Include weather information
- [ ] Add map visualization for user location
- [ ] Implement pagination for news articles
- [ ] Add dark mode toggle
- [ ] Include more currency conversions

##  Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

##  Acknowledgments

- [Random User API](https://randomuser.me/) for user data
- [CountryLayer](https://countrylayer.com/) for country information
- [Open Exchange Rates](https://open.er-api.com/) for currency data
- [News API](https://newsapi.org/) for news headlines

##  License

This project is created for educational purposes as part of an assignment.

---

 **If you found this project helpful, please give it a star!**
