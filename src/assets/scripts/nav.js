const mainNav = document.querySelector('.main-nav__hideaway');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('is-active')
  mainNav.classList.toggle('exposed')
})
