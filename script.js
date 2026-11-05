// Portfolio — Tyssia Malalatiana

const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const burger = nav.querySelector('.nav__burger');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fond de la barre de navigation au défilement
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menu mobile
const setMenu = (open) => {
  menu.classList.toggle('is-open', open);
  nav.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// « PORTFOLIO » découpé en lettres pour l'entrée en cascade
const heroWord = document.querySelector('.hero__word');
heroWord.innerHTML = [...heroWord.textContent].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join('');

// Barre de progression + PORTFOLIO qui s'enfonce plus lentement que la page
const progress = document.querySelector('.progress');
const hero = document.querySelector('.hero');
let ticking = false;
const onFrame = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.setProperty('--progress', max > 0 ? window.scrollY / max : 0);
  if (!reduceMotion && window.scrollY < hero.offsetHeight) heroWord.style.setProperty('--py', `${window.scrollY * 0.3}px`);
  ticking = false;
};
onFrame();
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(onFrame);
}, { passive: true });

// Trèfle : penche vers la souris sans quitter sa place
const clover = document.querySelector('.hero__clover');
if (clover && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let target = 0;
  let current = 0;
  let raf = 0;
  const tick = () => {
    current += (target - current) * 0.08;
    clover.style.transform = `rotate(${current.toFixed(2)}deg)`;
    raf = Math.abs(target - current) > 0.05 ? requestAnimationFrame(tick) : 0;
  };
  window.addEventListener('pointermove', (e) => {
    if (window.scrollY > hero.offsetHeight) return;
    const r = clover.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
    target = Math.max(-1, Math.min(1, dx)) * 22;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
}

// Chiffres qui défilent jusqu'à leur valeur
const countUp = (el) => {
  if (reduceMotion) return;
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(end * (1 - (1 - t) ** 3)) + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

// Apparition des blocs au défilement (les enfants des [data-stagger] arrivent en cascade)
document.querySelectorAll('[data-stagger]').forEach((list) => {
  [...list.children].forEach((child, i) => child.style.setProperty('--i', i));
});
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    entry.target.querySelectorAll('[data-count]').forEach(countUp);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
document.querySelectorAll('.reveal, .sec-head, [data-stagger]').forEach((el) => revealObserver.observe(el));

// Cartes qui s'inclinent sous la souris
if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.transform = '';
    });
  });
}

// Parcours : afficher / masquer les expériences les plus anciennes
const timelineToggle = document.querySelector('.timeline__toggle');
if (timelineToggle) {
  const timelineList = document.getElementById(timelineToggle.getAttribute('aria-controls'));
  const label = timelineToggle.querySelector('.timeline__toggle-label');
  timelineToggle.addEventListener('click', () => {
    const expanded = timelineList.classList.toggle('is-expanded');
    timelineToggle.setAttribute('aria-expanded', String(expanded));
    label.textContent = expanded ? 'Réduire le parcours' : 'Voir tout le parcours';
    if (!expanded) timelineToggle.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

// Lien actif dans la navigation
const links = [...menu.querySelectorAll('a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));
