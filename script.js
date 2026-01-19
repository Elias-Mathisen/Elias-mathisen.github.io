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

document.addEventListener("keydown", e => {
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

lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    currentIndex =
      diff > 0
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;

    lightboxImg.src = images[currentIndex].src;
  }
});

lightbox.addEventListener("click", e => {
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

utleieLightbox.addEventListener("click", e => {
  if (e.target === utleieLightbox) {
    utleieLightbox.style.display = "none";
    enableScroll();
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
    utleieLightbox.style.display = "none";
    enableScroll();
  }
});


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
  e.preventDefault();
});

setInterval(() => {
  document.querySelectorAll("img").forEach(img => {
    if (img.src.includes("app.cal.com/api/logo")) {
      img.remove();
    }
  });
}, 1000);
