// animations.js — Stackly Electronics Animations
'use strict';

{
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── ANIMATED COUNTER ──
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || 2000);
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);
      el.textContent = prefix + (decimals ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const initCounters = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    $$('[data-counter]').forEach(el => observer.observe(el));
  };

  // ── TYPING ANIMATION ──
  const initTyping = () => {
    $$('[data-typing]').forEach(el => {
      let words;
      try { words = JSON.parse(el.dataset.typing); } catch { return; }
      if (!words.length) return;

      let wordIdx = 0, charIdx = 0, deleting = false;
      const typeSpeed = 90, deleteSpeed = 55, pauseMs = 2200;

      const type = () => {
        const word = words[wordIdx];
        if (!deleting) {
          charIdx++;
          el.textContent = word.slice(0, charIdx);
          if (charIdx >= word.length) {
            deleting = true;
            setTimeout(type, pauseMs);
            return;
          }
          setTimeout(type, typeSpeed);
        } else {
          charIdx--;
          el.textContent = word.slice(0, charIdx);
          if (charIdx <= 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(type, 300);
            return;
          }
          setTimeout(type, deleteSpeed);
        }
      };
      setTimeout(type, 800);
    });
  };

  // ── TILT CARDS ──
  const initTiltCards = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    $$('.tilt-card').forEach(card => {
      const maxTilt = parseFloat(card.dataset.tilt || 8);
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(8px)`;
        card.style.transition = 'none';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = '';
      });
    });
  };

  // ── MAGNETIC BUTTONS ──
  const initMagnetic = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    $$('.magnetic').forEach(btn => {
      const strength = parseFloat(btn.dataset.magnetic || 25);
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  };

  // ── ACCORDION ──
  const initAccordion = () => {
    $$('.accordion-item').forEach(item => {
      const header = $('.accordion-header', item);
      const body = $('.accordion-body', item);
      if (!header || !body) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all siblings in same container
        const container = item.parentElement;
        if (container) {
          $$('.accordion-item.open', container).forEach(openItem => {
            if (openItem !== item) {
              openItem.classList.remove('open');
              const b = $('.accordion-body', openItem);
              if (b) b.style.maxHeight = '0';
            }
          });
        }
        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = '0';
        } else {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 100 + 'px';
        }
      });
    });
  };

  // ── COUNTDOWN TIMER ──
  const initCountdown = () => {
    $$('[data-countdown]').forEach(el => {
      // Set end time: 2 days from now for demo
      const endTime = Date.now() + (2 * 24 * 60 * 60 * 1000) + (11 * 60 * 60 * 1000);
      const pad = n => String(Math.max(0, n)).padStart(2, '0');

      const update = () => {
        const diff = Math.max(endTime - Date.now(), 0);
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        const dEl = el.querySelector('[data-unit="days"]');
        const hEl = el.querySelector('[data-unit="hours"]');
        const mEl = el.querySelector('[data-unit="minutes"]');
        const sEl = el.querySelector('[data-unit="seconds"]');
        if (dEl) dEl.textContent = pad(d);
        if (hEl) hEl.textContent = pad(h);
        if (mEl) mEl.textContent = pad(m);
        if (sEl) sEl.textContent = pad(s);
      };
      update();
      setInterval(update, 1000);
    });
  };

  // ── MOUSE PARALLAX ──
  const initParallax = () => {
    const hero = $('.hero');
    if (!hero || window.matchMedia('(hover: none)').matches) return;
    const parallaxEls = $$('[data-parallax]', hero);
    if (!parallaxEls.length) return;

    let ticking = false;
    hero.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        parallaxEls.forEach(el => {
          const depth = parseFloat(el.dataset.parallax || 0.05);
          el.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
        });
        ticking = false;
      });
    });
    hero.addEventListener('mouseleave', () => {
      parallaxEls.forEach(el => { el.style.transform = ''; });
    });
  };

  // ── GLOW FOLLOW CURSOR ──
  const initCursorGlow = () => {
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    Object.assign(glow.style, {
      position: 'fixed', width: '300px', height: '300px',
      borderRadius: '50%', pointerEvents: 'none', zIndex: '0',
      background: 'radial-gradient(circle, rgba(2,132,199,0.08) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s ease',
      opacity: '0'
    });
    document.body.appendChild(glow);

    let rafPending = false;
    document.addEventListener('mousemove', (e) => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.opacity = '1';
        rafPending = false;
      });
    });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  };

  // ── PROGRESS BAR ANIMATION ──
  const initProgressBars = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.progress-fill');
          if (fill) {
            const target = fill.dataset.width || fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
              fill.style.width = target;
              fill.style.transition = 'width 1.5s ease';
            }, 100);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    $$('.progress-bar').forEach(bar => observer.observe(bar));
  };

  // ── INIT ──
  document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTyping();
    initTiltCards();
    initMagnetic();
    initAccordion();
    initCountdown();
    initParallax();
    initCursorGlow();
    initProgressBars();
  });
}
