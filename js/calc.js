const blocksCalc = document.querySelectorAll('.calc-block');
const buttonNext = document.querySelector('.button-next');
const buttonBack = document.querySelector('.button-back');
const buttonRas = document.querySelector('.btn-ras');
const buttonReset = document.querySelector('.btn-reset');

buttonNext.addEventListener('click', () => {
  for (let i = 0; i < blocksCalc.length; i++) {
    if (i >= 0) {
      buttonBack.classList.remove('block-hide');
    }
    if (!blocksCalc[i].classList.contains('block-hide')) {
      blocksCalc[i].classList.add('block-hide');
      blocksCalc[i + 1].classList.remove('block-hide');
      if (blocksCalc[i + 1].classList.contains('block-last')) {
        buttonRas.classList.remove('block-hide');
        buttonNext.classList.add('block-hide');
      }
      break;
    }
  }
});

buttonBack.addEventListener('click', () => {
  for (let i = 0; i < blocksCalc.length; i++) {
    if (!blocksCalc[i].classList.contains('block-hide')) {
      blocksCalc[i].classList.add('block-hide');
      blocksCalc[i - 1].classList.remove('block-hide');
      buttonNext.classList.remove('block-hide');
      buttonRas.classList.add('block-hide');
      if (i - 1 === 0) {
        buttonBack.classList.add('block-hide');
      }
      break;
    }
  }
});