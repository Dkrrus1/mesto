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

// функция добавления карточек
function addCard(cardName, cardLink){
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardContainer = document.querySelector('.cards__grid');

  cardElement.querySelector('.card__title').textContent = cardName;
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
    bigImageTitle.textContent = cardName;
    popupBigImage.classList.add('popup_opened');
  });
  cardContainer.prepend(cardElement);
};

// добавляем карточки из массива
initialCards.forEach(function (item){
  addCard(item.name, item.link);
});

// функция редактирования профиля
function openEditProfile(){
  editName.value = profileName.textContent;
  editProfecy.value = profileProfession.textContent;
  popupProfileEdit.classList.add('popup_opened');
};

// сохранение изменений после редактирования профиля
function saveEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileProfession.textContent = editProfecy.value;
  popupProfileEdit.classList.remove('popup_opened');
};

// добавляем слушатель события для всех кнопок закрытия попапов
document.querySelectorAll('.popup__container-close-button').forEach(item => {
  item.addEventListener('click', function (evt) {
    const popupCloseButton = evt.target.closest('.popup');
    popupCloseButton.classList.remove('popup_opened');
  });
});

// открываем попап для добавления картинок
function openLinkAdd(){
  popupLinkAdd.classList.add('popup_opened');
  cardName.value = '';
  cardLink.value = '';
};

// добавляем новую карточку
function addNewCard (evt){
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  popupLinkAdd.classList.remove('popup_opened');
};

// вешаем слушателей для кнопок
profileEditButton.addEventListener('click', openEditProfile);
saveChanges.addEventListener('submit', saveEditProfile);
addNewLink.addEventListener('submit', addNewCard);
linkAddButton.addEventListener('click', openLinkAdd);

