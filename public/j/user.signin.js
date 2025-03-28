function DOMContentLoaded() {
    const formSignin = document.querySelector("form");
    const tPassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    let isSubmitting = false;

    async function formSigninSubmit(event) {
        event.preventDefault();

        if (isSubmitting)
            return;

        isSubmitting = true;

        const data = {
            email: formSignin.querySelector("#email").value,
            password: password.value
        }

        var submitButton = formSignin.querySelector("button");
        submitButton.disabled = true;

        try {
            const res = await fetch("/user/api/signin", {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + document.querySelector("#token").value
                },
                body: new URLSearchParams(data)
            });

            if (res.ok)
                window.location.href = "/user/dashboard";
            else {
                const result = await res.json();
                alert(result.message);
            }

        } catch (error) {
            console.error(error);
            formSignin.reset();
            alert(error.message);
        } finally {
            submitButton.disabled = false;
            isSubmitting = false;
        }
    }
    formSignin.addEventListener("submit", formSigninSubmit);

    tPassword.addEventListener("click", function () {
        var type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    password.addEventListener("input", function () {
        tPassword.style.display = this.value ? "inline" : "none";
    });

    if (!password.value)
        tPassword.style.display = "none";
}
document.addEventListener("DOMContentLoaded", DOMContentLoaded);