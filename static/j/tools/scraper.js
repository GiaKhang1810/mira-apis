const body = document.body;
const lightModeBtn = document.querySelector('.light-mode-btn');
const darkModeBtn = document.querySelector('.dark-mode-btn');
const downloadBtn = document.getElementById('download-btn');
const mediaUrlInput = document.getElementById('media-url');
const resultContainer = document.getElementById('result-container');
const mediaPreviewContainer = document.getElementById('media-preview-container');
const mediaTitle = document.getElementById('media-title');
const mediaInfo = document.getElementById('media-info');
const downloadButtons = document.getElementById('download-buttons');

function applyTheme(theme) {
    body.classList.toggle('theme-dark', theme === 'dark');
    body.classList.toggle('theme-light', theme === 'light');
    darkModeBtn.classList.toggle('active', theme === 'dark');
    lightModeBtn.classList.toggle('active', theme === 'light');
    localStorage.setItem('theme', theme);
}

lightModeBtn.onclick = () => applyTheme('light');
darkModeBtn.onclick = () => applyTheme('dark');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) applyTheme(savedTheme);
else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) applyTheme('dark');
else applyTheme('light');

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
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.split('.').filter(Boolean)[1];
}

function createErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.textAlign = 'center';
    resultContainer.innerHTML = '';
    resultContainer.appendChild(errorMessage);
    resultContainer.classList.remove('hidden');
}

function createPreviewElement(type, src, id) {
    const item = document.createElement('div');
    item.className = 'media-item';
    const media = document.createElement(type);
    media.src = src;

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

    item.appendChild(media);
    item.appendChild(button);

    return item;
}

function createMediaPreview(domain, data) {
    mediaPreviewContainer.innerHTML = '';

    if (domain === 'tiktok') {
        mediaTitle.textContent = data.caption;
        mediaInfo.textContent = `Posted by ${data.owner.nickname} on ${new Date(data.createAt * 1000).toLocaleDateString()}`;

        if (data.image && data.image.list.length > 1) {
            const grid = document.createElement('div');
            grid.className = 'media-grid';

            data.image.list.forEach((res, index) => {
                const item = createPreviewElement('img', res.display.other[0], 'media-image-' + index);
                grid.appendChild(item);
            });

            mediaPreviewContainer.appendChild(grid);
            return;
        }

        const type = data.image && data.image.list.length === 1 ? 'img' : data.video ? 'video' : 'audio';
        const item = createPreviewElement(type, type === 'img' ? data.image.list[0].display.other[0] : type === 'video' ? data.video.withoutWatermark.other[0] : data.audio.url.uri);
        mediaPreviewContainer.appendChild(item);

        return;
    }

    if (domain === 'facebook') {
        let item;
        mediaTitle.textContent = 'No title available';
        if (data.download_url) {
            mediaInfo.textContent = `Posted by ${data.name} on ${new Date(data.publishedAt * 1000).toLocaleDateString()}`;
            item = createPreviewElement('video', data.download_url.url_hd);
        } else {
            mediaInfo.textContent = `Posted by ${data.author} on ${new Date(data.publishedAt.replace(/(\+0000)$/, 'Z')).toLocaleDateString()}`;
            item = createPreviewElement('video', data.url);
        }

        mediaPreviewContainer.appendChild(item);
        return;
    }

    if (domain === 'instagram') {
        mediaTitle.textContent = data.caption;
        mediaInfo.textContent = 'Posted by ' + data.owner.name;

        if (data.isVideo) {
            const item = createPreviewElement('video', data.video_url);
            mediaPreviewContainer.appendChild(item);
            return;
        }

        if (data.images && data.images.length === 1) {
            const item = createPreviewElement('img', data.images[0].display_url, 'media-image-0');
            mediaPreviewContainer.appendChild(item);
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        data.images.forEach((res, index) => {
            const item = createPreviewElement('img', res.display_url, 'media-image-' + index);
            grid.appendChild(item);
        });

        mediaPreviewContainer.appendChild(grid);
        return;
    }
}

downloadBtn.onclick = async () => {
    let url = mediaUrlInput.value.trim();
    if (!url)
        return;

    downloadBtn.innerHTML = '<span class="loading"></span>';

    try {
        if (!isValidURL(url)) {
            createErrorMessage('Please enter a valid URL.');
            return;
        }

        let response;
        const domain = getDomain(url);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ url })
        }

        switch (domain) {
            case 'tiktok':
                response = await fetch('/tiktok/api/get-addr', fetchOptions);
                break;
            case 'fb':
            case 'facebook':
                let uri = '/facebook/api/download-watch-and-reel';
                if (!isValidFacebookURL(url)) {
                    createErrorMessage('Please enter a valid Facebook URL.');
                    return;
                }

                if (/^https:\/\/www\.facebook\.com\/share\/(p\/|r\/|v\/)?[\w\d]+\/?$/.test(url)) {
                    const res = await fetch('/facebook/api/get-redirect-url', fetchOptions);

                    if (!res.ok) {
                        createErrorMessage('Failed to fetch redirect URL from Facebook.');
                        return;
                    }

                    const result = await res.json();
                    url = result.redirectURL;
                }

                if (/(?:\/story\.php\?story_fbid=\d+&id=\d+|\/stories\/\d+(?:\/[\w=]+|\?source=profile_highlight)?)/.test(url))
                    uri = '/facebook/api/download-story';

                fetchOptions.body = new URLSearchParams({ url });
                response = await fetch(uri, fetchOptions);
                break;
            case 'instagram':
                if (!isValidInstagramURL(url)) {
                    createErrorMessage('Please enter a valid Instagram URL.');
                    return;
                }

                response = await fetch('/instagram/api/get-reel-and-post', fetchOptions);
                break;
            default:
                createErrorMessage('Unsupported platform ' + domain + '.');
                return;
        }

        if (!response.ok) {
            createErrorMessage('Failed to fetch data from the server. Please try again later.');
            return;
        }

        const result = await response.json();
        resultContainer.classList.remove('hidden');
        createMediaPreview(domain, result);
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        console.error('Error:', error);
        createErrorMessage('An error occurred while processing the request. Please try again later.');
    } finally {
        downloadBtn.innerHTML = '<span>Download</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    }
}

mediaUrlInput.onkeypress = e => {
    if (e.key === 'Enter')
        downloadBtn.click();
}