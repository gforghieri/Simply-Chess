/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function toggleFullScreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
  const counter = document.getElementsByTagName('time')[0];
  let seconds = 0;
  let minutes = 0;

  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }

    counter.textContent = (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);

  }

  function timer() {
    setInterval(add, 1000);
  }