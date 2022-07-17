import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._bigImage = this._popup.querySelector('.image-container__image');
    this._bigImageTitle = this._popup.querySelector('.image-container__title');
  }
  open({ name, link }) {
    super.open();
    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._bigImageTitle.textContent = name;
  }
}
