/* ---
colors.js
Scrpits responsáveis pela atualiação da paleta, salvar a paleta, e inserir a paleta na lista

1 - editar a cor
2 - salvar a paleta
3 - Funções dentro da tabela

--- */


let neutral = ""; // escopo global
let primary = ""; // escopo global
let accent = ""; // escopo global


// 1 - editar a cor - inserir um valor

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
  
    // Atualizar text.content e css
    colorElement.textContent = newColor;
    changeColor(colorId, newColor);
  };

// 2 - mudar a cor - refresh
const changeColor = (colorId, newColor) => {
  let color;

  if (newColor && validateColor(newColor)) {
    color = newColor;
  } else if (colorId === "neutral") {
    color = generateNeutralColor();
  } else if (colorId === "primary") {
    color = generateRandomColor();
  } else if (colorId === "accent") {
    color = generateRandomColor();
  }

  if (color) {
    // Update the corresponding color variable and CSS property
    if (colorId === "neutral") {
      neutral = color;
      document.getElementById("neutral").textContent = neutral;
    } else if (colorId === "primary") {
      primary = color;
      document.getElementById("primary").textContent = primary;
    } else if (colorId === "accent") {
      accent = color;
      document.getElementById("accent").textContent = accent;
    }

    // Set the CSS custom property for the color
    document.documentElement.style.setProperty(`--${colorId}`, color);

    // Calculate and set the contrast color
    const contrastColor = calculateContrastColor(color);
    document.documentElement.style.setProperty(`--${colorId}-contrast`, contrastColor);

    // Atualize apenas a cor que foi alterada na paleta global
    if (colorId === "neutral") {
      palette[0] = neutral;
    } else if (colorId === "primary") {
      palette[1] = primary;
    } else if (colorId === "accent") {
      palette[2] = accent;
    }

    console.log(`New ${colorId}:`, color);
  }

  // Update the corresponding color in the palette array
};

// verificardo de valor
const validateColor = (color) => {
    const colorPattern = /^#[A-Fa-f0-9]{6}$/;
    return colorPattern.test(color);
  };
  
// 3 - salvar a cor

const saveColor = (colorVariable) => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const colorValue = computedStyle.getPropertyValue(colorVariable).trim();

  
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


// Verificar se a cor já está salva na lista
const isColorInList = (colorValue) => {
  var table = document.getElementById("myColorTable");
  var colorsInList = Array.from(table.querySelectorAll("td:nth-child(2)")).map(
    (cell) => cell.textContent.trim()
  );
  return colorsInList.includes(colorValue);
};


// 4 - inserir a cor na lista

const insertList = (colorName, colorValue) => {
  console.log("Inserindo na lista:", colorName);
  console.log("Inserindo na lista:", colorValue);

  var item = [colorName, colorValue];
  var table = document.getElementById("myColorTable");
  var row = table.insertRow();

  // Display da cor na primeira coluna (index 0)
  var colorDisplayCell = row.insertCell(0);
  var colorDisplay = document.createElement("div");
  colorDisplay.style.height = "30px";
  colorDisplay.style.width = "30px";
  colorDisplay.style.backgroundColor = colorValue; // Set the background color
  colorDisplay.style.border = "1px solid lightgray"; 

  colorDisplayCell.appendChild(colorDisplay);


  // Nome na segunda coluna (index 1)
  var nomeCell = row.insertCell(1);
  nomeCell.textContent = item[0];

  // Hex na terceira coluna (index 2)
  var hexCell = row.insertCell(2);
  hexCell.textContent = item[1];


  // Delete na quarta coluna (index 3)
  insertCloseButton(row.insertCell(3));



  // selecionar a cor - dropdow
  var colorSelect = createColorSelect(row);

  // Selection dropdown para selecionar on inserir a cor. Última coluna (index -1)
  var colorSelectCell = row.insertCell(4);
  colorSelectCell.appendChild(colorSelect);
  removeElement();
};

// 5 - funções dentro da tabela cor id="myColorTable"


// Dropdown
const createColorSelect = (row) => {
  const colorSelect = document.createElement("select");

  // Placeholder "Opções"
  const placeholderOption = document.createElement("option");
  placeholderOption.text = "Opções";
  placeholderOption.disabled = true; 
  placeholderOption.selected = true; 
  colorSelect.appendChild(placeholderOption);

  // Opções do dropdown
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

  colorSelect.addEventListener("change", () => {
    const selectedOption = colorSelect.value;
    const hexValue = row.cells[2].textContent; 
    changeColor(selectedOption, hexValue);
  });

  return colorSelect;
};


// remover da lista
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
