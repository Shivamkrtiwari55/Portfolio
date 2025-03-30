// Project Data
const projects = [
    {
        title: 'Showgithubprofile',
        description: 'This project allows users to enter any GitHub username and view the corresponding profile details, including their avatar, bio, repositories, followers, and more.',
        image: 'images/Screenshot 2025-03-29 015616.png',
        technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub API'],
        liveDemo: 'https://show-github-profile.vercel.app/',
        github: 'https://github.com/Shivamkrtiwari55/ShowGithub_Profile'
    },
    {
        title: 'Netflix Clone',
        description: 'A Netflix Clone is a video streaming platform that mimics the core features and functionalities of Netflix.',
        image: 'images/netflix.png',
        technologies: ['React', 'Node.js', 'MongoDB', 'TMDB API'],
        liveDemo: 'https://movies-platforms.netlify.app',
        github: 'https://github.com/Shivamkrtiwari55'
    },
    {
        title: 'E-Commerce Clone',
        description: 'An E-commerce Platform is an online marketplace that allows businesses and individuals to buy and sell products or services over the internet.',
        image: 'images/Ecommerce.png',
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Stripe'],
        liveDemo: 'https://supermart-eta.vercel.app/',
        github: 'https://github.com/Shivamkrtiwari55'
    }
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.querySelector('.projects-grid');
const navLinks = document.querySelectorAll('.nav-links a');

// Theme Toggle
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', savedTheme === 'dark');
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
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

// Project Cards
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.liveDemo}" target="_blank" class="btn primary">Live Demo</a>
                ${project.github ? `<a href="${project.github}" target="_blank" class="btn secondary">GitHub</a>` : ''}
            </div>
        </div>
    `;
    return card;
}

// Populate Projects Grid
projects.forEach(project => {
    projectsGrid.appendChild(createProjectCard(project));
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add animation to skill bars when they come into view
const skillBars = document.querySelectorAll('.progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    bar.setAttribute('data-width', width);
    skillObserver.observe(bar);
}); 
document.querySelector(".contact-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Page reload hone se roke

    const formData = new FormData(this);

    try {
        const response = await fetch("https://formspree.io/f/xqapdyge", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            alert("Message sent successfully!");
            this.reset(); // Form reset kare
        } else {
            alert("Error: Message not sent.");
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
});