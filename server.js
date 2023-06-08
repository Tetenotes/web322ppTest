const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5500;

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'data')));

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Serve the add post page
app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// API endpoint to retrieve categories
app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, 'data/categories.json');
  fs.readFile(categoriesPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const categories = JSON.parse(data);
      const categoryList = categories.map(category => `<li>${category.category}</li>`).join('');
      const html = generatePage(`<ul>${categoryList}</ul>`);
      res.send(html);
    }
  });
});

// API endpoint to retrieve posts
app.get('/posts', (req, res) => {
  const postsPath = path.join(__dirname, 'data/posts.json');
  fs.readFile(postsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const posts = JSON.parse(data);
      const postList = posts.map(post => `
        <li class="list-group-item">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <p>Posted on: ${post.postDate}</p>
          <p>Category: ${post.category}</p>
        </li>
      `).join('');
      const html = generatePage(`<ul class="list-group">${postList}</ul>`);
      res.send(html);
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
