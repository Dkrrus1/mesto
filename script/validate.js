// Показываем ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, formElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formElements.inputErrorClass);
  errorElement.classList.add(formElements.errorClass);
  errorElement.textContent = errorMessage;
};

// Скрываем ошибки валидации
const hideInputError = (formElement, inputElement, formElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formElements.inputErrorClass);
  errorElement.classList.remove(formElements.errorClass);
  errorElement.textContent = '';
};

// Проверяем инпуты на ошибки
const checkInputValidity = (formElement, inputElement, formElements) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formElements);
  } else {
    hideInputError(formElement, inputElement, formElements);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключаем кнопки в разные состояния
const toggleButtonState = (inputList, buttonElement, formElements) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formElements.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(formElements.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// Ставим слушатели
const setEventListenersInputs = (formElement, formElements) => {
  const inputList = Array.from(formElement.querySelectorAll(formElements.inputSelector));
  const buttonElement = formElement.querySelector(formElements.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formElements);
      toggleButtonState(inputList, buttonElement, formElements);
    });
  });
  toggleButtonState(inputList, buttonElement, formElements);
};

// Убиваем дефолтный сабмит браузером
const cancelHandlerSubmit = (evt) => {
  evt.preventDefault();
}

// Функция валидации с задаными параметрами
enableValidation = (formElements) => {
  const formList = document.querySelectorAll(formElements.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', cancelHandlerSubmit);
    setEventListenersInputs(formElement, formElements);
  });
}

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.edit-form__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
