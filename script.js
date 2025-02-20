const menuButton = document.getElementById("menu-button");
const sideMenu = document.getElementById("side-menu");

menuButton.addEventListener("click", () => {
    sideMenu.classList.toggle("active");
});

const closeButton = document.getElementById("close-button");

closeButton.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

document.addEventListener("click", (event) => {
    if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) {
        sideMenu.classList.remove("active");
    }
});
