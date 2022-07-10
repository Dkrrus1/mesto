import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, handleEscape, cardContainer, profileSelectors } from './utils.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';

const formFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// объявляем переменные
const profileData = new UserInfo(profileSelectors);

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

const profileFormValidator = new FormValidator (formFields, '.popup_profile-form');
const linkFormValidator = new FormValidator (formFields, '.popup_link-form');
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();

// создаем карточки из начального массива
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.setItem(renderCard(item, '#card')); // тут колбэком передаем методу функцию с отрисовкой карточек
  }
}, '.cards__grid'
)

cardList.renderItems();
// рисуем карточки
function renderCard (data, formSelector) {
  const card = new Card(data, formSelector);
  const cardElement = card.generateCard();
  return cardElement
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscape);
};

// функция редактирования профиля
const popupProfileEdit = new PopupWithForm ('.popup_profile-form', userFormSubmit => {
  profileData.setUserInfo(userFormSubmit);
})
popupProfileEdit.setEventListeners();

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
  const userCard = {
    name: cardName.value,
    link: cardLink.value
  }
  cardContainer.prepend(renderCard(userCard, '#card'))
  closePopup(popupLinkAdd);
};

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', () => {
  const data = profileData.getUserInfo();
  editName.value = data.name;
  editProfecy.value = data.info;
  profileFormValidator.resetValidation();
  popupProfileEdit.open();
})
saveChanges.addEventListener('submit', () => {
  const data = {
    name: editName.value,
    info: editProfecy.value
  };
  profileData.setUserInfo(data);
  popupProfileEdit.close();
});
addNewLink.addEventListener('submit', addNewCard);
linkAddButton.addEventListener('click', openLinkAdd);

