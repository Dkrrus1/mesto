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
const popupBigImage = new PopupWithImage('.popup_big-image');
popupBigImage.setEventListeners();

const popupLinkForm = document.querySelector('.popup_link-form');
const linkAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const saveChanges = document.querySelector('.edit-form');
const addNewLink = popupLinkForm.querySelector('.edit-form');
const editName = document.querySelector('.edit-form__name');
const editProfecy = document.querySelector('.edit-form__profession');
const cardName = popupLinkForm.querySelector('.edit-form__name');
const cardLink = popupLinkForm.querySelector('.edit-form__profession');

const profileFormValidator = new FormValidator (formFields, '.popup_profile-form');
const linkFormValidator = new FormValidator (formFields, '.popup_link-form');
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardClick: () => {
      popupBigImage.open(data);
    }
  }, '#card');
  return card.generateCard();
}

// создаем карточки из начального массива
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.setItem(createCard(item));
  }
}, '.cards__grid'
)

cardList.renderItems();
// рисуем карточки
// function renderCard (data, formSelector) {
//   const card = new Card(data, formSelector);
//   const cardElement = card.generateCard();
//   return cardElement
// }

//класс редактирования профиля
const popupProfileEdit = new PopupWithForm ('.popup_profile-form', userFormSubmit => {
  profileData.setUserInfo(userFormSubmit);
})
popupProfileEdit.setEventListeners();

// открываем попап для добавления картинок


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
// addNewLink.addEventListener('submit', () => {
//   const userCard = {
//     name: cardName.value,
//     link: cardLink.value
//   }
//   cardContainer.prepend(renderCard(userCard, '#card'))
//   popupLinkAdd.close()
// });
// linkAddButton.addEventListener('click', () => {
//   linkFormValidator.resetValidation();
//   popupLinkAdd.open()});

