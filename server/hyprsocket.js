// This will allow control via Hyprsocket
// Currently not used, keeping here for future reference

const runtime = Deno.env.get("XDG_RUNTIME_DIR");
const his = Deno.env.get("HYPRLAND_INSTANCE_SIGNATURE");
const socketPath = `${runtime}/hypr/${his}/.socket.sock`;

const send = async (text) => {
  const hypr = await Deno.connect({ path: socketPath, transport: "unix" });
  await hypr.write(new TextEncoder().encode(`/${text}\r\n`));
  hypr.close();
};

export const hyprParse = async (data) => {};
