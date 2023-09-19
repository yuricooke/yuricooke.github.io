/*
BOTÕES MUDAR A COR
*/

/*
  CAMPO INSERIR A COR DESEJADA
  */
  const editColor = (colorId) => {
    const colorElement = document.getElementById(colorId);
    const currentColor = colorElement.textContent;
  
    let newColor;
  
    do {
      newColor = prompt(
        "Insira um novo valor HEX (exatamente 7 caracteres):",
        currentColor
      );
  
      if (!newColor) {
        alert("Insira um novo valor.");
        return;
      }
  
      if (!validateColor(newColor)) {
        alert(
          "O valor HEX deve começar com '#' seguido por exatamente 6 caracteres de A-F ou 0-9."
        );
      }
    } while (!validateColor(newColor));
  
    // Update both the text content and the CSS custom property
    colorElement.textContent = newColor;
    changeColor(colorId, newColor);
  };
  
  
  

const changeColor = (colorId, newColor) => {
  let color;
  if (colorId === "neutral") {
    color = newColor || generateNeutralColor();
    neutral = color;
    document.documentElement.style.setProperty("--neutral", color);
    document.getElementById("neutral").textContent = neutral;

    const neutralContrast = calculateContrastColor(neutral);
    document.documentElement.style.setProperty(
      "--neutral-contrast",
      neutralContrast
    );
  } else if (colorId === "primary") {
    color = newColor || generateRandomColor();
    primary = color;
    document.documentElement.style.setProperty("--primary", color);
    document.getElementById("primary").textContent = primary;

    const primaryContrast = calculateContrastColor(primary);
    document.documentElement.style.setProperty(
      "--primary-contrast",
      primaryContrast
    );
  } else if (colorId === "accent") {
    color = newColor || generateRandomColor();
    accent = color;
    document.documentElement.style.setProperty("--accent", color);
    document.getElementById("accent").textContent = accent;

    const accentContrast = calculateContrastColor(accent);
    document.documentElement.style.setProperty(
      "--accent-contrast",
      accentContrast
    );
  }

  console.log(`New ${colorId}:`, color);
};


const validateColor = (color) => {
    const colorPattern = /^#[A-Fa-f0-9]{6}$/;
    return colorPattern.test(color);
  };
  


/*
  BOTÕES SALVAR A COR
  */

const saveColor = (colorVariable) => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const colorValue = computedStyle.getPropertyValue(colorVariable).trim();

  // Check if the color is already in the list
  if (isColorInList(colorValue)) {
    alert(`A cor ${colorValue} já está na lista.`);
  } else {
    // Color is not in the list, prompt for a name
    const colorName = prompt("Insira um nome para a cor:");
    if (!colorName) {
      alert("Insira um nome.");
      return;
    }

    // Display success alert before proceeding
    alert(`Cor ${colorValue} salva com sucesso!`);
    // Chame a função para inserir a cor e nome na lista no front
    insertList(colorName, colorValue);
    // Chame a função para inserir a cor e nome na lista no back
    postItem(colorName, colorValue);
  }
};

const isColorInList = (colorValue) => {
  var table = document.getElementById("myColorTable");
  var colorsInList = Array.from(table.querySelectorAll("td:nth-child(2)")).map(
    (cell) => cell.textContent.trim()
  );
  return colorsInList.includes(colorValue);
};

/*
  INSERINDO A COR NA LISTA
  */

const insertList = (colorName, colorValue) => {
  console.log("Inserindo na lista:", colorName);
  console.log("Inserindo na lista:", colorValue);

  var item = [colorName, colorValue];
  var table = document.getElementById("myColorTable");
  var row = table.insertRow();

  // Create and add the color display box to the first cell
  var colorDisplayCell = row.insertCell(0);
  var colorDisplay = document.createElement("div");
  colorDisplay.style.height = "30px";
  colorDisplay.style.width = "30px";
  colorDisplay.style.backgroundColor = colorValue; // Set the background color
  colorDisplayCell.appendChild(colorDisplay);

  // Create the color selection dropdown and pass the row
  var colorSelect = createColorSelect(row);

  // Insert "Nome" in the second cell (index 1)
  var nomeCell = row.insertCell(1);
  nomeCell.textContent = item[0];

  // Insert "Hex" in the third cell (index 2)
  var hexCell = row.insertCell(2);
  hexCell.textContent = item[1];


  // Insert delete button in the last cell (index -1)
  insertCloseButton(row.insertCell(3));

  // Insert the color selection dropdown in the cell with the 'select-color' ID
  var colorSelectCell = row.insertCell(4);
  colorSelectCell.appendChild(colorSelect);
  removeElement();
};

// Function to create the color selection dropdown
const createColorSelect = (row) => {
  const colorSelect = document.createElement("select");

  // Create a placeholder option
  const placeholderOption = document.createElement("option");
  placeholderOption.text = "Opções";
  placeholderOption.disabled = true; // Disable the placeholder option
  placeholderOption.selected = true; // Select the placeholder option by default
  colorSelect.appendChild(placeholderOption);

  // Create options for the dropdown
  const options = [
    { text: "Neutral", value: "neutral" },
    { text: "Primary", value: "primary" },
    { text: "Accent", value: "accent" },
  ];

  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.text = option.text;
    opt.value = option.value;
    colorSelect.appendChild(opt);
  });

  // Add an event listener to handle the dropdown selection
  colorSelect.addEventListener("change", () => {
    const selectedOption = colorSelect.value;
    const hexValue = row.cells[2].textContent; // Get hex value from the third cell (index 2)
    changeColor(selectedOption, hexValue);
  });

  return colorSelect;
};


//REMOVER ITEM DA LISTA

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[1].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deleteItem(nomeItem);
        alert("Removido!");
      }
    };
  }
};
const insertCloseButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
};



/* FUNÇÕES PARA A PALETA */



const savePalette = (paletteNeutral, palettePrimary, paletteAccent) => {
  // Prompt the user for a palette name
  const paletteName = prompt("Insira um nome para a paleta:");
  if (!paletteName) {
    alert("Insira um nome válido.");
    return;
  }

  // Display success alert before proceeding
  alert(`Paleta ${paletteName} salva com sucesso!`);

  // Chame a função para inserir a cor e nome na lista no front
  insertPaletteList(paletteName, paletteNeutral, palettePrimary, paletteAccent);
  // Chame a função para inserir a cor e nome na lista no back
  postPaletteItem(paletteName, paletteNeutral, palettePrimary, paletteAccent);
};

const insertPaletteList = (paletteName, paletteNeutral, palettePrimary, paletteAccent) => {
  let paletteList = [paletteName, paletteNeutral, palettePrimary, paletteAccent];
  console.log("Inserindo na lista:", paletteList);

  var item = [paletteName, paletteNeutral, palettePrimary, paletteAccent];
  var table = document.getElementById("myPaletteTable");
  var row = table.insertRow();

  // Create a container div for the colored bars
  var colorBarsContainer = document.createElement("div");
  colorBarsContainer.className = "color-bars-container";
  
  // Create a div for the neutral color bar
  var neutralColorBar = createColorBar(paletteNeutral, "neutral-bar");
  
  // Create a div for the primary color bar
  var primaryColorBar = createColorBar(palettePrimary, "primary-bar");
  
  // Create a div for the accent color bar
  var accentColorBar = createColorBar(paletteAccent, "accent-bar");
  
  // Append the color bars to the container
  colorBarsContainer.appendChild(neutralColorBar);
  colorBarsContainer.appendChild(primaryColorBar);
  colorBarsContainer.appendChild(accentColorBar);

  // Insert the container with color bars in the first cell
  var colorBarsCell = row.insertCell(0);
  colorBarsCell.appendChild(colorBarsContainer);

  // Insert "Nome" in the second cell (index 1)
  var nomeCell = row.insertCell(1);
  nomeCell.textContent = item[0];

  // Insert "Neutral" in the third cell (index 2)
  var neutralCell = row.insertCell(2);
  neutralCell.textContent = item[1];

  // Insert "primary" in the fourth cell (index 3)
  var primaryCell = row.insertCell(3);
  primaryCell.textContent = item[2];

  // Insert "accent" in the fifth cell (index 4)
  var accentCell = row.insertCell(4);
  accentCell.textContent = item[3];

  // Insert delete button in the last cell (index 5)
  insertPaletteCloseButton(row.insertCell(5));

  // Insert "SelectPalette" button in the sixth cell (index -1)
  var selectPaletteCell = row.insertCell(-1);
  var selectPaletteButton = document.createElement("button");
  selectPaletteButton.textContent = "Selecionar";
  selectPaletteButton.className = "select-palette-button"; // Add a class here

  selectPaletteButton.addEventListener("click", () => {
    handleSelectPalette(row); // Pass the row to the handler
  });
  selectPaletteCell.appendChild(selectPaletteButton);

  removePaletteElement();
};

// Function to create a colored bar
const createColorBar = (color, cssClass) => {
  var colorBar = document.createElement("div");
  colorBar.className = `color-bar ${cssClass}`;
  colorBar.style.backgroundColor = color;
  return colorBar;
};





const handleSelectPalette = (row) => {
  // Retrieve the palette values from the row
  const paletteName = row.cells[1].textContent;
  const paletteNeutral = row.cells[2].textContent;
  const palettePrimary = row.cells[3].textContent;
  const paletteAccent = row.cells[4].textContent;

  // Call setThemeColors with the retrieved palette values
  setThemeColors(paletteNeutral, palettePrimary, paletteAccent);
};



const removePaletteElement = () => {
  let close = document.getElementsByClassName("closePaletteItem");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName("td")[1].innerHTML;
      if (confirm("Você tem certeza?")) {
        div.remove();
        deletePaletteItem(nomeItem);
        alert("Removido!");
      }
    };
  }
};
const insertPaletteCloseButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "closePaletteItem";
  span.appendChild(txt);
  parent.appendChild(span);

  
};