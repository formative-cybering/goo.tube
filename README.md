![goo.tube](/gootube.gif)

# Goo Tube

[OSC](https://en.wikipedia.org/wiki/Open_Sound_Control) desktop performance server for [Tidal Cycles](https://tidalcycles.org/) and [Hyprland](https://hypr.land).

> [!CAUTION]
> This repo is mainly for personal artistic use, it requires a bespoke setup to your machine and needs. It's great for arbitrarily passing OSC messages to bash scripts and/or websockets, but it will only do what you tell it to do, and in its default state will not do much.

```sh
deno run dev
```

![goo.tube](/1.png)

UDP server will listen for OSC messages on port `1111`.

Messages will be parsed and dispatched to websockets on port `2222`; they
can additionally be handled by arbitrary bash, cli, or hyprsocket actions.

Webserver will start on port `3333`.

![goo.tube](/2.png)

Shout out:

- [Hyprland](https://hypr.land)
- [Tidal Cycles](https://tidalcycles.org)
- [Pixterm](https://github.com/eliukblau/pixterm)
- [Hyprshade](https://github.com/loqusion/hyprshade)
- [Shadertoy](https://shadertoy.com)
- [Wezterm](https://wezterm.org)
