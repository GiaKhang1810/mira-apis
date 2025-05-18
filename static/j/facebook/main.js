document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

const showLoading = _ => document.getElementById('loading').classList.remove('hidden');
const hideLoading = _ => document.getElementById('loading').classList.add('hidden');
const clearValue = id => document.getElementById(id).value = '';

async function getData(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(body)
    });

    return {
        status: response.status,
        body: await response.json()
    }
}

function isValidURL(url) {
    const regexPatterns = {
        watch: /^https?:\/\/(www\.)?facebook\.com\/watch\/?\?v=\w+$/,
        reel: /^https?:\/\/(www\.)?facebook\.com\/reel\/\w+\/?$/,
        story: /^https?:\/\/(www\.)?facebook\.com\/stories\/\d+\/(?:[\w=]+.*|\?source=profile_highlight)$/,
        storyLegacy: /^https?:\/\/(www\.)?facebook\.com\/story\.php\?story_fbid=\d+&id=\d+$/,
        shareWithType: /^https?:\/\/(www\.)?facebook\.com\/share\/[rpv]\/\w+\/?$/,
        shareGeneric: /^https?:\/\/(www\.)?facebook\.com\/share\/\w+\/?$/,
        video: /^https?:\/\/(www\.)?facebook\.com\/[^/]+\/videos\/\w+\/?$/,
        fbWatch: /^https?:\/\/fb\.watch\/\w+\/?$/
    }

    return Object
        .values(regexPatterns)
        .some(regex => regex.test(decodeURIComponent(url)));
}

async function downloadFacebook() {
    let url = document.getElementById('fbUrl').value.trim();
    const previewContainer = document.getElementById('fbPreview');
    if (!url) {
        previewContainer.innerHTML = `<p style="color:red; text-align:center;">Please enter a Facebook video URL</p>`;
        return;
    }

    if (!isValidURL(url)) {
        previewContainer.innerHTML = `<p style="color:red; text-align:center;">Please enter a valid Facebook video URL</p>`;
        clearValue('fbUrl');
        return;
    }

    showLoading();

    try {
        let data;

        if (/^https:\/\/www\.facebook\.com\/share\/(p\/|r\/|v\/)?[\w\d]+\/?$/.test(url)) {
            const response = await getData('/facebook/api/get-redirect-url', { url });

            if (response.status !== 200)
                throw new Error('Can\'t process request');

            url = response.body.redirectURL;
        }

        if (/(?:\/story\.php\?story_fbid=\d+&id=\d+|\/stories\/\d+(?:\/[\w=]+|\?source=profile_highlight)?)/.test(url)) {
            const response = await getData('/facebook/api/download-story', { url });

            if (response.status !== 200)
                throw new Error('Can\'t process request');

            data = {
                author: response.body.name,
                url: response.body.download_url.url_hd
            }
        } else {
            const response = await getData('/facebook/api/download-watch-and-reel', { url });

            if (response.status !== 200)
                throw new Error('Can\'t process request');

            data = {
                author: response.body.author,
                url: response.body.url
            }
        }

        previewContainer.innerHTML = `
            <video controls>
                <source src="${data.url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p>Author: ${data.author}</p>
            <div class="download-options">
                <a href="${data.url}" download="${data.url}" class="download-btn">
                    <i class="fas fa-download"></i> Download Video
                </a>
            </div>
        `;
    } catch (error) {
        previewContainer.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
    } finally {
        clearValue('fbUrl');
        hideLoading();
    }
}