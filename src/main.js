/**
 * MARK A. FLANDEZ - PORTFOLIO INTERACTIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollSpy();
  initCopyButtons();
  initCompetencyFilter();
  initContactForm();
  initPrintResume();
  initDynamicYear();
});

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
  const header = document.getElementById('navbar');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  };

  toggle.addEventListener('click', toggleMenu);

  // Close menu when clicking nav links
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * ScrollSpy for Active Nav Link
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/**
 * 1-Click Copy-to-Clipboard with Toast Notification
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied to clipboard: "${textToCopy}"`);
      } catch (err) {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Copied to clipboard: "${textToCopy}"`);
      }
    });
  });
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#34d399" stroke-width="2" fill="none">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

/**
 * Competencies Category Filter
 */
function initCompetencyFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.competency-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Interactive Contact Form
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successAlert = document.getElementById('form-success');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      nameInput.classList.add('error');
      nameError.classList.add('visible');
      isValid = false;
    } else {
      nameInput.classList.remove('error');
      nameError.classList.remove('visible');
    }

    // Email Validation
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailError.classList.add('visible');
      isValid = false;
    } else {
      emailInput.classList.remove('error');
      emailError.classList.remove('visible');
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      messageInput.classList.add('error');
      messageError.classList.add('visible');
      isValid = false;
    } else {
      messageInput.classList.remove('error');
      messageError.classList.remove('visible');
    }

    if (!isValid) return;

    const name = encodeURIComponent(nameInput.value.trim());
    const email = encodeURIComponent(emailInput.value.trim());
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value} - ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Hello Mark,\n\n` +
      `My Name: ${nameInput.value.trim()}\n` +
      `My Email: ${emailInput.value.trim()}\n` +
      `Inquiry Topic: ${subjectInput.value}\n\n` +
      `Message:\n${messageInput.value.trim()}\n\n` +
      `Best regards,\n${nameInput.value.trim()}`
    );

    const mailtoUrl = `mailto:mark.flandez@gmail.com?subject=${subject}&body=${body}`;

    if (successAlert) {
      successAlert.style.display = 'flex';
    }

    showToast('Inquiry drafted! Launching email composer...');

    // Open mail client
    window.location.href = mailtoUrl;
  });

  // Clear errors on input
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const err = document.getElementById(`${input.name}-error`);
      if (err) err.classList.remove('visible');
    });
  });
}

/**
 * Print Resume Handler
 */
function initPrintResume() {
  const printBtn = document.getElementById('btn-print-cv');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Dynamic Footer Year
 */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
