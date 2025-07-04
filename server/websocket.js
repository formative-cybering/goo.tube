export const listeners = {};
let id = 1;

async function handleHttp(conn) {
  for await (const rq of Deno.serveHttp(conn)) {
    const requestId = id++ + "";
    try {
      const { socket, response } = Deno.upgradeWebSocket(rq.request);
      socket.onopen = () => {
        listeners[requestId] = socket;
      };
      socket.onmessage = () => {
        socket.close();
      };
      socket.onclose = () => {
        console.log("WebSocket has been closed.");
        delete listeners[requestId];
      };
      socket.onerror = (e) => {
        console.error("WebSocket error:", e);
      };
      rq.respondWith(response);
    } catch (e) {
      console.error(e);
      rq.respondWith(
        new Response("bork", {
          status: 500,
        }),
      );
    }
  }
}

async function serveWebsocket() {
  console.log("🔌: WebSocket listening");
  for await (const conn of Deno.listen({ port: 2222 })) {
    handleHttp(conn);
  }
}

export default serveWebsocket;
