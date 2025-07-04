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
    const kickdex = [8];
    const flashdex = [-24];
    ws.onopen = () => {
      console.log("ws open");
      ws.onmessage = (evt) => {
        let obj = {};
        try {
          obj = JSON.parse(evt.data);
        } catch (_e) {
          //
        }
        cycle.innerText = Math.floor(+obj.cycle) - Math.floor(+obj?.rotL || 0);
        if (obj.inst == "LXR" || obj.inst == "DRM") {
          const exist = document.getElementById(obj.inst + obj.n);
          if (exist) {
            exist.classList.remove("flash");
            requestAnimationFrame(() => {
              setTimeout(() => exist.classList.add("flash"), 0);
            });
          } else {
            const el = document.createElement("span");
            el.id = obj.inst + obj.n;
            el.innerText = obj.n;
            el.style.order = obj.n;
            grid.appendChild(el);
          }
        }

        if (kickdex.indexOf(obj.channel) > -1) {
          this.index++;
          bg.style.backgroundImage = `url("/x/${
            files[this.index % files.length]
          }")`;
          bg.classList.remove("zoom");
          // controller.endElement();
          requestAnimationFrame(() => {
            bg.classList.add("zoom");
            controller.beginElement();
          });
        }
        if (flashdex.indexOf(obj.s) > -1) {
          flash.classList.remove("flash");
          requestAnimationFrame(() => {
            flash.classList.add("flash");
          });
        }
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
