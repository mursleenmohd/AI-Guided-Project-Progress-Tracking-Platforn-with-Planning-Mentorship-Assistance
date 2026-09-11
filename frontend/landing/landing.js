function openAuthModal(type) {
    document.getElementById("auth-modal").classList.remove("hidden");
    switchTab(type);
}

function closeAuthModal() {
    document.getElementById("auth-modal").classList.add("hidden");
}

function switchTab(type) {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const tabLogin = document.getElementById("tab-login");
    const tabSignup = document.getElementById("tab-signup");

    if (type === 'login') {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        tabLogin.classList.add("active");
        tabSignup.classList.remove("active");
    } else {
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        tabSignup.classList.add("active");
        tabLogin.classList.remove("active");
    }
}
async function handleAuth(event, type) {
    event.preventDefault();

    const BASE_URL = "http://127.0.0.1:8000/api/v1/auth";

    if (type === 'login') {
        const emailVal = document.getElementById("login-email").value.trim();
        const passwordVal = document.getElementById("login-password").value.trim();

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailVal,
                    password: passwordVal
                })
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.detail || "Invalid Email or Password!");
                return;
            }
            localStorage.setItem("aapm_user", JSON.stringify(data.user));
            alert("Login Successful!");
            window.location.href = "../index.html";

        } catch (error) {
            console.error("Login Error:", error);
            alert("The Backend Server has not started.");
        }

    } else if (type === 'signup') {
        const usernameVal = document.getElementById("signup-username").value.trim();
        const emailVal = document.getElementById("signup-email").value.trim();
        const passwordVal = document.getElementById("signup-password").value.trim();

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameVal,
                    email: emailVal,
                    password: passwordVal
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.detail || "Signup failed!");
                return;
            }

            alert("Account created successfully! Please sign in.");
            switchTab('login'); 

        } catch (error) {
            console.error("Signup Error:", error);
            alert("The Backend server is not responsing.");
        }
    }
}