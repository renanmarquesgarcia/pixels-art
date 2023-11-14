const createTitle = () => {
  const header = document.querySelector('header');

  const pageTitle = document.createElement('h1');
  pageTitle.id = 'title';
  pageTitle.innerText = 'Paleta de Cores';

  header.appendChild(pageTitle);
};

const createColorPalette = () => {
  const main = document.querySelector('main');

  const colorPaletteSection = document.createElement('section');
  colorPaletteSection.id = 'color-palette';

  for (let i = 0; i < 4; i += 1) {
    const colorPaletteDiv = document.createElement('div');
    colorPaletteDiv.classList.add('color');
    colorPaletteSection.appendChild(colorPaletteDiv);
  }

  main.appendChild(colorPaletteSection);
};

const generateRandomRgb = () => {
  const randomNumbers = [];
  for (let i = 0; i < 3; i += 1) {
    const number = Math.floor(Math.random() * 255);
    randomNumbers.push(number);
  }

  return `rgb(${randomNumbers[0]}, ${randomNumbers[1]}, ${randomNumbers[2]})`;
};

const addRandomColorsToPalette = () => {
  const colors = document.querySelectorAll('.color');

  for (let i = 1; i < 4; i += 1) {
    colors[i].style.backgroundColor = generateRandomRgb();
  }
};

const createButtonGenerateRandomColors = () => {
  const main = document.querySelector('main');
  const randomColorsBtn = document.createElement('button');
  randomColorsBtn.id = 'button-random-color';
  randomColorsBtn.innerText = 'Cores aleatórias';

  main.appendChild(randomColorsBtn);

  randomColorsBtn.addEventListener('click', addRandomColorsToPalette);
};

window.onload = () => {
  createTitle();
  createColorPalette();
  createButtonGenerateRandomColors();
};
