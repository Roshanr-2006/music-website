/* ============================================================
   CONTACT.JS — SoundWave Music Website

   Features:
   - Real-time field validation on input + on submit
   - Email regex validation
   - Phone: numeric only, exactly 10 digits
   - Message: max 200 words
   - Simulated form submission with loading state
   - Success / error toast notifications
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCharCounter();
  initPhoneFilter();
});

/* ============================================================
   FORM INIT
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  /* Validate each field as the user leaves it (blur) */
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur',  () => validateField(field));
    field.addEventListener('input', () => {
      /* Clear error state as soon as user starts typing again */
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', handleSubmit);
}

/* ============================================================
   VALIDATE A SINGLE FIELD
   Returns true if valid, false if not.
   ============================================================ */
function validateField(field) {
  const id    = field.id;
  const value = field.value.trim();
  let   error = '';

  switch (id) {
    case 'name':
      if (!value)            error = 'Name is required.';
      else if (value.length < 2) error = 'Name must be at least 2 characters.';
      break;

    case 'email':
      if (!value)            error = 'Email is required.';
      else if (!isValidEmail(value)) error = 'Please enter a valid email address.';
      break;

    case 'phone':
      if (!value)            error = 'Phone number is required.';
      else if (!/^\d+$/.test(value)) error = 'Phone number must contain only digits.';
      else if (value.length !== 10)  error = 'Phone number must be exactly 10 digits.';
      break;

    case 'message':
      if (!value)            error = 'Message is required.';
      else if (countWords(value) > 200) error = 'Message must not exceed 200 words.';
      break;
  }

  setFieldState(field, error);
  return error === '';
}

/* ============================================================
   FULL FORM VALIDATION (on submit)
   ============================================================ */
function validateForm() {
  const form   = document.getElementById('contact-form');
  const fields = form.querySelectorAll('input, textarea');
  let   valid  = true;

  fields.forEach(field => {
    if (!validateField(field)) valid = false;
  });

  return valid;
}

/* ============================================================
   SUBMIT HANDLER
   ============================================================ */
function handleSubmit(e) {
  e.preventDefault();   /* Stop real form submission */

  if (!validateForm()) {
    showToast('Please fix the errors before submitting.', 'error');
    /* Scroll to first error */
    document.querySelector('.is-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  /* Show loading state */
  const btn = document.getElementById('submit-btn');
  btn.classList.add('loading');
  btn.disabled = true;

  /* Simulate API call with a 1.5 s delay */
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.disabled = false;

    /* Reset form */
    e.target.reset();
    document.querySelectorAll('.is-valid').forEach(el => {
      el.classList.remove('is-valid');
    });

    const counter = document.getElementById('char-counter');
    if (counter) counter.textContent = '0 / 200 words';

    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
  }, 1500);
}

/* ============================================================
   CHARACTER COUNTER (word count for message field)
   ============================================================ */
function initCharCounter() {
  const textarea = document.getElementById('message');
  const counter  = document.getElementById('char-counter');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    const words = countWords(textarea.value);
    counter.textContent = `${words} / 200 words`;

    counter.className = 'char-counter';
    if (words > 180) counter.classList.add('warning');
    if (words > 200) counter.classList.add('danger');
  });
}

/* ============================================================
   PHONE: allow only numeric input (blocks letters)
   ============================================================ */
function initPhoneFilter() {
  const phone = document.getElementById('phone');
  if (!phone) return;

  phone.addEventListener('keypress', e => {
    /* Allow: backspace, delete, tab, enter, arrow keys */
    if (e.key && !/^\d$/.test(e.key) && !['Backspace','Delete','Tab','Enter','ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  });

  /* Also handle paste — strip non-digits */
  phone.addEventListener('paste', e => {
    e.preventDefault();
    const pasted  = (e.clipboardData || window.clipboardData).getData('text');
    const cleaned = pasted.replace(/\D/g, '').slice(0, 10);
    phone.value   = cleaned;
  });
}

/* ============================================================
   UI HELPERS
   ============================================================ */

/* Mark field as valid / invalid and show/hide error message */
function setFieldState(field, errorMsg) {
  const errorEl = document.getElementById(`${field.id}-error`);

  field.classList.remove('is-valid', 'is-invalid');
  errorEl?.classList.remove('visible');

  if (errorMsg) {
    field.classList.add('is-invalid');
    if (errorEl) {
      errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMsg}`;
      errorEl.classList.add('visible');
    }
  } else if (field.value.trim()) {
    field.classList.add('is-valid');
  }
}

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

/* Standard email regex */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Count space-separated words (ignores extra whitespace) */
function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}
