const popupBigImage = document.querySelector('.popup_big-image');
const bigImage = document.querySelector('.image-container__image');
const bigImageTitle = document.querySelector('.image-container__title');
const cardContainer = document.querySelector('.cards__grid');
const profileSelectors = {
  name: '.profile__name',
  info: '.profile__profession'
};

// функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscape);
};

// функция закрытия по кнопке escape
function handleEscape(event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

export { popupBigImage, bigImage, bigImageTitle, cardContainer, profileSelectors, handleEscape, openPopup };
