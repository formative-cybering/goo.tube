class GooTube extends HTMLElement {
  static get observedAttributes() {
    return ["index"];
  }
  get index() {
    return JSON.parse(this.getAttribute("index"));
  }
  set index(v) {
    this.setAttribute("index", v);
  }
  connectedCallback() {
    const bg = document.getElementsByTagName("goo-bg")[0];
    const controller = document.getElementById("controller");
    const grid = document.getElementsByTagName("goo-grid")[0];
    const flash = document.getElementsByTagName("goo-flash")[0];
    const cycle = document.getElementsByTagName("goo-cycle")[0];
    const files = window.X_FILES;
    const ws = new WebSocket("ws://localhost:2222");
    ws.onopen = () => {
      console.log("ws open");
      ws.onmessage = (evt) => {
        console.log(evt)
      };
    };
    ws.onclose = () => console.log("ws closed");
  }
  attributeChangedCallback(attr, _oldVal, _newVal) {
    this.render();
  }
  render() {
    const bg = document.getElementsByTagName("goo-bg")[0];
    const files = window.X_FILES;
    bg.style.backgroundImage = `url("/x/${files[this.index % files.length]}")`;
  }
}

customElements.define("goo-tube", GooTube);
