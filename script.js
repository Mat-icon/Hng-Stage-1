// ===== Image Dimensions Display =====
const output = document.querySelector(".image-dimensions");
const image = document.querySelector(".profile-image");

if (image && output) {
  image.addEventListener("load", (event) => {
    const { naturalWidth, naturalHeight, width, height } = image;
    output.textContent = `
Natural size: ${naturalWidth} x ${naturalHeight} pixels
Displayed size: ${width} x ${height} pixels
`;
  });

  // Handle error if image fails to load
  image.addEventListener("error", () => {
    output.textContent = "Failed to load image";
    output.style.color = "var(--color-text-muted)";
  });
}

// ===== Time and Date Updates =====
document.addEventListener('DOMContentLoaded', () => {
  const currentTimeUTC = document.getElementById('currentTimeUTC');
  const currentDay = document.getElementById('currentDay');

  function updateTime() {
    const now = new Date();

    // Add smooth opacity transition
    if (currentTimeUTC) {
      currentTimeUTC.style.opacity = '0.5';
      setTimeout(() => {
        currentTimeUTC.textContent = now.toUTCString().split(' ')[4];
        currentTimeUTC.style.opacity = '1';
      }, 150);
    }

    if (currentDay) {
      currentDay.textContent = now.toLocaleString('en-US', { weekday: 'long' });
    }
  }

  updateTime();

  // Only update time when page is visible (performance optimization)
  let timeInterval;
  function startTimeUpdates() {
    timeInterval = setInterval(updateTime, 1000);
  }

  function stopTimeUpdates() {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  }

  // Start updates immediately
  startTimeUpdates();

  // Pause updates when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimeUpdates();
    } else {
      updateTime();
      startTimeUpdates();
    }
  });

  // ===== Goal Items Interaction =====
  const goalItems = document.querySelectorAll('.goal-item');

  goalItems.forEach((item, index) => {
    // Add ripple effect on click
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(14, 165, 233, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add keyboard support
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // ===== Intersection Observer for Fade-in Animations =====
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

  // Observe all sections for scroll-triggered animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });

  // ===== Link Button Enhancements =====
  const linkButtons = document.querySelectorAll('.link-button');

  linkButtons.forEach(button => {
    // Add subtle hover sound effect (optional, can be commented out)
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });

  // ===== Performance: Reduce animations on low-power mode =====
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    document.body.style.setProperty('--transition-base', '100ms');
    document.body.style.setProperty('--transition-slow', '150ms');
  }
});

// ===== Add ripple animation to CSS dynamically =====
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
