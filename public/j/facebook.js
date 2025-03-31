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
        case "get-user":
            path = "/facebook/info";
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

    function isValidURL(url) {
        const regexPatterns = {
            watch: /^https?:\/\/(www\.)?facebook\.com\/watch\/?\?v=\w+$/,
            reel: /^https?:\/\/(www\.)?facebook\.com\/reel\/\w+\/?$/,
            story: /^https?:\/\/(www\.)?facebook\.com\/stories\/\d+\/(?:[\w=]+.*|\?source=profile_highlight)$/,
            storyLegacy: /^https?:\/\/(www\.)?facebook\.com\/story\.php\?story_fbid=\d+&id=\d+$/,
            share: /^https?:\/\/(www\.)?facebook\.com\/share(?:\/[rpv]\/\w+)?\/?$/,
            video: /^https?:\/\/(www\.)?facebook\.com\/[^/]+\/videos\/\w+\/?$/,
            fbWatch: /^https?:\/\/fb\.watch\/\w+\/?$/
        }

        return Object
            .values(regexPatterns)
            .some(regex => regex.test(decodeURIComponent(url)));
    }

    async function formDownloaderScript(event) {
        event.preventDefault();

        if (isSubmitting)
            return;

        const facebook = formDownloader.querySelector("#facebook");
        let facebookURL = facebook.value.trim();

        if (!facebookURL || !isValidURL(facebookURL)) {
            alert("Vui lòng nhập URL hợp lệ!");
            return;
        }

        isSubmitting = true;
        fetchBtn.disabled = true;
        fetchBtn.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> Fetching...";
        resultContainer.innerHTML = "<p style=\"text-align:center;\">Đang xử lý, vui lòng đợi...</p>";

        try {
            if (/facebook\.com\/share\//.test(facebookURL)) {
                const res = await fetch("/facebook/api/get-redirect", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + document.querySelector("#token").value
                    },
                    body: new URLSearchParams({ url: facebookURL })
                });

                if (!res.ok)
                    throw new Error("Can't process request");

                const result = await res.json();
                facebookURL = result.url;
            }

            let apiURL;
            const isStory = /(?:\/story\.php\?story_fbid=\d+&id=\d+|\/stories\/\d+(?:\/[\w=]+|\?source=profile_highlight)?)/.test(facebookURL);

            if (isStory)
                apiURL = "/facebook/api/story";
            else
                apiURL = "/facebook/api/watch";

            const res = await fetch(apiURL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + document.querySelector("#token").value
                },
                body: new URLSearchParams({ url: facebookURL })
            });

            if (!res.ok)
                throw new Error("Can't process request");

            const result = await res.json();

            resultContainer.innerHTML = `<div class="video-result"><div class="thumbnail"><img src="${isStory ? result.images.thumbnail : result.thumbnails[0].uri}" alt="${isStory ? result.name : result.author}"><div class="author">${isStory ? result.name : result.author}</div></div><div class="video-info"><h2 class="title">${isStory ? "Story" : "Watch"}</h2><div class="download-buttons"><a href="${isStory ? result.url.hd : result.url}" class="download-btn" download><i class="fas fa-download"></i> Download HD</a><a href="${isStory ? result.url.sd : result.url}" class="download-btn" download><i class="fas fa-download"></i> Download SD</a>` + (result.other_url ? `<a href="${result.other_url.find(item => item.height === 1280 && item.width === 720).base_url}" class="download-btn" download><i class="fas fa-download"></i> Download Without Sound</a><a href="${result.other_url.find(item => item.mime_type === "audio/mp4").base_url}" class="download-btn" download><i class="fas fa-download"></i> Download Audio</a>` : ``) + `</div></div></div>`;
        } catch (error) {
            console.error(error);
            resultContainer.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        } finally {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = "<i class=\"fas fa-download\"></i> Fetch Video";
            isSubmitting = false;
        }
    }

    menuBtn.addEventListener("click", menuClick);
    formDownloader.addEventListener("submit", formDownloaderScript);
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);