/**
 * PRELOADER LOGIC (Moved to top for priority)
 * Ensures the spinner hides even if images are broken or slow.
 */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Safety: Hide after 3 seconds no matter what
const preloaderTimeout = setTimeout(hidePreloader, 3000);

// Hide when page is fully loaded
window.addEventListener('load', () => {
    clearTimeout(preloaderTimeout); // Stop the safety timer if load is fast
    hidePreloader();
});

/**
 * REVIEW SYSTEM
 */
function addReview() {
    const nameInput = document.getElementById('reviewerName');
    const textInput = document.getElementById('reviewerText');
    const starInput = document.querySelector('input[name="stars"]:checked');
    const display = document.getElementById('reviewsDisplay');

    if(!nameInput || !textInput || !starInput || !display) return;

    if(!nameInput.value || !textInput.value) {
        alert("Please provide your name, a review, and a star rating.");
        return;
    }

    const stars = "★".repeat(starInput.value);
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
        <div class="review-stars">${stars}</div>
        <p>"${textInput.value}"</p>
        <small>- ${nameInput.value}</small>
    `;

    display.prepend(newReview);
    nameInput.value = '';
    textInput.value = '';
    starInput.checked = false;
}

/**
 * FAQ ACCORDION
 */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) item.classList.remove('active');
        });
        faqItem.classList.toggle('active');
    });
});

/**
 * SCROLL TO TOP (With Safety Check)
 */
const scrollBtn = document.getElementById("scrollToTop");
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/**
 * WHATSAPP GREETING (With Safety Check)
 */
window.addEventListener('load', () => {
    const greeting = document.getElementById('waGreeting');
    const waFloat = document.querySelector('.wa-float');
    
    if (greeting) {
        setTimeout(() => {
            greeting.style.display = 'block';
        }, 5000);

        if (waFloat) {
            waFloat.addEventListener('click', () => {
                greeting.style.display = 'none';
            });
        }
    }
});

/**
 * MOBILE MENU (With Safety Check)
 */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}