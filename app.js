const player      = document.querySelector('.player');
const video       = player.querySelector('.viewer');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle      = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');

/* Same as below function togglePlay

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
} */

const togglePlay = () => video[video.paused ? 'play': 'pause']();

const updateButton = (event) => toggle.textContent = event.currentTarget.paused ? '►' : '❚ ❚';

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (event) => {
    video.currentTime = (event.offsetX / progress.offsetWidth) * video.duration;
};

// Event Listener
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

//Skip video
skipButtons.forEach(button => button.addEventListener('click', (event) => {
    video.currentTime += parseFloat(event.currentTarget.dataset.skip);
}));

//Key Sequence Detection - ArrawLeft and ArrowRight
window.addEventListener('keyup', (event) => {
    if (event.key === "ArrowRight") {
        video.currentTime += 25;
    } else if (event.key === "ArrowLeft"){
        video.currentTime -= 10;
    } else if (event.which === 32) { 
        togglePlay();
    }
});

ranges.forEach(range => range.addEventListener('change', (event) => {
    video[event.currentTarget.name] = event.currentTarget.value;
}));

// Dragging progress bar - update video
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


