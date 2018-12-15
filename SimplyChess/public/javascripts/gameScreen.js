function toggleFullScreen() {
  if (document.fullscreen)
    // boolean value that is true if the user is currently in fullscreen
    document.exitFullscreen();
  else
    // user is currently not in fullscreen
    document.documentElement.requestFullscreen();
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
