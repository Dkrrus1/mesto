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

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupBlock = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__container-close-button');
let editName = document.querySelector('.edit-form__name');
let editProfecy = document.querySelector('.edit-form__profession');
let saveChanges = document.querySelector('.edit-form');
const deleteButton = document.querySelector('.card__trash-button');

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
  cardContainer.append(cardElement);
}

initialCards.forEach(function (item){
  addCard(item.name, item.link);
});

function openEditWindow(){
  editName.value = profileName.textContent;
  editProfecy.value = profileProfession.textContent;
  popupBlock.classList.add('popup_opened');
}

function closeEditWindow(){
  popupBlock.classList.remove('popup_opened');
}

function saveEditChanges(evt){
  evt.preventDefault();
  profileName.textContent = editName.value;
  profileProfession.textContent = editProfecy.value;
  closeEditWindow();
}

saveChanges.addEventListener('submit', saveEditChanges);
profileEditButton.addEventListener('click', openEditWindow);
popupCloseButton.addEventListener('click', closeEditWindow);
