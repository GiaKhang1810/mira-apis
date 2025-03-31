function OnClickLiID(id) {
    let path;

    switch (id) {
        case "home":
            path = "/";
            break;
        case "docs":
            path = "/facebook/docs";
            break;
        case "post-dl":
            path = "/facebook/post";
            break;
        case "info":
            path = "/facebook/info";
            break;
        case "video-dl":
            path = "/facebook/main";
            break;
    }

    window.location.href = path;
}

function DOMContentLoaded() {
    let isSubmitting = false;
    const formDownloader = document.querySelector("form");
    const resultContainer = document.querySelector(".result-container");
    const fetchBtn = document.querySelector("#fetchBtn");
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");

    const menuClick = _ => sidebar.classList.toggle("active");

    const getUsername = url => {
        const match = url.match(/^https?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_.]+)\/?$/);
        return match ? match[1] : null;
    }

    async function formDownloaderScript(event) {
        event.preventDefault();

        if (isSubmitting)
            return;

        const facebook = formDownloader.querySelector("#facebook");
        let facebookURL = facebook.value.trim();
        const name = getUsername(facebookURL);

        if (name)
            facebookURL = name;
        else if (/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}([\/?#].*)?$/.test(facebookURL)) {
            alert("Please enter a valid URL!");
            return;
        }

        isSubmitting = true;
        fetchBtn.disabled = true;
        fetchBtn.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Fetching...";

        try {
            const res = await fetch("/facebook/api/findid", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + document.querySelector("#token").value
                },
                body: new URLSearchParams({ username: facebookURL })
            });

            if (!res.ok)
                throw new Error("Can't process request");

            const result = await res.json();

            facebook.value = result.id;
        } catch (error) {
            console.error(error);
            resultContainer.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        } finally {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = "<i class=\"fas fa-download\"></i> Fetch ID";
            isSubmitting = false;
        }
    }

    menuBtn.addEventListener("click", menuClick);
    formDownloader.addEventListener("submit", formDownloaderScript);
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);