// admin-auth.js
// A simple authentication system for the admin interface
// Add this as a separate file in your project

const AdminAuth = {
    // Storage key for admin session
    STORAGE_KEY: 'diced_admin_session',
    
    // Check if user is authenticated
    isAuthenticated() {
        const session = localStorage.getItem(this.STORAGE_KEY);
        if (!session) return false;
        
        try {
            const sessionData = JSON.parse(session);
            const expiryTime = sessionData.expiry;
            
            // Check if session is expired
            if (Date.now() > expiryTime) {
                this.logout();
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    },
    
    // Authenticate user with password
    authenticate(password) {
        // In a real application, you would verify this password against a secure backend
        // This is a simple example that uses a hardcoded password
        const correctPassword = 'admin123'; // Change this to a secure password
        
        if (password === correctPassword) {
            // Create a session that expires in 24 hours
            const sessionData = {
                authenticated: true,
                expiry: Date.now() + (24 * 60 * 60 * 1000)
            };
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessionData));
            return true;
        }
        
        return false;
    },
    
    // Log out user
    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    // Check authentication and redirect if not authenticated
    checkAuth() {
        if (!this.isAuthenticated()) {
            // Redirect to login page or show login prompt
            this.showLoginPrompt();
            return false;
        }
        
        return true;
    },
    
    // Show login prompt
    showLoginPrompt() {
        const password = prompt('Enter admin password:');
        
        if (password === null) {
            // User cancelled, redirect to main app
            window.location.href = 'index.html';
            return;
        }
        
        if (this.authenticate(password)) {
            // Refresh page to load admin interface
            window.location.reload();
        } else {
            alert('Incorrect password. Please try again.');
            // Try again
            this.showLoginPrompt();
        }
    }
};

// Check authentication when admin page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only run on admin page
    if (window.location.pathname.includes('admin')) {
        AdminAuth.checkAuth();
    }
});
