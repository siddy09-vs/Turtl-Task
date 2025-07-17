document.querySelectorAll('.individual-container').forEach((container) => {
  container.addEventListener('click', () => {
    if (container.classList.contains('plus-container')) {
      return;
    }

    container.classList.toggle('individual-container-active');
  });
});

const blackTextButton = document.querySelector('.black-container');
const redTextButton = document.querySelector('.red-container');
const blueTextButton = document.querySelector('.blue-container');

loadTextColors();

blackTextButton.addEventListener('click', () => {
  changeTextColor('black');

  blackTextButton.classList.add('individual-container-active');
  redTextButton.classList.remove('individual-container-active');
  blueTextButton.classList.remove('individual-container-active');
});

redTextButton.addEventListener('click', () => {
  changeTextColor('red');

  redTextButton.classList.add('individual-container-active');
  blackTextButton.classList.remove('individual-container-active');
  blueTextButton.classList.remove('individual-container-active');
});

blueTextButton.addEventListener('click', () => {
  changeTextColor('blue');

  blueTextButton.classList.add('individual-container-active');
  blackTextButton.classList.remove('individual-container-active');
  redTextButton.classList.remove('individual-container-active');
});

const newNoteButton = document.querySelector('.plus-container');
newNoteButton.addEventListener('click', () => {
  createNewNote();
});
