/* ============================================
   Eli Sports Analytics - Main JavaScript
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Dark Mode Toggle
    // ============================================
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference or default to light mode
    const darkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (darkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    // Toggle dark mode when button is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '🌙';
            }
        });
    }
    
    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const topic = document.getElementById('topic').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !topic || !message) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Email validation (basic)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Simulate form submission (in a real app, this would send to a server)
            formStatus.textContent = 'Thank you for your message! Your form has been submitted successfully. (This is a placeholder - form submission is not actually processed.)';
            formStatus.className = 'form-status success';
            
            // Reset form after 3 seconds
            setTimeout(function() {
                contactForm.reset();
                formStatus.textContent = '[FORM STATUS MESSAGE PLACEHOLDER]';
                formStatus.className = 'form-status';
            }, 5000);
        });
    }
    
});

