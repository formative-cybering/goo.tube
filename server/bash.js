const shaders = [
  // "wormhole",
  "energy1",
  "energy2",
  // "kaleidoscope",
  "wave",
  "tracking",
  "selective-grayscale",
];
let index = 0;

const cwd = "./server/scripts";

export const bashParse = (data) => {
  if (data?.channel == 8) {
    console.log("shade");
    Deno.run({ cmd: ["kitty", "sh", "pixterm.sh"], cwd });
    Deno.run({
      cmd: ["hyprshade", "on", `${shaders[index]}.glsl`],
      cwd,
    });
    index = (index + 1) % shaders.length;
  }
  if (data?.channel == 11) {
    console.log("shake");
    Deno.run({ cmd: ["sh", "shake.sh"], cwd });
  }
};
