import { openPopup } from "./index.js";

const popupBigImage = document.querySelector('.popup_big-image');
const bigImage = document.querySelector('.image-container__image');
const bigImageTitle = document.querySelector('.image-container__title');

export class Card {
  constructor (cardName, cardLink, cardSelector){
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardSelector = cardSelector;
  }
  // получаем форму по селектору
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  // слушатели событий
  _setEventListners () {
    //лайк
    const likeButton = this._element.querySelector('.card__button');
    likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__button_active');
    });
    // удалить карточку
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      const listItem = this._element.closest('.card');
      listItem.remove();
    });
    // увеличенное изображение по клику на картинку карточки
    this._element.querySelector('.card__image').addEventListener('click', () => {
      bigImage.src = this._cardLink;
      bigImage.alt = this._cardName;
      bigImageTitle.textContent = this._cardName;
      openPopup(popupBigImage);
    });

    };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._cardName;
    this._element.querySelector('.card__image').alt = this._cardName;
    this._element.querySelector('.card__image').src = this._cardLink;
    this._setEventListners();
    return this._element;
  }
}
