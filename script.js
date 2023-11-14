const createTitle = () => {
  const header = document.querySelector('header');

  const pageTitle = document.createElement('h1');
  pageTitle.id = 'title';
  pageTitle.innerText = 'Paleta de Cores';

  header.appendChild(pageTitle);
};

window.onload = () => {
  createTitle();
};
