document.addEventListener("DOMContentLoaded", () => {
    const menuDropdown = document.getElementById("menuDropdown");
    const nav = document.getElementById("nav");
    menuDropdown.addEventListener("click", () => {
        nav.classList.toggle("show");
    })
})