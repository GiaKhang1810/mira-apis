async function DOMContentLoaded() {
    const finput = document.getElementById('file-input');
    const fcount = document.getElementById('file-count');
    const flist = document.getElementById('file-list');
    const fcontainer = document.getElementById('files-container');

    const lcontainer = document.getElementById('links-container');
    const llist = document.getElementById('links-list');
    const lcount = document.getElementById('links-count');
    const copyAllBtn = document.getElementById('copy-all-links');

    const dropArea = document.getElementById('drop-area');
    const browseBtn = document.getElementById('browse-btn');

    let total = 0;
    let queue = [];
    let links = [];
    let isUploading = false;

    const topics = [
        ['dragenter', 'dragover'],
        ['dragleave', 'drop']
    ];

    const highlight = () => dropArea.classList.add('active');
    const unhighlight = () => dropArea.classList.remove('active');
    const showContainer = () => fcontainer.classList.remove('hidden');
    const updateCount = (isLink) => isLink ? (lcount.textContent = links.length + ' links') : (fcount.textContent = total + ' files');

    function dropHandle(event) {
        const data = event.dataTransfer;
        const fs = data.files;
        inputHandle({ target: { files: fs } });
    }

    function inputHandle(event) {
        const fs = event.target.files;

        if (fs.length === 0)
            return;

        showContainer();

        Array.from(fs).forEach(f => {
            const id = 'f-' + Date.now() + Math.random();
            addList(f.name, formatBytes(f.size), id, 'pending');
            const item = {
                id,
                file: f,
                name: f.name,
                size: f.size
            }
            queue.push(item);
        });

        total += fs.length;
        updateCount();

        if (!isUploading)
            processQueue();
    }

    function addList(name, size, id, status) {
        const fi = document.createElement('div');

        fi.className = 'file-item bg-slate-800/50 rounded-xl overflow-hidden';
        fi.setAttribute('data-file-id', id);

        const fd = getDetails(name);

        fi.innerHTML = `
            <div class="p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="h-12 w-12 rounded-lg ${fd.bgColor} flex items-center justify-center mr-4">${fd.icon}</div>
                        <div>
                            <p class="text-white font-medium text-sm md:text-base truncate max-w-[150px] md:max-w-[300px]">${name}</p>
                            <p class="text-slate-400 text-xs">${size}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="file-status bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full mr-3">${getStatus(status)}</div>
                        <button class="delete-btn text-slate-400 hover:text-red-400 transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            
                <div class="mt-3">
                    <div class="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-blue-500 rounded-full transition-all duration-300" style="width: ${status === 'completed' ? '100%' : status === 'uploading' ? '50%' : '0%'}"></div>
                    </div>
                </div>
                        
                <div class="file-url mt-2 hidden">
                    <a href="#" target="_blank" class="text-indigo-400 hover:text-indigo-300 text-xs break-all">link file</a>
                </div>
            </div>
        `;

        const deleteBtn = fi.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            fi.classList.add('opacity-0');
            setTimeout(() => {
                fi.remove();
                total--;
                updateCount();

                if (total === 0)
                    fcontainer.classList.add('hidden');
            }, 300);
        });

        flist.appendChild(fi);
    }

    function addLinkToSection(fn, url) {
        links.push(url);

        const li = document.createElement('div');

        li.className = 'bg-slate-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors';

        li.innerHTML = `
            <div class="flex items-center flex-1">
                <div class="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-white font-medium text-sm truncate">${fn}</p>
                    <p class="text-slate-400 text-xs break-all">${url}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 ml-4">
                <button class="copy-link-btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-lg transition-colors" data-url="${url}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                <a href="${url}" target="_blank" class="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 p-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        `;

        const copyBtn = li.querySelector('.copy-link-btn');
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(url);
                showNotif('Link has been copied!', 'success');
            } catch {
                showNotif('Cannot copy link', 'error');
            }
        });

        llist.appendChild(li);
        lcontainer.classList.remove('hidden');
        updateCount(true);
    }

    async function processQueue() {
        if (queue.length === 0 || isUploading)
            return;

        isUploading = true;

        while (queue.length > 0) {
            const batch = queue.splice(0, 5);
            await fetchBatch(batch);
        }

        isUploading = false;
    }

    async function fetchBatch(batch) {
        const formData = new FormData();

        batch.forEach(f => {
            formData.append('files', f.file);
            updateStatus(f.id, 'uploading');
        });

        try {
            const response = await fetch('/upload/api/write', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.status === 200) {
                data.forEach((f, i) => {
                    const fd = batch[i];

                    if (f.error)
                        return updateStatus(fd.id, 'error', null, f.error);

                    updateStatus(fd.id, 'completed', f.furl);
                    addLinkToSection(fd.name, f.furl);
                });
                showNotif(`Uploaded ${data.filter(item => !item.error).length} file(s) successfully!`, 'success');
            } else {
                batch.forEach(f => updateStatus(f.id, 'error', null, data.message));
                showNotif('Upload error:' + data.message, 'error');
            }
        } catch (error) {
            batch.forEach(f => updateStatus(f.id, 'error', null, error.message));
            showNotif('Upload error:' + error.message, 'error');
        }
    }

    topics.flat().forEach(event => {
        dropArea.addEventListener(event, preventDefaults, false);
        document.body.addEventListener(event, preventDefaults, false);
    });

    topics[0].forEach(event => dropArea.addEventListener(event, highlight, false));
    topics[1].forEach(event => dropArea.addEventListener(event, unhighlight, false));

    dropArea.addEventListener('drop', dropHandle, false);
    browseBtn.addEventListener('click', () => finput.click());
    finput.addEventListener('change', inputHandle, false);

    copyAllBtn.addEventListener('click', async () => {
        if (links.length === 0) {
            showNotif('There are no links to copy.', 'error');
            return;
        }

        const allLinks = links.join('\n');
        try {
            await navigator.clipboard.writeText(allLinks);
            showNotif(`Copied ${links.length} link to clipboard!`, 'success');
        } catch {
            showNotif('Cannot copy link', 'error');
        }
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => button.classList.add('scale-105'));
        button.addEventListener('mouseleave', () => button.classList.remove('scale-105'));
    });
}
document.addEventListener('DOMContentLoaded', DOMContentLoaded);