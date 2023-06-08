const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const app = express();
const PORT = 5500;

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: 'dto94yf8f',
  api_key: '847643783243368',
  api_secret: '-iWsSZu18XeWBJVSRRQCfKw-j1w'
});

// Set up multer upload middleware
const upload = multer();

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

// Handle form submission for adding posts
app.post('/posts/add', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const image = req.file;

  if (!title || !content || !image) {
    res.status(400).send('Title, content, and image are required.');
    return;
  }

  const stream = cloudinary.uploader.upload_stream((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      // Save the post details with the Cloudinary URL to a database or JSON file
      const post = {
        title,
        content,
        imageUrl: result.secure_url
      };
      // Write post details to posts.json file or store in database
      const postsPath = path.join(__dirname, 'data/posts.json');
      fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const posts = JSON.parse(data);
          posts.push(post);
          fs.writeFile(postsPath, JSON.stringify(posts, null, 2), err => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            } else {
              res.redirect('/posts');
            }
          });
        }
      });
    }
  });

  streamifier.createReadStream(image.buffer).pipe(stream);
});

// Serve the about.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
