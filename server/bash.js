const run = (cmd) => {
  Deno.run({ cmd: cmd.split(" "), cwd: "./server/scripts" });
};

export const bashParse = (data) => {};
