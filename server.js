const express = require('express');
const path = require('path');
const fs = require('fs');
// Serve the about.html file
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Serve the categories.json file
app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'data/categories.json');
  fs.readFile(categoriesPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const categories = JSON.parse(data);
      res.json(categories);
    }
  });
});

// Serve the posts.json file
app.get('/posts', (req, res) => {
  const postsPath = path.join(__dirname, 'data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const posts = JSON.parse(data);
      res.json(posts);
    }
  });
});

// Serve the addPost.html file
app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// Serve the about.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
