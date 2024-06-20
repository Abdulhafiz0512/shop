import { redirect, checkToken, saveToken } from "./utils.js";

const form = document.forms[0];
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Immediately check if token exists and redirect if true
(function() {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html");
  }
})();

form.onsubmit = async function(event) {
  event.preventDefault(); // Prevent form submission and page reload

  try {
    const token = await login();
    saveToken(token);
    redirect("/index.html");
  } catch (error) {
    console.log(error);
    // Handle error, e.g., show error message to the user
  }
};

async function login() {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw error to be caught in the form submission handler
  }
}
