class IntroductionApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="container-about" tabindex="0">
        <img
          src="./images/ilustration/ilustration-fork-finder.png"
          alt="Fork Finder Ilustration"
        />
        <div class="about-description">
          <h1 class="name">Fork Finder</h1>
          <p>
            "Fork Finder adalah sebuah website yang memudahkan Anda untuk
            menjelajahi beragam pilihan restoran di berbagai kota, memberikan
            informasi lengkap tentang rating, menu, dan fasilitas, sehingga Anda
            dapat dengan mudah menemukan tempat makan yang sesuai dengan selera
            Anda."
          </p>
        </div>
      </div>
    `;
  }
}

customElements.define('introduction-app', IntroductionApp);
