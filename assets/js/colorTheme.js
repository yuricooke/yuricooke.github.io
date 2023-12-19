
/* ---
colorThemes.js
Scripts responsáveis pela geração de cores e updates nas funções e variáveis. 

1 - criação de cores randômicas
2 - chamada inicial para gerar novas cores ao abrir a aplicação
3 - Estabelecer a paleta com os valores presentes no css


--- */


// 1 - criação de cores randômicas - neutral com luminosidade 0.1
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


const calculateContrastColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
};

// 2 - chamada inicial para gerar novas cores ao abrir a aplicação

const themeColors = () => {
  let neutral = generateNeutralColor();
  let primary = generateRandomColor();
  let accent = generateRandomColor();


  document.getElementById("neutral").textContent = neutral;
  document.getElementById("primary").textContent = primary;
  document.getElementById("accent").textContent = accent;

  //console.log("neutral color:", neutral);
  //console.log("primary color:", primary);
  //console.log("accent color:", accent);

  setThemeColors(neutral, primary, accent);

};

window.addEventListener("DOMContentLoaded", () => {
  themeColors();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    themeColors();
  }
});

// 3 - Estabelecer a paleta com os valores presentes no css | var() --neutral, --primary, --accent
const setThemeColors = (neutral, primary, accent) => {

  const palette = newPalette(neutral, primary, accent);

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

  //console.log("colors in CSS! ", neutral, primary, accent);
  return; // Retorna a paleta como uma array
  
};


