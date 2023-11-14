const createTitle = () => {
  const header = document.querySelector('header');

  const pageTitle = document.createElement('h1');
  pageTitle.id = 'title';
  pageTitle.innerText = 'Paleta de Cores';

  header.appendChild(pageTitle);
};

const getPaletteColorsFromLS = () => {
  const colors = document.querySelectorAll('.color');

  const paletteColorsLS = JSON.parse(localStorage.getItem('colorPalette'));
  if (paletteColorsLS != null) {
    for (let i = 1; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = paletteColorsLS[i - 1];
    }
  }
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

  getPaletteColorsFromLS();
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
  const paletteColors = [];

  for (let i = 1; i < colors.length; i += 1) {
    colors[i].style.backgroundColor = generateRandomRgb();
    paletteColors.push(colors[i].style.backgroundColor);
  }

  localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
};

const createButtonGenerateRandomColors = () => {
  const main = document.querySelector('main');
  const randomColorsBtn = document.createElement('button');
  randomColorsBtn.id = 'button-random-color';
  randomColorsBtn.innerText = 'Cores aleatórias';

  main.appendChild(randomColorsBtn);

  randomColorsBtn.addEventListener('click', addRandomColorsToPalette);
};

const createPixelBoard = () => {
  const main = document.querySelector('main');

  const pixelBoardSection = document.createElement('section');
  pixelBoardSection.id = 'pixel-board';

  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixelBoardSection.appendChild(pixel);
    }
    pixelBoardSection.appendChild(document.createElement('br'));
  }

  main.appendChild(pixelBoardSection);
};

window.onload = () => {
  createTitle();
  createColorPalette();
  createButtonGenerateRandomColors();
  createPixelBoard();
};
