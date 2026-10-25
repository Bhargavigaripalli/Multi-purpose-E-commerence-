// core.js — Stackly Electronics Core JavaScript
'use strict';

// ── UTILITIES ──
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const debounce = (fn, ms = 100) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

// ── NAVBAR & SCROLL PROGRESS (REFERENCE) ──
const initNavbar = () => {
  const header = $('header') || $('.navbar');
  const scrollProgressBar = $('.scroll-progress-bar');

  // Scroll effect & progress indicator
  const handleScroll = debounce(() => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (scrollProgressBar) {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      scrollProgressBar.style.width = `${scrollPercentage}%`;
    }
  }, 10);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Hamburger & Mobile Nav Drawer
  const hamburger = $('.hamburger') || $('#navbar-hamburger');
  const navLinks = $('.nav-links') || $('#navbar-links');
  const mobileNav = $('.mobile-nav');

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hamburger.classList.toggle('active');
      hamburger.classList.toggle('open', isOpen);
      if (navLinks) {
        navLinks.classList.toggle('active', isOpen);
        navLinks.classList.toggle('open', isOpen);
      }
      if (mobileNav) {
        mobileNav.classList.toggle('open', isOpen);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (header && !header.contains(e.target)) {
        hamburger.classList.remove('active', 'open');
        if (navLinks) navLinks.classList.remove('active', 'open');
        if (mobileNav) mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    $$('.nav-links .nav-link, .mobile-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active', 'open');
        if (navLinks) navLinks.classList.remove('active', 'open');
        if (mobileNav) mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive = href === path || (path === '' && href === 'index.html') || 
                     (path === 'index.html' && href === 'index.html');
    link.classList.toggle('active', isActive);
  });
};

// ── SMOOTH SCROLL ──
const initSmoothScroll = () => {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80');
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

// ── BACK TO TOP ──
const initBackToTop = () => {
  const btn = $('.back-to-top');
  if (!btn) return;
  const toggle = debounce(() => btn.classList.toggle('visible', window.scrollY > 400), 10);
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

// ── RIPPLE ──
const initRipple = () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    Object.assign(ripple.style, {
      width: size + 'px', height: size + 'px',
      left: x + 'px', top: y + 'px'
    });
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
};

// ── SCROLL REVEAL ──
const initScrollReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade').forEach(el => {
    observer.observe(el);
  });
};

// ── STAGGER CHILDREN ──
const initStagger = () => {
  $$('[data-stagger]').forEach(parent => {
    const delay = parseFloat(parent.dataset.stagger) || 0.1;
    $$(':scope > *', parent).forEach((child, i) => {
      child.style.transitionDelay = (i * delay) + 's';
      child.classList.add('reveal');
    });
  });
};

// ── TOAST NOTIFICATION ──
window.showToast = (msg, type = 'info', duration = 3500) => {
  let container = $('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="font-size:1.1rem">${icons[type]||icons.info}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastSlideIn 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 350);
  }, duration);
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initBackToTop();
  initRipple();
  initScrollReveal();
  initStagger();
  document.body.classList.add('page-loaded');
});
