import { popupBigImage, bigImage, bigImageTitle, openPopup, cardContainer } from "./utils.js";

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
  // удаление карточки
  _deleteCard () {
    this._element.remove();
    this._element = null;
  }
  // увеличиваем изображение карточки
  _openBigImage () {
    bigImage.src = this._cardLink;
    bigImage.alt = this._cardName;
    bigImageTitle.textContent = this._cardName;
    openPopup(popupBigImage);
  }
  // поставить или удалить лайк
  _toggleLike() {
    this._likeButton.classList.toggle('card__button_active');
  }
  // слушатели событий
  _setEventListners () {
    //лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    // удалить карточку
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._deleteCard();
    });
    // увеличенное изображение по клику на картинку карточки
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openBigImage();
    });

    };

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__button');
    this._element.querySelector('.card__title').textContent = this._cardName;
    this._element.querySelector('.card__image').alt = this._cardName;
    this._element.querySelector('.card__image').src = this._cardLink;
    this._setEventListners();
    return this._element;
  }

}
