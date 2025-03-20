function DOMContentLoaded() {
    const formSignup = document.querySelector("form");
    const togglePassword = document.querySelector("#togglePassword");
    const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");
    let isSubmitting = false;

    async function formSignupSubmit(event) {
        event.preventDefault();

        if (isSubmitting)
            return;

        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match");
            return;
        }

        isSubmitting = true;
        const formData = new URLSearchParams();
        formData.append("email", formSignup.querySelector("#email").value);
        formData.append("password", password.value);

        var submitButton = formSignup.querySelector("button");
        submitButton.disabled = true;

        try {
            const res = await fetch("/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData
            });

            if (!res.ok) {
                const result = await res.json();
                alert(result.message);
                isSubmitting = false;
                submitButton.disabled = false;
                return;
            }

            const resSignin = await fetch("/user/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData
            });

            if (resSignin.ok)
                window.location.href = "/user/dashboard";
            else {
                const result = await res.json();
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            formSignup.reset();
            alert(error.message);
        } finally {
            submitButton.disabled = false;
            isSubmitting = false;
        }
    }
    formSignup.addEventListener("submit", formSignupSubmit);

    togglePassword.addEventListener("click", function (e) {
        var type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    toggleConfirmPassword.addEventListener("click", function (e) {
        var type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
        confirmPassword.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    password.addEventListener("input", function () {
        togglePassword.style.display = this.value ? "inline" : "none"
    });
    confirmPassword.addEventListener("input", function () {
        toggleConfirmPassword.style.display = this.value ? "inline" : "none"
    });

    if (!confirmPassword.value)
        toggleConfirmPassword.style.display = "none";

    if (!password.value)
        togglePassword.style.display = "none";
}
document.addEventListener("DOMContentLoaded", DOMContentLoaded);