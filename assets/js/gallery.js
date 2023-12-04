const modal = document.getElementById("modal");

const img = document.getElementById("test");
const modalImg = document.getElementById("modal-content");
const captionText = document.getElementById("caption");


// TODO: interface declared implicitly. Can be replaced with hashmap registry or something.


document.querySelectorAll('#gallery *').forEach((el) => el.onclick = function () {
    modal.style.display = "flex";
    modalImg.src = el.src.replace('thumbnails', 'raw');
    captionText.innerHTML = el.alt;
})


const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}