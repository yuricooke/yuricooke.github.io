/* ---
palette.js
Scrpits responsáveis pela atualiação da paleta, salvar a paleta, e inserir a paleta na lista

1 - atualização da paleta
2 - salvar a paleta
3 - Funções dentro da tabela

--- */

let palette; // paleta no escopo global

// 1 - atualização da paleta

const newPalette = (neutral, primary, accent) => {
  let paletteNeutral = neutral;
  let palettePrimary = primary;
  let paletteAccent = accent;

  palette = [paletteNeutral, palettePrimary, paletteAccent];

  console.log("Nova paleta:", palette);

  return palette;
};

// 2 - salvar a paleta

const saveButtonPalette = () => {
  let saveNeutral = palette[0];
  let savePrimary = palette[1];
  let saveAccent = palette[2];

  //console.log("Salvando: ", saveNeutral, savePrimary, saveAccent);
  savePalette(saveNeutral, savePrimary, saveAccent);
};

const savePalette = (saveNeutral, savePrimary, saveAccent) => {
  const paletteName = prompt("Insira um nome para a paleta:");
  if (paletteName === null || paletteName === "") {
    alert("Insira um nome válido.");
    return;
  }

  let palette;
  palette = newPalette(saveNeutral, savePrimary, saveAccent);

  alert(`Paleta ${paletteName} salva com sucesso!`);
  insertPaletteList(paletteName, palette[0], palette[1], palette[2]);
  postPaletteItem(paletteName, palette[0], palette[1], palette[2]);
};

// 2 - inserir a paleta na list

const insertPaletteList = (paletteName, paletteNeutral, palettePrimary,paletteAccent) => {

  var item = [paletteName, paletteNeutral, palettePrimary, paletteAccent];
  var table = document.getElementById("myPaletteTable");
  var row = table.insertRow();

  // display da paleta
  var colorBarsContainer = document.createElement("div");
  colorBarsContainer.className = "color-bars-container";
  colorBarsContainer.style.border = "1px solid lightgray";
  colorBarsContainer.style.width = "32px";

  // div neutral
  var neutralColorBar = createColorBar(paletteNeutral, "neutral-bar");

  // div primary
  var primaryColorBar = createColorBar(palettePrimary, "primary-bar");

  // div accent
  var accentColorBar = createColorBar(paletteAccent, "accent-bar");

  colorBarsContainer.appendChild(neutralColorBar);
  colorBarsContainer.appendChild(primaryColorBar);
  colorBarsContainer.appendChild(accentColorBar);

  // Display na primira coluna (index 0)
  var colorBarsCell = row.insertCell(0);
  colorBarsCell.appendChild(colorBarsContainer);

  // Nome na segunda coluna (index 1)
  var nomeCell = row.insertCell(1);
  nomeCell.textContent = item[0];

  // "Neutral" na terceira coluna (index 2)
  var neutralCell = row.insertCell(2);
  neutralCell.textContent = item[1];

  // "Primary" na quarta coluna (index 3)
  var primaryCell = row.insertCell(3);
  primaryCell.textContent = item[2];

  // "Accent" na quinta coluna (index 4)
  var accentCell = row.insertCell(4);
  accentCell.textContent = item[3];

  // Delete na sexta coluna (index 5)
  insertPaletteCloseButton(row.insertCell(5));

  // "SelectPalette" na última coluna (index -1)
  var selectPaletteCell = row.insertCell(-1);
  var selectPaletteButton = document.createElement("button");
  selectPaletteButton.textContent = "Selecionar";
  selectPaletteButton.className = "select-palette-button"; 

  selectPaletteButton.addEventListener("click", () => {
    handleSelectPalette(row);
  });
  selectPaletteCell.appendChild(selectPaletteButton);

  removePaletteElement();
};

// 3 - Funções dentro da tabela paleta id="myPaletteTable"


const createColorBar = (color, cssClass) => {

  var colorBar = document.createElement("div");
  colorBar.className = `color-bar ${cssClass}`;
  colorBar.style.backgroundColor = color;

  return colorBar;
};

const handleSelectPalette = (row) => {

  const paletteName = row.cells[1].textContent;
  const paletteNeutral = row.cells[2].textContent;
  const palettePrimary = row.cells[3].textContent;
  const paletteAccent = row.cells[4].textContent;

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
