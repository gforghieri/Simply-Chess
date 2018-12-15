// Get the modal
const modal = document.getElementById('explanationModal');

// When the user clicks on the button, open the modal 

document.getElementById("explanationBtn").onclick = function() {
    modal.style.display = "block";
}

// Get the <span> element that closes the modal
document.getElementById("closeModalCross").onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal)
        modal.style.display = "none";
}