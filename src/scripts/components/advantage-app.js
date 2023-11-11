class AdvantageApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="advantage" tabindex="0">
        <div class="advantage-card">
          <img
            src="./images/ilustration/location-search.png"
            alt="Restaurant Finder Ilustration"
          />
          <div class="card-caption">
            <h2>Temukan Restoran yang Sesuai</h2>
            <p>
              Temukan restoran yang sesuai dengan selera Anda di berbagai kota.
            </p>
          </div>
        </div>
        <div class="advantage-card">
          <img src="./images/ilustration/place-rate.png" alt="Place Rate Ilustrasi" />
          <h2>Lihat Rating Terbaru</h2>
          <p>
            Lihat rating terbaru dari restoran-restoran terbaik di sekitar Anda.
          </p>
        </div>
        <div class="advantage-card">
          <img src="./images/ilustration/book-table.png" alt="Reservation Ilustration" />
          <h2>Pesan Meja</h2>
          <p>Pesan meja dengan mudah di restoran pilihan Anda.</p>
        </div>
      </div>
    `;
  }
}

customElements.define('advantage-app', AdvantageApp);
