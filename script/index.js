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
const popupBigImage = document.querySelector('.popup_big-image');
const bigImage = document.querySelector('.image-container__image');
const bigImageTitle = document.querySelector('.image-container__title');
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards__grid');
const popups = document.querySelectorAll('.popup')

// функция добавления карточек
function createCard(cardName, cardLink){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button_active');
  });
  cardElement.querySelector('.card__trash-button').addEventListener('click', function (evt) {
    const listItem = evt.target.closest('.card');
    listItem.remove();
  });
  cardElement.querySelector('.card__image').addEventListener('click', function () {
    bigImage.src = cardLink;
    bigImage.alt = cardName;
    bigImageTitle.textContent = cardName;
    openPopup(popupBigImage);
  });
  return cardElement;
};

// добавляем карточки из массива
initialCards.forEach(function (item){
  cardContainer.append(createCard(item.name, item.link));
});

// функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

// закрываем попапы только по кнопке закрытия
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__container-close-button')) {
        closePopup(popup)
      }
  })
});

// открываем попап для добавления картинок
function openLinkAdd(){
  openPopup(popupLinkAdd);
  popupLinkAdd.reset();
};

// добавляем новую карточку
function addNewCard (evt){
  evt.preventDefault();
  cardContainer.prepend(createCard(cardName.value, cardLink.value));
  closePopup(popupLinkAdd);
};

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', openEditProfile);
saveChanges.addEventListener('submit', saveEditProfile);
addNewLink.addEventListener('submit', addNewCard);
linkAddButton.addEventListener('click', openLinkAdd);

