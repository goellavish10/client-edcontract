async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  if (data.success === false) {
    document.getElementById("error").classList.remove("hidden");
    document.getElementById("error").innerHTML = data.msg;
    return;
  }

  window.location = "/protectedRoute.html";
}
