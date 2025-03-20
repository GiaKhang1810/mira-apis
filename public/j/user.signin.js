function DOMContentLoaded() {
  var formSignin = document.querySelector("form");
  var togglePassword = document.querySelector("#togglePassword");
  var password = document.querySelector("#password");
  var isSubmitting = false;

  async function formSigninSubmit(event) {
    event.preventDefault();

    if (isSubmitting)
      return;

    isSubmitting = true;

    const formData = new URLSearchParams();
    formData.append("email", formSignin.querySelector("#email").value);
    formData.append("password", password.value);
    formData.append("remember", formSignin.querySelector("#remember").checked ? "true" : "false");

    var submitButton = formSignin.querySelector("button");
    submitButton.disabled = true;

    try {
      const res = await fetch("/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData
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

  togglePassword.addEventListener("click", function (e) {
    var type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });

  password.addEventListener("input", function () {
    togglePassword.style.display = this.value ? "inline" : "none"
  });

  if (!password.value) {
    togglePassword.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", DOMContentLoaded);