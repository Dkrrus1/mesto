import { initialCards } from '../components/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { profileSelectors } from '../components/utils.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import './index.css';
import avatarImage from '../images/avatar.jpg';
import logoImage from '../images/logo.svg';

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
const bigImage = document.querySelector('.popup_big-image');
const linkAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameEdit = document.querySelector('.edit-form__name');
const infoEdit = document.querySelector('.edit-form__profession');
const proflieForm = document.querySelector('.popup_profile-form');
const linkForm = document.querySelector('.popup_link-form');
const cardsContainer = document.querySelector('.cards__grid');

const profileData = new UserInfo(profileSelectors);
const popupBigImage = new PopupWithImage(bigImage);
popupBigImage.setEventListeners();

const profileFormValidator = new FormValidator (formFields, proflieForm);
const linkFormValidator = new FormValidator (formFields, linkForm);
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();

// создаем карточку
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupBigImage.open(data);
    }
  }, '#card');
  return card.generateCard();
}

// создаем карточки из начального массива
const cardList = new Section ({
  renderer: (item) => {
    cardList.setItem(createCard(item));
  }
}, cardsContainer
)
cardList.renderItems(initialCards);


//класс редактирования профиля
const popupProfileEdit = new PopupWithForm (proflieForm, userFormSubmit => {
  profileData.setUserInfo(userFormSubmit);
})
popupProfileEdit.setEventListeners();

// класс добавления картинок
const popupNewCardAdd = new PopupWithForm (linkForm, userFormSubmit => {
  const newCard = createCard(userFormSubmit);
  cardList.setItem(newCard);
})
popupNewCardAdd.setEventListeners();

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', () => {
  const data = profileData.getUserInfo();
  nameEdit.value = data.name;
  infoEdit.value = data.info;
  profileFormValidator.resetValidation();
  popupProfileEdit.open();
})

linkAddButton.addEventListener('click', () => {
  linkFormValidator.resetValidation();
  popupNewCardAdd.open();
})
