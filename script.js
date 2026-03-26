/* ============================================
   TEKRA SOLUTIONS — Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Menu ===
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // === Smooth Scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Active Link Highlighting ===
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    const isServicePage = window.location.pathname.includes('/services/');

    if (isServicePage) {
        const servicesLink = document.querySelector('.nav-link[href$="#services"]');
        if (servicesLink) {
            navItems.forEach(link => link.classList.remove('active'));
            servicesLink.classList.add('active');
        }
    } else {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0.3
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            if (section.getAttribute('id')) {
                sectionObserver.observe(section);
            }
        });
    }

    // === Navbar Scroll Effects ===
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // === Scroll to Top Button ===
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation for service cards
                    const delay = entry.target.classList.contains('service-card')
                        ? index * 80
                        : 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // === Animated Counter for Stats ===
    const stats = document.querySelectorAll('.stat-item h3');

    if (stats.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => counterObserver.observe(stat));
    }

    function animateCounter(element) {
        const text = element.textContent.trim();
        const match = text.match(/^(\d+)(.*)$/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = match[2]; // e.g., "+", "/7"
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // === Service Card Tilt Effect (Desktop only) ===
    if (window.matchMedia('(min-width: 769px)').matches) {
        const cards = document.querySelectorAll('.service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // === Form Submit Feedback ===
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.classList.add('is-loading');
            }
        });
    }

});
