let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupBlock = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__container-close-button');
let editName = document.querySelector('.edit-form__name');
let editProfecy = document.querySelector('.edit-form__profession');
let saveChanges = document.querySelector('.edit-form');

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
