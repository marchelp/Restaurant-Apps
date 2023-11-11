class HeadingApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="icon">
        <a href="#">
          <img src="./images/icon/icon.png" alt="icon-restaurant" />
          <p>Fork Finder</p>
        </a>
      </div>
    `;
  }
}

customElements.define('heading-app', HeadingApp);
