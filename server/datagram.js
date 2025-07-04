import { fromBuffer } from "npm:osc-min";
import { listeners } from "./websocket.js";
import { bashParse } from "./bash.js";
// import { hyprParse } from "./hyprsocket.js";

// osc to json
const transform = (r) => {
  const { args } = fromBuffer(r[0]);
  const obj = {
    n: args[0].value,
    s: args[1].value,
    channel: args[2].value,
    amp: args[3].value,
    inst: args[4].value,
    cps: args[5].value,
    cycle: args[6].value,
    delta: args[7].value,
    rotL: args[8].value,
    stamp: +new Date(),
  };
  // drop silent messages completely
  if (obj.amp == 0) return;
  return obj;
};

async function serveDatagram() {
  const osc = Deno.listenDatagram({
    port: 1111,
    hostname: "127.0.0.1",
    transport: "udp",
  });
  console.log("📀: UDP listening");
  while (1) {
    const r = await osc.receive();
    const data = transform(r);
    if (data) {
      // bash parsing
      bashParse(data);
      // websocket// websocket sending
      for (const listener of Object.values(listeners)) {
        try {
          listener.send(JSON.stringify(data));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
}

export default serveDatagram;
