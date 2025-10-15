
document.addEventListener('DOMContentLoaded', () => {
  // Date & time (Task 5)
  const dtEl = document.getElementById('datetime');
  const formatDate = (d) => d.toLocaleString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
  const tick = () => { if (dtEl) dtEl.textContent = formatDate(new Date()); };
  tick(); setInterval(tick, 1000);

  // Background color changer (Task 4)
  const bgBtn = document.getElementById('bg-toggle');
  const colors = ['#ffffff', '#f8f9fa', '#fff3cd', '#d1e7dd', '#cfe2ff', '#f8d7da', '#e2e3e5'];
  let idx = 0;
  if (bgBtn) {
    bgBtn.addEventListener('click', () => {
      idx = (idx + 1) % colors.length;
      document.body.style.backgroundColor = colors[idx];
    });
  }

  // Accordion (Task 2)
  document.querySelectorAll('.accordion .acc-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.acc-item');
      item.classList.toggle('open');
      const ans = item.querySelector('.acc-answer');
      if (ans.style.maxHeight) {
        ans.style.maxHeight = null;
      } else {
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // Popup modal (Task 3)
  const openBtn = document.getElementById('open-modal');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-modal');
  if (openBtn && modal) {
    const hide = () => modal.classList.remove('show');
    openBtn.addEventListener('click', () => modal.classList.add('show'));
    if (closeBtn) closeBtn.addEventListener('click', hide);
    modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });
  }

  // Helpers for validation
  const setError = (el, msg) => {
    const wrap = el.closest('.field') || el.parentElement;
    let err = wrap.querySelector('.error-msg');
    if (!err) { err = document.createElement('div'); err.className = 'error-msg'; wrap.appendChild(err); }
    err.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
  };
  const clearError = (el) => {
    const wrap = el.closest('.field') || el.parentElement;
    const err = wrap.querySelector('.error-msg');
    if (err) err.textContent = '';
    el.removeAttribute('aria-invalid');
  };
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Contact form validation (optional enhancement)
  const contact = document.getElementById('contact-form');
  if (contact) {
    contact.addEventListener('submit', (e) => {
      let ok = true;
      const name = contact.querySelector('#name');
      const email = contact.querySelector('#email');
      const message = contact.querySelector('#message');
      [name, email, message].forEach(clearError);
      if (!name.value.trim()) { setError(name, 'Name is required'); ok = false; }
      if (!isEmail(email.value)) { setError(email, 'Enter a valid email'); ok = false; }
      if (message.value.trim().length < 5) { setError(message, 'Please enter a longer message'); ok = false; }
      if (!ok) e.preventDefault();
    });
  }

  // Careers apply form validation (Task 1 with password)
  const apply = document.getElementById('apply-form');
  if (apply) {
    apply.addEventListener('submit', (e) => {
      let ok = true;
      const fullname = apply.querySelector('#fullname');
      const email = apply.querySelector('#apply-email');
      const pass = apply.querySelector('#password');
      const confirm = apply.querySelector('#confirm');
      [fullname, email, pass, confirm].forEach((el) => el && clearError(el));
      if (!fullname.value.trim()) { setError(fullname, 'Full name is required'); ok = false; }
      if (email && !isEmail(email.value)) { setError(email, 'Valid email required'); ok = false; }
      if (pass && pass.value.length < 8) { setError(pass, 'Password must be at least 8 characters'); ok = false; }
      if (confirm && confirm.value !== pass.value) { setError(confirm, 'Passwords do not match'); ok = false; }
      if (!ok) e.preventDefault();
    });
  }
});
