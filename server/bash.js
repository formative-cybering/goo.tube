const shaders = ["invert", "energy1", "energy2"];
const index = 0;

export const bashParse = (data) => {
  if (data?.channel == 8) {
    console.log("shade");
    Deno.run({
      cmd: ["hyprshade", "on", shaders[index]],
      cwd: ".",
    });
    index++;
  }
  if (data?.channel == 11) {
    console.log("shake");
    Deno.run({
      cmd: ["sh", "./shake.sh"],
      cwd: "./tube/scripts",
    });
  }
};
