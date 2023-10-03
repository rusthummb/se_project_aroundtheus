const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ----------------------------------------------------------------*/
/*                       Elements                                  */
/*-----------------------------------------------------------------*/

const cardsWrap = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#add-card-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addNewCardFormElement = addNewCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#modal-preview");
const previewImage = document.querySelector(".modal__preview-image");
const previewImageTitle = document.querySelector(".modal__preview-title");
const previewImageModalClose = document.querySelector(
  "#preview-button-close-modal"
);

/* ----------------------------------------------------------------*/
/*                       Functions                                 */
/*-----------------------------------------------------------------*/

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardRemoveButton = cardElement.querySelector(".card__button-remove");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardRemoveButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", function () {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  return cardElement;
}

const cardTitleInput = addNewCardFormElement.querySelector(
  ".modal__input_type_title"
);

const cardUrlInput = addNewCardFormElement.querySelector(
  ".modal__input_type_url"
);

/* ----------------------------------------------------------------*/
/*                       Event Handlers                            */
/*-----------------------------------------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closePopup(addNewCardModal);
  addNewCardFormElement.reset();
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* ----------------------------------------------------------------*/
/*                       Event Listeners                           */
/*-----------------------------------------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

//  Form Listeners //

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addNewCardModal);
});

previewImageModalClose.addEventListener("click", () => {
  closePopup(previewImageModal);
});
