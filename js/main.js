/* ============================================================
   MAIN.JS — SoundWave Music Website

   Runs on EVERY page. Handles:
   - Dark / Light theme toggle (saved in localStorage)
   - Hamburger menu for mobile
   - Active nav link highlighting
   - Navbar scroll shadow
   - Scroll-reveal animations (IntersectionObserver)
   - Toast notification system
   - Footer copyright year
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHamburger();
  setActiveNav();
  initScrollEffects();
  initScrollReveal();
  setFooterYear();
});

/* ── Theme ────────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('soundwave-theme') || 'dark';
  applyTheme(saved);
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('#theme-toggle i');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('soundwave-theme', next);
}

/* ── Hamburger ────────────────────────────────────────────── */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      btn.classList.remove('active');
      menu.classList.remove('active');
    })
  );

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('active');
      menu.classList.remove('active');
    }
  });
}

/* ── Active nav link ──────────────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ── Scroll shadow on navbar ──────────────────────────────── */
function initScrollEffects() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () =>
    nav.classList.toggle('scrolled', window.scrollY > 20)
  );
}

/* ── Scroll reveal (add class="reveal" to opt in) ────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

/* ── Toast notifications ──────────────────────────────────── */
function showToast(message, type = 'info') {
  const icons = {
    success: 'fas fa-check-circle',
    error:   'fas fa-times-circle',
    info:    'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle',
  };

  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icons[type]} toast-icon"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

/* ── Footer year ──────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
