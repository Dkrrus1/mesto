import Popup from "./Popup";

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.edit-form');
    this._submitButton = this._popupForm.querySelector('.edit-form__submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getDeleteData();
    });
  }

  deleteConfirmation(data) {
    this._getDeleteData = data;
  }

  renderPending(isPending) {
    if (isPending) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = 'Да';
    }
  }

}
