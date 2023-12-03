const modal = document.getElementById("modal");

const img = document.getElementById("test");
const modalImg = document.getElementById("modal-content");
const captionText = document.getElementById("caption");


// TODO: interface declared implicitly. Can be replaced with hashmap registry or something.

for (let galleryImage of document.querySelectorAll('#gallery *')) {
    galleryImage.onclick = function () {
        modal.style.display = "flex";
        modalImg.src = this.src.replace('thumbnails', 'raw');
        captionText.innerHTML = this.alt;
    }
}


const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}