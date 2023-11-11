class FooterApp extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    </style>
    <div class="container-footer">
      <p>Copyright &copy; 2023 - Fork Finder Apps</p>
    </div>
  
    `;
  }
}

customElements.define('foot-app', FooterApp);
