// ========================================
// GSAP Animations & Scroll Effects
// ========================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ========================================
// Navigation
// ========================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileToggle.textContent = '☰';
  });
});

// Active section highlighting
const sections = document.querySelectorAll('.section, .hero');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '-100px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// ========================================
// Smooth Scroll
// ========================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Scroll Reveal Animations
// ========================================

const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ========================================
// GSAP Animations
// ========================================

// Hero section animations (already handled by CSS, but we can add extra effects)
gsap.from('.hero-content', {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power3.out',
  delay: 0.2
});

// Animate section titles on scroll
gsap.utils.toArray('.section-title').forEach(title => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none none'
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'power2.out'
  });
});

// Timeline items animation
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    opacity: 0,
    x: -50,
    ease: 'power2.out',
    delay: index * 0.1
  });
});

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
  const target = stat.textContent;
  const numericValue = parseInt(target);
  
  if (!isNaN(numericValue)) {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      duration: 1.5,
      textContent: 0,
      snap: { textContent: 1 },
      ease: 'power1.out',
      onUpdate: function() {
        stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
      }
    });
  }
});

// Skill tags stagger animation
gsap.utils.toArray('.skill-category').forEach(category => {
  const tags = category.querySelectorAll('.skill-tag');
  
  gsap.from(tags, {
    scrollTrigger: {
      trigger: category,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 0.4,
    opacity: 0.4,
    scale: 0.8,
    stagger: 0.05,
    ease: 'back.out(1.7)'
  });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    opacity: 0,
    y: 50,
    ease: 'power2.out',
    delay: (index % 3) * 0.1
  });
});

// Education cards animation
gsap.utils.toArray('.education-card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    duration: 0.6,
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
    ease: 'power2.out',
    delay: index * 0.1
  });
});

// Contact section animation
gsap.from('.contact-content', {
  scrollTrigger: {
    trigger: '.contact-content',
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  duration: 0.8,
  opacity: 0,
  y: 30,
  ease: 'power2.out'
});

// Social links animation
gsap.from('.social-link', {
  scrollTrigger: {
    trigger: '.social-links',
    start: 'top 85%',
    toggleActions: 'play none none none'
  },
  duration: 0.5,
  opacity: 0,
  scale: 0,
  stagger: 0.1,
  ease: 'back.out(1.7)'
});

// ========================================
// Interactive Effects
// ========================================

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// Cursor trail effect (optional - can be removed if too much)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 768) { // Only on desktop
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }
  }
});

// ========================================
// Typing Effect for Hero Subtitle
// ========================================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  const originalText = heroSubtitle.textContent;
  heroSubtitle.textContent = '';
  
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < originalText.length) {
      heroSubtitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    }
  }
  
  // Start typing after a delay
  setTimeout(typeWriter, 1000);
}

// ========================================
// Button Ripple Effect
// ========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// Performance Optimization
// ========================================

// Lazy load images if any are added later
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Console Easter Egg
// ========================================

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #f5576c;');
console.log('%cFeel free to reach out: soyluberkay1999@gmail.com', 'font-size: 12px; color: #00f2fe;');

// ========================================
// Accessibility Enhancements
// ========================================

// Skip to main content for keyboard users
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
    const firstLink = document.querySelector('.nav-link');
    if (firstLink) {
      e.preventDefault();
      firstLink.focus();
    }
  }
});

// Announce page changes for screen readers
const announcer = document.createElement('div');
announcer.setAttribute('aria-live', 'polite');
announcer.setAttribute('aria-atomic', 'true');
announcer.className = 'sr-only';
announcer.style.position = 'absolute';
announcer.style.left = '-10000px';
announcer.style.width = '1px';
announcer.style.height = '1px';
announcer.style.overflow = 'hidden';
document.body.appendChild(announcer);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href').substring(1);
    announcer.textContent = `Navigated to ${targetId} section`;
  });
});

console.log('%c✨ Website loaded successfully!', 'font-size: 16px; font-weight: bold; color: #4facfe;');
