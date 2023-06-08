const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5500;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Serve the categories page
app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/categories.html'));
});

// Serve the posts page
app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/posts.html'));
});

// Serve the add post page
app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// API endpoint to retrieve about content
app.get('/data/about', (req, res) => {
  const aboutPath = path.join(__dirname, 'data/about.json');
  fs.readFile(aboutPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// API endpoint to retrieve categories
app.get('/data/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'data/categories.json');
  fs.readFile(categoriesPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// API endpoint to retrieve posts
app.get('/data/posts', (req, res) => {
  const postsPath = path.join(__dirname, 'data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
