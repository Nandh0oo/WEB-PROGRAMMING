/**
 * Wanderlust Gallery - Interactive Photo Gallery
 * Vanilla JavaScript (ES6+)
 */

// ==========================================================================
// 1. Data Store: Nature, Travel & City Photography Collection
// ==========================================================================
const galleryData = [
  {
    id: 1,
    title: "Misty Coastal Pines",
    caption: "Sunlight piercing through dawn fog along the Pacific Northwest coastline.",
    alt: "Tall evergreen pine trees shrouded in misty sea fog at sunrise",
    category: "Nature",
    src: "https://picsum.photos/id/10/1200/800",
    thumb: "https://picsum.photos/id/10/600/400"
  },
  {
    id: 2,
    title: "Alpine Lake Reflection",
    caption: "Glacial mirror lake reflecting tranquil evergreen slopes at morning.",
    alt: "Calm alpine lake with surrounding forested mountain hills in soft morning light",
    category: "Nature",
    src: "https://picsum.photos/id/11/1200/800",
    thumb: "https://picsum.photos/id/11/600/400"
  },
  {
    id: 3,
    title: "Cascading Mountain Falls",
    caption: "Rushing whitewater pouring over ancient mossy riverbed boulders.",
    alt: "Lush waterfall cascading over rocky cliffs surrounded by deep green forest foliage",
    category: "Nature",
    src: "https://picsum.photos/id/15/1200/800",
    thumb: "https://picsum.photos/id/15/600/400"
  },
  {
    id: 4,
    title: "Highland Forest Highway",
    caption: "The winding highway carving through high-altitude timberland.",
    alt: "Scenic paved road curving through dense pine forest under overcast sky",
    category: "Travel",
    src: "https://picsum.photos/id/28/1200/800",
    thumb: "https://picsum.photos/id/28/600/400"
  },
  {
    id: 5,
    title: "Majestic Granite Peaks",
    caption: "Rugged granite mountain summits rising above rolling cloud banks.",
    alt: "Dramatic mountain peaks towering into clouds with lush green valley below",
    category: "Nature",
    src: "https://picsum.photos/id/29/1200/800",
    thumb: "https://picsum.photos/id/29/600/400"
  },
  {
    id: 6,
    title: "Old Town Cafe Lane",
    caption: "Cozy cobblestone street corner cafe filled with European charm.",
    alt: "Outdoor cafe tables set beside a historic European stone street with warm lighting",
    category: "Travel",
    src: "https://picsum.photos/id/42/1200/800",
    thumb: "https://picsum.photos/id/42/600/400"
  },
  {
    id: 7,
    title: "Bayside Cityscape",
    caption: "Skyline silhouette framing vibrant maritime waters during sunset.",
    alt: "Modern coastal city skyline stretching along the tranquil ocean bay",
    category: "City",
    src: "https://picsum.photos/id/49/1200/800",
    thumb: "https://picsum.photos/id/49/600/400"
  },
  {
    id: 8,
    title: "Pacific Ocean Highway",
    caption: "Dramatic coastal cliffside pass looking out onto the endless horizon.",
    alt: "Scenic coastal highway hugging rugged sea cliffs with sweeping ocean view",
    category: "Travel",
    src: "https://picsum.photos/id/54/1200/800",
    thumb: "https://picsum.photos/id/54/600/400"
  },
  {
    id: 9,
    title: "Metropolitan Geometry",
    caption: "Modern glass and steel architectural facade reflecting twilight skies.",
    alt: "Geometric lines of contemporary urban architecture stretching skyward",
    category: "City",
    src: "https://picsum.photos/id/57/1200/800",
    thumb: "https://picsum.photos/id/57/600/400"
  },
  {
    id: 10,
    title: "Midnight Light Trails",
    caption: "Vibrant arterial traffic streaks sweeping through downtown skyscrapers.",
    alt: "Long exposure night photograph of glowing vehicular light trails in a bustling city center",
    category: "City",
    src: "https://picsum.photos/id/62/1200/800",
    thumb: "https://picsum.photos/id/62/600/400"
  },
  {
    id: 11,
    title: "Venetian Waterway Gondolas",
    caption: "Classic moored gondolas swaying gently along the Grand Canal.",
    alt: "Traditional black Venetian gondolas docked alongside classic historical buildings",
    category: "Travel",
    src: "https://picsum.photos/id/164/1200/800",
    thumb: "https://picsum.photos/id/164/600/400"
  },
  {
    id: 12,
    title: "Valley of the Solitary Peak",
    caption: "Expansive alpine meadow surrounded by craggy mountain wilderness.",
    alt: "Vast green alpine valley in wilderness with snow-dusted peak in the distance",
    category: "Nature",
    src: "https://picsum.photos/id/1018/1200/800",
    thumb: "https://picsum.photos/id/1018/600/400"
  }
];

// ==========================================================================
// 2. Application State
// ==========================================================================
let currentFilter = 'all';
let filteredImages = [...galleryData];
let currentIndex = 0;
let autoPlayIntervalId = null;
const AUTO_PLAY_DELAY = 3000; // 3 seconds

// Touch Gestures Coordinates
let touchStartX = 0;
let touchStartY = 0;
let lastFocusedElement = null;

// ==========================================================================
// 3. DOM Elements
// ==========================================================================
const galleryGrid = document.getElementById('gallery-grid');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.filter-btn');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxSpinner = document.getElementById('lightbox-spinner');
const lightboxThumbStrip = document.getElementById('lightbox-thumb-strip');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const closeBtn = document.getElementById('close-btn');
const autoPlayBtn = document.getElementById('autoplay-btn');
const playIcon = autoPlayBtn.querySelector('.play-icon');
const pauseIcon = autoPlayBtn.querySelector('.pause-icon');
const autoPlayText = autoPlayBtn.querySelector('.btn-text');

// ==========================================================================
// 4. Grid Generation & Rendering
// ==========================================================================

/**
 * Updates the item count badges in the filter buttons
 */
function updateCategoryCounts() {
  const counts = {
    all: galleryData.length,
    Nature: galleryData.filter(img => img.category === 'Nature').length,
    Travel: galleryData.filter(img => img.category === 'Travel').length,
    City: galleryData.filter(img => img.category === 'City').length
  };

  const countAll = document.getElementById('count-all');
  const countNature = document.getElementById('count-nature');
  const countTravel = document.getElementById('count-travel');
  const countCity = document.getElementById('count-city');

  if (countAll) countAll.textContent = counts.all;
  if (countNature) countNature.textContent = counts.Nature;
  if (countTravel) countTravel.textContent = counts.Travel;
  if (countCity) countCity.textContent = counts.City;
}

/**
 * Dynamically builds and renders the photo grid
 * @param {Array} images - Array of image objects to render
 */
function renderGallery(images) {
  galleryGrid.innerHTML = '';

  if (images.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  const fragment = document.createDocumentFragment();

  images.forEach((item, index) => {
    // Card container
    const card = document.createElement('article');
    card.className = 'gallery-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View image ${index + 1} of ${images.length}: ${item.title}`);
    card.dataset.index = index;

    // Inner image wrapper
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'gallery-thumb-wrap';

    // Thumbnail Image
    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.src = item.thumb;
    img.alt = item.alt;
    img.loading = 'lazy';

    // Category Badge
    const badge = document.createElement('span');
    badge.className = 'card-badge';
    badge.textContent = item.category;

    // Hover Caption Overlay
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `
      <div class="overlay-content">
        <h2 class="overlay-title">${item.title}</h2>
        <div class="overlay-meta">
          <span>Explore Photo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    `;

    thumbWrap.appendChild(img);
    thumbWrap.appendChild(badge);
    thumbWrap.appendChild(overlay);
    card.appendChild(thumbWrap);

    // Click & Keyboard triggers to open lightbox
    card.addEventListener('click', () => openViewer(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openViewer(index);
      }
    });

    fragment.appendChild(card);
  });

  galleryGrid.appendChild(fragment);
}

/**
 * Filters the gallery by category
 * @param {string} category - Selected category or 'all'
 */
function filterGallery(category) {
  currentFilter = category;

  if (category === 'all') {
    filteredImages = [...galleryData];
  } else {
    filteredImages = galleryData.filter(img => img.category.toLowerCase() === category.toLowerCase());
  }

  // Update button active states
  filterButtons.forEach(btn => {
    const isActive = btn.dataset.category.toLowerCase() === category.toLowerCase();
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  renderGallery(filteredImages);
}

// ==========================================================================
// 5. Lightbox & Slideshow Navigation Logic
// ==========================================================================

/**
 * Builds the thumbnail strip inside the lightbox viewer
 */
function buildThumbnailStrip() {
  lightboxThumbStrip.innerHTML = '';
  const fragment = document.createDocumentFragment();

  filteredImages.forEach((item, index) => {
    const thumbBtn = document.createElement('button');
    thumbBtn.className = 'lightbox-thumb';
    thumbBtn.setAttribute('type', 'button');
    thumbBtn.setAttribute('role', 'tab');
    thumbBtn.setAttribute('aria-label', `Thumbnail ${index + 1}: ${item.title}`);
    thumbBtn.dataset.index = index;

    const thumbImg = document.createElement('img');
    thumbImg.src = item.thumb;
    thumbImg.alt = item.alt;

    thumbBtn.appendChild(thumbImg);

    thumbBtn.addEventListener('click', () => {
      stopAutoPlay();
      showImage(index, index > currentIndex ? 'right' : 'left');
    });

    fragment.appendChild(thumbBtn);
  });

  lightboxThumbStrip.appendChild(fragment);
}

/**
 * Updates active thumbnail styling and scrolls it smoothly into view
 * @param {number} index - Active image index
 */
function updateActiveThumbnail(index) {
  const thumbs = lightboxThumbStrip.querySelectorAll('.lightbox-thumb');
  thumbs.forEach((thumb, idx) => {
    const isActive = idx === index;
    thumb.classList.toggle('active', isActive);
    thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');

    if (isActive) {
      thumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  });
}

/**
 * Opens the full-screen slideshow viewer
 * @param {number} index - Index of the image to display
 */
function openViewer(index) {
  if (index < 0 || index >= filteredImages.length) return;

  lastFocusedElement = document.activeElement;
  buildThumbnailStrip();

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  showImage(index);
  closeBtn.focus();
}

/**
 * Closes the full-screen slideshow viewer
 */
function closeViewer() {
  stopAutoPlay();
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Restore focus to original gallery card
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

/**
 * Displays an image by its index with smooth animation and counter updates
 * @param {number} index - Index of the image
 * @param {'left'|'right'|null} direction - Transition direction for slide animation
 */
function showImage(index, direction = null) {
  if (filteredImages.length === 0) return;

  // Wrap around boundaries
  if (index < 0) {
    currentIndex = filteredImages.length - 1;
  } else if (index >= filteredImages.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const currentItem = filteredImages[currentIndex];

  // Update Counter (e.g. "3 / 12")
  lightboxCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;

  // Update Caption
  lightboxCaption.innerHTML = `<strong>${currentItem.title}</strong> &mdash; ${currentItem.caption}`;

  // Show Loading Spinner while high-res image loads
  lightboxSpinner.classList.add('loading');

  // Reset animations
  lightboxImg.classList.remove('slide-left', 'slide-right', 'fade-out');
  lightboxImg.classList.add('fade-out');

  // Preload and switch image
  const tempImg = new Image();
  tempImg.src = currentItem.src;

  tempImg.onload = () => {
    lightboxImg.src = currentItem.src;
    lightboxImg.alt = currentItem.alt;
    lightboxSpinner.classList.remove('loading');

    // Trigger directional slide animation
    lightboxImg.classList.remove('fade-out');
    if (direction === 'left') {
      lightboxImg.classList.add('slide-left');
    } else if (direction === 'right') {
      lightboxImg.classList.add('slide-right');
    } else {
      lightboxImg.classList.add('slide-left');
    }
  };

  tempImg.onerror = () => {
    // Fallback to thumbnail if high-res fails
    lightboxImg.src = currentItem.thumb;
    lightboxImg.alt = currentItem.alt;
    lightboxSpinner.classList.remove('loading');
    lightboxImg.classList.remove('fade-out');
  };

  updateActiveThumbnail(currentIndex);
}

/**
 * Advances to the next image in the sequence (loops)
 */
function nextImage() {
  showImage(currentIndex + 1, 'left');
}

/**
 * Moves to the previous image in the sequence (loops)
 */
function prevImage() {
  showImage(currentIndex - 1, 'right');
}

// ==========================================================================
// 6. Auto-Play Feature Logic
// ==========================================================================

/**
 * Starts automatic slideshow progression
 */
function startAutoPlay() {
  stopAutoPlay(); // Ensure any existing interval is cleanly cleared

  autoPlayBtn.classList.add('playing');
  autoPlayBtn.setAttribute('aria-label', 'Pause auto-play slideshow');
  if (playIcon) playIcon.classList.add('hidden');
  if (pauseIcon) pauseIcon.classList.remove('hidden');
  if (autoPlayText) autoPlayText.textContent = 'Pause';

  autoPlayIntervalId = setInterval(() => {
    nextImage();
  }, AUTO_PLAY_DELAY);
}

/**
 * Stops automatic slideshow progression
 */
function stopAutoPlay() {
  if (autoPlayIntervalId !== null) {
    clearInterval(autoPlayIntervalId);
    autoPlayIntervalId = null;
  }

  autoPlayBtn.classList.remove('playing');
  autoPlayBtn.setAttribute('aria-label', 'Start auto-play slideshow');
  if (playIcon) playIcon.classList.remove('hidden');
  if (pauseIcon) pauseIcon.classList.add('hidden');
  if (autoPlayText) autoPlayText.textContent = 'Play';
}

/**
 * Toggles auto-play on and off
 */
function toggleAutoPlay() {
  if (autoPlayIntervalId !== null) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

// ==========================================================================
// 7. Event Listeners & Interactive Handlers
// ==========================================================================

// Filter Button Click Handlers
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterGallery(btn.dataset.category);
  });
});

// Lightbox Controls
prevBtn.addEventListener('click', () => {
  stopAutoPlay();
  prevImage();
});

nextBtn.addEventListener('click', () => {
  stopAutoPlay();
  nextImage();
});

closeBtn.addEventListener('click', closeViewer);
lightboxBackdrop.addEventListener('click', closeViewer);
autoPlayBtn.addEventListener('click', toggleAutoPlay);

// Keyboard Navigation Support
window.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  switch (e.key) {
    case 'Escape':
      closeViewer();
      break;

    case 'ArrowLeft':
      stopAutoPlay();
      prevImage();
      break;

    case 'ArrowRight':
      stopAutoPlay();
      nextImage();
      break;

    case ' ': // Space bar toggles autoplay
    case 'p':
    case 'P':
      e.preventDefault();
      toggleAutoPlay();
      break;
  }
});

// Mobile Swipe Gesture Support (Touch Events)
lightbox.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
  if (e.changedTouches.length === 1) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Only detect horizontal swipe if deltaX is sufficiently larger than deltaY
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      stopAutoPlay();
      if (deltaX < 0) {
        // Swiped Left -> Go Next
        nextImage();
      } else {
        // Swiped Right -> Go Previous
        prevImage();
      }
    }
  }
}, { passive: true });

// ==========================================================================
// 8. Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateCategoryCounts();
  renderGallery(filteredImages);
});
