document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // --- Treatments Carousel Logic ---
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (track) {
        let currentIndex = 0;
        const cards = track.querySelectorAll('.treatment-card');
        const cardCount = cards.length;
        
        const getVisibleCards = () => {
            if (window.innerWidth > 1200) return 4;
            if (window.innerWidth > 992) return 3;
            if (window.innerWidth > 576) return 2;
            return 1;
        };

        const updateCarousel = () => {
            const visibleCards = getVisibleCards();
            const gap = 30; // matches CSS
            const cardWidth = cards[0].offsetWidth;
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        const moveNext = () => {
            const visibleCards = getVisibleCards();
            if (currentIndex < cardCount - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Wrap around to start
            }
            updateCarousel();
        };

        const movePrev = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = getVisibleCards();
                currentIndex = cardCount - visibleCards; // Wrap around to end
            }
            updateCarousel();
        };

        if (nextBtn) nextBtn.addEventListener('click', moveNext);
        if (prevBtn) prevBtn.addEventListener('click', movePrev);

        // Auto-slide
        let autoSlideInterval = setInterval(moveNext, 5000);

        // Pause on hover
        track.closest('.carousel-wrapper').addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        track.closest('.carousel-wrapper').addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(moveNext, 5000);
        });

        // Handle window resize
        window.addEventListener('resize', updateCarousel);
    }

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isActive = header.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(i => {
                i.querySelector('.accordion-header').classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = '0';
                i.querySelector('i').classList.replace('fa-minus', 'fa-plus');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                header.querySelector('i').classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Header Background
    const headerElement = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerElement.style.padding = '5px 0';
            headerElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            headerElement.style.padding = '15px 0';
            headerElement.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        }
    });

    // Simple Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
        // Initial state for animation
        if (!section.classList.contains('hero')) {
             section.style.opacity = '0';
             section.style.transform = 'translateY(20px)';
             section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
        observer.observe(section);
    });

    // Special handler for IntersectionObserver animation
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        if (!section.classList.contains('hero')) {
            animateObserver.observe(section);
        }
    });
});
