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


https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
Replace YOUR_API_KEY with the value in your .env file.

Error Handling
If you see a 403 Forbidden error, this usually means your API key is missing, invalid, or inactive.

Double-check the .env file for correct formatting and ensure the variable name is exactly EXCHANGE_RATE_API_KEY.



Если хочешь, я могу ещё сделать **ещё более красивую версию с badges и командой `npm run dev`**, чтобы выглядело как профессиональный GitHub README.  

Хочешь, чтобы я сделал такую версию?
