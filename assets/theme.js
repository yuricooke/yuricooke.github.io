
function generateRandomColor() {
  const maxVal = 16777215;
  const randomNumber = Math.floor(Math.random() * maxVal);
  const randColor = randomNumber.toString(16).padStart(6, "0");
  return `#${randColor.toUpperCase()}`;
}

function newThemeColor() {
  let color1 = generateRandomColor();
  let color2 = generateRandomColor();
  let color3 = generateRandomColor();
  
  updateThemeColors(color1, color2, color3);

  document.getElementById('color1').textContent = color1;
  document.getElementById('color2').textContent = color2;
  document.getElementById('color3').textContent = color3;
  
  console.log("New color 1:", color1);
  console.log("New color 2:", color2);
  console.log("New color 3:", color3);
  
}


window.addEventListener("load", newThemeColor);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    newThemeColor();
  }
});


function calculateContrastColor(color) {
  // Convert color to RGB components
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);

  // Calculate color brightness using relative luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Determine contrast color based on brightness
  return brightness > 128 ? "#000000" : "#FFFFFF";
}


function updateThemeColors(color1, color2, color3) {
  const root = document.documentElement;
  root.style.setProperty("--primary", color1);
  root.style.setProperty("--accent", color2);
  root.style.setProperty("--neutral", color3);

  const primaryContrast = calculateContrastColor(color1);
  const accentContrast = calculateContrastColor(color2);
  const neutralContrast = calculateContrastColor(color3);

  root.style.setProperty("--primary-contrast", primaryContrast);
  root.style.setProperty("--accent-contrast", accentContrast);
  root.style.setProperty("--neutral-contrast", neutralContrast);
}

function changeColor(elementId) {
  let color;
  if (elementId === "color1") {
    color = generateRandomColor();
    color1 = color;
    document.documentElement.style.setProperty("--primary", color);
    document.getElementById('color1').textContent = color1;

    const primaryContrast = calculateContrastColor(color1);
    document.documentElement.style.setProperty("--primary-contrast", primaryContrast);
  } else if (elementId === "color2") {
    color = generateRandomColor();
    color2 = color;
    document.documentElement.style.setProperty("--accent", color);
    document.getElementById('color2').textContent = color2;

    const accentContrast = calculateContrastColor(color2);
    document.documentElement.style.setProperty("--accent-contrast", accentContrast);
  } else if (elementId === "color3") {
    color = generateRandomColor();
    color3 = color;
    document.documentElement.style.setProperty("--neutral", color);
    document.getElementById('color3').textContent = color3;

    const neutralContrast = calculateContrastColor(color3);
    document.documentElement.style.setProperty("--neutral-contrast", neutralContrast);
  }

  console.log(`New ${elementId}:`, color);
}

function filterCards(filter) {
  const cards = document.querySelectorAll('#cards .card');

  

  cards.forEach(card => {
    if (filter === 'all' || card.parentNode.getAttribute('data-category') === filter) {
      card.parentNode.style.display = 'flex';
    } else {
      card.parentNode.style.display = 'none';
    }
  });
}