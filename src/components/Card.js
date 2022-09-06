export class Card {
  constructor({ data, handleCardClick }, cardSelector, userId, api) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._api = api;
  }
  // получаем форму по селектору
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  // удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  // поставить или удалить лайк
  _toggleLike() {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._api.deleteLike(this._cardId)
        .then(data => {
          this._likeCount.textContent = data.likes.length;
          this._likeButton.classList.remove('card__like-button_active');
        })
        .catch(err => console.log(err))
    } else {
      this._api.addLike(this._cardId)
        .then(data => {
          this._likeCount.textContent = data.likes.length;
          this._likeButton.classList.add('card__like-button_active');
        })
        .catch(err => console.log(err))
    }

  }
  // слушатели событий
  _setEventListners() {
    //лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });
    // удалить карточку
    const deleteButton = this._element.querySelector('.card__trash-button')
    if (this._userId !== this._ownerId) {
      deleteButton.style.display = 'none'
    }
    else {
      deleteButton.addEventListener('click', () => {
        this._deleteCard();
      })
    };
    // увеличенное изображение по клику на картинку карточки
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._likeCount.textContent = this._likes.length;
    this._element.querySelector('.card__title').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardLink;
    this._setEventListners();
    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like-button_active');
    }
    return this._element;
  }

}
