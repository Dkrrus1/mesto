export class Card {
  constructor({ data, handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete }, cardSelector, userId) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._addLike = handleLikeAdd;
    this._deleteLike = handleLikeDelete;
    this._likeClick = this._likeClick.bind(this);
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
      this._likeCount.textContent = this._likes.length;
      this._likeButton.classList.remove('card__like-button_active');
    } else {
      this._likeCount.textContent = this._likes.length;
      this._likeButton.classList.add('card__like-button_active');
    }
  }

  _likeClick(like) {
    this._likes = like;
    this._toggleLike();
  };

  _toggleLikeButton() {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._deleteLike(this._cardId, this._likeClick);
    } else {
      this._addLike(this._cardId, this._likeClick);
    }
  };

  // слушатели событий
  _setEventListners() {
    //лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLikeButton();
    });
    // удалить карточку
    const deleteButton = this._element.querySelector('.card__trash-button')
    if (this._userId !== this._ownerId) {
      deleteButton.style.display = 'none'
    }
    else {
      deleteButton.addEventListener('click', () => {
        this._handleCardDelete();
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
