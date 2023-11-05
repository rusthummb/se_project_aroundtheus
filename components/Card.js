export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__button")
      .addEventListener("click", () => {
        this._handleLikeIcon(this);
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__trash-icon")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    //image preview
    this._cardElement
      .querySelector(".js-card-image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button")
      .classList.toggle("card__button_active");
  }
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    const cardData = { link: this._link, name: this._name };

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view
    const cardImageEL = this._cardElement.querySelector(".js-card-image");
    cardImageEL.src = this._link;
    cardImageEL.alt = this._name;

    const cardTitleEL = this._cardElement.querySelector(".js-card-title");
    cardTitleEL.textContent = cardData.name;

    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
