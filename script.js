const getPaletteColorsFromLS = () => {
  const colors = document.querySelectorAll('.color');
  const paletteColorsLS = JSON.parse(localStorage.getItem('colorPalette'));

  if (paletteColorsLS !== null) {
    for (let i = 1; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = paletteColorsLS[i - 1];
    }
  }
};

const selectColor = () => {
  const paletteColors = document.querySelectorAll('.color');

  for (let i = 0; i < paletteColors.length; i += 1) {
    paletteColors[i].addEventListener('click', (event) => {
      const selectedColor = document.querySelector('.selected');
      if (selectedColor) {
        selectedColor.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
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
  const randomColorsBtn = document.getElementById('button-random-color');
  randomColorsBtn.addEventListener('click', () => {
    const colors = document.querySelectorAll('.color');
    const paletteColors = [];

    for (let i = 1; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = generateRandomRgb();
      paletteColors.push(colors[i].style.backgroundColor);
    }

    localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
  });
};

const boardSizeValidation = (size) => {
  const boardSizeLS = localStorage.getItem('boardSize');
  let newSize = size;

  if (boardSizeLS !== null) {
    newSize = boardSizeLS;
  }
  if (size < 5) {
    newSize = 5;
  } else if (size > 50) {
    newSize = 50;
  }

  return newSize;
};

const createPixelBoard = (size) => {
  const main = document.querySelector('main');
  const pixelBoardSection = document.createElement('section');
  pixelBoardSection.id = 'pixel-board';

  let countPixels = 0;
  const sizeAfterValidation = boardSizeValidation(size);

  for (let i = 0; i < sizeAfterValidation; i += 1) {
    for (let j = 0; j < sizeAfterValidation; j += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      countPixels += 1;
      pixel.id += countPixels;
      pixelBoardSection.appendChild(pixel);
    }
    pixelBoardSection.appendChild(document.createElement('br'));
  }
  main.appendChild(pixelBoardSection);
};

const paintPixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', (event) => {
      const selectedColor = document.querySelector('.selected');
      const compStyles = window.getComputedStyle(selectedColor);
      const pixel = document.getElementById(`${event.target.id}`);
      pixel.style.backgroundColor = compStyles.getPropertyValue('background-color');
    });
  }
};

const clearPixelBoard = () => {
  const resetBtn = document.getElementById('clear-board');

  resetBtn.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = 'white';
    }

    localStorage.removeItem('pixelBoard');
  });
};

const setPaintedPixelBoardLS = () => {
  const pixels = document.querySelectorAll('.pixel');
  const paintedPixels = [];

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', (event) => {
      const color = event.target.style.backgroundColor;
      const { id } = event.target;
      paintedPixels.push({ color, id });
      localStorage.setItem('pixelBoard', JSON.stringify(paintedPixels));
    });
  }
};

const getPaintedPixelBoardLS = () => {
  const paintedPixels = JSON.parse(localStorage.getItem('pixelBoard'));

  if (paintedPixels !== null) {
    for (let i = 0; i < paintedPixels.length; i += 1) {
      const pixel = document.getElementById(`${paintedPixels[i].id}`);
      pixel.style.backgroundColor = paintedPixels[i].color;
    }
  }
};

const validationBoardSizeLS = (size) => {
  let boardSizeLS = size;

  if (size < 5) boardSizeLS = 5;
  else if (boardSizeLS > 50) boardSizeLS = 50;

  return boardSizeLS;
};

const setNewBoardSize = () => {
  const main = document.querySelector('main');
  const generateBoardBtn = document.getElementById('generate-board');

  generateBoardBtn.addEventListener('click', () => {
    const input = document.getElementById('board-size');
    const pixelBoard = document.getElementById('pixel-board');
    if (input.value === '') {
      alert('Board inválido!');
    } else {
      main.removeChild(pixelBoard);
      const boardSizeLS = validationBoardSizeLS(Number(input.value));
      localStorage.setItem('boardSize', boardSizeLS);
      createPixelBoard(JSON.parse(localStorage.getItem('boardSize')));
      paintPixelBoard();
    }
  });
};

window.onload = () => {
  getPaletteColorsFromLS();
  addRandomColorsToPalette();
  clearPixelBoard();
  setNewBoardSize();
  createPixelBoard(5);
  selectColor();
  paintPixelBoard();
  setPaintedPixelBoardLS();
  getPaintedPixelBoardLS();
};
