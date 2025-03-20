function DOMContentLoaded() {
  var formLogin = document.querySelector("form");
  var togglePassword = document.querySelector("#togglePassword");
  var password = document.querySelector("#password");
  var isSubmitting = false;

  async function formLoginSubmit(event) {
    event.preventDefault();

    if (isSubmitting)
      return;

    isSubmitting = true;

    const formData = new URLSearchParams();
    formData.append("email", formLogin.querySelector("#email").value);
    formData.append("password", password.value);
    formData.append("remember", formLogin.querySelector("#remember").checked ? "true" : "false");

    var submitButton = formLogin.querySelector("button");
    submitButton.disabled = true;

    try {
      const res = await fetch("/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData
      });

      const result = await res.json();
      console.log(result);

      if (res.ok)
        window.location.href = "/user/dashboard";
      else
        alert(result.message);

    } catch (error) {
      console.error(error);
      formLogin.reset();
      alert(error.message);
    } finally {
      submitButton.disabled = false;
      isSubmitting = false;
    }
  }
  formLogin.addEventListener("submit", formLoginSubmit);

  togglePassword.addEventListener("click", function (e) {
    var type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });

  password.addEventListener("input", function () {
    if (this.value) {
      togglePassword.style.display = "inline";
    } else {
      togglePassword.style.display = "none";
    }
  });

  if (!password.value) {
    togglePassword.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", DOMContentLoaded);