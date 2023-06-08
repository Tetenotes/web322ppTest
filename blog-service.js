// Retrieve and display about content from about.json
const aboutLink = document.querySelector('a[href="/about"]');
const aboutSection = document.querySelector('.col-md-9');
aboutLink.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/data/about.json')
    .then(response => response.json())
    .then(about => {
      aboutSection.innerHTML = ''; // Clear existing content
      const aboutText = document.createElement('p');
      aboutText.textContent = about.content;
      aboutSection.appendChild(aboutText);
    })
    .catch(error => console.error(error));
});

// Retrieve and display categories from categories.json
const categoriesLink = document.querySelector('a[href="/categories"]');
categoriesLink.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/data/categories.json')
    .then(response => response.json())
    .then(categories => {
      const categoryList = document.createElement('ul');
      categoryList.classList.add('list-group');
      categories.forEach(category => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = category.category;
        categoryList.appendChild(listItem);
      });
      aboutSection.innerHTML = '';
      aboutSection.appendChild(categoryList);
    })
    .catch(error => console.error(error));
});

// Retrieve and display posts from posts.json
const postsLink = document.querySelector('a[href="/posts"]');
postsLink.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/data/posts.json')
    .then(response => response.json())
    .then(posts => {
      const postList = document.createElement('ul');
      postList.classList.add('list-group');
      posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        // Create elements to display the post information
        const title = document.createElement('h3');
        title.textContent = post.title;
        const body = document.createElement('p');
        body.textContent = post.body;
        const postDate = document.createElement('p');
        postDate.textContent = `Posted on: ${post.postDate}`;
        const category = document.createElement('p');
        category.textContent = `Category: ${post.category}`;

        // Append the elements to the list item
        listItem.appendChild(title);
        listItem.appendChild(body);
        listItem.appendChild(postDate);
        listItem.appendChild(category);

        postList.appendChild(listItem);
      });
      aboutSection.innerHTML = '';
      aboutSection.appendChild(postList);
    })
    .catch(error => console.error(error));
});

// Link the "Add Post" menu item to addPost.html
const addPostLink = document.querySelector('a[href="/posts/add"]');
addPostLink.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '/views/addPost.html';
});
