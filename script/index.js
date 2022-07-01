// начальные карточки на сайте
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// объявляем переменные
const popupProfileEdit = document.querySelector('.popup_profile-form');
const popupLinkAdd = document.querySelector('.popup_link-form');
const linkAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const saveChanges = document.querySelector('.edit-form');
const addNewLink = popupLinkAdd.querySelector('.edit-form');
const editName = document.querySelector('.edit-form__name');
const editProfecy = document.querySelector('.edit-form__profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const cardName = popupLinkAdd.querySelector('.edit-form__name');
const cardLink = popupLinkAdd.querySelector('.edit-form__profession');
const cardContainer = document.querySelector('.cards__grid');
const popups = document.querySelectorAll('.popup');
const editForms = document.querySelectorAll('.edit-form');

import { Card } from './card.js'
import { FormValidator } from './validate.js';

editForms.forEach(function (form) {
  new FormValidator (enableValidation, form).enableValidation();
});

// добавляем карточки из массива
const renderElements = () => {
  // cardContainer.innerHTML = ''
  initialCards.forEach(function (item){
    const card = new Card(item.name, item.link, '#card');
    const cardElement = card.generateCard();
    cardContainer.append(cardElement);
});
}
renderElements();

// функция закрытия по кнопке escape
function handleEscape(event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscape);
};

// функция редактирования профиля
function openEditProfile(){
  editName.value = profileName.textContent;
  editProfecy.value = profileProfession.textContent;
  openPopup(popupProfileEdit);
};

// сохранение изменений после редактирования профиля
function saveEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileProfession.textContent = editProfecy.value;
  closePopup(popupProfileEdit);
};

// закрываем попапы только по кнопке закрытия и кликом вне формы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
     if (evt.target.classList.contains('popup__container-close-button') || evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
  })
});

// открываем попап для добавления картинок
function openLinkAdd(){
  const submitButton = addNewLink.querySelector('.edit-form__submit');
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);
  openPopup(popupLinkAdd);
  addNewLink.reset();
};

// добавляем новую карточку
function addNewCard (evt){
  evt.preventDefault();
  const card = new Card(cardName.value, cardLink.value, '#card');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  closePopup(popupLinkAdd);
};

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', openEditProfile);
saveChanges.addEventListener('submit', saveEditProfile);
addNewLink.addEventListener('submit', addNewCard);
linkAddButton.addEventListener('click', openLinkAdd);

export { openPopup };
