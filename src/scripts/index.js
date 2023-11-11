import 'regenerator-runtime';
import '../scss/main.scss';
import './components/heading-app';
import './components/nav-bar-app';
import './components/hero-app';
import './components/introduction-app';
import './components/advantage-app';
import './components/foot-app';
import App from './view/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
