document.querySelectorAll('.contact-form').forEach((form) => {
  const name = form.elements.namedItem('name');
  const email = form.elements.namedItem('email');
  const message = form.querySelector('.form-message');

  function showError(field, text) {
    const output = form.querySelector(`[data-error="${field.name}"]`);
    output.textContent = text;
    field.setAttribute('aria-invalid', text ? 'true' : 'false');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '';
    const cleanName = name.value.trim();
    const cleanEmail = email.value.trim();
    const nameError = !cleanName ? '이름을 입력해 주세요.' : cleanName.length < 2 ? '이름은 두 글자 이상 입력해 주세요.' : '';
    const emailError = !cleanEmail ? '이메일을 입력해 주세요.' : !email.validity.valid ? '이메일 형식을 확인해 주세요.' : '';
    showError(name, nameError);
    showError(email, emailError);

    if (nameError) name.focus();
    else if (emailError) email.focus();
    else message.textContent = '입력 확인 완료 — 실제로 전송되지는 않습니다.';
  });

  [name, email].forEach((field) => field.addEventListener('input', () => {
    showError(field, '');
    message.textContent = '';
  }));
});
