// Smooth scroll function for sections
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href'));
    });
});

// Set a redirect URL for the contact form that works both locally and when deployed
const formNextUrl = document.getElementById('form-next-url');
if (formNextUrl) {
    formNextUrl.value = new URL('thank-you.html', window.location.href).href;
}

// Animate numbers in the stats section
function animarNumeros() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 30;
        
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Detect when the stats section becomes visible
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && !statsSection.classList.contains('animated')) {
            statsSection.classList.add('animated');
            animarNumeros();
        }
    }
});

// Confetti effect
function crearConfetti() {
    const confettiCount = 40;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.opacity = '1';
        document.body.appendChild(confetti);

        let x = Math.random() * 200 - 100;
        let y = 0;
        let opacity = 1;
        let rotation = Math.random() * 360;

        function animateConfetti() {
            y += 2 + Math.random() * 3;
            x += Math.random() * 4 - 2;
            opacity -= 0.01;
            rotation += Math.random() * 10;

            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        animateConfetti();
    }
}

// Change navbar color on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(102, 126, 234, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.7)';
        navbar.style.boxShadow = '0 2px 20px rgba(102, 126, 234, 0.1)';
    }
});

// Animate elements when entering the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe skill and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero) {
        const scrollY = window.scrollY;
        shapes.forEach(shape => {
            shape.style.transform = `translateY(${scrollY * 0.1}px)`;
        });
    }
});

// Interactive cursor effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Effect on hero shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const shapeX = rect.left + rect.width / 2;
        const shapeY = rect.top + rect.height / 2;
        
        const distX = e.clientX - shapeX;
        const distY = e.clientY - shapeY;
        
        shape.style.filter = `drop-shadow(${distX * 0.05}px ${distY * 0.05}px 10px rgba(102, 126, 234, 0.3))`;
    });
});

// Create additional wave effects with canvas (optional)
// Uncomment if you want more visual complexity

// Ripple effect when clicking buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Detect system dark/light theme
function detectarTema() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.style.background = '#0f0f1e';
    }
}

detectarTema();

// Load elements with animation
window.addEventListener('load', () => {
    console.log('🎨 Portfolio loaded successfully');
    document.body.style.opacity = '1';
});

// Handle tab visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('✨ Welcome back');
    }
});

// Function to create typing effect
function efecto_escritura(elemento, texto, velocidad = 50) {
    elemento.textContent = '';
    let index = 0;
    
    const escribir = () => {
        if (index < texto.length) {
            elemento.textContent += texto[index];
            index++;
            setTimeout(escribir, velocidad);
        }
    };
    
    escribir();
}

// Enable smooth scroll effect
document.documentElement.style.scrollBehavior = 'smooth';

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Friendly console log
console.log('%cHello! 👋', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cThanks for visiting my creative portfolio 🎨', 'font-size: 14px; color: #764ba2;');
console.log('%cExplore the code and learn: https://github.com', 'font-size: 12px; color: #bbb;');

// Wave drawing using JS (smooth sinusoidal waves)
;(function() {
    const svgViewWidth = 1200; // match SVG viewBox width
    const baseline = 700;      // y baseline in viewBox coordinates
    const k = 3 * Math.PI / svgViewWidth; // chosen so zeros at 0, 1/3, 2/3, 1
    const speed = (2 * Math.PI) / 18; // radians per second (period T=10s)
    const samples = 240; // number of points for smooth curve

    const path1 = document.getElementById('wave1');
    const path2 = document.getElementById('wave2');
    if (!path1 || !path2) return;

    let last = performance.now();
    let phase = 0;

    function buildD(amplitude, phaseOffset) {
        const step = svgViewWidth / samples;
        let d = '';
        for (let i = 0; i <= samples; i++) {
            const x = i * step;
            const y = baseline + amplitude * Math.sin(k * x + phase + phaseOffset);
            if (i === 0) d += `M${x.toFixed(2)},${y.toFixed(2)}`;
            else d += ` L${x.toFixed(2)},${y.toFixed(2)}`;
        }
        return d;
    }

    function frame(now) {
        const dt = (now - last) / 1000;
        last = now;
        phase -= speed * dt;

        // amplitudes in viewBox units (tune to taste)
        const amp1 = 30;       // primary
        const amp2 = amp1 * 2; // double amplitude

        path1.setAttribute('d', buildD(amp1, 0));
        path2.setAttribute('d', buildD(amp2, Math.PI * 0.15));

        requestAnimationFrame(frame);
    }

    // Kick off
    requestAnimationFrame(frame);

    // Resize handler: nothing to recalc since using viewBox coords, but keep placeholder
    window.addEventListener('resize', () => {});
})();
