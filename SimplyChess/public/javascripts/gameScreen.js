/* Get the documentElement (<html>) to display the page in fullscreen */
const elem = document.documentElement;

/* View in fullscreen */
function toggleFullScreen() {
  if (document.mozFullScreen || document.webkitIsFullScreen) {
    // is in fullscreen
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  } else {  
    // is not in fullscreen
    if (elem.requestFullScreen) {  
      elem.requestFullScreen();  
    } else if (elem.mozRequestFullScreen) {  
      elem.mozRequestFullScreen();  
    } else if (elem.webkitRequestFullScreen) {  
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
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