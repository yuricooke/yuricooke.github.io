const generateNeutralColor = () => {
  const maxVal = 16777215;
  const randomNumber = Math.floor(Math.random() * maxVal);
  const randColor = randomNumber.toString(16).padStart(6, "0");
  const hexColor = `#${randColor.toUpperCase()}`;

  const chromaColor = chroma.mix("white", hexColor, 0.1);

  return chromaColor.hex().toUpperCase();
};
const generateRandomColor = () => {
  const maxVal = 16777215;
  const randomNumber = Math.floor(Math.random() * maxVal);
  const randColor = randomNumber.toString(16).padStart(6, "0");
  return `#${randColor.toUpperCase()}`;
};

let palette;

const themeColors = () => {
  let neutral = generateNeutralColor();
  let primary = generateRandomColor();
  let accent = generateRandomColor();


  document.getElementById("neutral").textContent = neutral;
  document.getElementById("primary").textContent = primary;
  document.getElementById("accent").textContent = accent;

  console.log("neutral color:", neutral);
  console.log("primary color:", primary);
  console.log("accent color:", accent);

  palette = setThemeColors(neutral, primary, accent);

};

const setThemeColors = (neutral, primary, accent) => {

  const root = document.documentElement;
  root.style.setProperty("--neutral", neutral);
  root.style.setProperty("--primary", primary);
  root.style.setProperty("--accent", accent);

  const neutralContrast = calculateContrastColor(neutral);
  const primaryContrast = calculateContrastColor(primary);
  const accentContrast = calculateContrastColor(accent);

  root.style.setProperty("--neutral-contrast", neutralContrast);
  root.style.setProperty("--primary-contrast", primaryContrast);
  root.style.setProperty("--accent-contrast", accentContrast);

  console.log("colors in CSS!");
  
  newPalette(neutral, primary, accent);
  let palette = [neutral, primary, accent];
  console.log("Palette from setThemeColors: ", palette);


  return [neutral, primary, accent]; // Return the palette as an array
};

window.addEventListener("DOMContentLoaded", () => {
  themeColors();

  const saveButton = document.getElementById("savePaletteButton");
  saveButton.addEventListener("click", () => {
    savePalette(palette[0], palette[1], palette[2]);
  });
});



document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    themeColors();
  }
});

const calculateContrastColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
};


const newPalette = (neutral, primary, accent) => {

  let paletteNeutral = neutral;
  let palettePrimary = primary;
  let paletteAccent = accent;

  let palette = [paletteNeutral, palettePrimary, paletteAccent];

  return palette;
};
