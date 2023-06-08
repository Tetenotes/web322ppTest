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

// Create an upload variable without disk storage
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

// Handle POST request to add a new post
app.post('/posts/add', upload.single('image'), (req, res) => {
  // Access the uploaded file
  const imageFile = req.file;

  // Check if a file was uploaded
  if (!imageFile) {
    res.status(400).send('No file uploaded');
    return;
  }

  // Create a readable stream from the uploaded file
  const stream = cloudinary.uploader.upload_stream((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      // Save the Cloudinary URL of the uploaded image
      const imageUrl = result.secure_url;

      // Process other form data and save the post with the image URL
      // ...

      res.send('Post added successfully');
    }
  });

  // Pipe the uploaded file into the Cloudinary stream
  streamifier.createReadStream(imageFile.buffer).pipe(stream);
});

// Serve the about.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
