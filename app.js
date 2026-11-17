const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const emailWrap = document.querySelector('#email-wrap');
const passwordWrap = document.querySelector('#password-wrap');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const formMessage = document.querySelector('#form-message');
const visibilityToggle = document.querySelector('#visibility-toggle');

function setFieldError(input, wrapper, messageElement, message) {
  wrapper.classList.toggle('has-error', Boolean(message));
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  messageElement.textContent = message;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    setFieldError(emailInput, emailWrap, emailError, 'Wpisz adres e-mail.');
    return false;
  }
  if (!emailInput.validity.valid) {
    setFieldError(emailInput, emailWrap, emailError, 'Sprawdź, czy adres e-mail jest poprawny.');
    return false;
  }
  setFieldError(emailInput, emailWrap, emailError, '');
  return true;
}

function validatePassword() {
  if (!passwordInput.value) {
    setFieldError(passwordInput, passwordWrap, passwordError, 'Wpisz hasło.');
    return false;
  }
  setFieldError(passwordInput, passwordWrap, passwordError, '');
  return true;
}

emailInput.addEventListener('blur', () => {
  if (emailInput.value || emailWrap.classList.contains('has-error')) validateEmail();
});
passwordInput.addEventListener('blur', () => {
  if (passwordInput.value || passwordWrap.classList.contains('has-error')) validatePassword();
});

emailInput.addEventListener('input', () => {
  formMessage.classList.remove('is-visible');
  if (emailWrap.classList.contains('has-error')) validateEmail();
});
passwordInput.addEventListener('input', () => {
  formMessage.classList.remove('is-visible');
  if (passwordWrap.classList.contains('has-error')) validatePassword();
});

visibilityToggle.addEventListener('click', () => {
  const willShow = passwordInput.type === 'password';
  passwordInput.type = willShow ? 'text' : 'password';
  visibilityToggle.classList.toggle('is-visible', willShow);
  visibilityToggle.setAttribute('aria-pressed', String(willShow));
  visibilityToggle.setAttribute('aria-label', willShow ? 'Ukryj hasło' : 'Pokaż hasło');
  passwordInput.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.classList.remove('is-visible');

  const emailIsValid = validateEmail();
  const passwordIsValid = validatePassword();
  if (!emailIsValid || !passwordIsValid) {
    (emailIsValid ? passwordInput : emailInput).focus();
    return;
  }

  // Login UI prototype: authentication requires a server endpoint.
  formMessage.textContent = 'Logowanie nie jest jeszcze połączone z serwerem. Skontaktuj się z administratorem szkoły.';
  formMessage.classList.add('is-visible');
});
