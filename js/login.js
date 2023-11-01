let usernameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
let loginBtn = document.querySelector("#login-btn");

let storedUsername = localStorage.getItem("username");
let storedPassword = localStorage.getItem("password");

loginBtn.addEventListener("click", login);
  
  function login(e) {
    e.preventDefault();

  let enteredUsername = usernameInput.value.trim();
  let enteredPassword = passwordInput.value;

  if (enteredUsername === "" || enteredPassword === "") {
    alert("Please fill in all the fields");
  } else {
    if (
      storedUsername &&
      storedUsername === enteredUsername &&
      storedPassword &&
      storedPassword === enteredPassword
    ) {
      window.location.href = "index.html";
    } else {
      alert("Invalid username or password");
    }
  }
};
