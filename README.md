# Currency Exchange API Project

## Overview
This is a Node.js project that retrieves the latest currency exchange rates using the [ExchangeRate-API](https://www.exchangerate-api.com/). The application demonstrates how to make HTTP requests with Axios, work with environment variables, and handle API responses and errors.

## Features
- Fetches the latest exchange rates for multiple currencies.
- Uses environment variables to store the API key securely.
- Handles invalid API requests and displays meaningful error messages.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- An API key from [ExchangeRate-API](https://www.exchangerate-api.com/)

## Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
Navigate to the project folder:


cd assignment_2_api
Install dependencies:

npm install
Create a .env file in the root folder and add your API key:

env
EXCHANGE_RATE_API_KEY=your_api_key_here
Usage
Start the server:

node server.js
The server will fetch and display the latest exchange rates in the console.

Example API Request
The application sends a GET request like this:

