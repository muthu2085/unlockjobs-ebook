const faqItems = document.querySelectorAll(".faq-item");
const hero = document.querySelector(".hero");
const stickyOffer = document.querySelector(".sticky-offer");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", String(!isOpen));
  });
});

const updateStickyOffer = () => {
  if (!hero || !stickyOffer) return;
  const showAfter = hero.offsetTop + hero.offsetHeight * 0.82;
  stickyOffer.classList.toggle("is-visible", window.scrollY > showAfter);
};

updateStickyOffer();
window.addEventListener("scroll", updateStickyOffer, { passive: true });
window.addEventListener("resize", updateStickyOffer);
