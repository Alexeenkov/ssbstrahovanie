const burger = document.querySelector('.header__burger-wrapper');
const headerBurger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const menuLinks = document.querySelectorAll('.header__link');

burger.addEventListener('click', () => {
  headerBurger.classList.toggle('active');
  menu.classList.toggle('active');
});

for (let link of menuLinks) {
  link.addEventListener('click', (event) => {
    headerBurger.classList.remove('active');
    menu.classList.remove('active');
  });
}