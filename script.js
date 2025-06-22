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

// Floating glowing cursor
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Intersection observer for fade-in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .hero').forEach((el) => {
  observer.observe(el);
});

// Smooth scroll for navigation dots
const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll(".dot");

window.addEventListener("scroll", () => {
let current = "";
sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
    current = section.getAttribute("id");
    }
});

dots.forEach(dot => {
    dot.classList.remove("active");
    if (dot.getAttribute("href").includes(current)) {
    dot.classList.add("active");
    }
});
});

