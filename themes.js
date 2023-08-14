
function generateRandomColor() {
  const maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  const randColor = randomNumber.padStart(6, "0");
  return `#${randColor.toUpperCase()}`;
}


// Generate three random background colors
// Outputs a random color code like "#A1B2C3"

var color1 = generateRandomColor();
var color2 = generateRandomColor();
var color3 = generateRandomColor();



// APPLY COLOR TO A THEME PRIMARY ACCENT NEUTRAL

const themes = 
  {
    name: "theme",
    primary: color1,
    accent: color2,
    neutral: color3,
  }

console.log("Color 1 - Primary:",color1)
console.log("Color 2 - Accent:", color2);
console.log("Color 3 - Neutral:", themes.neutral);



function getContrastRatio(background, foreground) {
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function calculateRelativeLuminance(rgb) {
    const { r, g, b } = rgb;
    const sRGB = [r / 255, g / 255, b / 255];
    const sRGBAdjusted = sRGB.map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    const luminance =
      0.2126 * sRGBAdjusted[0] +
      0.7152 * sRGBAdjusted[1] +
      0.0722 * sRGBAdjusted[2];
    return luminance;
  }

  const backgroundRgb = hexToRgb(background);
  const foregroundRgb = hexToRgb(foreground);

  const backgroundLuminance = calculateRelativeLuminance(backgroundRgb);
  const foregroundLuminance = calculateRelativeLuminance(foregroundRgb);

  const contrastRatio =
    (backgroundLuminance + 0.05) / (foregroundLuminance + 0.05);

  return contrastRatio;
}


// Specify a text color
const foreground = "#000000"; // For example, black

// Calculate the contrast ratio for each background color
const contrastRatio1 = getContrastRatio(color1, foreground);
const contrastRatio2 = getContrastRatio(color2, foreground);
const contrastRatio3 = getContrastRatio(color3, foreground);

// Display the results
//console.log("Background 1:", color1, "//", "Contrast ratio 1:", contrastRatio1);
//console.log("Background 2:", color2, "//", "Contrast ratio 2:", contrastRatio2);
//console.log("Background 3:", color3, "//", "Contrast ratio 3:", contrastRatio3);

// Update the HTML elements with the random color codes
{
document.getElementById("color1").textContent = color1;
document.getElementById("color1").style.color =
  contrastRatio1 >= 5 ? "#212121" : "#FBFCF8";
document.getElementById("color2").textContent = color2;
document.getElementById("color2").style.color =
  contrastRatio2 >= 5 ? "#212121" : "#FBFCF8";
document.getElementById("color3").textContent = color3;
document.getElementById("color3").style.color =
  contrastRatio1 >= 5 ? "#212121" : "#FBFCF8";
}


// Function to change the theme color
function newThemeColor() {
  // Generate a new random color
  color1 = generateRandomColor();
  color2 = generateRandomColor();
  color3 = generateRandomColor();

  // assign color to color

  //  let color1 = color1;
  //  let color2 = color2;
  //  let color3 = color3;

  // Display the results
  console.log("New color 1:", color1);
  //console.log("Contrast ratio 1:", contrastRatio1);
  console.log("New color 2:", color2);
  //console.log("Contrast ratio 2:", contrastRatio2);
  console.log("New color 3:", color3);
  //console.log("Contrast ratio 3:", contrastRatio3);

  // Update the theme color
  const root = document.documentElement;
  root.style.setProperty("--primary", color1);
  root.style.setProperty("--accent", color2);
  root.style.setProperty("--neutral", color3);

  // Update any other elements that need to reflect the new color
  // For example, if you have a text element with ID 'color1'
  document.getElementById("color1").textContent = color1;
  document.getElementById("color1").style.color =
    getContrastRatio(color1, foreground) >= 5 ? "#212121" : "#FBFCF8";
  document.getElementById("color2").textContent = color2;
  document.getElementById("color2").style.color =
    getContrastRatio(color2, foreground) >= 5 ? "#212121" : "#FBFCF8";
  document.getElementById("color3").textContent = color3;
  document.getElementById("color3").style.color =
    getContrastRatio(color3, foreground) >= 5 ? "#212121" : "#FBFCF8";
}



function changeColor1() {
  // Generate a new random color
  color1 = generateRandomColor();

  
  // Update the CSS variable with the new color
  document.documentElement.style.setProperty("--primary", color1);

  // Update the corresponding HTML element
  document.getElementById("color1").textContent = color1;
  document.getElementById("color1").style.color = getContrastRatio(color1, foreground) >= 5 ? "#212121" : "#FBFCF8";

  //display results
  console.log("New color 1:", color1);

}

function changeColor2() {
  // Generate a new random color
  color2 = generateRandomColor();

  
  // Update the CSS variable with the new color
  document.documentElement.style.setProperty("--accent", color2);

  // Update the corresponding HTML element
  document.getElementById("color2").textContent = color2;
  document.getElementById("color2").style.color = getContrastRatio(color2, foreground) >= 5 ? "#212121" : "#FBFCF8";

  //display results
  console.log("New color 2:", color2);

}

function changeColor3() {
  // Generate a new random color
  color3 = generateRandomColor();

  
  // Update the CSS variable with the new color
  document.documentElement.style.setProperty("--neutral", color3);

  // Update the corresponding HTML element
  document.getElementById("color3").textContent = color3;
  document.getElementById("color3").style.color = getContrastRatio(color3, foreground) >= 5 ? "#212121" : "#FBFCF8";

  //display results
  console.log("New color 3:", color3);

}






// RANDOM ON WINDOW LOAD
window.addEventListener("load", newThemeColor());



// Change themes on spacebar press
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent default behavior of spacebar (scrolling)
    newThemeColor();
  }
});

//document.addEventListener('touchstart', (event) => {
//  event.preventDefault();
//  newThemeColor();
//});




// OLD setRandomTheme() RANDOM COLORS ON THEME

// function setRandomTheme() {
//   const randomIndex = Math.floor(Math.random() * themes.length);
//   const randomTheme = themes[randomIndex];
//   const root = document.documentElement;

//   root.style.setProperty("--primary", randomTheme.primary);
//   root.style.setProperty("--accent", randomTheme.accent);
//   root.style.setProperty("--neutral", randomTheme.neutral);
// }