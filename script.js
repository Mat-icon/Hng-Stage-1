// Image dimensions display
const output = document.querySelector("pre.image-dimensions");
const image = document.querySelector("img.profile-image");

if (image && output) {
  image.addEventListener("load", () => {
    const { naturalWidth, naturalHeight, width, height } = image;
    output.textContent = `Natural size: ${naturalWidth} x ${naturalHeight}px | Displayed: ${Math.round(width)} x ${Math.round(height)}px`;
  });

  // Handle image loading errors
  image.addEventListener("error", () => {
    output.textContent = "Image failed to load";
    console.error("Failed to load profile image");
  });
}

// Time and date functionality with smooth updates
document.addEventListener('DOMContentLoaded', () => {
  const currentTimeUTC = document.getElementById('currentTimeUTC');
  const currentDay = document.getElementById('currentDay');

  if (!currentTimeUTC || !currentDay) {
    console.error("Time elements not found");
    return;
  }

  function updateTime() {
    const now = new Date();

    // Format time in UTC with smooth transition
    const timeString = now.toUTCString().split(' ')[4];
    if (currentTimeUTC.textContent !== timeString) {
      currentTimeUTC.style.opacity = '0.7';
      setTimeout(() => {
        currentTimeUTC.textContent = timeString;
        currentTimeUTC.style.opacity = '1';
      }, 100);
    }

    // Format day of the week
    const dayString = now.toLocaleString('en-US', { weekday: 'long' });
    if (currentDay.textContent !== dayString) {
      currentDay.textContent = dayString;
    }
  }

  // Initial update
  updateTime();

  // Update every second
  setInterval(updateTime, 1000);
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all major sections for smooth entry animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.profile, .current-time, .goals, .links');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(section);
  });
});

// Add keyboard navigation enhancement for links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.link-button');
  links.forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
});

// Add ripple effect on goal items click
document.addEventListener('DOMContentLoaded', () => {
  const goalItems = document.querySelectorAll('.goal-item');
  goalItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Performance optimization: Reduce animation frequency when tab is not visible
let animationInterval = 1000;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    animationInterval = 5000; // Reduce updates when tab is hidden
  } else {
    animationInterval = 1000; // Resume normal updates when tab is visible
  }
});
