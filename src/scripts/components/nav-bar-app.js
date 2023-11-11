class NavBarApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <button id="hamburger" aria-label="hamburger button">☰</button>
      <nav id="drawer">
        <ul class="item-list">
          <li class="nav-item"><a href="#/home">Home</a></li>
          <li class="nav-item"><a href="#/favorite">Favorite</a></li>
          <li class="nav-item">
            <a href="https://www.linkedin.com/in/marchelp/" target="_blank" rel="noreferrer"
              >About Us</a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar-app', NavBarApp);
