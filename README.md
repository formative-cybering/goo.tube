<video src="https://x.ill.computer/Untitled34.mp4#t=0.1" />

# Goo Tube

OSC desktop performance server

```sh
deno run dev
```

UDP server will listen for OSC messages on port `1111`.

Messages will be parsed and dispatched to websockets on port `2222`; they
can additionally be handled by arbitrary bash, cli, or hyprsocket actions.

Webserver will start on port `3333`.

---

Shout out:

- [hyprland](https://hypr.land)
- [pixterm](https://github.com/eliukblau/pixterm)
- [hyprshade](https://github.com/loqusion/hyprshade)
- [shadertoy](https://shadertoy.com)
- [wezterm](https://wezterm.org)
