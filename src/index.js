import { initialCards } from './script/cards.js';
import { Card } from './script/Card.js';
import { FormValidator } from './script/FormValidator.js';
import { profileSelectors } from './script/utils.js';
import { Section } from './script/Section.js';
import PopupWithImage from './script/PopupWithImage.js';
import { UserInfo } from './script/UserInfo.js';
import PopupWithForm from './script/PopupWithForm.js';
import './pages/index.css';
import avatarImage from './images/avatar.jpg';
import logoImage from './images/logo.svg';

const whoIsTheGoat = [
  {name: 'Аватар', image: avatarImage},
  {name: 'Логотип', image: logoImage},
]

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

const linkAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const editName = document.querySelector('.edit-form__name');
const editProfecy = document.querySelector('.edit-form__profession');

const profileFormValidator = new FormValidator (formFields, '.popup_profile-form');
const linkFormValidator = new FormValidator (formFields, '.popup_link-form');
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();

// создаем карточку
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


//класс редактирования профиля
const popupProfileEdit = new PopupWithForm ('.popup_profile-form', userFormSubmit => {
  profileData.setUserInfo(userFormSubmit);
})
popupProfileEdit.setEventListeners();

// класс добавления картинок
const popupNewCardAdd = new PopupWithForm ('.popup_link-form', userFormSubmit => {
  const newCard = createCard(userFormSubmit);
  cardList.setItem(newCard);
})
popupNewCardAdd.setEventListeners();

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', () => {
  const data = profileData.getUserInfo();
  editName.value = data.name;
  editProfecy.value = data.info;
  profileFormValidator.resetValidation();
  popupProfileEdit.open();
})

linkAddButton.addEventListener('click', () => {
  linkFormValidator.resetValidation();
  popupNewCardAdd.open();
})
