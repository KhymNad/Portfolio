console.log("Portfolio loaded.");

const carousel = document.querySelector('.carousel');
const navButtons = document.querySelectorAll('.carousel-nav .nav-btn');

let currentSlide = 0;

function goToSlide(index) {
  if (index < 0 || index >= navButtons.length) return;
  carousel.style.transform = `translateX(-${index * 100}vw)`;
  currentSlide = index;
  updateActiveButton();
}

function updateActiveButton() {
  navButtons.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === currentSlide);
  });
}

// Add click listeners
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const index = Number(btn.getAttribute('data-slide'));
    goToSlide(index);
  });
});

// Initialize to show first slide
goToSlide(0);

// Existing "Go to Top" button functionality (optional)
document.addEventListener("DOMContentLoaded", function () {
  let btn = document.getElementById("goToTopBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "goToTopBtn";
    btn.textContent = "↑ Top";
    btn.style.position = "fixed";
    btn.style.bottom = "30px";
    btn.style.right = "30px";
    btn.style.padding = "0.7rem 1.2rem";
    btn.style.borderRadius = "2rem";
    btn.style.background = "#00adb5";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.fontSize = "1rem";
    btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
    btn.style.cursor = "pointer";
    btn.style.display = "none";
    btn.style.zIndex = "1000";
    document.body.appendChild(btn);
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// --- Smooth glowing cursor with easing ---

// Create cursor element dynamically if not in HTML
let cursor = document.querySelector('.cursor');
if (!cursor) {
  cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

const ease = 0.15;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * ease;
  currentY += (mouseY - currentY) * ease;
  cursor.style.left = currentX + 'px';
  cursor.style.top = currentY + 'px';
  requestAnimationFrame(animateCursor);
}

animateCursor();

// --- Intersection observer for fade-in sections (toggle in-view every time) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .hero').forEach(el => observer.observe(el));

// --- IntersectionObserver for scroll indicator dots with fallback first dot highlight ---
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');

const visibilityMap = new Map();

const dotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    visibilityMap.set(entry.target, entry.intersectionRatio);
  });

  // Find section with highest visibility ratio
  let maxRatio = 0;
  let mostVisibleSection = null;
  for (const [section, ratio] of visibilityMap.entries()) {
    if (ratio > maxRatio) {
      maxRatio = ratio;
      mostVisibleSection = section;
    }
  }

  dots.forEach(dot => dot.classList.remove('active')); // Clear all first

  if (mostVisibleSection) {
    const sectionId = mostVisibleSection.getAttribute('id');
    const dotToActivate = [...dots].find(dot => dot.getAttribute('href')?.includes(sectionId));
    if (dotToActivate) {
      dotToActivate.classList.add('active');
    }
  }

  // If no dot is active, activate the first dot by default
  const anyActive = [...dots].some(dot => dot.classList.contains('active'));
  if (!anyActive) {
    dots[0]?.classList.add('active');
  }

}, {
  root: null,
  rootMargin: '0px',
  threshold: Array.from({ length: 101 }, (_, i) => i / 100) // threshold array 0 to 1 step 0.01
});

sections.forEach(section => dotObserver.observe(section));

// Bonus fix: On page load, ensure first dot is active if none active
window.addEventListener('load', () => {
  if (![...dots].some(dot => dot.classList.contains('active'))) {
    dots[0]?.classList.add('active');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
