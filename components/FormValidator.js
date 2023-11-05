export default class FormValidation {
  constructor(formElement, options) {
    this._formElement = formElement;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _showInputError(input) {
    const errorMessageElement = this.formElement.querySelector(
      `#${input.id}-error`
    );
    input.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = input.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorMessageElement = this.formElement.querySelector(
      `#${input.id}-error`
    );
    input.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputElements = [
      ...this.formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this.formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._setEventListeners();
  }
}

// enabling validation by calling enableValidation()
// pass all the settings on call
//look for inputs inside of form
//loop through all the inputs to see if all are valid
//if input is not valid
// get validation message
//add error class to input
//display error message
// disable button
//if all inputs are valid
// enable button
//reset error messages
