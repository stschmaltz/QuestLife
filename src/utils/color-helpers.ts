const hexToRgb = (h: string) => {
  const bigint = parseInt(h.startsWith("#") ? h.slice(1) : h, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

function adjustColor(
  hex: string,
  magnitude: number,
  mode: "lighten" | "darken",
): string {
  if (magnitude < 0 || magnitude > 100) {
    throw new Error("Magnitude should be between 0 and 100.");
  }

  const adjust = (channel: number, factor: number) => {
    switch (mode) {
      case "lighten":
        return Math.round(channel + (255 - channel) * factor);
      case "darken":
        return Math.round(channel * (1 - factor));
      default:
        return channel;
    }
  };

  const [r, g, b] = hexToRgb(hex);
  const factor = magnitude / 100;

  return rgbToHex(adjust(r, factor), adjust(g, factor), adjust(b, factor));
}

export { adjustColor };
