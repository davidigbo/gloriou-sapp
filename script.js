// // script.js
// let isAuthenticated = false;

// // Login handler
// function loginUser(event) {
//   event.preventDefault();

//   const username = document.getElementById("username").value;
//   let role = "user";

//   if (username === "david") {
//     role = "admin";
//   }

//   isAuthenticated = true;
//   localStorage.setItem("isAuthenticated", "true");
//   localStorage.setItem("role", role);

//   enableBlogForm();
//   if (role === "admin") {
//     enableEventForm();
//   }

//   alert("Login successful as " + role);
//   loadPosts();
//   loadEvents();
// }

// // Enable blog form
// function enableBlogForm() {
//   document.getElementById("blogForm").classList.remove("disabled");
//   document.querySelector("#blogForm input").disabled = false;
//   document.querySelector("#blogForm textarea").disabled = false;
//   document.querySelector("#blogForm button").disabled = false;
// }

// // Enable event form (only for admin)
// function enableEventForm() {
//   document.getElementById("eventForm").classList.remove("disabled");
//   document.querySelectorAll("#eventForm input, #eventForm button").forEach(el => el.disabled = false);
// }

// // Submit a blog post
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

// // Display a post
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

// // Like a post
// function likePost(postId, button) {
//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   const post = posts.find(p => p.id === postId);
//   if (post) {
//     post.likes += 1;
//     localStorage.setItem("posts", JSON.stringify(posts));
//     button.innerHTML = `👍 Like (${post.likes})`;
//   }
// }

// // Add a comment
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

// // Load posts
// function loadPosts() {
//   const posts = JSON.parse(localStorage.getItem("posts") || "[]");
//   posts.forEach(displayPost);
// }

// // Add event (admin only)
// function addEvent() {
//   const role = localStorage.getItem("role");
//   if (role !== "admin") {
//     alert("Only admins can create events.");
//     return;
//   }

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

// // Display event
// function displayEvent(event) {
//   const eventList = document.getElementById("event-list");
//   const eventDiv = document.createElement("div");
//   eventDiv.className = "event-item";
//   eventDiv.innerHTML = `
//     <h3>${event.title}</h3>
//     <p>${event.date} at ${event.time}</p>
//     <button class="btn_event" onclick="deleteEvent('${event.id}')">Delete</button>
//   `;
//   eventList.appendChild(eventDiv);
// }

// // Delete event
// function deleteEvent(eventId) {
//   let events = JSON.parse(localStorage.getItem("events") || "[]");
//   events = events.filter(e => e.id !== eventId);
//   localStorage.setItem("events", JSON.stringify(events));
//   document.getElementById("event-list").innerHTML = "";
//   events.forEach(displayEvent);
// }

// // Load events
// function loadEvents() {
//   const events = JSON.parse(localStorage.getItem("events") || "[]");
//   events.forEach(displayEvent);
// }

// // Init on page load
// document.addEventListener("DOMContentLoaded", () => {
//   isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
//   const role = localStorage.getItem("role");

//   if (isAuthenticated) {
//     enableBlogForm();
//     if (role === "admin") {
//       enableEventForm();
//     }
//     loadPosts();
//     loadEvents();
//   }
// });


// // --- Auth & Role ---
// // let isAuthenticated = false;
// // let role = null;
// // function loginUser(e) {
// //   e.preventDefault();
// //   const user = document.getElementById('username').value.trim();
// //   if (!user) return;
// //   isAuthenticated = true;
// //   role = user === 'david' ? 'admin' : 'user';
// //   localStorage.setItem('clan_user', user);
// //   localStorage.setItem('clan_role', role);
// //   document.querySelectorAll('.disabled').forEach(x => x.classList.remove('disabled'));
// //   document.querySelectorAll('#blogForm input, #blogForm textarea, #blogForm button, #eventForm input, #eventForm button').forEach(el => el.disabled = false);
// //   if (role !== 'admin') document.querySelectorAll('#eventForm input, #eventForm button').forEach(el => el.disabled=true);
// //   loadState();
// // }

// // // --- Profiles ---
// // function saveProfile(e) {
// //   e.preventDefault();
// //   const nick = document.getElementById('nick').value;
// //   const bg = document.getElementById('bgcolor').value;
// //   const avatarFile = document.getElementById('avatar').files[0];
// //   if (avatarFile) {
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       const data = { nick, bg, avatar: reader.result };
// //       localStorage.setItem('profile', JSON.stringify(data));
// //       applyProfile(data);
// //     };
// //     reader.readAsDataURL(avatarFile);
// //   } else {
// //     const data = { nick, bg, avatar: null };
// //     localStorage.setItem('profile', JSON.stringify(data));
// //     applyProfile(data);
// //   }
// // }
// // function applyProfile(data) {
// //   document.body.style.setProperty('--bg', data.bg);
// //   const div = document.getElementById('profile-preview');
// //   div.innerHTML = `<p><strong>Hi, ${data.nick}!</strong></p>` +
// //     (data.avatar ? `<img src="${data.avatar}" class="avatar-preview"/>` : '');
// // }

// // // --- Posts & Comments & Reactions ---
// // function submitPost(e) {
// //   e.preventDefault();
// //   const t = document.getElementById('post-title').value;
// //   const c = document.getElementById('post-content').value;
// //   const mFile = document.getElementById('post-media').files[0];
// //   const post = { id: Date.now(), t, c, m: null, likes: 0, comments: [], reactions: {}, date: Date.now() };
// //   if (mFile) {
// //     const reader = new FileReader();
// //     reader.onload = () => { post.m = reader.result; storeAndShow(post); };
// //     reader.readAsDataURL(mFile);
// //   } else storeAndShow(post);
// //   bumpStreak();
// // }
// // function storeAndShow(post) {
// //   const arr = JSON.parse(localStorage.getItem('posts') || '[]');
// //   arr.unshift(post);
// //   localStorage.setItem('posts', JSON.stringify(arr));
// //   displayPost(post);
// //   updateBadges(); updateLeaderboard();  
// // }
// // function displayPost(post) {
// //   const div = document.createElement('div');
// //   div.className = 'blog-post';
// //   const mediaTag = post.m
// //     ? post.m.startsWith('data:video') ? `<video src="${post.m}" controls></video>` : `<img src="${post.m}" />`
// //     : '';
// //   div.innerHTML = `<h3>${post.t}</h3><p>${new Date(post.date).toLocaleString()}</p><p>${post.c}</p>${mediaTag}
// //     <div class="reaction-bar">
// //       👍 <span onclick="react(${post.id}, 'like')">${post.likes}</span>
// //       <span onclick="react(${post.id}, '❤️')">❤️ ${post.reactions['❤️']||0}</span>
// //       <span onclick="react(${post.id}, '🎉')">🎉 ${post.reactions['🎉']||0}</span>
// //     </div>
// //     <div class="comments"><strong>Comments:</strong>
// //       <div class="comment-list">${post.comments.map(x=>`<p>${x}</p>`).join('')}</div>
// //       <form onsubmit="addComment(event, ${post.id})"><input required placeholder="Comment"/><button>Comment</button></form>
// //     </div>`;
// //   document.getElementById('blog-posts').prepend(div);
// // }
// // function react(id, emoji) {
// //   const arr = JSON.parse(localStorage.getItem('posts') || '[]');
// //   const p = arr.find(x=>x.id===id);
// //   if (emoji==='like') p.likes++;
// //   else p.reactions[emoji] = (p.reactions[emoji]||0)+1;
// //   localStorage.setItem('posts', JSON.stringify(arr));
// //   refreshBlog();
// //   updateBadges(); updateLeaderboard();
// // }
// // function addComment(e,id) {
// //   e.preventDefault();
// //   const txt = e.target.querySelector('input').value;
// //   const arr = JSON.parse(localStorage.getItem('posts') || '[]');
// //   const p = arr.find(x=>x.id===id);
// //   p.comments.push(txt);
// //   localStorage.setItem('posts', JSON.stringify(arr));
// //   refreshBlog();
// //   updateBadges(); updateLeaderboard();
// // }

// // // --- Events ---
// // function addEvent() {
// //   const t = document.getElementById('event-title').value;
// //   const d = document.getElementById('event-date').value;
// //   const ti = document.getElementById('event-time').value;
// //   const mFile = document.getElementById('event-media').files[0];
// //   const ev = { id:Date.now(), t, d, ti, m: null };
// //   if (mFile) {
// //     const reader = new FileReader();
// //     reader.onload = () => { ev.m = reader.result; storeEvent(ev); };
// //     reader.readAsDataURL(mFile);
// //   } else storeEvent(ev);
// // }
// // function storeEvent(ev) {
// //   const arr = JSON.parse(localStorage.getItem('events') || '[]');
// //   arr.push(ev);
// //   localStorage.setItem('events', JSON.stringify(arr));
// //   displayEvent(ev);
// // }
// // function displayEvent(e) {
// //   const div = document.createElement('div');
// //   div.className = 'event-item';
// //   const media = e.m ? (e.m.startsWith('data:video') ? `<video src="${e.m}" controls></video>` : `<img src="${e.m}">`) : '';
// //   div.innerHTML = `<h3>${e.t}</h3><p>${e.d} @ ${e.ti}</p>${media}<button onclick="deleteEvent(${e.id})">Delete</button>`;
// //   document.getElementById('event-list').append(div);
// // }
// // function deleteEvent(id) {
// //   const arr = JSON.parse(localStorage.getItem('events')||'[]').filter(x=>x.id!==id);
// //   localStorage.setItem('events', JSON.stringify(arr));
// //   refreshEvents();
// // }
// // function refreshEvents() {
// //   document.getElementById('event-list').innerHTML='';
// //   JSON.parse(localStorage.getItem('events')||'[]').forEach(displayEvent);
// // }

// // // --- UI Refresh Helpers ---
// // function refreshBlog(){
// //   document.getElementById('blog-posts').innerHTML = '';
// //   JSON.parse(localStorage.getItem('posts')||'[]').forEach(displayPost);
// // }
// // function loadState(){
// //   JSON.parse(localStorage.getItem('posts')||'[]').forEach(displayPost);
// //   refreshEvents();
// //   updateBadges(); updateLeaderboard(); loadStreak();
// //   const p=JSON.parse(localStorage.getItem('profile')); if(p)applyProfile(p);
// // }

// // // --- Badges & Leaderboard ---
// // function updateBadges() {
// //   const u = localStorage.getItem('clan_user');
// //   const posts = JSON.parse(localStorage.getItem('posts')||'[]');
// //   let own = posts.filter(p=>p.comments.some(c=>c.includes(u))||p.reactions['❤️']>0);
// //   const countPosts = posts.length;
// //   const countComments = posts.reduce((a,p)=>a+p.comments.length,0);
// //   const countLikes = posts.reduce((a,p)=>a+p.likes,0);
// //   const badges = [];
// //   if (countPosts>=5) badges.push('5 Posts');
// //   if (countComments>=10) badges.push('10 Comments');
// //   if (countLikes>=20) badges.push('20 Likes');
// //   const dl = document.getElementById('badge-list');
// //   dl.innerHTML = badges.map(b=>`<span class="badge-tag">${b}</span>`).join('') || 'No badges yet.';
// // }

// // function updateLeaderboard() {
// //   const posts = JSON.parse(localStorage.getItem('posts')||'[]');
// //   const scores = {};
// //   posts.forEach(p=>{
// //     scores[p.id] = p.likes + (Object.values(p.reactions).reduce((a,b)=>a+b,0) || 0) + p.comments.length;
// //   });
// //   const top = posts.sort((a,b)=>scores[b.id]-scores[a.id]).slice(0,5);
// //   const ol = document.getElementById('leaderboard-list');
// //   ol.innerHTML = top.map(p=>`<li><strong>${p.t}</strong> – ${scores[p.id]} pts</li>`).join('');
// // }

// // // --- Streaks ---
// // function bumpStreak(){
// //   const today = new Date().toDateString();
// //   const last = localStorage.getItem('lastPostDay');
// //   let cn = parseInt(localStorage.getItem('streak')||'0');
// //   if (last !== today) {
// //     if (new Date(today) - new Date(last) === 86400000) cn++;
// //     else cn = 1;
// //     localStorage.setItem('streak', cn);
// //     localStorage.setItem('lastPostDay', today);
// //   }
// //   loadStreak();
// // }
// // function loadStreak(){
// //   document.getElementById('streak-count').textContent = `${localStorage.getItem('streak')||0} days`;
// // }

// // // --- Initialize ---
// // window.addEventListener('DOMContentLoaded', () => {
// //   if (localStorage.getItem('clan_user')) loginUser(new Event('init'));
// // });


// --- Auth & Role ---
let isAuthenticated = false;
let role = null;
function loginUser(e) {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  if (!user) return;
  isAuthenticated = true;
  role = user === 'david' ? 'admin' : 'user';
  localStorage.setItem('clan_user', user);
  localStorage.setItem('clan_role', role);
  document.querySelectorAll('.disabled').forEach(x => x.classList.remove('disabled'));
  document.querySelectorAll('#blogForm input, #blogForm textarea, #blogForm button, #eventForm input, #eventForm button').forEach(el => el.disabled = false);
  if (role !== 'admin') document.querySelectorAll('#eventForm input, #eventForm button').forEach(el => el.disabled=true);
  loadState();
}

// --- Profiles ---
function saveProfile(e) {
  e.preventDefault();
  const nick = document.getElementById('nick').value;
  const bg = document.getElementById('bgcolor').value;
  const avatarFile = document.getElementById('avatar').files[0];
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const data = { nick, bg, avatar: reader.result };
      localStorage.setItem('profile', JSON.stringify(data));
      applyProfile(data);
    };
    reader.readAsDataURL(avatarFile);
  } else {
    const data = { nick, bg, avatar: null };
    localStorage.setItem('profile', JSON.stringify(data));
    applyProfile(data);
  }
}
function applyProfile(data) {
  document.body.style.setProperty('--bg', data.bg);
  const div = document.getElementById('profile-preview');
  div.innerHTML = `<p><strong>Hi, ${data.nick}!</strong></p>` +
    (data.avatar ? `<img src="${data.avatar}" class="avatar-preview"/>` : '');
}

// --- Posts & Comments & Reactions ---
function submitPost(e) {
  e.preventDefault();
  const t = document.getElementById('post-title').value;
  const c = document.getElementById('post-content').value;
  const mFile = document.getElementById('post-media').files[0];
  const post = { id: Date.now(), t, c, m: null, likes: 0, comments: [], reactions: {}, date: Date.now() };
  if (mFile) {
    const reader = new FileReader();
    reader.onload = () => { post.m = reader.result; storeAndShow(post); };
    reader.readAsDataURL(mFile);
  } else storeAndShow(post);
  bumpStreak();
}
function storeAndShow(post) {
  const arr = JSON.parse(localStorage.getItem('posts') || '[]');
  arr.unshift(post);
  localStorage.setItem('posts', JSON.stringify(arr));
  displayPost(post);
  updateBadges(); updateLeaderboard();  
}
function displayPost(post) {
  const div = document.createElement('div');
  div.className = 'blog-post';
  const mediaTag = post.m
    ? post.m.startsWith('data:video') ? `<video src="${post.m}" controls></video>` : `<img src="${post.m}" />`
    : '';
  div.innerHTML = `<h3>${post.t}</h3><p>${new Date(post.date).toLocaleString()}</p><p>${post.c}</p>${mediaTag}
    <div class="reaction-bar">
      👍 <span onclick="react(${post.id}, 'like')">${post.likes}</span>
      <span onclick="react(${post.id}, '❤️')">❤️ ${post.reactions['❤️']||0}</span>
      <span onclick="react(${post.id}, '🎉')">🎉 ${post.reactions['🎉']||0}</span>
    </div>
    <div class="comments"><strong>Comments:</strong>
      <div class="comment-list">${post.comments.map(x=>`<p>${x}</p>`).join('')}</div>
      <form onsubmit="addComment(event, ${post.id})"><input required placeholder="Comment"/><button>Comment</button></form>
    </div>`;
  document.getElementById('blog-posts').prepend(div);
}
function react(id, emoji) {
  const arr = JSON.parse(localStorage.getItem('posts') || '[]');
  const p = arr.find(x=>x.id===id);
  if (emoji==='like') p.likes++;
  else p.reactions[emoji] = (p.reactions[emoji]||0)+1;
  localStorage.setItem('posts', JSON.stringify(arr));
  refreshBlog();
  updateBadges(); updateLeaderboard();
}
function addComment(e,id) {
  e.preventDefault();
  const txt = e.target.querySelector('input').value;
  const arr = JSON.parse(localStorage.getItem('posts') || '[]');
  const p = arr.find(x=>x.id===id);
  p.comments.push(txt);
  localStorage.setItem('posts', JSON.stringify(arr));
  refreshBlog();
  updateBadges(); updateLeaderboard();
}

// --- Events ---
function addEvent() {
  const t = document.getElementById('event-title').value;
  const d = document.getElementById('event-date').value;
  const ti = document.getElementById('event-time').value;
  const mFile = document.getElementById('event-media').files[0];
  const ev = { id:Date.now(), t, d, ti, m: null };
  if (mFile) {
    const reader = new FileReader();
    reader.onload = () => { ev.m = reader.result; storeEvent(ev); };
    reader.readAsDataURL(mFile);
  } else storeEvent(ev);
}
function storeEvent(ev) {
  const arr = JSON.parse(localStorage.getItem('events') || '[]');
  arr.push(ev);
  localStorage.setItem('events', JSON.stringify(arr));
  displayEvent(ev);
}
function displayEvent(e) {
  const div = document.createElement('div');
  div.className = 'event-item';
  const media = e.m ? (e.m.startsWith('data:video') ? `<video src="${e.m}" controls></video>` : `<img src="${e.m}">`) : '';
  div.innerHTML = `<h3>${e.t}</h3><p>${e.d} @ ${e.ti}</p>${media}<button onclick="deleteEvent(${e.id})">Delete</button>`;
  document.getElementById('event-list').append(div);
}
function deleteEvent(id) {
  const arr = JSON.parse(localStorage.getItem('events')||'[]').filter(x=>x.id!==id);
  localStorage.setItem('events', JSON.stringify(arr));
  refreshEvents();
}
function refreshEvents() {
  document.getElementById('event-list').innerHTML='';
  JSON.parse(localStorage.getItem('events')||'[]').forEach(displayEvent);
}

// --- UI Refresh Helpers ---
function refreshBlog(){
  document.getElementById('blog-posts').innerHTML = '';
  JSON.parse(localStorage.getItem('posts')||'[]').forEach(displayPost);
}
function loadState(){
  JSON.parse(localStorage.getItem('posts')||'[]').forEach(displayPost);
  refreshEvents();
  updateBadges(); updateLeaderboard(); loadStreak();
  const p=JSON.parse(localStorage.getItem('profile')); if(p)applyProfile(p);
}

// --- Badges & Leaderboard ---
function updateBadges() {
  const u = localStorage.getItem('clan_user');
  const posts = JSON.parse(localStorage.getItem('posts')||'[]');
  let own = posts.filter(p=>p.comments.some(c=>c.includes(u))||p.reactions['❤️']>0);
  const countPosts = posts.length;
  const countComments = posts.reduce((a,p)=>a+p.comments.length,0);
  const countLikes = posts.reduce((a,p)=>a+p.likes,0);
  const badges = [];
  if (countPosts>=5) badges.push('5 Posts');
  if (countComments>=10) badges.push('10 Comments');
  if (countLikes>=20) badges.push('20 Likes');
  const dl = document.getElementById('badge-list');
  dl.innerHTML = badges.map(b=>`<span class="badge-tag">${b}</span>`).join('') || 'No badges yet.';
}

function updateLeaderboard() {
  const posts = JSON.parse(localStorage.getItem('posts')||'[]');
  const scores = {};
  posts.forEach(p=>{
    scores[p.id] = p.likes + (Object.values(p.reactions).reduce((a,b)=>a+b,0) || 0) + p.comments.length;
  });
  const top = posts.sort((a,b)=>scores[b.id]-scores[a.id]).slice(0,5);
  const ol = document.getElementById('leaderboard-list');
  ol.innerHTML = top.map(p=>`<li><strong>${p.t}</strong> – ${scores[p.id]} pts</li>`).join('');
}

// --- Streaks ---
function bumpStreak(){
  const today = new Date().toDateString();
  const last = localStorage.getItem('lastPostDay');
  let cn = parseInt(localStorage.getItem('streak')||'0');
  if (last !== today) {
    if (new Date(today) - new Date(last) === 86400000) cn++;
    else cn = 1;
    localStorage.setItem('streak', cn);
    localStorage.setItem('lastPostDay', today);
  }
  loadStreak();
}
function loadStreak(){
  document.getElementById('streak-count').textContent = `${localStorage.getItem('streak')||0} days`;
}

// --- Initialize ---
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('clan_user')) loginUser(new Event('init'));
});
