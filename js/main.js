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

    // --- Testimonials Carousel Logic ---
    const revTrack = document.getElementById('reviews-track');
    const revPrevBtn = document.getElementById('rev-prev-btn');
    const revNextBtn = document.getElementById('rev-next-btn');
    
    if (revTrack) {
        let revIndex = 0;
        const revCards = revTrack.querySelectorAll('.review-card');
        const revCount = revCards.length;
        
        const getVisibleReviews = () => {
            if (window.innerWidth > 992) return 3;
            if (window.innerWidth > 576) return 2;
            return 1;
        };

        const updateRevCarousel = () => {
            const gap = 30;
            const cardWidth = revCards[0].offsetWidth;
            const moveAmount = (cardWidth + gap) * revIndex;
            revTrack.style.transform = `translateX(-${moveAmount}px)`;
        };

        const moveRevNext = () => {
            const visible = getVisibleReviews();
            if (revIndex < revCount - visible) {
                revIndex++;
            } else {
                revIndex = 0;
            }
            updateRevCarousel();
        };

        const moveRevPrev = () => {
            if (revIndex > 0) {
                revIndex--;
            } else {
                const visible = getVisibleReviews();
                revIndex = revCount - visible;
            }
            updateRevCarousel();
        };

        if (revNextBtn) revNextBtn.addEventListener('click', moveRevNext);
        if (revPrevBtn) revPrevBtn.addEventListener('click', moveRevPrev);

        let revInterval = setInterval(moveRevNext, 6000); // Slightly slower for reading reviews

        revTrack.closest('.reviews-wrapper').addEventListener('mouseenter', () => clearInterval(revInterval));
        revTrack.closest('.reviews-wrapper').addEventListener('mouseleave', () => {
            revInterval = setInterval(moveRevNext, 6000);
        });

        window.addEventListener('resize', updateRevCarousel);
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

    // --- Booking Modal Logic ---
    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    const nextBtnStep2 = document.getElementById('nextToStep2');
    const backBtnStep1 = document.getElementById('backToStep1');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const stepsElements = document.querySelectorAll('.step');
    
    let currentRedirectUrl = '';
    let currentProductTitle = '';

    // Set min date to today
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    const openBookingModal = (url, title) => {
        currentRedirectUrl = url;
        currentProductTitle = title;
        const modalTitle = document.getElementById('modalProductTitle');
        if (modalTitle) modalTitle.innerText = `Book ${title}`;
        if (bookingModal) bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeBookingModal = () => {
        if (bookingModal) bookingModal.classList.remove('active');
        document.body.style.overflow = '';
        resetBookingForm();
    };

    const resetBookingForm = () => {
        if (bookingForm) {
            bookingForm.reset();
            if (step1) step1.classList.add('active');
            if (step2) step2.classList.remove('active');
            if (stepsElements[0]) stepsElements[0].classList.add('active');
            if (stepsElements[1]) stepsElements[1].classList.remove('active');
        }
    };

    // Global listener for "Book Treatment" buttons
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.btn');
        if (target && target.innerText.toLowerCase().includes('book')) {
            const url = target.getAttribute('href');
            // Allow if it's a valid link or just # (Appointment button)
            if (url && (url.startsWith('http') || url === '#')) {
                e.preventDefault();
                // Find product title from parent card
                const card = target.closest('.treatment-card, .product-card-single, .premium-shot-card, .product-container, .product-details');
                const title = card ? card.querySelector('h3, h2').innerText : 'Your Treatment';
                openBookingModal(url !== '#' ? url : 'https://square.link/u/V4TofUel', title); 
            }
        }
    });

    if (closeBtn) closeBtn.onclick = closeBookingModal;

    window.addEventListener('click', (event) => {
        if (event.target == bookingModal) closeBookingModal();
    });

    // Step Navigation
    if (nextBtnStep2) {
        nextBtnStep2.onclick = () => {
            const dateVal = document.getElementById('bookingDate').value;
            const timeVal = document.getElementById('bookingTime').value;
            
            if (dateVal && timeVal) {
                step1.classList.remove('active');
                step2.classList.add('active');
                if (stepsElements[1]) stepsElements[1].classList.add('active');
            } else {
                alert('Please select both a date and a timing.');
            }
        };
    }

    if (backBtnStep1) {
        backBtnStep1.onclick = () => {
            if (step1) step1.classList.add('active');
            if (step2) step2.classList.remove('active');
            if (stepsElements[1]) stepsElements[1].classList.remove('active');
        };
    }

    // Form Submission
    if (bookingForm) {
        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            
            const bookingData = {
                id: Date.now(),
                product: currentProductTitle,
                date: document.getElementById('bookingDate').value,
                time: document.getElementById('bookingTime').value,
                name: document.getElementById('userName').value,
                phone: document.getElementById('userPhone').value,
                email: document.getElementById('userEmail').value,
                location: document.getElementById('userLocation').value,
                submittedAt: new Date().toLocaleString()
            };

            // Save to LocalStorage
            try {
                const existingLeads = JSON.parse(localStorage.getItem('reviveLeads') || '[]');
                existingLeads.push(bookingData);
                localStorage.setItem('reviveLeads', JSON.stringify(existingLeads));
                
                // Redirect to Square
                window.location.href = currentRedirectUrl;
            } catch (err) {
                console.error("Error saving lead:", err);
                window.location.href = currentRedirectUrl;
            }
        };
    }
});

