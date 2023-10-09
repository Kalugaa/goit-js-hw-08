// 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
//    у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// 2. Під час завантаження сторінки перевіряй стан сховища,
//    і якщо там є збережені дані, заповнюй ними поля форми.В іншому випадку поля повинні бути порожніми.
// 3. Під час сабміту форми очищуй сховище і поля форми,
//    а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//    Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

const loadFormState = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedState) {
    const formData = JSON.parse(savedState);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

feedbackForm.addEventListener(
  'input',
  throttle(() => {
    saveFormState();
  }, 500)
);

loadFormState();

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log('Form Data:', formData);

  localStorage.removeItem(LOCAL_STORAGE_KEY);

  emailInput.value = '';
  messageTextarea.value = '';
});
