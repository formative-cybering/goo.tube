const shaders = [
  "wormhole",
  "energy1",
  "energy2",
  // "kaleidoscope",
  "wave",
  "tracking",
  "selective-grayscale",
];
let index = 0;

export const bashParse = (data) => {
  if (data?.channel == 8) {
    console.log("shade");
    Deno.run({cmd: ["kitty", "sh","./server/scripts/pixterm.sh"]})
    Deno.run({
      cmd: ["hyprshade", "on", `./server/shaders/${shaders[index]}.glsl`],
      cwd: ".",
    });
    index = (index + 1) % shaders.length;
  }
  if (data?.channel == 11) {
    console.log("shake");
    Deno.run({
      cmd: ["sh", "./shake.sh"],
      cwd: "./tube/scripts",
    });
  }
};
