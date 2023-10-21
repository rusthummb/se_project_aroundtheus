function showInputError(formElement, inputElement, options) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(options.inputErrorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(options.inputErrorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = true;
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = false;
}

function toggleButtonStates(inputElements, submitButton, options) {
  let foundInvalid = false;
  inputElements.forEach((inputElement) => {
    if (!inputElement.validity.valid) {
      foundInvalid = true;
    }
  });
  //   if (foundInvalid) {
  //     disableButton(submitButton, options.inactiveButtonClass);
  //     return (submitButton.disabled = true);
  //   }
  //   enableButton(submitButton, options.inactiveButtonClass);
  //   submitButton.disabled = false;
  // }

  if (foundInvalid) {
    disableButton(submitButton, options.inactiveButtonClass);
  } else {
    enableButton(submitButton, options.inactiveButtonClass);
  }
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonStates(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".js-modal-form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_type_inactive",
  inputErrorClass: "modal__input-error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
