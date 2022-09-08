import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.edit-form')
    this._submitButton = this._popupForm.querySelector('.edit-form__submit');
    this._submitButtonTextContent = this._submitButton.textContent
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => { inputValues[input.name] = input.value });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    })
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  renderPending(isPending) {
    if (isPending) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
