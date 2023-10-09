import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo('vimeo-player');

const VIDEO_KEY = 'videoplayer-current-time';

// Функція для збереження поточного часу відтворення у локальному сховищі
function saveCurrentTime(time) {
  localStorage.setItem(VIDEO_KEY, JSON.stringify(time));
}

// Функція для завантаження поточного часу відтворення з локального сховища
function loadCurrentTime() {
  const savedTime = localStorage.getItem(VIDEO_KEY);
  return savedTime ? JSON.parse(savedTime) : 0;
}

vimeoPlayer.setCurrentTime(loadCurrentTime());

vimeoPlayer.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);
