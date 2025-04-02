// Router.js - Enhanced navigation system
const Router = {
  // Routes configuration
  routes: {},
  
  // Current route
  currentRoute: null,
  
  // Route history
  history: [],
  
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
    
    // Set up back button functionality
    document.querySelectorAll('#universal-back-button').forEach(button => {
      button.addEventListener('click', () => {
        window.history.back();
      });
    });
    
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
    
    // Check route permission
    // Confirm this later
    if (!this.checkRoutePermission(route, params)) {
      return;
    }
    
    // Find handler for this route
    const handler = this.routes[route];
    
    if (handler) {
      this.currentRoute = route;
      
      // Update active navigation buttons
      this.updateActiveNavButtons(route);
      
      // Show loading indicators
      this.showLoadingIndicators();
      
      // Call the handler with parameters
      handler(...params);
      
      // Add to history
      this.addToHistory(route, params);
    } else {
      console.warn(`No handler for route: ${route}`);
      // Default to home
      this.navigate('home');
    }
  },
  
  // Check if route is allowed
  checkRoutePermission(route, params) {
    // Check if quest exists before navigating to quest detail
    if (route === 'quest' && params.length > 0) {
      const questId = parseInt(params[0]);
      
      // For immediate feedback, check if quest exists in QUEST_DATA
      // In a full implementation, this would use QuestService.getQuestById
      const quest = QUEST_DATA.find(q => q.id === questId);
      if (!quest) {
        // Quest not found, redirect to home
        this.navigate('home');
        // Use notification service if available
        if (window.NotificationService) {
          NotificationService.error(`Quest #${questId} not found.`);
        } else {
          alert(`Quest #${questId} not found.`);
        }
        return false;
      }
    }
    
    return true;
  },
  
  // Navigate to a route
  navigate(route, ...params) {
    console.log(`Navigating to: ${route}, params: ${params.join(', ')}`);
    
    // Check route permission first
    if (!this.checkRoutePermission(route, params)) {
      return;
    }
    
    // Build URL hash
    let hash = route;
    
    if (params.length > 0) {
      hash += '/' + params.join('/');
    }
    
    // Add state object
    const state = {
      route: route,
      params: params,
      timestamp: new Date().getTime()
    };
    
    // Update browser history
    if (window.location.hash.substring(1) !== hash) {
      window.history.pushState(state, '', '#' + hash);
      this.handleRouteChange();
    }
  },
  
  // Add to route history
  addToHistory(route, params) {
    this.history.push({
      route,
      params,
      timestamp: new Date().getTime()
    });
    
    // Keep history at a reasonable size
    if (this.history.length > 20) {
      this.history.shift();
    }
  },
  
  // Show home page
  showHome() {
    console.log('Showing home page');
    
    // Show home container
    this.showContainer('main-container');
    
    // Update quests display
    QuestController.List();
  },
  
  // Show quest detail
  showQuest(id) {
    console.log(`Showing quest: ${id}`);
    
    // Show quest detail container
    this.showContainer('quest-detail-container');
    
    // Show quest detail
    QuestController.showQuestDetail(id);

    / Add this: Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Use 'auto' for instant scrolling instead of smooth animation
  });
  },
  
  // Show settings page
 showSettings() {
  console.log('Showing settings page');
  
  // Show settings container
  this.showContainer('settings-container');
  
  // Render settings view if available
  if (window.SettingsView) {
    SettingsView.render();
  }
},
  
  // Helper to show loading indicators
  showLoadingIndicators() {
    // Show all loading spinners
    document.querySelectorAll('.loading-spinner').forEach(spinner => {
      spinner.style.display = 'block';
    });
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
      
      // Hide loading spinner for this container
      const spinner = container.querySelector('.loading-spinner');
      if (spinner) {
        spinner.style.display = 'none';
      }
    }
  },
  
  // Update active navigation buttons
  updateActiveNavButtons(route) {
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-button').forEach(button => {
      button.classList.remove('active');
    });
    
    // Add active class to current route button
    const activeButton = document.querySelector(`[data-route="${route}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
};
