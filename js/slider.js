new Swiper('.partners__wrapper', {
  // Стрелки
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  // Количество слайдов для показа
  slidesPerView: 1,
  // если слайдов меньше чем нужно
  watchOverflow: true,
  // Отступ между слайдами
  spaceBetween: 30,

  // Управление клавиатурой
  keyboard: {
    // Включить\выключить
    enabled: true,
    // Включить\выключить
    // только когда слайдер
    // в пределах вьюпорта
    onlyInViewport: true,
    // Включить\выключить
    // управление клавишами
    // pageUp, pageDown
    pageUpDown: false,
  },

  // Бесконечный слайдер
  loop: true,
  // Брейк поинты(адаптив)
  // Ширина экрана
  breakpoints: {
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    965: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    }
  },
  autoplay: {
    delay: 2000,
  },
  // Корректная работа перетаскивания/свайпа для дочернего слайдера
  nested: true,
  // Переключение при клике на слайд
  slideToClickedSlide: false,
  // Автовысота
  // autoHeight: true,
});