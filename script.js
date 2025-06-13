//  let isAuthenticated = false;

//     function loginUser(event) {
//       event.preventDefault();
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;

//       if (username === "admin" && password === "admin") {
//         isAuthenticated = true;
//         document.getElementById("blogForm").classList.remove("disabled");
//         document.querySelector("#blogForm input").disabled = false;
//         document.querySelector("#blogForm textarea").disabled = false;
//         document.querySelector("#blogForm button").disabled = false;
//         alert("Login successful.");
//       } else {
//         alert("Invalid credentials. Try 'admin' for both fields.");
//       }
//     }

//     function submitPost(event) {
//       event.preventDefault();
//       if (!isAuthenticated) return;

//       const title = document.getElementById("post-title").value;
//       const content = document.getElementById("post-content").value;
//       const blogPosts = document.getElementById("blog-posts");

//       const postDiv = document.createElement("div");
//       postDiv.className = "blog-post";
//       postDiv.innerHTML = `
//         <h3>${title}</h3>
//         <p><small>Published ${new Date().toLocaleDateString()}</small></p>
//         <p>${content}</p>
//         <button class="like-button" onclick="likePost(this)">👍 Like (0)</button>
//         <div class="comments">
//           <strong>Comments:</strong>
//           <div class="comment-list"></div>
//           <form onsubmit="return addComment(event, this)">
//             <input type="text" placeholder="Add a comment..." required />
//             <button type="submit">Comment</button>
//           </form>
//         </div>
//       `;
//       blogPosts.prepend(postDiv);

//       document.getElementById("post-title").value = "";
//       document.getElementById("post-content").value = "";
//     }

//     function likePost(button) {
//       let count = parseInt(button.textContent.match(/\d+/)[0]);
//       count++;
//       button.innerHTML = `👍 Like (${count})`;
//     }

//     function addEvent() {
//       const title = document.getElementById('event-title').value;
//       const date = document.getElementById('event-date').value;
//       const time = document.getElementById('event-time').value;
//       if (title && date && time) {
//         const eventList = document.getElementById('event-list');
//         const eventDiv = document.createElement('div');
//         eventDiv.className = 'event-item';
//         eventDiv.innerHTML = `<h3>${title}</h3><p>${date} at ${time}</p><button onclick="this.parentElement.remove()">Delete</button>`;
//         eventList.appendChild(eventDiv);
//         document.getElementById('event-title').value = '';
//         document.getElementById('event-date').value = '';
//         document.getElementById('event-time').value = '';
//       }
//     }

//     function addComment(event, form) {
//       event.preventDefault();
//       const input = form.querySelector("input");
//       const commentList = form.parentElement.querySelector(".comment-list");
//       const comment = document.createElement("p");
//       comment.innerHTML = `<strong>You:</strong> ${input.value}`;
//       commentList.appendChild(comment);
//       input.value = "";
//     }

//      const mediaItems = [
//     { src: "sermon-photo.jpg", alt: "Worship Moment" },
//     { src: "youth-camp.jpg", alt: "Youth Camp 2024" },
//     { src: "baptism-day.jpg", alt: "Baptism Day" },
//     { src: "revival-night.jpg", alt: "Revival Night" }
//   ];

//   function loadMediaGallery() {
//     const gallery = document.getElementById("media-gallery");
//     mediaItems.forEach(item => {
//       const img = document.createElement("img");
//       img.src = item.src;
//       img.alt = item.alt;
//       gallery.appendChild(img);
//     });
//   }

//   loadMediaGallery();

document.addEventListener("DOMContentLoaded", function() {
    let isAuthenticated = false;

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    isAuthenticated = true;
    document.getElementById("blogForm").classList.remove("disabled");
    document.querySelector("#blogForm input").disabled = false;
    document.querySelector("#blogForm textarea").disabled = false;
    document.querySelector("#blogForm button").disabled = false;
    alert("Login successful.");
    loadPosts();
    loadEvents();
  } else {
    alert("Invalid credentials. Try 'admin' for both fields.");
  }
}

function submitPost(event) {
  event.preventDefault();
  if (!isAuthenticated) return;

  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const newPost = {
    title,
    content,
    date: new Date().toLocaleDateString(),
    likes: 0,
    comments: []
  };
  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPost(newPost);

  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";
}

function renderPost(post) {
  const blogPosts = document.getElementById("blog-posts");
  const postDiv = document.createElement("div");
  postDiv.className = "blog-post";
  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p><small>Published ${post.date}</small></p>
    <p>${post.content}</p>
    <button class="like-button" onclick="likePost(this)">👍 Like (${post.likes})</button>
    <div class="comments">
      <strong>Comments:</strong>
      <div class="comment-list">${post.comments.map(c => `<p><strong>You:</strong> ${c}</p>`).join('')}</div>
      <form onsubmit="return addComment(event, this)">
        <input type="text" placeholder="Add a comment..." required />
        <button type="submit">Comment</button>
      </form>
    </div>
  `;
  blogPosts.prepend(postDiv);
}

function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  document.getElementById("blog-posts").innerHTML = "";
  posts.forEach(renderPost);
}

function likePost(button) {
  let count = parseInt(button.textContent.match(/\d+/)[0]);
  count++;
  button.innerHTML = `👍 Like (${count})`;
  updatePostLikes(button.parentElement.querySelector("h3").innerText, count);
}

function updatePostLikes(title, count) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.forEach(p => {
    if (p.title === title) p.likes = count;
  });
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addComment(event, form) {
  event.preventDefault();
  const input = form.querySelector("input");
  const commentList = form.parentElement.querySelector(".comment-list");
  const comment = document.createElement("p");
  comment.innerHTML = `<strong>You:</strong> ${input.value}`;
  commentList.appendChild(comment);

  updatePostComments(form.closest(".blog-post").querySelector("h3").innerText, input.value);
  input.value = "";
}

function updatePostComments(title, comment) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.forEach(p => {
    if (p.title === title) p.comments.push(comment);
  });
  localStorage.setItem("posts", JSON.stringify(posts));
}

function addEvent() {
  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const time = document.getElementById('event-time').value;
  if (title && date && time) {
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    const newEvent = { title, date, time };
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvent(newEvent);
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
  }
}

function renderEvent(event) {
  const eventList = document.getElementById("event-list");
  const eventDiv = document.createElement("div");
  eventDiv.className = "event-item";
  eventDiv.innerHTML = `<h3>${event.title}</h3><p>${event.date} at ${event.time}</p><button onclick="deleteEvent(this, '${event.title}')">Delete</button>`;
  eventList.appendChild(eventDiv);
}

function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  document.getElementById("event-list").innerHTML = "";
  events.forEach(renderEvent);
}

function deleteEvent(button, title) {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  const filtered = events.filter(e => e.title !== title);
  localStorage.setItem("events", JSON.stringify(filtered));
  button.parentElement.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  if (isAuthenticated) {
    loadPosts();
    loadEvents();
  }
});

});