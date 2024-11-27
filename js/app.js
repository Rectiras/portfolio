// Hero Section Animations
gsap.from("#hero h2", { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
gsap.from("#hero p", { duration: 1, y: 30, opacity: 0, delay: 0.3, ease: "power3.out" });
gsap.from("#explore-btn", { duration: 1, scale: 0.9, opacity: 0, delay: 0.6, ease: "bounce" });

// Navigation Fade-in
gsap.from("header nav", { duration: 1, y: -100, opacity: 0, delay: 0.5 });

// Work
gsap.from("#professional-experience h2, #projects h2", { duration: 1, y: 50, opacity: 0, ease: "power3.out" });
gsap.from(".experience, .project", { 
  duration: 1, 
  y: 30, 
  opacity: 0, 
  stagger: 0.3, 
  delay: 0.5, 
  ease: "power3.out" 
});



// Smooth Scroll Trigger
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
