const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('is-open');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const projectTrack = document.querySelector('.project-grid');
const projectSlides = [...projectTrack.querySelectorAll('.project-card')];
const carouselCount = document.querySelector('.carousel-count');
const carouselDots = document.querySelector('.carousel-dots');
let activeProject = 0;

function updateCarousel() {
  const trackLeft = projectTrack.getBoundingClientRect().left;
  activeProject = projectSlides.reduce((closestIndex, slide, index) => {
    const currentDistance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
    const closestDistance = Math.abs(projectSlides[closestIndex].getBoundingClientRect().left - trackLeft);
    return currentDistance < closestDistance ? index : closestIndex;
  }, 0);

  carouselCount.textContent = `${String(activeProject + 1).padStart(2, '0')} / ${String(projectSlides.length).padStart(2, '0')}`;
  carouselDots.querySelectorAll('button').forEach((dot, index) => {
    dot.setAttribute('aria-current', String(index === activeProject));
  });
}

projectSlides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show project ${index + 1}: ${slide.querySelector('h3').textContent}`);
  dot.setAttribute('aria-current', String(index === 0));
  dot.addEventListener('click', () => {
    slide.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });
  carouselDots.append(dot);
});

document.querySelectorAll('[data-carousel-step]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetIndex = Math.max(0, Math.min(projectSlides.length - 1, activeProject + Number(button.dataset.carouselStep)));
    projectSlides[targetIndex].scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });
});

projectTrack.addEventListener('scroll', () => window.requestAnimationFrame(updateCarousel), { passive: true });
projectTrack.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const targetIndex = Math.max(0, Math.min(projectSlides.length - 1, activeProject + direction));
    projectSlides[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }
});

updateCarousel();

const reviewTrack = document.querySelector('[data-review-track]');
if (reviewTrack && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reviewGroup = reviewTrack.querySelector('.review-group');
  const reviewCards = reviewGroup ? [...reviewGroup.querySelectorAll('.review-card')] : [];
  if (reviewGroup && reviewCards.length > 0) {
    const duplicate = reviewGroup.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    duplicate.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
    reviewTrack.append(duplicate);
    reviewTrack.classList.add('review-track--moving');
    reviewTrack.style.setProperty('--review-duration', `${Math.max(36, reviewCards.length * 14)}s`);
  }
}
