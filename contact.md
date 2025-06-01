---
title: Contact
layout: default
---

# Contact

<div class="contact-container">
    <div class="contact-info">
        <div class="contact-card">
            <i class="fas fa-envelope"></i>
            <h3>Email</h3>
            <a href="mailto:pogrant@alumni.unc.edu" class="contact-link">pogrant@alumni.unc.edu</a>
        </div>

        <div class="contact-card">
            <i class="fab fa-linkedin"></i>
            <h3>LinkedIn</h3>
            <a href="https://linkedin.com/in/poglesbyg" class="contact-link" target="_blank" rel="noopener noreferrer">linkedin.com/in/poglesbyg</a>
        </div>

        <div class="contact-card">
            <i class="fab fa-github"></i>
            <h3>GitHub</h3>
            <a href="https://github.com/poglesbyg" class="contact-link" target="_blank" rel="noopener noreferrer">github.com/poglesbyg</a>
        </div>
    </div>

    <div class="contact-form-container">
        <h2>Send a Message</h2>
        <form id="contact-form" class="contact-form" action="https://formspree.io/f/xblyrbyg" method="POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-button">
                <i class="fas fa-paper-plane"></i>
                Send Message
            </button>
        </form>
    </div>
</div>

<script>
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            this.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        showNotification('Failed to send message. Please try again.', 'error');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
</script> 
