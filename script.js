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
let currentIndex = 0;
let startX = 0;
let endX = 0;

images.forEach((img, i) => {
  img.onclick = () => {
    currentIndex = i;
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    disableScroll();
  };
});

document.querySelector(".close").onclick = () => {
  lightbox.style.display = "none";
  enableScroll();
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "flex") return;

  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }

  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  }
});

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex = (currentIndex + 1) % images.length;
    } else {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    lightboxImg.src = images[currentIndex].src;
  }
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    enableScroll();
  }
});

const utleieItems = document.querySelectorAll(".utleie-item img");
const utleieLightbox = document.getElementById("utleieLightbox");
const utleieLightboxImg = utleieLightbox.querySelector("img");
const utleieCopyright = utleieLightbox.querySelector(".copyright");
const utleieClose = utleieLightbox.querySelector(".close");

utleieItems.forEach(img => {
  img.addEventListener("click", () => {
    utleieLightbox.style.display = "flex";
    utleieLightboxImg.src = img.src;
    utleieLightboxImg.alt = img.alt;
    utleieCopyright.textContent = img.alt;
    disableScroll();
  });
});

utleieClose.addEventListener("click", () => {
  utleieLightbox.style.display = "none";
  enableScroll();
});

utleieLightbox.addEventListener("click", (e) => {
  if (e.target === utleieLightbox) {
    utleieLightbox.style.display = "none";
    enableScroll();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (lightbox.style.display === "flex") {
      lightbox.style.display = "none";
    }

    if (utleieLightbox.style.display === "flex") {
      utleieLightbox.style.display = "none";
    }

    enableScroll();
  }
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const body = `Telefon: ${phone || "Ikke oppgitt"}

${message}
`;

  window.location.href =
    `mailto:photo.espen@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelector('.hamburger').addEventListener('click', toggleMenu);

document.getElementById("logo").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".nav-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.target;
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
  });
});

window.addEventListener('hashchange', () => {
  history.replaceState(null, '', location.pathname + location.search);
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
