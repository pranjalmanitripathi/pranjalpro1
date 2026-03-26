// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercent = document.getElementById('loading-percent');

    if (preloader && loadingBar && loadingPercent) {
        let progress = 0;
        const interval = setInterval(() => {
            // Random jumps for a more realistic loading feel
            progress += Math.floor(Math.random() * 10) + 5;
            if (progress > 100) progress = 100;

            loadingBar.style.width = `${progress}%`;
            loadingPercent.innerText = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800); // Wait for CSS transition (fade+zoom) to finish
                }, 500); // Pause at 100% for half a second before fading
            }
        }, 120); // Speed of intervals
    }
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const roles = [
    "Machine Learning Enthusiast.",
    "Computer Science Engineer.",
    "Data Analyst."
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before typing next
    }

    setTimeout(type, typingDelay);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(type, 1000);
    }
});

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Update Particles Color based on theme
    if (body.classList.contains('light-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        updateParticlesColor('#3d5a2d');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        updateParticlesColor('#556b2f');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Particle.js Configuration
function initParticles(color) {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": color },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.6, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 140,
                    "color": color,
                    "opacity": 0.6,
                    "width": 1.5
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "repulse": { "distance": 100, "duration": 0.4 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
}

function updateParticlesColor(color) {
    // If the element exists, re-initialize
    const particlesEl = document.getElementById('particles-js');
    if (particlesEl && particlesEl.innerHTML !== '') {
        particlesEl.innerHTML = '';
        initParticles(color);
    }
}

// Initialize on load
window.onload = () => {
    initParticles('#556b2f'); // Default dark mode color (Olive)
};

// Object to track animated counters
let countersAnimated = false;

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');

            // Trigger skill bar animation if it's the skills section
            if (reveals[i].classList.contains('skills-wrapper')) {
                animateSkills();
            }

            // Trigger counter animation if it's the stats container
            if (reveals[i].classList.contains('stats-container') && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (target > 20 ? '+' : '');
            }
        };
        updateCount();
    });
}

// Animate Skill Bars
let skillsAnimated = false;
function animateSkills() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    setTimeout(() => {
        const progressLines = document.querySelectorAll('.progress-line span');
        progressLines.forEach(line => {
            const width = line.getAttribute('data-width');
            line.style.width = width;
        });
    }, 300);
}

window.addEventListener('scroll', reveal);

// Achievements Redirection
document.querySelectorAll('.stat-box, .badge-card').forEach(item => {
    item.addEventListener('click', () => {
        window.open('https://leetcode.com/u/pranjal12318725/', '_blank');
    });
});

// Highlight Active Nav Link on Scroll
const contentSections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    contentSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = ''; // reset color
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--accent-color)';
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const statusDiv = document.getElementById('form-status');
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(this);

        // Simulate backend processing for static demo
        setTimeout(() => {
            statusDiv.innerHTML = `<span style="color: #c5a059;"><i class="fas fa-check-circle"></i> Message received! (Static Demo Mode)</span>`;
            this.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }, 1500);
    });
}

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');
const hoverElements = document.querySelectorAll('a, button, .mini-card, .btn');

if (cursor && cursorTrail) {
    document.addEventListener('mousemove', (e) => {
        // Main cursor follows exactly
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Trail follows with slight delay
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 50);
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Hero Image Parallax Effect
const heroImageWrapper = document.querySelector('.hero-image-wrapper');
if (heroImageWrapper) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        heroImageWrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Initial call to reveal elements on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(reveal, 500);
});

// Chatbot Logic
const chatTrigger = document.getElementById('chat-trigger');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatClose = document.getElementById('chat-close');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

if (chatTrigger && chatbotWidget) {
    chatTrigger.addEventListener('click', () => {
        chatbotWidget.classList.toggle('active');
        if (chatbotWidget.classList.contains('active')) {
            setTimeout(() => chatInput.focus(), 300);
        }
    });

    chatClose.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
    });

    // Comprehensive AI Responses mapping based on user details
    const botMemory = [
        { keywords: ['name', 'who are you', 'who is this', 'about'], response: 'I am Pranjal Mani Tripathi\'s AI assistant! Pranjal is a B.Tech CSE student at LPU passionate about Machine Learning and Software Development.' },
        { keywords: ['cgpa', 'grade', 'marks', 'score'], response: 'Pranjal currently holds a CGPA of 7.50.' },
        { keywords: ['education', 'study', 'college', 'university', 'degree', 'btech', 'lpu'], response: 'Pranjal is pursuing his B.Tech in Computer Science and Engineering from Lovely Professional University (LPU), Punjab (Since Aug 2023).' },
        { keywords: ['skill', 'language', 'tech', 'stack', 'know', 'code', 'framework', 'tool'], response: 'Pranjal is skilled in: \n• Languages: Java, Python, JavaScript, C, C++\n• Frameworks: HTML, CSS, Bootstrap\n• Tools: Power BI, MySQL, Excel\n• Soft Skills: Problem Solving, Team Collaboration, Time Management' },
        { keywords: ['project', 'work', 'built', 'portfolio'], response: 'Here are Pranjal\'s top projects:\n1. Global Cyber Threat Intelligence Dashboard (Power BI/DAX)\n2. Loan Repayment Prediction (ML model with ~99.98% accuracy)\n3. Air Quality Analytics Dashboard (Excel/Data Analysis)\n4. LandSphere (Smart Land Marketplace using Python, Flask, ML & JS)' },
        { keywords: ['achievement', 'badge', 'leetcode', 'hackerrank', 'solve', 'star'], response: 'Pranjal has solved 200+ LeetCode problems (31 Hard, 121 Medium, 72 Easy). He has also earned a 3-star Python badge and a 2-star Problem Solving badge on HackerRank!' },
        { keywords: ['certif', 'course', 'training'], response: 'Pranjal has completed Java Developer Core to Advanced training (Boards Infinity) and holds certifications in Java Programming & DSA (IamNeo), Cloud Computing (NPTEL), and Web Design (FreeCodeCamp).' },
        { keywords: ['contact', 'hire', 'email', 'reach', 'linkedin', 'github'], response: 'You can reach Pranjal via Email at pranjalmanitripathi21@gmail.com, or connect on LinkedIn (linkedin.com/in/pranjal-tripathi23) and GitHub (github.com/pranjalmani).' },
        { keywords: ['hi', 'hello', 'hey', 'greetings', 'gretings'], response: 'Hello! I am Pranjal\'s AI assistant. Ask me anything about his skills, projects, education, or contact details!' }
    ];

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = text.replace(/\n/g, '<br>'); // Allow newline breaks
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processUserMessage(msg) {
        const query = msg.toLowerCase();
        let reply = "Please contact Pranjal directly for more details. You can reach him at pranjalmanitripathi21@gmail.com!";

        for (let item of botMemory) {
            if (item.keywords.some(kw => query.includes(kw))) {
                reply = item.response;
                break;
            }
        }

        // Simulate thinking delay
        const typingMsg = document.createElement('div');
        typingMsg.className = 'message bot-message';
        typingMsg.innerHTML = '<i class="fas fa-ellipsis-h blink"></i>';
        chatBody.appendChild(typingMsg);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            chatBody.removeChild(typingMsg);
            addMessage(reply, 'bot');
        }, 800);
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';
            processUserMessage(text);
        }
    }

    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

// Article Modal Logic
const articleData = {
    'ai-real-estate': {
        title: 'AI-Powered Property Valuation: Beyond Traditional Appraisals',
        content: `
            <p>Artificial Intelligence is transforming the real estate industry by enabling hyper-accurate property valuations. Unlike traditional appraisals that rely on subjective human judgment, Machine Learning models analyze thousands of features simultaneously.</p>
            <p>These features include historical sales data, local neighborhood trends, proximity to amenities, and even satellite imagery. By identifying non-linear correlations, these systems provide a precise and data-driven view of a property's true market value in real-time.</p>
            <p><strong>Key Benefits:</strong></p>
            <ul>
                <li>Reduction in valuation bias.</li>
                <li>Increased assessment speed.</li>
                <li>Better risk management for lenders.</li>
            </ul>
        `
    },
    'ml-risk': {
        title: 'Quantifying Financial Risk with Machine Learning',
        content: `
            <p>In the modern financial landscape, risk prediction is the cornerstone of responsible lending. We leverage advanced classification algorithms, such as Gradient Boosting and Random Forests, to predict borrower default probabilities.</p>
            <p>This process involves rigorous data preprocessing, feature engineering of credit history behavioral patterns, and evaluation using metrics like ROC-AUC and Precision-Recall. The result is a robust system that balances profitability with risk mitigation.</p>
            <p><strong>Project Focus:</strong></p>
            <ul>
                <li>High-dimensional data analysis.</li>
                <li>Model interpretability (SHAP/LIME).</li>
                <li>Automated decision-making pipelines.</li>
            </ul>
        `
    },
    'env-monitor': {
        title: 'Real-Time Air Quality Monitoring & Analytics',
        content: `
            <p>Environmental tracking has evolved from sporadic reports to real-time data visualization. Using IoT sensors and cloud-based analytics, cities can now monitor pollutants like PM2.5 and NO2 as they fluctuate throughout the day.</p>
            <p>Our analytical dashboards translate this complex sensory data into actionable insights for urban planners, enabling evidence-based policy interventions to improve public health and urban sustainability.</p>
            <p><strong>Tech Stack:</strong></p>
            <ul>
                <li>IoT Sensor Integration.</li>
                <li>Data Streaming with Python.</li>
                <li>Interactive Visualization with Chart.js and Power BI.</li>
            </ul>
        `
    }
};

const modal = document.getElementById('article-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const readMoreBtns = document.querySelectorAll('.read-more');
const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn, .modal-overlay');

function openArticleModal(articleId) {
    const data = articleData[articleId];
    if (data && modal) {
        modalTitle.innerText = data.title;
        modalContent.innerHTML = data.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
}

function closeArticleModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const articleId = btn.getAttribute('data-article');
        openArticleModal(articleId);
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', closeArticleModal);
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArticleModal();
});
