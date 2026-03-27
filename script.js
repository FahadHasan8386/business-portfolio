// script.js

// ============================================
// CURSOR GLOW EFFECT (Mouse Motion)
// ============================================
const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth follow animation
    function animateCursor() {
        // Easing for smooth follow
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursorGlow.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card, .contact-method, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px) scale(1.5)`;
            cursorGlow.style.opacity = '0.5';
            cursorGlow.style.filter = 'blur(25px)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = `translate(${cursorX - 30}px, ${cursorY - 30}px) scale(1)`;
            cursorGlow.style.opacity = '0.3';
            cursorGlow.style.filter = 'blur(35px)';
        });
    });
}

// ============================================
// DARK / LIGHT MODE TOGGLE
// ============================================
const toggleBtn = document.getElementById('themeToggleBtn');
const icon = toggleBtn ? toggleBtn.querySelector('i') : null;
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Toggle theme on click
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const menuIcon = mobileMenuBtn.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
}

// ============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section, #home');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .about-content, .about-image, .contact-wrapper');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// ============================================
// WHATSAPP MESSAGE FUNCTION
// ============================================
function sendWhatsAppMessage() {
    // Get form values if any
    const nameInput = document.querySelector('.contact-form input[placeholder="Full Name"]');
    const messageInput = document.querySelector('.contact-form textarea');
    
    let name = nameInput ? nameInput.value.trim() : '';
    let message = messageInput ? messageInput.value.trim() : '';
    
    let whatsappMessage = '';
    if (name && message) {
        whatsappMessage = `Hello NexGen! My name is ${name}.%0A%0A${message}`;
    } else if (message) {
        whatsappMessage = `Hello NexGen!%0A%0A${message}`;
    } else if (name) {
        whatsappMessage = `Hello NexGen! My name is ${name}. I'm interested in your services.`;
    } else {
        whatsappMessage = `Hello NexGen! I'm interested in your digital services. Please share more details.`;
    }
    
    // WhatsApp number: 01996918386 (Bangladesh format)
    const phoneNumber = '8801996918386';
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
}

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[placeholder="Full Name"]')?.value || '';
        const email = contactForm.querySelector('input[placeholder="Email Address"]')?.value || '';
        const whatsapp = contactForm.querySelector('input[placeholder="WhatsApp Number (Optional)"]')?.value || '';
        const message = contactForm.querySelector('textarea')?.value || '';
        
        // Show success message
        alert(`✨ Thank you ${name || 'for reaching out'}! Our team will contact you within 24 hours.\n\n📧 ${email}\n${whatsapp ? `📱 WhatsApp: ${whatsapp}` : ''}`);
        
        // Optional: Send to WhatsApp as well
        if (confirm('Would you also like to start a WhatsApp conversation?')) {
            let whatsappMsg = `Hello NexGen!%0A%0AName: ${name}%0AEmail: ${email}%0A${whatsapp ? `WhatsApp: ${whatsapp}%0A` : ''}%0AMessage: ${message}`;
            window.open(`https://wa.me/8801996918386?text=${whatsappMsg}`, '_blank');
        }
        
        contactForm.reset();
    });
}

// ============================================
// ADD PARALLAX EFFECT ON HERO (Optional)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ============================================
// ADD DYNAMIC YEAR TO FOOTER
// ============================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// ============================================
// PRELOADER REMOVAL (if needed)
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add a small delay to ensure animations are smooth
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 500);
});

// ============================================
// INTERACTIVE CARD EFFECTS
// ============================================
const cards = document.querySelectorAll('.service-card, .portfolio-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// ============================================
// BACK TO TOP BUTTON (Auto create if needed)
// ============================================
const createBackToTopButton = () => {
    if (document.querySelector('.back-to-top')) return;
    
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s;
        z-index: 99;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Create back to top button after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createBackToTopButton();
});

// ============================================
// STATS COUNTER ANIMATION (Optional)
// ============================================
const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.innerText = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
};

// Run counter animation on load
window.addEventListener('load', () => {
    animateNumbers();
});

// ============================================
// PREVENT CURSOR GLOW FROM INTERFERING WITH CLICKS
// ============================================
if (cursorGlow) {
    cursorGlow.style.pointerEvents = 'none';
}

console.log('✅ NexGen Agency website loaded successfully!');