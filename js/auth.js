// auth.js — Stackly Electronics Authentication JavaScript
'use strict';

{
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── EYE TOGGLE ──
  const initEyeToggles = () => {
    $$('.input-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling || btn.parentElement.querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.textContent = isPassword ? '🙈' : '👁️';
      });
    });
  };

  // ── VALIDATION HELPERS ──
  const validators = {
    name: (val) => {
      if (!val || !val.trim()) return 'Full name is required';
      const trimmed = val.trim();
      if (!/^[a-zA-Z\s]+$/.test(trimmed)) return 'Name should contain alphabets only';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 16) return 'Name must be 16 characters or less';
      return null;
    },
    email: (val) => {
      if (!val) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return 'Please enter a valid email address';
      return null;
    },
    gmail: (val) => {
      if (!val || !val.trim()) return 'Gmail address is required';
      const trimmed = val.trim();
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(trimmed)) {
        return 'Please enter a valid Gmail address (e.g. you@gmail.com)';
      }
      return null;
    },
    mobile: (val) => {
      if (!val || !val.trim()) return 'Mobile number is required';
      const trimmed = val.trim();
      if (!/^\d+$/.test(trimmed)) return 'Mobile number must contain digits only';
      if (!/^\d{10}$/.test(trimmed)) return 'Mobile number must be exactly 10 digits';
      return null;
    },
    password: (val) => {
      if (!val) return 'Password is required';
      if (val.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(val)) return 'Must contain at least one uppercase letter';
      if (!/[a-z]/.test(val)) return 'Must contain at least one lowercase letter';
      if (!/[0-9]/.test(val)) return 'Must contain at least one number';
      if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(val)) return 'Must contain at least one special character';
      return null;
    },
    confirmPassword: (val, password) => {
      if (!val) return 'Please confirm your password';
      if (val !== password) return 'Passwords do not match';
      return null;
    }
  };

  // ── SHOW FIELD ERROR ──
  const showError = (inputEl, msg) => {
    inputEl.classList.remove('success');
    inputEl.classList.add('error');
    const errEl = inputEl.closest('.form-group')?.querySelector('.field-error') ||
                  inputEl.parentElement?.nextElementSibling;
    if (errEl && errEl.classList.contains('field-error')) {
      errEl.textContent = '⚠ ' + msg;
      errEl.classList.remove('hidden');
    }
  };

  const showSuccess = (inputEl) => {
    inputEl.classList.remove('error');
    inputEl.classList.add('success');
    const errEl = inputEl.closest('.form-group')?.querySelector('.field-error') ||
                  inputEl.parentElement?.nextElementSibling;
    if (errEl && errEl.classList.contains('field-error')) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
  };

  const clearField = (inputEl) => {
    inputEl.classList.remove('error', 'success');
  };

  // ── PASSWORD STRENGTH ──
  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++;
    return Math.min(4, Math.floor(score * 4 / 5));
  };

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#EF4444', '#F97316', '#EAB308', '#10B981'];

  const initPasswordStrength = () => {
    const pairs = [
      { pw: $('#reg-password'), fill: $('.strength-fill'), label: $('.strength-label') },
      { pw: $('#login-password'), fill: $('#login-strength-fill'), label: $('#login-strength-label') }
    ];

    pairs.forEach(({ pw, fill, label }) => {
      if (!pw || !fill) return;
      pw.addEventListener('input', () => {
        const s = getStrength(pw.value);
        fill.className = `strength-fill strength-${s}`;
        fill.style.background = strengthColors[s];
        fill.style.width = (s * 25) + '%';
        if (label) {
          label.textContent = pw.value ? strengthLabels[s] : '';
          label.style.color = strengthColors[s];
        }
      });
    });
  };

  // ── CHARACTER COUNTER ──
  const initCharCounter = () => {
    const nameInput = $('#reg-name');
    const counter = document.getElementById('name-counter');
    if (!nameInput || !counter) return;
    const updateCount = () => {
      const len = nameInput.value.length;
      counter.textContent = `${len}/16`;
      counter.style.color = len > 13 ? '#EAB308' : len === 16 ? '#EF4444' : 'var(--white-40)';
    };
    nameInput.addEventListener('input', updateCount);
    updateCount();
  };

  // ── LIVE VALIDATION ──
  const initLiveValidation = () => {
    // 1. Name: only alphabets, max 16 letters
    const nameInput = $('#reg-name');
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        // Allow navigation/edit keys
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
          return;
        }
        if (e.ctrlKey || e.metaKey) {
          return;
        }
        // Only allow alphabetic characters and spaces
        if (!/^[a-zA-Z\s]$/.test(e.key)) {
          e.preventDefault();
        }
      });

      nameInput.addEventListener('input', () => {
        // Strip non-alphabets, disallow leading space, max 16 chars
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, '').replace(/^\s+/, '').slice(0, 16);
        const counter = document.getElementById('name-counter');
        if (counter) {
          const len = nameInput.value.length;
          counter.textContent = `${len}/16`;
          counter.style.color = len > 13 ? '#EAB308' : len === 16 ? '#EF4444' : 'var(--white-40)';
        }
        if (!nameInput.value) {
          clearField(nameInput);
          return;
        }
        const err = validators.name(nameInput.value);
        err ? showError(nameInput, err) : showSuccess(nameInput);
      });

      nameInput.addEventListener('blur', () => {
        if (!nameInput.value) return clearField(nameInput);
        const err = validators.name(nameInput.value);
        err ? showError(nameInput, err) : showSuccess(nameInput);
      });
    }

    // 2. Email Address: must be Gmail format (e.g. you@gmail.com)
    const emailInputs = $$('#reg-email, #login-email');
    emailInputs.forEach(emailInput => {
      const validateEmail = () => {
        if (!emailInput.value) return clearField(emailInput);
        const err = validators.gmail(emailInput.value);
        err ? showError(emailInput, err) : showSuccess(emailInput);
      };
      emailInput.addEventListener('blur', validateEmail);
      emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('error') || emailInput.value.toLowerCase().endsWith('@gmail.com')) {
          validateEmail();
        }
      });
    });

    // 3. Mobile Number: numbers only, exactly 10 digits
    const mobileInput = $('#reg-mobile');
    if (mobileInput) {
      mobileInput.addEventListener('keydown', (e) => {
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
          return;
        }
        if (e.ctrlKey || e.metaKey) {
          return;
        }
        // Only allow numbers 0-9
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      });

      mobileInput.addEventListener('input', () => {
        mobileInput.value = mobileInput.value.replace(/\D/g, '').slice(0, 10);
        if (!mobileInput.value) {
          clearField(mobileInput);
          return;
        }
        if (mobileInput.value.length === 10) {
          showSuccess(mobileInput);
        } else if (mobileInput.classList.contains('error')) {
          const err = validators.mobile(mobileInput.value);
          err ? showError(mobileInput, err) : showSuccess(mobileInput);
        }
      });

      mobileInput.addEventListener('blur', () => {
        if (!mobileInput.value) return clearField(mobileInput);
        const err = validators.mobile(mobileInput.value);
        err ? showError(mobileInput, err) : showSuccess(mobileInput);
      });
    }

    // 4. Password: strong password validation
    const pwInputs = $$('#reg-password, #login-password');
    pwInputs.forEach(pwInput => {
      const validatePw = () => {
        if (!pwInput.value) return clearField(pwInput);
        const err = validators.password(pwInput.value);
        err ? showError(pwInput, err) : showSuccess(pwInput);
      };
      pwInput.addEventListener('blur', validatePw);
      pwInput.addEventListener('input', () => {
        if (pwInput.classList.contains('error') || pwInput.value.length >= 8) {
          validatePw();
        }
        if (pwInput.id === 'reg-password') {
          const confirmPw = $('#reg-confirm-password');
          if (confirmPw && confirmPw.value) {
            const cpErr = validators.confirmPassword(confirmPw.value, pwInput.value);
            cpErr ? showError(confirmPw, cpErr) : showSuccess(confirmPw);
          }
        }
      });
    });

    // 5. Confirm Password: must match password
    const confirmPw = $('#reg-confirm-password');
    if (confirmPw) {
      const validateConfirm = () => {
        const pw = $('#reg-password')?.value || '';
        if (!confirmPw.value) return clearField(confirmPw);
        const err = validators.confirmPassword(confirmPw.value, pw);
        err ? showError(confirmPw, err) : showSuccess(confirmPw);
      };
      confirmPw.addEventListener('blur', validateConfirm);
      confirmPw.addEventListener('input', () => {
        if (confirmPw.classList.contains('error') || confirmPw.value.length >= 8) {
          validateConfirm();
        }
      });
    }
  };

  // ── REGISTRATION FORM ──
  const initRegisterForm = () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = $('#reg-name');
      const email = $('#reg-email');
      const mobile = $('#reg-mobile');
      const password = $('#reg-password');
      const confirmPw = $('#reg-confirm-password');

      // Validate Name (only alphabets, max 16 letters)
      const nameErr = validators.name(name?.value || '');
      if (nameErr) { showError(name, nameErr); isValid = false; }
      else if (name) showSuccess(name);

      // Validate Email (Gmail format)
      const emailErr = validators.gmail(email?.value || '');
      if (emailErr) { showError(email, emailErr); isValid = false; }
      else if (email) showSuccess(email);

      // Validate Mobile (numbers only, 10 digits)
      const mobileErr = validators.mobile(mobile?.value || '');
      if (mobileErr) { showError(mobile, mobileErr); isValid = false; }
      else if (mobile) showSuccess(mobile);

      // Validate Password (strong password)
      const pwErr = validators.password(password?.value || '');
      if (pwErr) { showError(password, pwErr); isValid = false; }
      else if (password) showSuccess(password);

      // Validate Confirm Password (match password)
      const cpErr = validators.confirmPassword(confirmPw?.value || '', password?.value || '');
      if (cpErr) { showError(confirmPw, cpErr); isValid = false; }
      else if (confirmPw) showSuccess(confirmPw);

      if (!isValid) {
        if (window.showToast) showToast('Please fix the errors above.', 'error');
        return;
      }

      // Save registered email to localStorage so login page can auto-populate
      if (email?.value) {
        localStorage.setItem('stackly_email', email.value.trim());
      }

      // Show loading on button
      const submitBtn = form.querySelector('.auth-submit');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Creating Account... 🚀</span>';
        submitBtn.disabled = true;
      }

      if (window.showToast) {
        showToast('🎉 Account created successfully! Redirecting to login...', 'success');
      }

      // Render to login page
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    });
  };

  // ── LOGIN FORM ──
  const initLoginForm = () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    // Remember me & saved email
    const rememberMe = $('#remember-me');
    const savedEmail = localStorage.getItem('stackly_email');
    const loginEmail = $('#login-email');
    if (savedEmail && loginEmail && /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(savedEmail)) {
      loginEmail.value = savedEmail;
      if (rememberMe) rememberMe.checked = true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const email = $('#login-email');
      const password = $('#login-password');
      const role = $('#login-role');

      // 1. Validate Gmail format
      const emailErr = validators.gmail(email?.value || '');
      if (emailErr) { showError(email, emailErr); isValid = false; }
      else if (email) showSuccess(email);

      // 2. Validate Strong Password
      const pwErr = validators.password(password?.value || '');
      if (pwErr) {
        showError(password, pwErr);
        isValid = false;
      } else if (password) {
        showSuccess(password);
      }

      if (!role?.value) {
        const roleErr = document.getElementById('role-error');
        if (roleErr) { roleErr.textContent = '⚠ Please select your role'; roleErr.style.display = 'flex'; }
        isValid = false;
      } else {
        const roleErr = document.getElementById('role-error');
        if (roleErr) roleErr.style.display = 'none';
      }

      // Check Remember me
      const rememberCheckbox = $('#remember-me');
      const rememberErr = document.getElementById('remember-error');
      if (rememberCheckbox && !rememberCheckbox.checked) {
        if (rememberErr) {
          rememberErr.textContent = '⚠ Please click on "Remember me" to login.';
          rememberErr.style.display = 'block';
        }
        isValid = false;
      } else if (rememberErr) {
        rememberErr.style.display = 'none';
      }

      if (!isValid) {
        if (window.showToast) showToast('Please check all input details.', 'error');
        return;
      }

      // Remember me
      if (rememberMe?.checked && email) {
        localStorage.setItem('stackly_email', email.value);
      } else {
        localStorage.removeItem('stackly_email');
      }

      // Show loading
      const submitBtn = form.querySelector('.auth-submit');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Signing In... ⏳</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (window.showToast) showToast('✅ Login successful! Redirecting...', 'success');
        const selectedRole = role?.value;
        setTimeout(() => {
          if (selectedRole === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else {
            window.location.href = 'user-dashboard.html';
          }
        }, 1000);
      }, 1200);
    });
  };

  const initForgotPassword = () => {
    const forgotLink = document.getElementById('forgot-link');
    if (!forgotLink) return;
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  };

  // ── INIT ──
  document.addEventListener('DOMContentLoaded', () => {
    initEyeToggles();
    initLiveValidation();
    initPasswordStrength();
    initCharCounter();
    initRegisterForm();
    initLoginForm();
    initForgotPassword();
  });
}
