const express = require('express');
const path = require('path');

const app = express();
const PORT = 5500;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'views')));

// Serve the about.json file
app.get('/data/about.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/about.json'));
});

// Serve the posts.json file
app.get('/data/posts.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/posts.json'));
});

// Serve the categories.json file
app.get('/data/categories.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/categories.json'));
});

// Handle the routes for blog functionality
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/categories.html'));
});

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/posts.html'));
});

app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
