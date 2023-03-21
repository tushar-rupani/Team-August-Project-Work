const MenuBtn = document.querySelector("#menu-btn");
const SideMenu = document.querySelector("#sidebar");
const CloseBtn = document.querySelector("#close-btn");
const ThemeToggler = document.querySelector(".theme-toggler");
const date = new Date().toLocaleDateString();


const dateLabel = document.getElementById("current-date");
const timeLabel = document.getElementById("current-time");

const time = new Date().toLocaleTimeString();
timeLabel.innerHTML = time;

setInterval(() => {
    const time = new Date().toLocaleTimeString();
    timeLabel.innerHTML = time;

}, 1000);


dateLabel.innerHTML = date;
/**
 * Show sidebar
 */
MenuBtn.addEventListener('click', () => {
    SideMenu.style.display = 'block'
})

/**
 * Close sidebar
 */
CloseBtn.addEventListener('click', () => {
    SideMenu.style.display = 'none'
})

/**
 * Change theme
 */

/*const dropdownTrigger = document.querySelector('#dropdown-trigger');
const dropdownMenu = document.querySelector('#dropdown-menu');

dropdownTrigger.addEventListener('click', () => {
    console.log("test");
  dropdownMenu.classList.toggle('show');
});*/

ThemeToggler.addEventListener("click", () => {
    document.body.classList.toggle('dark-theme-variables')

    ThemeToggler.querySelector('.theme-toggler__button--light').classList.toggle('theme-toggler__button--active')
    ThemeToggler.querySelector('.theme-toggler__button--dark').classList.toggle('theme-toggler__button--active')
})
