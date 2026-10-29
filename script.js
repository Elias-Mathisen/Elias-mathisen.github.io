function disableScroll() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollBarWidth + "px";
  document.body.classList.add("no-scroll");
}

function enableScroll() {
  document.body.style.paddingRight = "";
  document.body.classList.remove("no-scroll");
}

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let currentIndex = 0;
let startX = 0;

function show(i) {
  currentIndex = (i + images.length) % images.length;
  const img = images[currentIndex];
  lightboxImg.classList.add("swapping");
  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${currentIndex + 1} / ${images.length}`;
    lightboxImg.classList.remove("swapping");
  }, 150);
}

function openLightbox(i) {
  show(i);
  lightbox.classList.add("open");
  disableScroll();
  lightbox.querySelector(".close").focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains("open")) return;
  lightbox.classList.remove("open");
  enableScroll();
  images[currentIndex].focus();
}

images.forEach((img, i) => {
  img.tabIndex = 0;
  img.addEventListener("click", () => openLightbox(i));
  img.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(i);
    }
  });
});

lightbox.querySelector(".close").onclick = closeLightbox;
lightbox.querySelector(".prev").onclick = () => show(currentIndex - 1);
lightbox.querySelector(".next").onclick = () => show(currentIndex + 1);

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "ArrowRight") show(currentIndex + 1);
  if (e.key === "ArrowLeft") show(currentIndex - 1);
  if (e.key === "Escape") closeLightbox();
});

lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) show(currentIndex + (diff > 0 ? 1 : -1));
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

const topbar = document.querySelector(".topbar");
const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// contact form: opens the visitor's email app with the request filled in, addressed to the hide
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const lines = [];
    let name = "";
    let message = "";
    contactForm.querySelectorAll(".field").forEach(field => {
      const input = field.querySelector("input, textarea");
      const value = input.value.trim();
      if (input.name === "name") name = value;
      if (input.name === "message") message = value;
      // label text without "(optional)" / "(valgfritt)"
      else if (value) lines.push(`${field.querySelector("label").textContent.replace(/\s*\(.*\)/, "")}: ${value}`);
    });
    const subject = `${contactForm.dataset.subject} – ${name}`;
    const body = `${message}\n\n${lines.join("\n")}`;
    window.location.href = `mailto:${contactForm.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = contactForm.querySelector(".form-status");
    status.textContent = contactForm.dataset.success;
    status.className = "form-status ok";
  });
}


function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

document.querySelector(".hamburger").addEventListener("click", toggleMenu);

document.getElementById("logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", location.pathname);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetId = link.dataset.target;
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    document.querySelector(".nav-links").classList.remove("active");
    history.replaceState(null, "", location.pathname);
  });
});


document.addEventListener("contextmenu", e => {
  // still allow right-click paste in the contact form
  if (!e.target.closest("form")) e.preventDefault();
});
