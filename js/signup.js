async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;

  const response = await fetch("http://localhost:8000/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      username,
      name
    })
  });
  const data = await response.json();
  if (data.success === false) {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = data.msg;
    return;
  }

  window.location = "/login.html";
}
