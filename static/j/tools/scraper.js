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
const downloadButtons = document.getElementById('download-buttons');

async function fetchData(url, input) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ url: input })
    });

    if (response.status !== 200)
        throw new Error((await response.json()).message);

    return await response.json();
}

function createSinglePreviewElement(type, data) {
    const item = document.createElement('div');
    const media = document.createElement(type);
    media.src = '/tools/api/get-media?shortcode=' + data.shortcode + '&url=' + encodeURIComponent(data.url);

    if (type === 'video' || type === 'audio') {
        media.controls = true;
        media.autoplay = true;
        media.loop = true;
        media.muted = true;
    }

    if (type === 'audio') {
        item.className = 'w-full';
        media.className = 'w-full';
    } else if (type === 'video') {
        item.class = 'w-full h-full';
        media.className = 'w-full h-full';
        media.preload = 'metadata';
    } else {
        title.className = 'w-full h-full object-contain';
        media.className = 'w-full h-full object-contain';
    }

    const span = document.createElement('span');
    span.textContent = '⬇ Download';

    const button = document.createElement('button');
    button.className = 'btn-primary rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex items-center';
    button.style.display = 'block';
    button.style.margin = '1rem auto 0';
    button.appendChild(span);
    button.onclick = () => window.location.href = '/tools/api/get-media?download=true&shortcode=' + data.shortcode + '&url=' + encodeURIComponent(data.url);

    item.appendChild(media);
    downloadButtons.appendChild(button);

    return item;
}

function createPreviewElement(type, data, id) {
    const item = document.createElement('div');
    item.className = 'media-item';
    const media = document.createElement(type);
    media.src = '/tools/api/get-media?shortcode=' + data.shortcode + '&url=' + encodeURIComponent(data.url);

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
    button.onclick = () => window.location.href = '/tools/api/get-media?download=true&shortcode=' + data.shortcode + '&url=' + encodeURIComponent(data.url);

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
                const item = createPreviewElement('img', buildData(res.display.other[0], data.owner.userID + '_' + index), 'media-image-' + index);
                grid.appendChild(item);
            });

            mediaPreviewContainer.appendChild(grid);
            return;
        }

        const type = data.image && data.image.list.length === 1 ? 'img' : data.video ? 'video' : 'audio';
        const src = buildData(type === 'img' ? data.image.list[0].display.other[0] : type === 'video' ? (data.video?.withoutWatermark?.other[0] ?? data.video?.playAddr?.other[0]) : data.music.url.other[0], data.owner.userID);
        const item = createSinglePreviewElement(type, src);
        mediaPreviewContainer.appendChild(item);

        return;
    }

    if (domain === 'facebook') {
        title.textContent = data.title && data.title.length > 0 ? data.title : data.desc ? data.desc : 'No title available';
        if (data.videos && data.videos.length > 1) {
            const grid = document.createElement('div');
            grid.className = 'media-grid';
            info.textContent = 'Posted by ' + data.name + (data.publishedAt ? ' on ' + new Date(data.publishedAt * 1000).toLocaleDateString() : '');

            data.videos.forEach(function (res, index) {
                const item = createPreviewElement('video', buildData(res.url, res.id), 'media-video-' + index);
                grid.appendChild(item);
            });

            mediaPreviewContainer.appendChild(grid);
            return;
        }

        if (data.videos && data.videos.length === 1) {
            info.textContent = `Posted by ${data.name} on ${new Date(data.publishedAt * 1000).toLocaleDateString()}`;
            const item = createSinglePreviewElement('video', buildData(data.videos[0].url, data.videos[0].id));

            mediaPreviewContainer.appendChild(item);
            return;
        }

        info.textContent = `Posted by ${data.author} on ${new Date(isNaN(data.publishedAt) ? data.publishedAt.replace(/(\+0000)$/, 'Z') : data.publishedAt * 1000).toLocaleDateString()}`;
        const item = createSinglePreviewElement('video', buildData(data.url, data.videoID));
        mediaPreviewContainer.appendChild(item);
        return;
    }

    if (domain === 'instagram') {
        title.textContent = data.caption;
        info.textContent = 'Posted by ' + data.owner.name + ' on ' + new Date(data.createAt * 1000).toLocaleDateString();;

        if (data.url.length === 1) {
            const isVideo = data.url[0].isVideo;
            const item = createSinglePreviewElement(isVideo ? 'video' : 'img', buildData(data.url[0][isVideo ? 'video_url' : 'display_url'], data.url[0].shortcode));
            mediaPreviewContainer.appendChild(item);
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        data.url.forEach(function (res, index) {
            const isVideo = res.isVideo;
            const item = createPreviewElement(isVideo ? 'video' : 'img', buildData(res[isVideo ? 'video_url' : 'display_url'], res.shortcode), 'media-image-' + index);
            grid.appendChild(item);
        });

        mediaPreviewContainer.appendChild(grid);
        return;
    }

    if (domain === 'threads') {
        title.textContent = data.caption;
        info.textContent = 'Posted by ' + data.owner.name + ' on ' + new Date(data.createAt * 1000).toLocaleDateString();

        if (data.videos.length === 0 && data.images.length > 1) {
            const grid = document.createElement('div');
            grid.className = 'media-grid';

            data.images.forEach(function (res, index) {
                const item = createPreviewElement('img', buildData(res.url, data.owner.id + '_' + index), 'media-image-' + index);
                grid.appendChild(item);
            });

            mediaPreviewContainer.appendChild(grid);
            return;
        }

        if (data.videos.length === 1 && data.images.length === 0) {
            const item = createSinglePreviewElement('video', buildData(data.videos[0], data.owner.id));
            mediaPreviewContainer.appendChild(item);
            return;
        }

        if (data.videos.length === 0 && data.images.length === 1) {
            const item = createSinglePreviewElement('img', buildData(data.images[0].url, data.owner.id));
            mediaPreviewContainer.appendChild(item);
            return;
        }

        if (data.audio) {
            const item = createSinglePreviewElement('audio', buildData(data.audio, data.owner.id));
            mediaPreviewContainer.appendChild(item);
            return;
        }

        const newData = [...data.videos, ...data.images];

        const grid = document.createElement('div');
        grid.className = 'media-grid';

        newData.forEach(function (res, index) {
            let item;
            if (typeof res === 'string')
                item = createPreviewElement('video', buildData(res, data.owner.id + '_' + index), 'media-video-' + index);
            else
                item = createPreviewElement('img', buildData(res.url, data.owner.id + '_' + index), 'media-image-' + index);

            grid.appendChild(item);
        });

        mediaPreviewContainer.appendChild(grid);
        return;
    }
}

downloadBtn.addEventListener('click', async function () {
    hideError();
    downloadButtons.innerHTML = '';

    let inputURL = inputMedia.value;

    if (!inputURL)
        return;

    inputURL = inputURL.trim();

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
                    const maybeWatch = inputURL.includes('/v/');
                    let refresh = true;

                    while (refresh) {
                        response = await fetchData('/facebook/api/get-redirect-url', inputURL);
                        inputURL = response.redirectURL;

                        if (!inputURL.includes('story.php') || !maybeWatch)
                            refresh = false;
                    }
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
            case 'threads':
                if (!isValidTThreadsURL(inputURL))
                    throw new Error('URL is not a Threads post.');

                response = await fetchData('/threads/api/get-post', inputURL);

                if (response.videos.length === 0 && response.images.length === 0 && !response.audio)
                    throw new Error('Media not found in url, make sure url has media.');
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
        showError(error.response ? error.response.message : error.message);
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<span>Download</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    }
});

inputMedia.addEventListener('keydown', event => {
    if (event.key === 'Enter')
        downloadBtn.click();
});