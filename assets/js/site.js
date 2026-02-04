const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));

revealTargets.forEach((target, index) => {
  const delay = Math.min(index * 60, 360);
  target.style.setProperty('--reveal-delay', `${delay}ms`);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('visible'));
}

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxCloseButtons = document.querySelectorAll('[data-lightbox-close]');
const shots = document.querySelectorAll('[data-shot]');

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  if (lightboxImage) {
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }
};

shots.forEach((img) => {
  img.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    const fullSrc = img.getAttribute('data-full') || img.src;
    lightboxImage.src = fullSrc;
    lightboxImage.alt = img.alt || 'Screenshot preview';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

lightboxCloseButtons.forEach((button) => {
  button.addEventListener('click', closeLightbox);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
