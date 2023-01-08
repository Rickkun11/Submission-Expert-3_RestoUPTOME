import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import App from './views/app';
import swRegister from './utils/sw-register';

//toogle hamburger
const nav = document.querySelector("#nav");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < 20) {
        nav.classList.remove("shadow-bottom");
    } else {
        nav.classList.add("shadow-bottom");
    }
});
const menu = document.querySelector(".menu");
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
    menu.classList.toggle("open");
});

const app = new App({
	button: document.querySelector('#hamburgerButton'),
  	content: document.querySelector('#main-content'),
});


window.addEventListener('load', () => {
	app.renderPage();
	swRegister();
});

window.addEventListener('hashchange', () => {
    app.renderPage();
  });