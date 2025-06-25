// Smooth glowing custom cursor
const cursor = document.querySelector('.cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
const ease = 0.15;

// window.addEventListener('mousemove', e => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
// });

// function animateCursor() {
//   currentX += (mouseX - currentX) * ease;
//   currentY += (mouseY - currentY) * ease;
//   cursor.style.left = currentX + 'px';
//   cursor.style.top = currentY + 'px';
//   requestAnimationFrame(animateCursor);
// }
// animateCursor();

// Fade-in on scroll (IntersectionObserver)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .hero').forEach(el => observer.observe(el));

// Scroll Indicator dots with section visibility detection
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const visibilityMap = new Map();

const dotObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    visibilityMap.set(entry.target, entry.intersectionRatio);
  });

  // Find the section with the highest intersection ratio
  let maxRatio = 0;
  let mostVisibleSection = null;
  for (const [section, ratio] of visibilityMap.entries()) {
    if (ratio > maxRatio) {
      maxRatio = ratio;
      mostVisibleSection = section;
    }
  }

  // Remove active class from all dots
  dots.forEach(dot => dot.classList.remove('active'));

  if (mostVisibleSection) {
    const sectionId = mostVisibleSection.getAttribute('id');
    const activeDot = [...dots].find(dot => dot.getAttribute('href')?.includes(sectionId));
    if (activeDot) activeDot.classList.add('active');
  } else {
    // Default to first dot if no section is visible
    dots[0]?.classList.add('active');
  }
}, {
  threshold: Array.from({ length: 101 }, (_, i) => i / 100)
});

sections.forEach(section => dotObserver.observe(section));

// Tagline and social icons fade-in after typing animation (only once)
document.addEventListener('DOMContentLoaded', () => {
  const tagline = document.querySelector('.hero-left p');
  const socialIcons = document.querySelector('.social-icons');

  // Adjust timeout duration to your typing animation length (e.g., 1500ms)
  setTimeout(() => {
    if (tagline) tagline.classList.add('animated');
    if (socialIcons) socialIcons.classList.add('animated');
  }, 1);
});
