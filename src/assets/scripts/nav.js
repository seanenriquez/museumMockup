const mainNav = document.querySelector('.main-nav__menu');
const hamburger = document.querySelector('.hamburger');
const body = document.querySelector('body')
hamburger.addEventListener('click', () => {
	hamburger.setAttribute('aria-pressed', hamburger.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')

	mainNav.setAttribute('aria-expanded', mainNav.getAttribute('aria-expanded') === 'true' ? 'false' : 'true')
	body.classList.toggle('no-scroll')
})
