let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

// Render blogs on Home Page
if (document.getElementById('blogList')) {
  const blogList = document.getElementById('blogList');
  blogList.innerHTML = '';
  blogs.forEach((blog, index) => {
    const div = document.createElement('div');
    div.className = 'blog-card';
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content.substring(0, 100)}...</p>
      <a href="blog.html?id=${index}"><i class="fa-solid fa-eye"></i> View</a>
      <button class="delete-btn" onclick="deleteBlog(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
    `;
    blogList.appendChild(div);
  });
}

// Add Blog Page
if (document.getElementById('blogForm')) {
  const blogForm = document.getElementById('blogForm');
  blogForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value.trim();
    const content = document.getElementById('blogContent').value.trim();
    blogs.push({ title, content });
    localStorage.setItem('blogs', JSON.stringify(blogs));
    window.location.href = "index.html";
  };
}

// Blog Detail Page
if (document.getElementById('blogDetail')) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const blog = blogs[id];

  if (blog) {
    document.getElementById('blogDetail').innerHTML = `
      <div class="blog-card">
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        <button class="delete-btn" onclick="deleteBlog(${id}, true)">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    `;
  } else {
    document.getElementById('blogDetail').innerHTML = `<p>Blog not found.</p>`;
  }
}

// Delete Blog
function deleteBlog(index, redirect = false) {
  if (confirm("Are you sure you want to delete this blog?")) {
    blogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    if (redirect) {
      window.location.href = "index.html";
    } else {
      window.location.reload();
    }
  }
}
