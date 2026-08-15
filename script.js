// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// STICKY NAVBAR ON SCROLL
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CTA BUTTON SCROLL FUNCTIONALITY
// ========================================

// Join Now button in navigation
const navJoinBtn = document.querySelector('.nav-cta');
if (navJoinBtn) {
    navJoinBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Join Now button in hero
const heroJoinBtn = document.getElementById('join-btn');
if (heroJoinBtn) {
    heroJoinBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Explore button in hero
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        document.getElementById('facilities').scrollIntoView({ behavior: 'smooth' });
    });
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

const enquiryForm = document.getElementById('enquiry-form');
const formError = document.getElementById('form-error');
const formSuccess = document.getElementById('form-success');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const interestedIn = document.getElementById('interested-in').value;
        const message = document.getElementById('message').value.trim();

        // Clear previous error messages
        formError.classList.remove('show');
        formError.textContent = '';

        // Validation logic
        let errors = [];

        // Validate name
        if (name === '') {
            errors.push('Full name is required');
        } else if (name.length < 2) {
            errors.push('Full name must be at least 2 characters');
        }

        // Validate phone
        if (phone === '') {
            errors.push('Phone number is required');
        } else if (!isValidPhone(phone)) {
            errors.push('Please enter a valid phone number');
        }

        // Validate email
        if (email === '') {
            errors.push('Email address is required');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }

        // Validate interested in
        if (interestedIn === '') {
            errors.push('Please select what you are interested in');
        }

        // Validate message (optional but if provided, should have minimum length)
        if (message !== '' && message.length < 5) {
            errors.push('Message must be at least 5 characters if provided');
        }

        // If there are errors, display them
        if (errors.length > 0) {
            formError.classList.add('show');
            formError.textContent = errors[0]; // Show first error
            return;
        }

        // If no errors, show success message and reset form
        formSuccess.style.display = 'block';
        enquiryForm.style.display = 'none';

        // Reset form after 3 seconds
        setTimeout(() => {
            enquiryForm.reset();
            enquiryForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 3000);

        // Log form data for backend integration (when backend is ready)
        const formData = {
            name: name,
            phone: phone,
            email: email,
            interestedIn: interestedIn,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        console.log('Form submitted:', formData);
        
        // TODO: Send to backend API when ready
        // fetch('/api/enquiry', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => console.log('Success:', data))
        // .catch(error => console.error('Error:', error));
    });
}

// ========================================
// VALIDATION HELPER FUNCTIONS
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Check if it's a valid 10-digit number (India has 10-digit mobile numbers)
    // Also accepts longer numbers and international format
    const phoneRegex = /^[0-9]{7,}$/; // At least 7 digits
    return phoneRegex.test(cleanPhone);
}

// ========================================
// SMOOTH SCROLL POLYFILL (Optional)
// ========================================

// This helps with smoother scrolling on older browsers
// Modern browsers support scroll-behavior: smooth natively
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// LAZY LOADING FOR IMAGES (Enhancement)
// ========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image will load naturally with loading="lazy" attribute
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// PAGE LOAD ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Remove any loading states or show content
    document.body.style.opacity = '1';
});

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================

// Allow closing mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// CONSOLE LOG - DEV INFO
// ========================================

console.log('NODE THE GYM Website Loaded Successfully');
console.log('Contact: 093605 32990');
console.log('Location: Thiruvarur, Tamil Nadu');
