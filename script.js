// Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    const msg = document.getElementById("signupMsg");

    if (password !== confirm) {
      msg.style.color = "red";
      msg.innerText = "Passwords do not match";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(user => user.email === email);
    if (found) {
      msg.style.color = "red";
      msg.innerText = "User already exists";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.innerText = "Signup successful";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMsg");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!validUser) {
      msg.style.color = "red";
      msg.innerText = "Invalid email or password";
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));
    msg.style.color = "green";
    msg.innerText = "Login successful";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  });
}

// Save clicked category
function saveClick(name, link) {
  let clickedCategories = JSON.parse(localStorage.getItem("clickedCategories")) || [];
  clickedCategories.push({ name, link });
  localStorage.setItem("clickedCategories", JSON.stringify(clickedCategories));
}

// Check login
function checkLogin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}