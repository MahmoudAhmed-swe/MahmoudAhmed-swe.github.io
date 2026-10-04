const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const year = document.querySelector('#year');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') root.classList.add('light');

function updateThemeIcon() {
  const light = root.classList.contains('light');
  themeToggle.textContent = light ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('portfolio-theme', root.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

year.textContent = new Date().getFullYear();
