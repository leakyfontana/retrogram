# Retrogram - Vanilla JavaScript Version

A retro-styled Instagram clone built with vanilla JavaScript (no frameworks).

## Overview

Retrogram is a simple image-sharing application with a retro aesthetic. This project demonstrates how to build a modern web application using only vanilla JavaScript without relying on frameworks like React.

## Features

- Grid and List views for images
- Profile information with stats
- Navigation between different views
- Responsive design

## Project Structure

```
/
├── css/                  # CSS styles
│   └── main.css          # Main stylesheet
├── js/                   # JavaScript files
│   ├── app.js            # Main application logic
│   ├── components/       # UI components
│   │   ├── navbar.js
│   │   ├── postGrid.js
│   │   ├── postList.js
│   │   └── profileHeader.js
│   ├── helpers/          # Helper functions
│   │   ├── enums.js
│   │   └── utils.js
│   └── services/         # API services
│       └── api.js
├── public/               # Static assets
├── index.html            # Main HTML file
└── package.json          # Project configuration
```

## Getting Started

### Prerequisites

- Node.js (for running the development server)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm start
```

This will start a local development server at http://localhost:3000.

## API Integration

The application is designed to fetch images from an API endpoint. For development purposes, it includes sample data if no API is available.

To configure your API endpoint, set the `API_URL` variable before the script tags in your HTML:

```html
<script>
  window.API_URL = 'https://your-api-url.com';
</script>
```

## Deployment

To build the project for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled assets ready for deployment.
