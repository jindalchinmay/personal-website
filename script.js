const track = document.getElementById("image-track");
const content = document.getElementById("content");
const images = document.querySelectorAll(".image");
const seeMoreButtons = document.querySelectorAll(".see-more");
const darkModeToggle = document.getElementById("dark-mode-toggle");


let mouseDownAt = 0;
let prevPercentage = 0;  // Start at -100% to align images to the right
let percentage = 0;  // Start at -100% to align images to the right
let currentPage = 1;  // Start at the last page
let isDarkMode = true;  // Start in dark mode

const imageData = [
    { title: "Project 1", description: "Description for Project 1" },
    { title: "Project 2", description: "Description for Project 2" },
    { title: "Project 3", description: "Description for Project 3" },
    { title: "Project 4", description: "Description for Project 4" },
    { title: "Project 5", description: "Description for Project 5" },
    { title: "Project 6", description: "Description for Project 6" },
    { title: "Project 7", description: "Description for Project 7" },
    { title: "music is the language of creativity", description: "Description for Project 8" }
];

// Initialize the track position and image positions
window.onload = () => {
    updateTrackPosition();
    updatePageNumber();
}

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
    checkEasterEgg();
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
        transform: `translate(${percentage * 5.75}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of images) {
        image.animate({
            objectPosition: `${100 + percentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

function updatePageNumber() {
    const pageNumber = document.querySelector("#page-number .current");
    currentPage = Math.min(Math.max(Math.floor((percentage * -1 / 100) * 8) + 1, 1), 8);
    pageNumber.textContent = currentPage;
}

function checkEasterEgg() {
    if (percentage <= -87.5) {  // Show Easter egg when reaching the 8th image (87.5% = 7/8 * 100%)
        showEasterEgg();
    } else {
        hideEasterEgg();
    }
}

function showEasterEgg() {
    let easterEgg = document.getElementById("easter-egg");
    if (!easterEgg) {
        easterEgg = document.createElement("div");
        easterEgg.id = "easter-egg";
        easterEgg.textContent = "i also like math";
        easterEgg.style.position = "fixed";
        easterEgg.style.right = "20px";
        easterEgg.style.bottom = "20px";
        easterEgg.style.background = "rgba(0, 0, 0, 0.7)";
        easterEgg.style.color = "white";
        easterEgg.style.padding = "10px";
        easterEgg.style.borderRadius = "5px";
        easterEgg.style.fontFamily = "'Roboto Mono', monospace";
        easterEgg.style.zIndex = "1000";
        easterEgg.style.opacity = "0";
        easterEgg.style.transition = "opacity 0.5s ease-in-out";
        document.body.appendChild(easterEgg);
    }
    setTimeout(() => {
        easterEgg.style.opacity = "1";
    }, 100);
}

function hideEasterEgg() {
    const easterEgg = document.getElementById("easter-egg");
    if (easterEgg) {
        easterEgg.style.opacity = "0";
    }
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
        
        // Animate the 'X' button
        //closeButton.style.transition = "all 0.5s ease";
        //closeButton.style.transform = "translate(5rem, -3.5rem)";
    }, 2000);
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

// Dark mode toggle functionality
darkModeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    updateDarkMode();
});

function updateDarkMode() {
    document.body.classList.toggle("light-mode", !isDarkMode);
    const icons = document.querySelectorAll("#social-icons img");
    icons.forEach(icon => {
        const src = icon.src;
        icon.src = isDarkMode ? src.replace('.svg', '2.svg') : src.replace('2.svg', '.svg');
    });
    
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.textContent = isDarkMode ? "🔆" : "🌑";
}


// Update the click event listener
document.querySelector('.toggle-switch').addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    updateDarkMode();
});