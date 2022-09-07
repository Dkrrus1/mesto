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
import { Api } from '../components/Api.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';

const whoIsTheGoat = [
  { name: 'Аватар', image: avatarImage },
  { name: 'Логотип', image: logoImage },
]

const formFields = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// объявляем переменные
let userId;

const linkAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameEdit = document.querySelector('.edit-form__name');
const infoEdit = document.querySelector('.edit-form__profession');
const popupProfileForm = document.querySelector('.popup_profile-form');
const popupLinkForm = document.querySelector('.popup_link-form');
const avatarEditButton = document.querySelector('.profile__button');
const avatarEditForm = document.querySelector('.popup_confirm-avatar-change')

const profileData = new UserInfo(profileSelectors);
const popupBigImage = new PopupWithImage('.popup_big-image');
popupBigImage.setEventListeners();

const profileFormValidator = new FormValidator(formFields, popupProfileForm);
const linkFormValidator = new FormValidator(formFields, popupLinkForm);
const avatarFormValidator = new FormValidator(formFields, avatarEditForm);
profileFormValidator.enableValidation();
linkFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// создаем карточку
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupBigImage.open(data);
    },
    handleCardDelete: () => {
      popupCardDelete.open();
      popupCardDelete.deleteConfirmation(() => {
        popupCardDelete.renderPending(true);
        api.deleteCard(data._id)
        .then(() => {
          card._deleteCard();
          popupCardDelete.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupCardDelete.renderPending(false));
      })
    }
  }, '#card', userId, api);
  return card.generateCard();
}

// Получаем разметку
const cardList = new Section({
  renderer: (item) => {
    cardList.setItem(createCard(item));
  }
}, '.cards__grid'
)

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '6aa2b4e4-0910-4691-8a6e-cf24dcaa9898',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    cardsData.reverse();
    userId = userData._id;
    profileData.setUserInfo(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });

//Класс удаления карточки
const popupCardDelete = new PopupWithDelete('.popup_confirm-card-delete');
popupCardDelete.setEventListeners();

//класс редактирования профиля
const popupProfileEdit = new PopupWithForm('.popup_profile-form', userFormSubmit => {
  popupProfileEdit.renderPending(true);
  api.setUserData(userFormSubmit)
    .then((result) => {
      profileData.setUserInfo(result);
      popupProfileEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupProfileEdit.renderPending(false))
})
popupProfileEdit.setEventListeners();

// класс добавления картинок
const popupNewCardAdd = new PopupWithForm('.popup_link-form', userFormSubmit => {
  popupNewCardAdd.renderPending(true);
  api.addNewPicture(userFormSubmit)
    .then((result) => {
      const newCard = createCard(result);
      cardList.setItem(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupNewCardAdd.renderPending(false))
})
popupNewCardAdd.setEventListeners();

//класс смены ссылки на аватар
const popupAvatarEdit = new PopupWithForm('.popup_confirm-avatar-change', userFormSubmit => {
  popupAvatarEdit.renderPending(true);
  api.setUserAvatar(userFormSubmit)
    .then((result) => {
      profileData.setAvatar(result);
      popupAvatarEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAvatarEdit.renderPending(false))
})
popupAvatarEdit.setEventListeners();

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', () => {
  const data = profileData.getUserInfo();
  nameEdit.value = data.name;
  infoEdit.value = data.about;
  profileFormValidator.resetValidation();
  popupProfileEdit.open();
})

linkAddButton.addEventListener('click', () => {
  linkFormValidator.resetValidation();
  popupNewCardAdd.open();
})

avatarEditButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupAvatarEdit.open();
})
