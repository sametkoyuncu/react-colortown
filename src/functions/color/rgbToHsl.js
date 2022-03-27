// rgb to hsl function
const rgbToHsl = (r, g, b) => {
  // eslint-disable-next-line no-param-reassign
  r /= 255;
  // eslint-disable-next-line no-param-reassign
  g /= 255;
  // eslint-disable-next-line no-param-reassign
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    // eslint-disable-next-line no-multi-assign
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
    }
    h /= 6;
  }
  // return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
  return `hsl(${Math.floor(h * 360)}, ${Math.floor(s * 100)}%, ${Math.floor(l * 100)}%)`;
};
export default rgbToHsl;
