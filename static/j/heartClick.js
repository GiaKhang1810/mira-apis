document.addEventListener('click', function (event) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = event.clientX + 'px';
    heart.style.top = event.clientY + 'px';
    heart.textContent = '❤️';

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});