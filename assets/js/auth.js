localStorage.setItem("state", "login");
async function login() {
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  if (email === "" || password === "") {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = "Please fill out all fields";
    return;
  }

  const submitBtn = document.getElementById("submitBtn");

  submitBtn.innerHTML = "Loading...";

  console.log(email, password);
  const response = await fetch(
    "https://coral-llama-coat.cyclic.app/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );
  const data = await response.json();
  submitBtn.innerHTML = "Login";
  if (data.success === false) {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = data.msg;
    return;
  }

  window.location = "/protectedRoute.html";
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  if (email === "" || password === "" || username === "") {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = "Please fill out all fields";
    return;
  }

  const submitBtn = document.getElementById("signUpBtn");

  submitBtn.innerHTML = "Loading...";

  const response = await fetch(
    "https://coral-llama-coat.cyclic.app/api/auth/sign-up",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        username
      })
    }
  );
  const data = await response.json();

  submitBtn.innerHTML = "Sign Up";
  if (data.success === false) {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = data.msg;
    return;
  }

  window.location = "/";
}

function changeState(state) {
  const currentStoredState = localStorage.getItem("state");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signUpForm");
  const formHeading = document.getElementById("formHeading");

  if (state === "login") {
    localStorage.setItem("state", "signup");
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    formHeading.innerHTML = "Sign Up";
    return;
  } else if (state === "signup") {
    localStorage.setItem("state", "login");
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formHeading.innerHTML = "Login";
    return;
  }
}
