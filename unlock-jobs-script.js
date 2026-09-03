document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll reveal animations
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Sticky CTA — appears by default once the hero has scrolled out of view
  const stickyCta = document.getElementById('stickyCta');
  const heroSection = document.querySelector('.hero');

  if (stickyCta && heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
    );
    heroObserver.observe(heroSection);
  }
});
