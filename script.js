document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Drawer Toggle ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');

  function toggleMobileMenu() {
    mobileDrawer.classList.toggle('active');
    drawerOverlay.classList.toggle('active');
    // Change menu icon based on status
    if (mobileDrawer.classList.contains('active')) {
      mobileMenuBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileMenuBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', toggleMobileMenu);
  }

  // Close drawer when clicking a link
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // --- Scroll Reveal Animation (Intersection Observer) ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- GSAP-like Horizontal Scroll implementation for My Works ---
  const scrollContainer = document.querySelector('.scroll-container-outer');
  const stickyWrapper = document.querySelector('.sticky-wrapper');
  const horizontalTrack = document.querySelector('.horizontal-track');

  function updateHorizontalScroll() {
    if (!scrollContainer || !horizontalTrack || !stickyWrapper) return;

    // Get coordinates of the container relative to document
    const rect = scrollContainer.getBoundingClientRect();
    const containerHeight = rect.height;
    const stickyHeight = stickyWrapper.clientHeight;
    
    // Total vertical scrollable path inside the container
    const scrollPath = containerHeight - stickyHeight;
    
    if (scrollPath <= 0) return;

    // Current scroll position relative to the container start
    // If rect.top <= 0, we are scrolling inside the sticky/horizontal zone
    let relativeScroll = -rect.top;
    
    // Clamp between 0 and scrollPath
    relativeScroll = Math.max(0, Math.min(relativeScroll, scrollPath));

    // Calculate maximum horizontal travel of track
    const trackWidth = horizontalTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxHorizontalTravel = trackWidth - viewportWidth;

    if (maxHorizontalTravel <= 0) return;

    // Calculate percentage scroll inside container
    const scrollPercent = relativeScroll / scrollPath;
    
    // Translate track based on percentage
    const translateX = scrollPercent * maxHorizontalTravel;
    horizontalTrack.style.transform = `translateX(-${translateX}px)`;
  }

  // Update on scroll, load, and resize
  window.addEventListener('scroll', updateHorizontalScroll, { passive: true });
  window.addEventListener('resize', updateHorizontalScroll);
  
  // Initial check
  setTimeout(updateHorizontalScroll, 100);
});
