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
/* ELEMENTS */
const profileButtonEdit = document.querySelector("#profile-button-edit");
const profileEditModal = document.querySelector("#modal-edit-profile");
const profileButtonClose = profileEditModal.querySelector(
  ".modal__button-close"
);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__subtitle");
const profileCurrentName = document.querySelector("#edit-name");
const profileCurrentBio = document.querySelector("#edit-bio");
const profileFormEdit = profileEditModal.querySelector("#modal-form-edit");

/*ADD ELEMENTS */

const profileButtonAdd = document.querySelector("#profile-button-add");
const profileAddModal = document.querySelector("#modal-add-profile");
const profileFormAdd = profileAddModal.querySelector("#add-modal-form");
const profileButtonCloseAdd = profileAddModal.querySelector(
  "#modal-button-close-add"
);
const profileAddImageTitle = profileFormAdd.querySelector("#add-title");
const profileAddImageLink = profileFormAdd.querySelector("#add-imageURL");
const previewImageModal = document.querySelector("#modal-previewImage");

const previewImageModalClose = previewImageModal.querySelector(
  "#modal-button-close-preview"
);
const cardsContent = document.querySelector(".cards__content");
const cardTemplate = document
  .querySelector("#card-template")
  .content.firstElementChild.cloneNode(true);
const data = initialCards;

/* FUNCTIONS */
function togglePopUp(popup) {
  popup.classList.toggle("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const heartButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__delete-button");

  trashButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button");
  });

  cardImage.addEventListener("click", () => {
    const previewImage = document.querySelector(".modal__previewImage");
    const previewImageTitle = document.querySelector("#preview-title");
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewImageTitle.textContent = data.name;
    togglePopUp(previewImageModal);
  });

  heartButton.addEventListener("click", () =>
    heartButton.classList.toggle("card__like-button_active")
  );

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  return cardElement;
}

/* EVENT LISTENERS */

profileButtonEdit.addEventListener("click", () => {
  profileCurrentName.value = profileName.textContent;
  profileCurrentBio.value = profileBio.textContent;
  togglePopUp(profileEditModal);
});

profileButtonClose.addEventListener("click", () => {
  togglePopUp(profileEditModal);
});

profileFormEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileCurrentName.value;
  profileBio.textContent = profileCurrentBio.value;
  togglePopUp(profileEditModal);
});

profileButtonCloseAdd.addEventListener("click", () => {
  togglePopUp(profileAddModal);
});

profileButtonAdd.addEventListener("click", () => {
  togglePopUp(profileAddModal);
});

previewImageModalClose.addEventListener("click", () => {
  togglePopUp(previewImageModal);
});

profileFormAdd.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = profileAddImageTitle.value;
  const link = profileAddImageLink.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  togglePopUp(profileAddModal);
  profileFormAdd.reset();
  cardsContent.prepend(cardElement);
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsContent.prepend(cardElement);
});
