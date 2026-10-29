// Scroll and entrance animations. Loaded after GSAP; if GSAP fails to load the page still works, just without motion.
const figures = document.querySelectorAll(".gallery figure");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.gsap && window.ScrollTrigger && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  const ease = "power3.out";

  // hero: logo settles in, title letters rise one by one, then text and buttons
  const title = document.querySelector(".hero h1");
  title.setAttribute("aria-label", title.textContent);
  title.innerHTML = [...title.textContent].map(c => `<span class="char" aria-hidden="true">${c}</span>`).join("");
  gsap.timeline({ defaults: { ease } })
    .from(".hero-logo", { autoAlpha: 0, y: 30, scale: 0.9, duration: 1 })
    .from(".hero h1 .char", { autoAlpha: 0, yPercent: 60, rotate: 8, stagger: 0.035, duration: 0.8 }, "-=0.6")
    .from(".hero p, .hero-actions", { autoAlpha: 0, y: 20, stagger: 0.12, duration: 0.8 }, "-=0.5");

  // logo drifts up a little as the hero scrolls away
  gsap.to(".hero-logo", {
    yPercent: -25,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  gsap.utils.toArray("section .eyebrow, section h2, .about-intro, .contact-wrapper > p, .map-wrapper, .partner, .contact-form").forEach(el =>
    gsap.from(el, { autoAlpha: 0, y: 30, duration: 0.9, ease, scrollTrigger: { trigger: el, start: "top 88%" } }));

  // gallery: each square unmasks upward while the photo settles inside it
  const hidden = "inset(100% 0% 0% 0% round 22px)";
  gsap.set(figures, { clipPath: hidden, transformPerspective: 900 });
  ScrollTrigger.batch(figures, {
    start: "top 90%",
    once: true,
    onEnter: batch => {
      gsap.fromTo(batch, { clipPath: hidden }, { clipPath: "inset(0% 0% 0% 0% round 22px)", duration: 1.1, ease: "power4.out", stagger: 0.12 });
      gsap.fromTo(batch.map(f => f.querySelector("img")), { scale: 1.35 }, {
        scale: 1,
        duration: 1.4,
        ease,
        stagger: 0.12,
        onComplete() {
          this.targets().forEach(img => {
            gsap.set(img, { clearProps: "transform" });
            img.closest("figure").classList.add("revealed");
          });
        },
      });
    },
  });

  // gentle 3D tilt that follows the pointer
  if (window.matchMedia("(hover: hover)").matches) {
    figures.forEach(f => {
      const rx = gsap.quickTo(f, "rotationX", { duration: 0.6, ease });
      const ry = gsap.quickTo(f, "rotationY", { duration: 0.6, ease });
      f.addEventListener("pointermove", e => {
        const b = f.getBoundingClientRect();
        ry(((e.clientX - b.left) / b.width - 0.5) * 10);
        rx(-((e.clientY - b.top) / b.height - 0.5) * 10);
      });
      f.addEventListener("pointerleave", () => {
        rx(0);
        ry(0);
      });
    });
  }

  gsap.set(".info-card", { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch(".info-card", {
    start: "top 90%",
    once: true,
    onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.9, ease }),
  });
} else {
  figures.forEach(f => f.classList.add("revealed"));
}
