document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    };

    // Form validation and submission
    window.handleFormSubmit = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        let isValid = true;

        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.querySelector('.error-message').style.display = 'none';
        });

        // Validate required fields
        const requiredFields = ['name', 'email', 'subject', 'message'];
        requiredFields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const value = formData.get(fieldName).trim();
            
            if (!value) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate email format
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            showFieldError(form.querySelector('[name="email"]'), 'Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 2000);
        }
    };

    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Project modal functionality
    window.openProjectModal = function(projectTitle) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalTitle.textContent = projectTitle;
        
        const descriptions = {
            'E-Commerce Platform': 'A comprehensive online shopping solution built with modern web technologies. Features include user authentication, shopping cart, payment processing with Stripe, order management, and an admin dashboard for inventory management.',
            'Task Management App': 'A collaborative project management tool designed for teams. Includes real-time updates using WebSocket, file sharing capabilities, task assignment, progress tracking, and integrated team communication features.',
            'Weather Dashboard': 'An interactive weather application that provides detailed forecasts and historical weather data. Features location-based weather, interactive charts, severe weather alerts, and beautiful data visualizations.',
            'Social Media Analytics': 'A powerful analytics platform for social media managers. Tracks engagement metrics, follower growth, post performance, and provides detailed insights with interactive dashboards and automated reporting.'
        };
        
        modalDescription.textContent = descriptions[projectTitle] || 'Project description not available.';
        modal.style.display = 'flex';
    };

    window.closeModal = function() {
        document.getElementById('projectModal').style.display = 'none';
    };

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            window.closeModal();
        }
    });

    // Resume download functionality
window.downloadResume = function() {
    const a = document.createElement('a');
    a.href = "files/Sri_Lasya_Resume.pdf";  // <-- your real resume path
    a.download = "Sri_Lasya_Resume.pdf";    // file name for download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show confirmation
    alert('Resume downloaded successfully!');
};


    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});