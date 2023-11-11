class HeroApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="hero-element">
      <picture>
        <source media="(max-width: 767px)" srcset="./images/heros/hero-image_4-small.jpg">
        <source media="(min-width: 768px)" srcset="./images/heros/hero-image_4-large.jpg">=
        <img src='./images/heros/hero-image_4.jpg' alt="hero image">
      </picture>
      <p>Temukan Restaurant Sempurna Untukmu</p>
    </div>
    `;
  }
}

customElements.define('hero-app', HeroApp);
