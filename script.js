let isAuthenticated = false;
let role = null;

document.getElementById("blogForm").addEventListener("submit", submitPost);
document.getElementById("eventForm").addEventListener("submit", addEvent);
document.getElementById("profileForm").addEventListener("submit", saveProfile);

let posts = JSON.parse(localStorage.getItem("clan_posts")) || [];
let events = JSON.parse(localStorage.getItem("clan_events")) || [];
let profiles = JSON.parse(localStorage.getItem("clan_profiles")) || [];

function loginUser(e) {
  if (e && e.preventDefault) e.preventDefault();

  const userInput = document.getElementById('username');
  const user = localStorage.getItem('clan_user') || userInput?.value?.trim();

  if (!user) return;

  isAuthenticated = true;
  role = user === 'david' ? 'admin' : 'user';
  localStorage.setItem('clan_user', user);
  localStorage.setItem('clan_role', role);

  document.querySelectorAll('.disabled').forEach(x => x.classList.remove('disabled'));
  document.querySelectorAll('#blogForm input, #blogForm textarea, #blogForm button, #eventForm input, #eventForm button, #profileForm input, #profileForm textarea, #profileForm button')
    .forEach(el => el.disabled = false);

  if (role !== 'admin') {
    document.querySelectorAll('#eventForm input, #eventForm button').forEach(el => el.disabled = true);
  }

  loadState();
}

function submitPost(e) {
  e.preventDefault();
  const t = document.getElementById("post-title").value.trim();
  const c = document.getElementById("post-content").value.trim();

  if (!t || !c) return alert("Title and content are required");

  const post = {
    id: Date.now(),
    t,
    c,
    likes: 0,
    comments: [],
    date: Date.now()
  };

  posts.unshift(post);
  localStorage.setItem("clan_posts", JSON.stringify(posts));
  renderPosts();
  updateLeaderboard();
  document.getElementById("blogForm").reset();
  bumpStreak();
}


function addEvent(e) {
  e.preventDefault();

  const name = document.getElementById("event-name").value.trim();
  const date = document.getElementById("event-date").value;
  const time = document.getElementById("event-time").value;  // new time input
  const location = document.getElementById("event-location").value.trim();
  const mediaInput = document.getElementById("event-media"); // file input for image/video

  if (!name || !date || !time || !location) {
    return alert("Please fill all event fields including time");
  }

  // Read the media file (image/video) as a data URL for storage
  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      // Create event object with media as data URL string
      const eventObj = {
        id: Date.now(),
        name,
        date,
        time,
        location,
        media: event.target.result // base64 string
      };
      events.unshift(eventObj);
      localStorage.setItem("clan_events", JSON.stringify(events));
      renderEvents();
      document.getElementById("eventForm").reset();
    };
    reader.readAsDataURL(file);
  } else {
    // No media provided
    const eventObj = { id: Date.now(), name, date, time, location, media: null };
    events.unshift(eventObj);
    localStorage.setItem("clan_events", JSON.stringify(events));
    renderEvents();
    document.getElementById("eventForm").reset();
  }
}

function saveProfile(e) {
  e.preventDefault();

  const name = document.getElementById("profile-name").value.trim();
  const bio = document.getElementById("profile-bio").value.trim();
  const picInput = document.getElementById("profile-picture");

  if (!name) return alert("Name is required for profile");

  function saveProfileData(pictureData) {
    const profileObj = {
      id: Date.now(),
      name,
      bio,
      picture: pictureData || null,
    };
    profiles.unshift(profileObj);
    localStorage.setItem("clan_profiles", JSON.stringify(profiles));
    renderProfiles();
    document.getElementById("profileForm").reset();
  }

  if (picInput.files.length > 0) {
    const file = picInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      // Save profile after image is loaded
      saveProfileData(event.target.result);
    };
    reader.onerror = function() {
      alert("Failed to read image file");
      saveProfileData(null);
    }
    reader.readAsDataURL(file);
  } else {
    // No image selected, save profile directly
    saveProfileData(null);
  }
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes++;
    localStorage.setItem("clan_posts", JSON.stringify(posts));
    renderPosts();
    updateLeaderboard();
  }
}

function addComment(id) {
  const commentInput = document.getElementById(`comment-input-${id}`);
  const commentText = commentInput.value.trim();
  if (!commentText) return;

  const post = posts.find(p => p.id === id);
  if (post) {
    post.comments.push({
      id: Date.now(),
      text: commentText,
      date: Date.now()
    });
    localStorage.setItem("clan_posts", JSON.stringify(posts));
    renderPosts();
    commentInput.value = "";
  }
}

function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem("clan_posts", JSON.stringify(posts));
  renderPosts();
  updateLeaderboard();
}

function deleteEvent(id) {
  events = events.filter(e => e.id !== id);
  localStorage.setItem("clan_events", JSON.stringify(events));
  renderEvents();
}

function deleteProfile(id) {
  profiles = profiles.filter(p => p.id !== id);
  localStorage.setItem("clan_profiles", JSON.stringify(profiles));
  renderProfiles();
}

function renderPosts() {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    // Render comments
    const commentsHtml = post.comments.map(c => 
      `<div class="comment"><small>${new Date(c.date).toLocaleString()}</small><p>${escapeHtml(c.text)}</p></div>`
    ).join("");

    div.innerHTML = `
      <h3>${escapeHtml(post.t)}</h3>
      <p>${escapeHtml(post.c)}</p>
      <small>${new Date(post.date).toLocaleString()}</small>
      <div>
        <button onclick="likePost(${post.id})">👍 Like (${post.likes})</button>
        <button onclick="deletePost(${post.id})">🗑️ Delete</button>
      </div>
      <div class="comments-section">
        <h4>Comments</h4>
        <div id="comments-${post.id}">${commentsHtml || "<p>No comments yet</p>"}</div>
        <input type="text" id="comment-input-${post.id}" placeholder="Write a comment..." />
        <button onclick="addComment(${post.id})">Add Comment</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderEvents() {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";
  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "event";

    let mediaHtml = "";
    if (event.media) {
      if (event.media.startsWith("data:image")) {
        mediaHtml = `<img src="${event.media}" alt="Event Image" style="max-width: 200px; max-height: 150px;" />`;
      } else if (event.media.startsWith("data:video")) {
        mediaHtml = `<video controls style="max-width: 200px; max-height: 150px;">
                       <source src="${event.media}" type="video/mp4" />
                     Your browser does not support the video tag.
                     </video>`;
      }
    }

    div.innerHTML = `
      <h4>${escapeHtml(event.name)}</h4>
      <p>${escapeHtml(event.date)} ${escapeHtml(event.time)} at ${escapeHtml(event.location)}</p>
      ${mediaHtml}
      <button onclick="deleteEvent(${event.id})">🗑️ Delete</button>
    `;
    container.appendChild(div);
  });
}

function renderProfiles() {
  const container = document.getElementById("profilesContainer");
  container.innerHTML = "";
  profiles.forEach(profile => {
    const div = document.createElement("div");
    div.className = "profile";

    let picHtml = "";
    if (profile.picture) {
      picHtml = `<img src="${profile.picture}" alt="Profile Picture" style="max-width: 150px; max-height: 150px; border-radius: 50%;" />`;
    }

    div.innerHTML = `
      ${picHtml}
      <h4>${escapeHtml(profile.name)}</h4>
      <p>${escapeHtml(profile.bio)}</p>
      <button onclick="deleteProfile(${profile.id})">🗑️ Delete</button>
    `;
    container.appendChild(div);
  });
}

function updateLeaderboard() {
  // Leaderboard is based on top posts by likes
  const leaderboard = document.getElementById("leaderboard-list");
  leaderboard.innerHTML = "";

  if (posts.length === 0) {
    leaderboard.innerHTML = "<li>No posts yet</li>";
    return;
  }

  // Sort posts descending by likes
  const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);

  sortedPosts.forEach(post => {
    const li = document.createElement("li");
    li.textContent = `${post.t} - ${post.likes} likes`;
    leaderboard.appendChild(li);
  });
}

function bumpStreak() {
  const streak = parseInt(localStorage.getItem("clan_streak") || "0", 10);
  localStorage.setItem("clan_streak", streak + 1);
  document.getElementById("streak-count").textContent = `${streak + 1} days`;
}

function loadState() {
  renderPosts();
  renderEvents();
  renderProfiles();
  updateLeaderboard();

  const streak = parseInt(localStorage.getItem("clan_streak") || "0", 10);
  document.getElementById("streak-count").textContent = `${streak} days`;
}

window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem('clan_user');
  const savedRole = localStorage.getItem('clan_role');
  if (savedUser && savedRole) {
    isAuthenticated = true;
    role = savedRole;
    loadState();
    document.querySelectorAll('.disabled').forEach(x => x.classList.remove('disabled'));
    document.querySelectorAll('#blogForm input, #blogForm textarea, #blogForm button, #eventForm input, #eventForm button, #profileForm input, #profileForm textarea, #profileForm button')
      .forEach(el => el.disabled = false);

    if (role !== 'admin') {
      document.querySelectorAll('#eventForm input, #eventForm button').forEach(el => el.disabled = true);
    }
  }
});

// Utility to escape HTML to avoid XSS
function escapeHtml(text) {
  if (!text) return "";
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}
