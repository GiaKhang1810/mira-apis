const body = document.body;
const lightModeBtn = document.querySelector('.light-mode-btn');
const darkModeBtn = document.querySelector('.dark-mode-btn');

function applyTheme(theme) {
    body.classList.toggle('theme-dark', theme === 'dark');
    body.classList.toggle('theme-light', theme === 'light');
    darkModeBtn.classList.toggle('active', theme === 'dark');
    lightModeBtn.classList.toggle('active', theme === 'light');
    localStorage.setItem('theme', theme);
}

lightModeBtn.onclick = () => applyTheme('light');
darkModeBtn.onclick = () => applyTheme('dark');

const theme = localStorage.getItem('theme');
if (theme)
    applyTheme(theme);
else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches)
    applyTheme('dark');
else
    applyTheme('light');

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isValidFacebookURL(url) {
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

function isValidInstagramURL(igURL) {
    const tags = ['p', 'reel', 'reels', 'tv'];
    const url = new URL(igURL);
    const parts = url.pathname.split('/').filter(Boolean);
    return url.hostname.endsWith('instagram.com') && parts.length >= 2 && tags.includes(parts[0]);
}

function getDomain(url) {
    const parser = new URL(url);
    return parser.hostname.split('.').filter(Boolean)[1];
}

function showError(message) {
    alertBox.querySelector('span.block').textContent = message;
    alertBox.classList.remove('hidden');
}

function hideError() {
    if (!alertBox.classList.contains('hidden'))
        alertBox.classList.add('hidden');
}

const inputMedia = document.getElementById('media-url');
const downloadBtn = document.getElementById('download-btn');
const resultContainer = document.getElementById('result-container');
const mediaPreviewContainer = document.getElementById('media-preview-container');
const title = document.getElementById('media-title');
const info = document.getElementById('media-info');
const alertBox = document.getElementById('alertBox');

async function fetchData(url, input) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ url: input })
    });

    if (response.status !== 200)
        throw new Error('Server cannot process the request. Please try again later.');

    return await response.json();
}

function createPreviewElement(type, src, id) {
    const item = document.createElement('div');
    item.className = 'media-item';
    const media = document.createElement(type);
    media.src = '/api/get-media-from-shortcode?shortcode=' + src;

    if (type === 'video' || type === 'audio') {
        media.controls = true;
        media.autoplay = true;
        media.loop = true;
        media.muted = true;
    }
    media.className = 'rounded-lg';

    if (id)
        media.id = id;

    const button = document.createElement('button');
    button.className = 'download-hover-btn';
    button.textContent = '⬇ Download';
    button.onclick = async () => {
        const res = await fetch(media.src);
        const blob = await res.blob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const disposition = res.headers.get('Content-Disposition');
        link.download = disposition.match(/filename="([^"]+)"/)?.[1]|| '';
        link.click();
        URL.revokeObjectURL(url);
    }
    
    item.appendChild(media);
    item.appendChild(button);

    return item;
}

function createMediaPreview(domain, data) {
    mediaPreviewContainer.innerHTML = '';

    if (domain === 'tiktok') {
        title.textContent = data.caption;
        info.textContent = `Posted by ${data.owner.nickname} on ${new Date(data.createAt * 1000).toLocaleDateString()}`;

        if (data.image && data.image.list.length > 1) {
            const grid = document.createElement('div');
            grid.className = 'media-grid';

            data.image.list.forEach(function (res, index) {
                const item = createPreviewElement('img', res.display.uri.split('/').pop(), 'media-image-' + index);
                grid.appendChild(item);
            });

            mediaPreviewContainer.appendChild(grid);
            return;
        }

        const type = data.image && data.image.list.length === 1 ? 'img' : data.video ? 'video' : 'audio';
        const src = (type === 'img' ? data.image.list[0].display.uri : type === 'video' ? data.video.withoutWatermark.uri : '/' + data.audio.id).split('/').pop();
        const item = createPreviewElement(type, src);
        mediaPreviewContainer.appendChild(item);

        return;
    }

    if (domain === 'facebook') {
        let item;
        title.textContent = 'No title available';
        if (data.download_url) {
            info.textContent = `Posted by ${data.name} on ${new Date(data.publishedAt * 1000).toLocaleDateString()}`;
            item = createPreviewElement('video', data.userID);
        } else {
            info.textContent = `Posted by ${data.author} on ${new Date(data.publishedAt.replace(/(\+0000)$/, 'Z')).toLocaleDateString()}`;
            item = createPreviewElement('video', data.videoID);
        }

        mediaPreviewContainer.appendChild(item);
        return;
    }

    if (domain === 'instagram') {
        title.textContent = data.caption;
        info.textContent = 'Posted by ' + data.owner.name;

        if (data.isVideo) {
            const item = createPreviewElement('video', data.shortcode);
            mediaPreviewContainer.appendChild(item);
            return;
        }

        if (data.images && data.images.length === 1) {
            const item = createPreviewElement('img', data.images[0].shortcode, 'media-image-0');
            mediaPreviewContainer.appendChild(item);
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        data.images.forEach(function (res, index) {
            const item = createPreviewElement('img', res.shortcode, 'media-image-' + index);
            grid.appendChild(item);
        });

        mediaPreviewContainer.appendChild(grid);
        return;
    }
}

downloadBtn.addEventListener('click', async function () {
    hideError();

    let inputURL = inputMedia.value.trim();

    if (!inputURL)
        return;

    try {
        downloadBtn.innerHTML = '<span class="loading"></span>';
        downloadBtn.disabled = true;

        if (!isValidURL(inputURL))
            throw new Error('Please enter a valid URL.');

        let response;
        const domain = getDomain(inputURL);

        switch (domain) {
            case 'tiktok':
                response = await fetchData('/tiktok/api/get-addr', inputURL);
                break;
            case 'fb':
            case 'facebook':
                if (!isValidFacebookURL(inputURL))
                    throw new Error('Please enter a valid Facebook URL.');

                if (/^https:\/\/www\.facebook\.com\/share\/(p\/|r\/|v\/)?[\w\d]+\/?$/.test(inputURL)) {
                    response = await fetchData('/facebook/api/get-redirect-url', inputURL);
                    inputURL = response.redirectURL;
                }

                if (/(?:\/story\.php\?story_fbid=\d+&id=\d+|\/stories\/\d+(?:\/[\w=]+|\?source=profile_highlight)?)/.test(inputURL))
                    response = await fetchData('/facebook/api/download-story', inputURL);
                else
                    response = await fetchData('/facebook/api/download-watch-and-reel', inputURL);
                break;
            case 'instagram':
                if (!isValidInstagramURL(inputURL))
                    throw new Error('Just enter a valid Instagram post, reel, or video URL.');

                response = await fetchData('/instagram/api/get-reel-and-post', inputURL);
                break;
            default:
                throw new Error('Unsupported domain: ' + domain);
        }

        resultContainer.classList.remove('hidden');
        createMediaPreview(domain, response);
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        console.error(error);

        title.textContent = '';
        info.textContent = '';
        resultContainer.classList.add('hidden');
        mediaPreviewContainer.innerHTML = '';
        showError(error.message);
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<span>Download</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    }
});

inputMedia.addEventListener('keydown', event => {
    if (event.key === 'Enter')
        downloadBtn.click();
});