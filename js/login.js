document.addEventListener("DOMContentLoaded", function () {
    
    var token = localStorage.getItem("token");

    
    if (token) {
        showAdminPage();
    } else {
        
        var loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); 

            
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            
            checkAndStoreToken(username, password);
        });
    }
});


function redirectToLoginPage() {
    window.location.href = "https://fakestoreapi.com/auth/login";
}


function showAdminPage() {
    
}


function checkAndStoreToken(username, password) {
    
    fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.token) {
            localStorage.setItem("token", data.token);
            
            window.location.href = "admin.html";
        } else {
            
            alert("Login muvaffaqiyatsiz! Iltimos, to'g'ri ma'lumotlarni kiriting.");
        }
    })
    .catch(error => {
        console.error("Xatolik yuz berdi:", error);
        
        alert("Serverga ulanishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    });
}
