const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Define MIME types for font files
express.static.mime.define({
  'application/font-woff': ['woff'],
  'application/font-woff2': ['woff2'],
  'application/x-font-ttf': ['ttf']
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve files from public directory at the /public URL path
app.use('/public', express.static(path.join(__dirname, 'public')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Retrogram app listening at http://localhost:${port}`);
  console.log(`Open your browser to http://localhost:${port} to view the application`);
}); 