function DOMContentLoaded() {
    let isSubmitting = false;
    const formDownloader = document.querySelector("form");
    const resultContainer = document.querySelector(".result-container");
    const fetchBtn = document.querySelector("#fetchBtn");

    function isValidURL(url) {
        const regexPatterns = {
            watch: /^https?:\/\/(www\.)?facebook\.com\/watch\/?\?v=\w+$/,
            reel: /^https?:\/\/(www\.)?facebook\.com\/reel\/\w+\/?$/,
            story: /^https?:\/\/(www\.)?facebook\.com\/stories\/\d+\/(?:[\w=]+.*|\?source=profile_highlight)$/,
            storyLegacy: /^https?:\/\/(www\.)?facebook\.com\/story\.php\?story_fbid=\d+&id=\d+$/,
            share: /^https?:\/\/(www\.)?facebook\.com\/share\/\w+\/?$/,
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
                const res = await fetch("/facebook/get-redirect", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
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
                apiURL = "/facebook/story";
            else
                apiURL = "/facebook/watch";

            const res = await fetch(apiURL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                },
                body: new URLSearchParams({ url: facebookURL })
            });

            if (!res.ok)
                throw new Error("Can't process request");

            const result = await res.json();

            resultContainer.innerHTML = `
                <div class="video-result">
                    <div class="thumbnail">
                        <img src="${isStory ? result.images.thumbnail : result.thumbnails[0].uri}" alt="Thumbnail">
                        <div class="author">${isStory ? result.name : result.author}</div>
                    </div>
                    <div class="video-info">
                        <h2 class="title">${isStory ? "Story" : result.desc}</h2>
                        <div class="download-buttons">
                            <a href="${isStory ? result.url.hd : result.url}" class="download-btn" download>
                                <i class="fas fa-download"></i> Download HD
                            </a>
                            <a href="${isStory ? result.url.sd : result.url}" class="download-btn" download>
                                <i class="fas fa-download"></i> Download SD
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error(error);
            resultContainer.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        } finally {
            fetchBtn.disabled = false;
            fetchBtn.innerHTML = "<i class=\"fas fa-download\"></i> Fetch Video";
            isSubmitting = false;
        }
    }

    formDownloader.addEventListener("submit", formDownloaderScript);
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded);