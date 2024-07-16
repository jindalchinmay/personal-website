const track = document.getElementById("image-track");
const content = document.getElementById("content");
const images = document.querySelectorAll(".image");
const seeMoreButtons = document.querySelectorAll(".see-more");

let mouseDownAt = 0;
let prevPercentage = 0;
let percentage = 0;
let currentPage = 1;

const imageData = [
    { title: "Project 1", description: "Description for Project 1" },
    { title: "Project 2", description: "Description for Project 2" },
    { title: "Project 3", description: "Description for Project 3" },
    { title: "Project 4", description: "Description for Project 4" },
    { title: "Project 5", description: "Description for Project 5" },
    { title: "Project 6", description: "Description for Project 6" },
    { title: "Project 7", description: "Description for Project 7" },
    { title: "Project 8", description: "Description for Project 8" }
];

window.onmousedown = e => {
    mouseDownAt = e.clientX;
}

window.onmousemove = e => {
    if (mouseDownAt === 0) return;

    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const newPercentage = prevPercentage + (mouseDelta / maxDelta) * -100;
    percentage = Math.max(Math.min(newPercentage, 0), -100);

    updateTrackPosition();
    updatePageNumber();
}

window.onmouseup = () => {
    mouseDownAt = 0;
    prevPercentage = percentage;
}

function updateTrackPosition() {
    track.animate({
        transform: `translate(${percentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    content.animate({
        transform: `translate(${percentage * 4}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of images) {
        image.animate({
            objectPosition: `${100 + percentage * 2}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

function updatePageNumber() {
    const pageNumber = document.querySelector("#page-number .current");
    currentPage = Math.min(Math.max(Math.floor((percentage * -1 / 100) * 8) + 1, 1), 8);
    pageNumber.textContent = currentPage;
}

for (const button of seeMoreButtons) {
    button.addEventListener("click", e => {
        const image = e.target.previousElementSibling;
        enlargeImage(image);
    });
}

function enlargeImage(clickedImage) {
    const index = Array.from(images).indexOf(clickedImage);
    const { title, description } = imageData[index];

    const enlargedView = document.createElement("div");
    enlargedView.id = "enlarged-view";

    const enlargedImage = clickedImage.cloneNode();
    enlargedImage.style.filter = "none";

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;

    const closeButton = document.createElement("div");
    closeButton.className = "close-button";
    closeButton.textContent = "×";
    closeButton.onclick = closeEnlargedView;

    textContainer.appendChild(titleElement);
    textContainer.appendChild(descriptionElement);

    enlargedView.appendChild(enlargedImage);
    enlargedView.appendChild(textContainer);
    enlargedView.appendChild(closeButton);

    document.body.appendChild(enlargedView);

    setTimeout(() => {
        enlargedView.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        enlargedImage.style.transform = "scale(1.2)";
        enlargedImage.style.filter = "blur(5px)";
        textContainer.style.opacity = "1";
    }, 500);
}

function closeEnlargedView() {
    const enlargedView = document.getElementById("enlarged-view");
    if (enlargedView) {
        enlargedView.style.opacity = "0";
        setTimeout(() => {
            enlargedView.remove();
        }, 500);
    }
}

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        closeEnlargedView();
    }
}
