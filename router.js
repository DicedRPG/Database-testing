// router.js
// This handles navigation between different pages in the app

class Router {
    constructor() {
        this.routes = {};
        this.currentPage = null;
        this.params = {};
        this.defaultRoute = null;
        
        // Listen for URL changes
        window.addEventListener('popstate', this.handleRouteChange.bind(this));
    }
    
    // Register a route with a handler function
    register(path, handler, isDefault = false) {
        this.routes[path] = handler;
        
        if (isDefault) {
            this.defaultRoute = path;
        }
    }
    
    // Navigate to a specific path
    navigate(path, params = {}) {
        // Update URL 
        const url = new URL(window.location);
        url.hash = path;
        
        // Add parameters as query params if needed
        Object.keys(params).forEach(key => {
            url.searchParams.set(key, params[key]);
        });
        
        // Update browser history
        window.history.pushState({}, '', url);
        
        // Call the appropriate route handler
        this.handleRouteChange();
    }
    
    // Extract route parameters from URL
    getParams() {
        const searchParams = new URLSearchParams(window.location.search);
        const params = {};
        
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        
        // Also handle hash parameters like #quest/123
        const hash = window.location.hash.slice(1);
        if (hash.includes('/')) {
            const [route, id] = hash.split('/');
            params.id = id;
        }
        
        return params;
    }
    
    // Handle route changes (called on navigation and popstate)
    handleRouteChange() {
        // Get current path from URL hash or use default
        let path = window.location.hash.slice(1);
        
        // If path contains parameters like 'quest/123', extract just the route part
        if (path.includes('/')) {
            path = path.split('/')[0];
        }
        
        // If no path is specified, use default route
        if (!path && this.defaultRoute) {
            path = this.defaultRoute;
            window.location.hash = this.defaultRoute;
        }
        
        // Find the handler for current path
        const handler = this.routes[path];
        
        if (handler) {
            // Get any parameters from URL
            this.params = this.getParams();
            
            // Call the handler with parameters
            this.currentPage = path;
            handler(this.params);
        } else {
            console.error(`No handler found for route: ${path}`);
            
            // Redirect to default route if available
            if (this.defaultRoute && path !== this.defaultRoute) {
                window.location.hash = this.defaultRoute;
            }
        }
    }
    
    // Initialize the router
    init() {
        // Handle the initial route
        this.handleRouteChange();
    }
    
    // Go back to previous page
    back() {
        window.history.back();
    }
    
    // Get the current page
    getCurrentPage() {
        return this.currentPage;
    }
    
    // Get the current parameters
    getCurrentParams() {
        return { ...this.params };
    }
}

// Create a singleton instance
const router = new Router();
