// Router.js - Simple navigation system
const Router = {
  // Routes configuration
  routes: {},
  
  // Current route
  currentRoute: null,
  
  // Initialize the router
  initialize() {
    console.log('Initializing Router...');
    
    // Set up routes
    this.routes = {
      'home': () => this.showHome(),
      'quest': (id) => this.showQuest(id),
      'settings': () => this.showSettings()
    };
    
    // Handle initial route
    this.handleInitialRoute();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());
    
    console.log('Router initialized');
  },
  
  // Handle initial route
  handleInitialRoute() {
    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      // Parse the hash
      this.handleRouteChange();
    } else {
      // Default to home
      this.navigate('home');
    }
  },
  
  // Handle route change
  handleRouteChange() {
    // Get current hash
    const hash = window.location.hash.substring(1);
    
    // Parse route and parameters
    const [route, ...params] = hash.split('/');
    
    console.log(`Route changed: ${route}, params: ${params.join(', ')}`);
    
    // Find handler for this route
    const handler = this.routes[route];
    
    if (handler) {
      this.currentRoute = route;
      
      // Call the handler with parameters
      handler(...params);
    } else {
      console.warn(`No handler for route: ${route}`);
      // Default to home
      this.navigate('home');
    }
  },
  
  // Navigate to a route
  navigate(route, ...params) {
    console.log(`Navigating to: ${route}, params: ${params.join(', ')}`);
    
    // Build URL hash
    let hash = route;
    
    if (params.length > 0) {
      hash += '/' + params.join('/');
    }
    
    // Update URL
    window.location.hash = hash;
  },
  
  // Show home page
  showHome() {
    console.log('Showing home page');
    
    // Show home container
    this.showContainer('main-container');
    
    // Update quests display
    QuestController.showQuestList();
  },
  
  // Show quest detail
  showQuest(id) {
    console.log(`Showing quest: ${id}`);
    
    // Show quest detail container
    this.showContainer('quest-detail-container');
    
    // Show quest detail
    QuestController.showQuestDetail(id);
  },
  
  // Show settings page
  showSettings() {
    console.log('Showing settings page');
    
    // Show settings container
    this.showContainer('settings-container');
    
    // TODO: Implement settings page
  },
  
  // Helper to show a container and hide others
  showContainer(containerId) {
    // Hide all containers
    document.querySelectorAll('.page-container').forEach(container => {
      container.classList.add('hidden');
    });
    
    // Show the specified container
    const container = document.getElementById(containerId);
    if (container) {
      container.classList.remove('hidden');
    }
  }
};
