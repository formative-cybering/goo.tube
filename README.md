![goo.tube](/gootube.gif)

# Goo Tube

OSC desktop performance server for Tidal Cycles and Hyprland.

```sh
deno run dev
```

UDP server will listen for OSC messages on port `1111`.

Messages will be parsed and dispatched to websockets on port `2222`; they
can additionally be handled by arbitrary bash, cli, or hyprsocket actions.

Webserver will start on port `3333`.

---

Shout out:

- [Hyprland](https://hypr.land)
- [Tidal Cycles](https://tidalcycles.org)
- [Pixterm](https://github.com/eliukblau/pixterm)
- [Hyprshade](https://github.com/loqusion/hyprshade)
- [Shadertoy](https://shadertoy.com)
- [Wezterm](https://wezterm.org)
