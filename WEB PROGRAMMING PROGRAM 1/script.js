/**
 * NovaPulse Interactive Landing Page & Slideshow Gallery
 * Features: Responsive Nav, Interactive Grid, Modal Lightbox, Next/Prev, Dots, Auto-Play
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // -------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------
    // 2. Interactive Image Gallery & Slideshow Data
    // -------------------------------------------------------------
    const galleryData = [
        {
            src: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
            title: 'Midnight Black Edition',
            description: 'Precision-machined aerospace Grade 5 titanium chassis with brushed matte diamond finish.'
        },
        {
            src: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80',
            title: 'Always-On AMOLED Display',
            description: 'Ultra-crisp 1.96-inch curved sapphire glass with 3000 nits peak outdoor brightness.'
        },
        {
            src: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=1200&q=80',
            title: 'Fluoroelastomer Sport Band',
            description: 'Sweat-resistant, quick-release sport band designed for extreme endurance and comfort.'
        },
        {
            src: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80',
            title: 'Ceramic Bio-Sensor Array',
            description: 'Multi-channel optical sensors delivering continuous ECG, heart rate, and oxygen monitoring.'
        },
        {
            src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
            title: 'Arctic Silver Finish',
            description: 'Timeless luxury design engineered to withstand both mountain ascents and boardrooms.'
        },
        {
            src: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
            title: 'Trail & Water Ready',
            description: 'Submersible up to 50 meters (5 ATM) with built-in dual-frequency GPS navigation.'
        }
    ];

    let currentSlide = 0;
    let autoPlayInterval = null;
    let isAutoPlaying = false;
    const AUTO_PLAY_DELAY = 3000; // 3 seconds

    // Modal DOM Elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const openSlideshowBtn = document.getElementById('openSlideshowBtn');
    const slideshowModal = document.getElementById('slideshowModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const slideshowImage = document.getElementById('slideshowImage');
    const captionTitle = document.getElementById('captionTitle');
    const captionDescription = document.getElementById('captionDescription');
    const slideCounter = document.getElementById('slideCounter');
    const dotsContainer = document.getElementById('dotsContainer');
    const autoPlayToggle = document.getElementById('autoPlayToggle');
    const modalPlayPauseBtn = document.getElementById('modalPlayPauseBtn');

    // -------------------------------------------------------------
    // 3. Generate Pagination Dots
    // -------------------------------------------------------------
    function initDots() {
        dotsContainer.innerHTML = '';
        galleryData.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // -------------------------------------------------------------
    // 4. Update Current Slide Content
    // -------------------------------------------------------------
    function updateSlide() {
        const item = galleryData[currentSlide];

        // Smooth fade effect
        slideshowImage.style.opacity = '0';
        
        setTimeout(() => {
            slideshowImage.src = item.src;
            slideshowImage.alt = item.title;
            captionTitle.textContent = item.title;
            captionDescription.textContent = item.description;
            slideCounter.textContent = `${currentSlide + 1} / ${galleryData.length}`;
            slideshowImage.style.opacity = '1';

            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlide);
            });
        }, 150);
    }

    function goToSlide(index) {
        currentSlide = (index + galleryData.length) % galleryData.length;
        updateSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // -------------------------------------------------------------
    // 5. Open & Close Modal
    // -------------------------------------------------------------
    function openModal(startIndex = 0) {
        currentSlide = startIndex;
        updateSlide();
        slideshowModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // If autoplay toggle is active or user requested, start playback
        if (autoPlayToggle.checked) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    }

    function closeModal() {
        slideshowModal.classList.remove('active');
        document.body.style.overflow = '';
        stopAutoPlay();
    }

    // -------------------------------------------------------------
    // 6. Auto-Play Controller
    // -------------------------------------------------------------
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        isAutoPlaying = true;
        modalPlayPauseBtn.textContent = '⏸ Pause Auto-Play';
        autoPlayToggle.checked = true;

        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, AUTO_PLAY_DELAY);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        isAutoPlaying = false;
        modalPlayPauseBtn.textContent = '▶ Resume Auto-Play';
    }

    function toggleAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
            autoPlayToggle.checked = false;
        } else {
            startAutoPlay();
            autoPlayToggle.checked = true;
        }
    }

    // -------------------------------------------------------------
    // 7. Event Listeners
    // -------------------------------------------------------------
    // Click on individual grid cards
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10) || 0;
            openModal(index);
        });
    });

    // Launch button
    if (openSlideshowBtn) {
        openSlideshowBtn.addEventListener('click', () => openModal(0));
    }

    // Modal navigation
    if (prevSlideBtn) prevSlideBtn.addEventListener('click', prevSlide);
    if (nextSlideBtn) nextSlideBtn.addEventListener('click', nextSlide);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Auto-play switch & button
    if (autoPlayToggle) {
        autoPlayToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                // If modal is open, play immediately; otherwise open modal and play
                if (!slideshowModal.classList.contains('active')) {
                    openModal(0);
                }
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        });
    }

    if (modalPlayPauseBtn) {
        modalPlayPauseBtn.addEventListener('click', toggleAutoPlay);
    }

    // Keyboard navigation (Arrow keys + Esc)
    document.addEventListener('keydown', (e) => {
        if (!slideshowModal.classList.contains('active')) return;

        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Touch Swipe gestures for Mobile Devices
    let touchStartX = 0;
    let touchEndX = 0;

    slideshowImage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slideshowImage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 45; // min px to trigger swipe

        if (swipeDistance > swipeThreshold) {
            prevSlide(); // Swiped right -> go to previous
        } else if (swipeDistance < -swipeThreshold) {
            nextSlide(); // Swiped left -> go to next
        }
    }

    // Initialize pagination dots
    initDots();
});
