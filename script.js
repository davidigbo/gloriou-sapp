// // let isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

// // function loginUser(event) {
// //   event.preventDefault();

// //   // Simulated login
// //   isAuthenticated = true;
// //   localStorage.setItem("isAuthenticated", "true");

// //   enableBlogForm();
// //   alert("Login successful.");
// //   loadPosts();
// //   loadEvents();
// // }

// // function enableBlogForm() {
// //   document.getElementById("blogForm").classList.remove("disabled");
// //   document.querySelector("#blogForm input").disabled = false;
// //   document.querySelector("#blogForm textarea").disabled = false;
// //   document.querySelector("#blogForm button").disabled = false;
// // }

// // function submitPost(event) {
// //   event.preventDefault();
// //   if (!isAuthenticated) return;

// //   const title = document.getElementById("post-title").value;
// //   const content = document.getElementById("post-content").value;

// //   const post = {
// //     id: Date.now().toString(),
// //     title,
// //     content,
// //     likes: 0,
// //     comments: []
// //   };

// //   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
// //   posts.unshift(post);
// //   localStorage.setItem("posts", JSON.stringify(posts));

// //   displayPost(post);

// //   document.getElementById("post-title").value = "";
// //   document.getElementById("post-content").value = "";
// // }

// // function displayPost(post) {
// //   const blogPosts = document.getElementById("blog-posts");

// //   const postDiv = document.createElement("div");
// //   postDiv.className = "blog-post";
// //   postDiv.innerHTML = `
// //     <h3>${post.title}</h3>
// //     <p><small>Published ${new Date().toLocaleDateString()}</small></p>
// //     <p>${post.content}</p>
// //     <button class="like-button" onclick="likePost('${post.id}', this)">👍 Like (${post.likes})</button>
// //     <div class="comments">
// //       <strong>Comments:</strong>
// //       <div class="comment-list"></div>
// //       <form onsubmit="return addComment(event, '${post.id}', this)">
// //         <input type="text" placeholder="Add a comment..." required />
// //         <button type="submit">Comment</button>
// //       </form>
// //     </div>
// //   `;

// //   blogPosts.prepend(postDiv);

// //   const commentList = postDiv.querySelector(".comment-list");
// //   post.comments.forEach(comment => {
// //     const p = document.createElement("p");
// //     p.innerHTML = `<strong>You:</strong> ${comment}`;
// //     commentList.appendChild(p);
// //   });
// // }

// // function likePost(postId, button) {
// //   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
// //   const post = posts.find(p => p.id === postId);
// //   if (post) {
// //     post.likes += 1;
// //     localStorage.setItem("posts", JSON.stringify(posts));
// //     button.innerHTML = `👍 Like (${post.likes})`;
// //   }
// // }

// // function addComment(event, postId, form) {
// //   event.preventDefault();
// //   const input = form.querySelector("input");
// //   const commentText = input.value;

// //   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
// //   const post = posts.find(p => p.id === postId);
// //   if (post) {
// //     post.comments.push(commentText);
// //     localStorage.setItem("posts", JSON.stringify(posts));

// //     const commentList = form.parentElement.querySelector(".comment-list");
// //     const p = document.createElement("p");
// //     p.innerHTML = `<strong>You:</strong> ${commentText}`;
// //     commentList.appendChild(p);
// //     input.value = "";
// //   }
// // }

// // function loadPosts() {
// //   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
// //   posts.forEach(displayPost);
// // }

// // function addEvent() {
// //   const title = document.getElementById("event-title").value;
// //   const date = document.getElementById("event-date").value;
// //   const time = document.getElementById("event-time").value;
// //   if (title && date && time) {
// //     const event = {
// //       id: Date.now().toString(),
// //       title,
// //       date,
// //       time
// //     };
// //     const events = JSON.parse(localStorage.getItem("events") || "[]");
// //     events.push(event);
// //     localStorage.setItem("events", JSON.stringify(events));
// //     displayEvent(event);
// //     document.getElementById("event-title").value = "";
// //     document.getElementById("event-date").value = "";
// //     document.getElementById("event-time").value = "";
// //   }
// // }

// // function displayEvent(event) {
// //   const eventList = document.getElementById("event-list");
// //   const eventDiv = document.createElement("div");
// //   eventDiv.className = "event-item";
// //   eventDiv.innerHTML = `
// //     <h3>${event.title}</h3>
// //     <p>${event.date} at ${event.time}</p>
// //     <button onclick="deleteEvent('${event.id}')">Delete</button>
// //   `;
// //   eventList.appendChild(eventDiv);
// // }

// // function deleteEvent(eventId) {
// //   let events = JSON.parse(localStorage.getItem("events") || "[]");
// //   events = events.filter(e => e.id !== eventId);
// //   localStorage.setItem("events", JSON.stringify(events));
// //   document.getElementById("event-list").innerHTML = "";
// //   events.forEach(displayEvent);
// // }

// // function loadEvents() {
// //   const events = JSON.parse(localStorage.getItem("events") || "[]");
// //   events.forEach(displayEvent);
// // }

// // document.addEventListener("DOMContentLoaded", () => {
// //   isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
// //   if (isAuthenticated) {
// //     enableBlogForm();
// //     loadPosts();
// //     loadEvents();
// //   }
// // });

// function enableBlogForm() {
//   document.getElementById("blogForm").classList.remove("disabled");
//   document.querySelector("#blogForm input").disabled = false;
//   document.querySelector("#blogForm textarea").disabled = false;
//   document.querySelector("#blogForm button").disabled = false;
// }

// function submitPost(event) {
//   event.preventDefault();

//   const title = document.getElementById("post-title").value;
//   const content = document.getElementById("post-content").value;

//   const post = {
//     id: Date.now().toString(),
//     title,
//     content,
//     likes: 0,
//     comments: []
//   };

//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   posts.unshift(post);
//   localStorage.setItem("posts", JSON.stringify(posts));

//   displayPost(post);

//   document.getElementById("post-title").value = "";
//   document.getElementById("post-content").value = "";
// }

// function displayPost(post) {
//   const blogPosts = document.getElementById("blog-posts");

//   const postDiv = document.createElement("div");
//   postDiv.className = "blog-post";
//   postDiv.innerHTML = `
//     <h3>${post.title}</h3>
//     <p><small>Published ${new Date().toLocaleDateString()}</small></p>
//     <p>${post.content}</p>
//     <button class="like-button" onclick="likePost('${post.id}', this)">👍 Like (${post.likes})</button>
//     <div class="comments">
//       <strong>Comments:</strong>
//       <div class="comment-list"></div>
//       <form onsubmit="return addComment(event, '${post.id}', this)">
//         <input type="text" class="comment_input" placeholder="Add a comment..." required />
//         <button type="submit" class="btn_event">Comment</button>
//       </form>
//     </div>
//   `;

//   blogPosts.prepend(postDiv);

//   const commentList = postDiv.querySelector(".comment-list");
//   post.comments.forEach(comment => {
//     const p = document.createElement("p");
//     p.innerHTML = `<strong>You:</strong> ${comment}`;
//     commentList.appendChild(p);
//   });
// }

// function likePost(postId, button) {
//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   const post = posts.find(p => p.id === postId);
//   if (post) {
//     post.likes += 1;
//     localStorage.setItem("posts", JSON.stringify(posts));
//     button.innerHTML = `👍 Like (${post.likes})`;
//   }
// }

// function addComment(event, postId, form) {
//   event.preventDefault();
//   const input = form.querySelector("input");
//   const commentText = input.value;

//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   const post = posts.find(p => p.id === postId);
//   if (post) {
//     post.comments.push(commentText);
//     localStorage.setItem("posts", JSON.stringify(posts));

//     const commentList = form.parentElement.querySelector(".comment-list");
//     const p = document.createElement("p");
//     p.innerHTML = `<strong>You:</strong> ${commentText}`;
//     commentList.appendChild(p);
//     input.value = "";
//   }
// }

// function loadPosts() {
//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   posts.forEach(displayPost);
// }

// function addEvent() {
//   const title = document.getElementById("event-title").value;
//   const date = document.getElementById("event-date").value;
//   const time = document.getElementById("event-time").value;
//   if (title && date && time) {
//     const event = {
//       id: Date.now().toString(),
//       title,
//       date,
//       time
//     };
//     const events = JSON.parse(localStorage.getItem("events") || "[]");
//     events.push(event);
//     localStorage.setItem("events", JSON.stringify(events));
//     displayEvent(event);
//     document.getElementById("event-title").value = "";
//     document.getElementById("event-date").value = "";
//     document.getElementById("event-time").value = "";
//   }
// }

// function displayEvent(event) {
//   const eventList = document.getElementById("event-list");
//   const eventDiv = document.createElement("div");
//   eventDiv.className = "event-item";
//   eventDiv.innerHTML = `
//     <h3>${event.title}</h3>
//     <p>${event.date} at ${event.time}</p>
//     <button onclick="deleteEvent('${event.id}')">Delete</button>
//   `;
//   eventList.appendChild(eventDiv);
// }

// function deleteEvent(eventId) {
//   let events = JSON.parse(localStorage.getItem("events") || "[]");
//   events = events.filter(e => e.id !== eventId);
//   localStorage.setItem("events", JSON.stringify(events));
//   document.getElementById("event-list").innerHTML = "";
//   events.forEach(displayEvent);
// }

// function loadEvents() {
//   const events = JSON.parse(localStorage.getItem("events") || "[]");
//   events.forEach(displayEvent);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   enableBlogForm();
//   loadPosts();
//   loadEvents();
// });


let isAuthenticated = false;

// Login handler
function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  let role = "user";

  if (username === "admin") {
    role = "admin";
  }

  isAuthenticated = true;
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("role", role);

  enableBlogForm();
  if (role === "admin") {
    enableEventForm();
  }

  alert("Login successful as " + role);
  loadPosts();
  loadEvents();
}

// Enable blog form
function enableBlogForm() {
  document.getElementById("blogForm").classList.remove("disabled");
  document.querySelector("#blogForm input").disabled = false;
  document.querySelector("#blogForm textarea").disabled = false;
  document.querySelector("#blogForm button").disabled = false;
}

// Enable event form (only for admin)
function enableEventForm() {
  document.getElementById("eventForm").classList.remove("disabled");
  document.querySelectorAll("#eventForm input, #eventForm button").forEach(el => el.disabled = false);
}

// Submit a blog post
function submitPost(event) {
  event.preventDefault();

  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;

  const post = {
    id: Date.now().toString(),
    title,
    content,
    likes: 0,
    comments: []
  };

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  displayPost(post);

  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";
}

// Display a post
function displayPost(post) {
  const blogPosts = document.getElementById("blog-posts");

  const postDiv = document.createElement("div");
  postDiv.className = "blog-post";
  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p><small>Published ${new Date().toLocaleDateString()}</small></p>
    <p>${post.content}</p>
    <button class="like-button" onclick="likePost('${post.id}', this)">👍 Like (${post.likes})</button>
    <div class="comments">
      <strong>Comments:</strong>
      <div class="comment-list"></div>
      <form onsubmit="return addComment(event, '${post.id}', this)">
        <input type="text" class="comment_input" placeholder="Add a comment..." required />
        <button type="submit" class="btn_event">Comment</button>
      </form>
    </div>
  `;

  blogPosts.prepend(postDiv);

  const commentList = postDiv.querySelector(".comment-list");
  post.comments.forEach(comment => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>You:</strong> ${comment}`;
    commentList.appendChild(p);
  });
}

// Like a post
function likePost(postId, button) {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    button.innerHTML = `👍 Like (${post.likes})`;
  }
}

// Add a comment
function addComment(event, postId, form) {
  event.preventDefault();
  const input = form.querySelector("input");
  const commentText = input.value;

  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments.push(commentText);
    localStorage.setItem("posts", JSON.stringify(posts));

    const commentList = form.parentElement.querySelector(".comment-list");
    const p = document.createElement("p");
    p.innerHTML = `<strong>You:</strong> ${commentText}`;
    commentList.appendChild(p);
    input.value = "";
  }
}

// Load posts
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.forEach(displayPost);
}

// Add event (admin only)
function addEvent() {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    alert("Only admins can create events.");
    return;
  }

  const title = document.getElementById("event-title").value;
  const date = document.getElementById("event-date").value;
  const time = document.getElementById("event-time").value;

  if (title && date && time) {
    const event = {
      id: Date.now().toString(),
      title,
      date,
      time
    };
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvent(event);

    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-time").value = "";
  }
}

// Display event
function displayEvent(event) {
  const eventList = document.getElementById("event-list");
  const eventDiv = document.createElement("div");
  eventDiv.className = "event-item";
  eventDiv.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.date} at ${event.time}</p>
    <button class="btn_event" onclick="deleteEvent('${event.id}')">Delete</button>
  `;
  eventList.appendChild(eventDiv);
}

// Delete event
function deleteEvent(eventId) {
  let events = JSON.parse(localStorage.getItem("events") || "[]");
  events = events.filter(e => e.id !== eventId);
  localStorage.setItem("events", JSON.stringify(events));
  document.getElementById("event-list").innerHTML = "";
  events.forEach(displayEvent);
}

// Load events
function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events") || "[]");
  events.forEach(displayEvent);
}

// Init on page load
document.addEventListener("DOMContentLoaded", () => {
  isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role");

  if (isAuthenticated) {
    enableBlogForm();
    if (role === "admin") {
      enableEventForm();
    }
    loadPosts();
    loadEvents();
  }
});
