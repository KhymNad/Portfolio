// ==== Splash Screen & Fade-In Transition for Main on Load ===
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const main = document.querySelector("main");
  const body = document.body;

  // Add scroll lock while splash is active
  body.classList.add("lock-scroll");

  // Wait before fading out splash
  setTimeout(() => {
    splash.classList.add("fade-out");

    // After splash is gone, reveal main and unlock scroll
    setTimeout(() => {
      splash.style.display = "none";
      main.classList.add("reveal");
      body.classList.remove("lock-scroll"); // Unlock scroll and interactions
    }, 1000); // Matches splash fade-out duration
  }, 1500); // Initial splash display time
});

// === Fade-In on Scroll (IntersectionObserver) ===
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeObserver.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.15 });

// Attach to all .fade-section elements
document.querySelectorAll('.fade-section').forEach(el => fadeObserver.observe(el));

// === Scroll Indicator Dots Sync ===
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const visibilityMap = new Map();

const dotObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    visibilityMap.set(entry.target, entry.intersectionRatio);
  });

  let maxRatio = 0;
  let mostVisibleSection = null;
  for (const [section, ratio] of visibilityMap.entries()) {
    if (ratio > maxRatio) {
      maxRatio = ratio;
      mostVisibleSection = section;
    }
  }

  dots.forEach(dot => dot.classList.remove('active'));

  if (mostVisibleSection) {
    const sectionId = mostVisibleSection.getAttribute('id');
    const activeDot = [...dots].find(dot => dot.getAttribute('href')?.includes(sectionId));
    if (activeDot) activeDot.classList.add('active');
  } else {
    dots[0]?.classList.add('active');
  }
}, {
  threshold: Array.from({ length: 101 }, (_, i) => i / 100)
});

sections.forEach(section => dotObserver.observe(section));

// === Typing Animation for Hero Heading ===
document.addEventListener('DOMContentLoaded', () => {
  // Start page fade-in
  document.body.classList.add('fade-in');

  // After fade-in duration, trigger typing animation
  setTimeout(() => {
    const heading = document.querySelector('.hero-left h1');
    if (heading) {
      heading.style.animation = 'typing 1.5s steps(15, end) forwards, blinkCursor 0.7s step-end 2 forwards';
    }
  }, 1000);
});

// === Hero Tagline & Social Icons Fade-In ===
document.addEventListener('DOMContentLoaded', () => {
  const tagline = document.querySelector('.hero-left p');
  const socialIcons = document.querySelector('.social-icons');

  setTimeout(() => {
    if (tagline) tagline.classList.add('animated');
    if (socialIcons) socialIcons.classList.add('animated');
  }, 1100); // Match to typewriter timing if needed
});

// === Education & Experience Tabs ===
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');

    // Show the selected tab
    const selected = btn.getAttribute('data-tab');
    document.getElementById(selected).style.display = 'block';
  });
});
// === Smooth Scrolling for Navigation Links ===
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-tab');

    // Remove 'active' class from all buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Get both tab contents
    const education = document.getElementById('education');
    const certificates = document.getElementById('certificates');

    // Hide all tabs with fade-out
    [education, certificates].forEach(tab => {
      tab.classList.add('fade-out');
    });

    setTimeout(() => {
      // Actually hide the tabs
      education.style.display = 'none';
      certificates.style.display = 'none';
      education.classList.remove('fade-out');
      certificates.classList.remove('fade-out');

      // Show target tab with fade-in
      const target = document.getElementById(targetId);
      target.style.display = 'block';
      target.classList.add('tab-content'); // triggers fadeIn animation
    }, 200);
  });
});
const fadeObserverSection = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const section = entry.target;
      const header = section.querySelector('.section-header');
      const content = section.querySelector('.section-content');

      if (header) {
        header.classList.add('fade-in');
        // Wait for header animation then fade in content
        setTimeout(() => {
          if (content) content.classList.add('fade-in');
        }, 400); // 400ms delay matches CSS transition-delay
      } else if (content) {
        // If no header, fade in content immediately
        content.classList.add('fade-in');
      }

      fadeObserverSection.unobserve(section);
    }
  });
}, { threshold: 0.15 });

// Observe only the sections (not headers)
document.querySelectorAll('.fade-section').forEach(section => {
  fadeObserverSection.observe(section);
});

// === Certificates Scroll on Hover ===
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.certificates-scroll-container');
  const certCards = document.querySelectorAll('.cert-card');

  certCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    });
  });
});

// === Custom Cursor Implementation ===
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const speed = 0.15;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.top = `${cursorY}px`;
  cursor.style.left = `${cursorX}px`;

  requestAnimationFrame(animate);
}

animate();

// Interactable elements to trigger cursor compression
const interactables = ['a', 'button', 'input', 'textarea', 'select', '.cert-card'];

interactables.forEach(selector => {
  document.querySelectorAll(selector).forEach(elem => {
    elem.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    elem.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
});



