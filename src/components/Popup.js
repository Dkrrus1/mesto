export default class Popup {
  constructor (selector){
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
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
    const closeButton = this._popup.querySelector('.popup__container-close-button');
    closeButton.addEventListener('mousedown', () => {this.close()});
    this._popup.addEventListener('mousedown', (evt) => {this._handleOverlayClose(evt)});
  }
}
