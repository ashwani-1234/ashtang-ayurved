/**
 * Function to handle new review submissions
 */
function addReview() {
    const nameInput = document.getElementById('reviewerName');
    const textInput = document.getElementById('reviewerText');
    const starInput = document.querySelector('input[name="stars"]:checked');
    
    // Validation
    if(!nameInput.value || !textInput.value || !starInput) {
        alert("Please provide your name, a review, and a star rating.");
        return;
    }

    const stars = "★".repeat(starInput.value);
    const display = document.getElementById('reviewsDisplay');

    // Create a new review element
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
        <div class="review-stars">${stars}</div>
        <p>"${textInput.value}"</p>
        <small>- ${nameInput.value}</small>
    `;

    // Add to the top of the list
    display.prepend(newReview);

    // Clear the form
    nameInput.value = '';
    textInput.value = '';
    starInput.checked = false;
}

/**
 * FAQ Accordion Toggle Logic
 */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Close other items for a clean accordion effect
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle the current item
        faqItem.classList.toggle('active');
    });
});

// Get the button
const scrollBtn = document.getElementById("scrollToTop");

// Show button when user scrolls down 300px
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Smooth scroll to top when clicked
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener('load', () => {
    const greeting = document.getElementById('waGreeting');
    
    // Show the greeting after 5 seconds
    setTimeout(() => {
        greeting.style.display = 'block';
    }, 5000);

    // Hide greeting if user clicks the WhatsApp button
    document.querySelector('.wa-float').addEventListener('click', () => {
        greeting.style.display = 'none';
    });
});


const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Toggle Menu Open/Close
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Auto-close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Function to hide the preloader
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Fix 1: Hide when everything is loaded
window.addEventListener('load', hidePreloader);

// Fix 2: Safety Timer - Hide after 3 seconds if 'load' event fails
setTimeout(hidePreloader, 3000);
