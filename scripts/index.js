const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//Wrappers//

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const elementsCards = document.querySelector(".js-elements-cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardImagePreviewModal = document.querySelector("#preview-image-modal");

// buttons and other elements//
const profilAddButton = document.querySelector("#profile-add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const addModalCloseButton = profileAddModal.querySelector(
  "#add-modal-close-button"
);

const previewModalCloseButton = cardImagePreviewModal.querySelector(
  "#preview-modal-close-button"
);

const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardPlaceInput = profileAddModal.querySelector("#profile-place-input");
const cardLinkInput = profileAddModal.querySelector("#profile-link-input");
const previewModal = cardImagePreviewModal.querySelector(
  ".modal__preview-image"
);
const previewModalCaption = cardImagePreviewModal.querySelector(
  ".modal__preview-caption"
);

//forms//
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = profileAddModal.querySelector(".modal__form");
const inputElement = document.querySelector(".modal__form-input");
//
const modals = document.querySelectorAll(".modal");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function getCardsElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".js-card-image");
  const cardTitleEL = cardElement.querySelector(".js-card-title");
  const likeButton = cardElement.querySelector(".card__button");
  const trashButton = cardElement.querySelector(".card__trash-icon");

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_active");
  });

  cardImageEL.addEventListener("click", () => {
    openPopup(cardImagePreviewModal);
    previewModalCaption.textContent = cardData.name;
    previewModal.src = cardData.link;
    previewModal.alt = cardData.name;
  });

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardsElement(cardData);
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  const name = cardPlaceInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, elementsCards);
  closePopup(profileAddModal);
  e.target.reset();
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closePopup(modal);
    }
  });
});

function handleEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profilAddButton.addEventListener("click", () => openPopup(profileAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, elementsCards));
