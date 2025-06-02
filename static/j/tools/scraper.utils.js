const hosts = ['www.threads.com', 'threads.net', 'www.threads.net'];

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

function basename(url, withExtension = false) {
    const cleanUrl = url.split('?')[0];
    const filename = cleanUrl.split('/').pop();
    return withExtension ? filename : filename.replace(/\.\w+$/, '');
}

function isValidInstagramURL(igURL) {
    const tags = ['p', 'reel', 'reels', 'tv'];
    const url = new URL(igURL);
    const parts = url.pathname.split('/').filter(Boolean);

    if (!url.hostname.endsWith('instagram.com'))
        return false;

    if (parts.length >= 2 && tags.includes(parts[0]))
        return true;

    if (parts.length >= 3 && tags.includes(parts[1]))
        return true;

    return false;
}

function isValidTThreadsURL(threadsURL) {
    const url = new URL(threadsURL);

    const hostname = url.hostname;
    if (!hosts.includes(hostname))
        return false;

    const parts = url.pathname.split('/').filter(Boolean);

    if (parts.length !== 3 || !parts[0].startsWith('@') || parts[1] !== 'post' || parts[2].length === 0) 
        return false;

    return true;
}

function getDomain(url) {
    const parser = new URL(url);
    return parser.hostname.split('.').filter(Boolean)[1];
}

function buildData(url, shortcode) {
    return {
        url,
        shortcode
    }
}