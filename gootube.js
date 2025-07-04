import serveWebsocket from "./server/websocket.js";
import serveDatagram from "./server/datagram.js";
import serveWeb from "./server/web.js";

const http = serveWebsocket();
const udp = serveDatagram();
const web = serveWeb();

await Promise.all([http, udp, web]);
