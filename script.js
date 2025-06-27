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

// === Hero Tagline & Social Icons Fade-In ===
document.addEventListener('DOMContentLoaded', () => {
  const tagline = document.querySelector('.hero-left p');
  const socialIcons = document.querySelector('.social-icons');

  setTimeout(() => {
    if (tagline) tagline.classList.add('animated');
    if (socialIcons) socialIcons.classList.add('animated');
  }, 1); // Match to typewriter timing if needed
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


