export class Card {
  constructor ({data, handleCardClick}, cardSelector){
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    };

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__button');
    this._element.querySelector('.card__title').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardLink;
    this._setEventListners();
    return this._element;
  }

}
