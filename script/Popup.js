export default class Popup {
  constructor (selector){
    this._selector = document.querySelector(selector);
    this._closeButton = this._selector.querySelector('.popup__container-close-button');
  }
  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
  _handleEscClose(event){
    if (event.key === 'Escape') {
      this.close();
    }
  }
  _handleOverlayClose(event){
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('mousedown', this.close());
    this._selector.addEventListener('mousedown', this._handleOverlayClose);
  }
}
