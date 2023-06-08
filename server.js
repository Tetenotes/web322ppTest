const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5500;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the about page
app.get('/about', (req, res) => {
  const aboutPath = path.join(__dirname, '/data/about.json');
  fs.readFile(aboutPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const about = JSON.parse(data);
      const aboutText = `<p>${about.content}</p>`;
      const html = generatePage(aboutText);
      res.send(html);
    }
  });
});

// Serve the categories page
app.get('/categories', (req, res) => {
  const categoriesPath = path.join(__dirname, '/data/categories.json');
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

// Serve the posts page
app.get('/posts', (req, res) => {
  const postsPath = path.join(__dirname, '/data/posts.json');
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

// Serve the add post page
app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/addPost.html'));
});

// Generate a complete HTML page with the given content
function generatePage(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Blog</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>My Blog</h1>
        <nav>
          <a href="/about">About</a>
          <a href="/categories">Categories</a>
          <a href="/posts">Posts</a>
          <a href="/posts/add">Add Post</a>
        </nav>
      </header>
      <main>
        <div class="col-md-9">
          ${content}
        </div>
      </main>
    </body>
    </html>
  `;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
