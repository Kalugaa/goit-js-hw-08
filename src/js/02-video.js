import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Vimeo('vimeo-player');

const VIDEO_KEY = 'videoplayer-current-time';

function saveCurrentTime(time) {
  localStorage.setItem(VIDEO_KEY, JSON.stringify(time));
}

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
