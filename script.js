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
      } else {
        alert("Invalid credentials. Try 'admin' for both fields.");
      }
    }

    function submitPost(event) {
      event.preventDefault();
      if (!isAuthenticated) return;

      const title = document.getElementById("post-title").value;
      const content = document.getElementById("post-content").value;
      const blogPosts = document.getElementById("blog-posts");

      const postDiv = document.createElement("div");
      postDiv.className = "blog-post";
      postDiv.innerHTML = `
        <h3>${title}</h3>
        <p><small>Published ${new Date().toLocaleDateString()}</small></p>
        <p>${content}</p>
        <button class="like-button" onclick="likePost(this)">👍 Like (0)</button>
        <div class="comments">
          <strong>Comments:</strong>
          <div class="comment-list"></div>
          <form onsubmit="return addComment(event, this)">
            <input type="text" placeholder="Add a comment..." required />
            <button type="submit">Comment</button>
          </form>
        </div>
      `;
      blogPosts.prepend(postDiv);

      document.getElementById("post-title").value = "";
      document.getElementById("post-content").value = "";
    }

    function likePost(button) {
      let count = parseInt(button.textContent.match(/\d+/)[0]);
      count++;
      button.innerHTML = `👍 Like (${count})`;
    }

    function addEvent() {
      const title = document.getElementById('event-title').value;
      const date = document.getElementById('event-date').value;
      const time = document.getElementById('event-time').value;
      if (title && date && time) {
        const eventList = document.getElementById('event-list');
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.innerHTML = `<h3>${title}</h3><p>${date} at ${time}</p><button onclick="this.parentElement.remove()">Delete</button>`;
        eventList.appendChild(eventDiv);
        document.getElementById('event-title').value = '';
        document.getElementById('event-date').value = '';
        document.getElementById('event-time').value = '';
      }
    }

    function addComment(event, form) {
      event.preventDefault();
      const input = form.querySelector("input");
      const commentList = form.parentElement.querySelector(".comment-list");
      const comment = document.createElement("p");
      comment.innerHTML = `<strong>You:</strong> ${input.value}`;
      commentList.appendChild(comment);
      input.value = "";
    }

     const mediaItems = [
    { src: "sermon-photo.jpg", alt: "Worship Moment" },
    { src: "youth-camp.jpg", alt: "Youth Camp 2024" },
    { src: "baptism-day.jpg", alt: "Baptism Day" },
    { src: "revival-night.jpg", alt: "Revival Night" }
  ];

  function loadMediaGallery() {
    const gallery = document.getElementById("media-gallery");
    mediaItems.forEach(item => {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      gallery.appendChild(img);
    });
  }

  loadMediaGallery();
