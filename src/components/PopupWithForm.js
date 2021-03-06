import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit){
    super(selector);
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.edit-form')
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {inputValues[input.name] = input.value});
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    })
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}
