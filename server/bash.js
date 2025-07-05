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

const run = (cmd) => {
  Deno.run({ cmd: cmd.split(" "), cwd: "./server/scripts" });
};

export const bashParse = (data) => {
  switch (data?.channel) {
    case 8:
      run("kitty sh pixterm.sh");
      run(`hyprshade on ${shaders[index]}.glsl`);
      index = (index + 1) % shaders.length;
      break;
    case 11:
      run("sh shake.sh");
      break;
  }
};
