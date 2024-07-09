export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._radioBtnSelector = settings.radioBtnSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._radioBtnEls = [
      ...this._form.querySelectorAll(this._radioBtnSelector),
    ];
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.add(this._inputErrorClass);
      const errorMessage = inputEl.validationMessage || "Invalid input";
      errorMessageEl.textContent = errorMessage;
      errorMessageEl.classList.add("modal__form-input-error_visible");
    }
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    if (errorMessageEl) {
      inputEl.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove("modal__form-input-error_visible");
    }
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _checkRadioBtnValidity() {
    const checkedRadioBtn = this._radioBtnEls.find(
      (radioBtn) => radioBtn.checked
    );
    if (!checkedRadioBtn) {
      const errorMessageEl = this._form.querySelector(`#weatherType-error`);
      if (errorMessageEl) {
        errorMessageEl.textContent = "Please select a weather type";
        errorMessageEl.classList.add("modal__form-input-error_visible");
      }
      return false;
    } else {
      const errorMessageEl = this._form.querySelector(`#weatherType-error`);
      if (errorMessageEl) {
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove("modal__form-input-error_visible");
      }
      return true;
    }
  }

  _hasInvalidInput() {
    return (
      !this._inputEls.every((inputEl) => inputEl.validity.valid) ||
      !this._checkRadioBtnValidity()
    );
  }

  _enableButton() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this.disableButton();
      return;
    }
    this._enableButton();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._radioBtnEls.forEach((radioBtn) => {
      const errorMessageEl = this._form.querySelector(`#weatherType-error`);
      if (errorMessageEl) {
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove("modal__form-input-error_visible");
      }
    });
    this._enableButton();
  }

  setEventListeners() {
    this._submitBtn = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });

    this._radioBtnEls.forEach((radioBtn) => {
      radioBtn.addEventListener("change", () => {
        this._checkRadioBtnValidity();
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.setEventListeners();
  }

  isFormValid() {
    return !this._hasInvalidInput();
  }
}
