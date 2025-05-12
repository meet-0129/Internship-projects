// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Page Transition Animation
function pageTransition() {
    const transition = document.querySelector('.page-transition');
    
    // Initial state
    gsap.set(transition, {
        scaleY: 0,
        transformOrigin: 'top'
    });

    // Page load animation
    gsap.to(transition, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(transition, {
                scaleY: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                transformOrigin: 'bottom'
            });
        }
    });
}

// Run page transition on load
pageTransition();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Hero section animation
gsap.from('.hero-content, .menu-hero, .about-hero, .contact-hero', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Menu section animations
gsap.utils.toArray('.pizza-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: i * 0.2,
        ease: 'power2.out'
    });
});

// About section animations
gsap.from('.about-grid', {
    scrollTrigger: {
        trigger: '.about-grid',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
});

gsap.from('.value-card', {
    scrollTrigger: {
        trigger: '.values-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
});

gsap.from('.team-member', {
    scrollTrigger: {
        trigger: '.team-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out'
});

// Contact section animations
gsap.from('.contact-grid', {
    scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
});

gsap.from('.map-container', {
    scrollTrigger: {
        trigger: '.map-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
});

// Menu category filtering
const categoryButtons = document.querySelectorAll('.tab-btn');
const pizzaCards = document.querySelectorAll('.pizza-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const category = button.getAttribute('data-category');

        // Filter pizza cards
        pizzaCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    opacity: 1,
                    display: 'block'
                });
            } else {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 0.8,
                    opacity: 0,
                    onComplete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
});

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Animation for cart count update
        gsap.to(cartCountElement, {
            scale: 1.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Added to cart!';
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ecc71;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(successMessage);

        // Animate and remove success message
        gsap.to(successMessage, {
            duration: 0.5,
            y: -20,
            opacity: 0,
            delay: 1.5,
            onComplete: () => successMessage.remove()
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate form submission
        gsap.to(contactForm, {
            duration: 0.5,
            y: -20,
            opacity: 0,
            onComplete: () => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Message sent successfully!';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #2ecc71;
                    color: white;
                    padding: 2rem;
                    border-radius: 10px;
                    z-index: 1000;
                    text-align: center;
                `;
                document.body.appendChild(successMessage);

                // Animate and remove success message
                gsap.to(successMessage, {
                    duration: 0.5,
                    scale: 1.2,
                    delay: 1.5,
                    onComplete: () => {
                        gsap.to(successMessage, {
                            duration: 0.5,
                            opacity: 0,
                            onComplete: () => {
                                successMessage.remove();
                                contactForm.reset();
                                gsap.to(contactForm, {
                                    duration: 0.5,
                                    y: 0,
                                    opacity: 1
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

// Add hover animations to pizza cards
document.querySelectorAll('.pizza-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
}); 