function DOMContentLoaded() {
    const formSignup = document.querySelector("form");
    const tPassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    const email = document.querySelector("#email");
    const sendCode = document.querySelector("#sendCode");
    const verifyCode = document.querySelector("#verifyCode");
    let isSubmitting = false;
    let isClicking = false;
    let step = 1;
    let timer = null;

    async function formSignupSubmit(event) {
        event.preventDefault();

        if (isSubmitting) 
            return;

        isSubmitting = true;

        if (step === 1) {
            alert("Please get verification code");
            isSubmitting = false;
            return;
        }

        const data = {
            email: email.value,
            password: password.value,
            verifyCode: verifyCode.value
        }

        try {
            const response = await fetch("/user/api/signup", {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
                body: new URLSearchParams(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Sign up successful!");
                window.location.href = "/user/signin";
            } else
                alert(result.message);
        } catch (error) {
            console.error(error);
            alert("An error occurred, please try again!");
        } finally {
            isSubmitting = false;
        }
    }
    formSignup.addEventListener("submit", formSignupSubmit);

    async function sendVerifyCode(event) {
        event.preventDefault();

        if (isClicking) 
            return;

        if (!email.value) {
            alert("Please enter your email first!");
            return;
        }

        isClicking = true;
        sendCode.disabled = true;
        sendCode.textContent = "120";
        let timeLeft = 120;

        try {
            const response = await fetch("/user/api/verify-mail", {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                },
                body: new URLSearchParams({ email: email.value })
            });

            const result = await response.json();
            if (response.ok) {
                alert("Verification code sent to your email!");
                step = 2;
            } else {
                alert(result.message);
                resetSendButton();
                return;
            }
        } catch (error) {
            alert("An error occurred, please try again!");
            resetSendButton();
            return;
        }

        timer = setInterval(() => {
            timeLeft--
            sendCode.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                resetSendButton();
            }
        }, 1000);
    }

    function resetSendButton() {
        isClicking = false;
        sendCode.disabled = false;
        sendCode.textContent = "Send";
    }

    sendCode.addEventListener("click", sendVerifyCode);

    tPassword.addEventListener("click", function () {
        var type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    password.addEventListener("input", function () {
        tPassword.style.display = this.value ? "inline" : "none";
    });

    email.addEventListener("input", function () {
        sendCode.style.display = this.value ? "inline" : "none";
    });

    if (!password.value) 
        tPassword.style.display = "none";
    if (!email.value) 
        sendCode.style.display = "none";
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded)