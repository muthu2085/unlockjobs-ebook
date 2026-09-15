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

  const supportsObserver = 'IntersectionObserver' in window;

  // Scroll reveal animations
  const revealEls = document.querySelectorAll('.reveal');

  if (supportsObserver && revealEls.length) {
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

  // Sticky CTA — visible after the hero, hidden once checkout is on screen
  const stickyCta = document.getElementById('stickyCta');
  const hero = document.querySelector('.hero');
  const checkout = document.getElementById('checkout');

  if (stickyCta && hero && supportsObserver) {
    let pastHero = false;
    let atCheckout = false;

    const sync = () => stickyCta.classList.toggle('is-visible', pastHero && !atCheckout);

    new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        sync();
      },
      { threshold: 0, rootMargin: '-10% 0px 0px 0px' }
    ).observe(hero);

    if (checkout) {
      new IntersectionObserver(
        ([entry]) => {
          atCheckout = entry.isIntersecting;
          sync();
        },
        { threshold: 0.35 }
      ).observe(checkout);
    }
  }
});
