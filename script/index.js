import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, handleEscape, cardContainer } from './utils.js';

const formFields = {
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
const popups = document.querySelectorAll('.popup');

const profileFormValidator = new FormValidator (formFields, popupProfileEdit);
const linkFormValidator = new FormValidator (formFields, popupLinkAdd);
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();

function renderCard (name, link, formSelector) {
  const card = new Card(name, link, formSelector);
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
}

// добавляем карточки из массива
const renderElements = () => {
  initialCards.forEach(function (item){
    renderCard (item.name, item.link, '#card')
});
}
renderElements();

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscape);
};

// функция редактирования профиля
function openEditProfile(){
  editName.value = profileName.textContent;
  editProfecy.value = profileProfession.textContent;
  profileFormValidator.resetValidation();
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
  openPopup(popupLinkAdd);
  linkFormValidator.resetValidation();
  linkFormValidator.buttonDisable();
  addNewLink.reset();
};

// добавляем новую карточку
function addNewCard (evt){
  evt.preventDefault();
  renderCard (cardName.value, cardLink.value, '#card')
  closePopup(popupLinkAdd);
};

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', openEditProfile);
saveChanges.addEventListener('submit', saveEditProfile);
addNewLink.addEventListener('submit', addNewCard);
linkAddButton.addEventListener('click', openLinkAdd);

