# Goo Tube

OSC desktop performance server

```sh
deno run dev

🔌: WebSocket listening
📀: UDP listening
🕸️: Web listening
```

UDP server will listen for OSC messages on port `1111`.

Messages will be parsed and dispatched to websockets on port `2222`; they can additionally be handled by arbitrary bash, cli, or hyprsocket actions.

Webserver will start on post `3333`.
