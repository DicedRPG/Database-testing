// main.js - Main application entry point
(async function() {
  console.log('Diced RPG Companion: Starting...');
  
  try {
    // Step 1: Initialize QuestDataService first (new)
    if (window.QuestDataService) {
      await QuestDataService.initialize();
    }
   
    // Step 2: Initialize core services
    await StateService.initialize();
    await QuestService.initialize();
    
    // Step 3: Migrate legacy data if needed
    await migrateOldData();
    
    // Step 4: Initialize views
    AttributeView.initialize();

    // Step 5: Initialize settings view
    SettingsView.initialize();
    
    // Step 6: Initialize controllers
    QuestController.initialize();
    
    // Step 7: Set up mobile menu functionality
    setupMobileNavigation();
    
    // Step 8: Initialize router (last so everything else is ready)
    Router.initialize();
    
    console.log('Diced RPG Companion: Initialization complete');
  } catch (error) {
    console.error('Diced RPG Companion: Initialization failed:', error);
    if (window.NotificationService) {
      NotificationService.error('Application failed to initialize properly. Please refresh the page.');
    } else {
      alert('Application failed to initialize properly. Please refresh the page.');
    }
  }
  
  // Function to migrate data from old system to new system
  async function migrateOldData() {
    console.log('Checking for data migration needs...');
    
    // Check for old state storage
    const oldState = localStorage.getItem('diced_rpg_state');
    if (oldState) {
      try {
        console.log('Found old state data, migrating...');
        const parsedOldState = JSON.parse(oldState);
        
        // Migrate attributes
        if (parsedOldState.attributeHours) {
          for (const [attr, value] of Object.entries(parsedOldState.attributeHours)) {
            StateService.updateState(`user.attributes.${attr}`, value);
          }
          console.log('Migrated attribute hours');
        }
        
        // Migrate completed quests
        if (parsedOldState.completedQuests && parsedOldState.completedQuests.length > 0) {
          StateService.updateState('quests.completed', parsedOldState.completedQuests);
          console.log(`Migrated ${parsedOldState.completedQuests.length} completed quests`);
        }
        
        // Migrate visible quests
        if (parsedOldState.visibleQuests && parsedOldState.visibleQuests.length > 0) {
          StateService.updateState('quests.visible', parsedOldState.visibleQuests);
          console.log(`Migrated ${parsedOldState.visibleQuests.length} visible quests`);
        }
        
        // Migrate quest rolls
        if (parsedOldState.questRolls) {
          StateService.updateState('quests.questRolls', parsedOldState.questRolls);
          console.log('Migrated quest rolls');
        }
        
        console.log('Data migration complete');
      } catch (error) {
        console.error('Error migrating old data:', error);
      }
    } else {
      console.log('No old data found, migration not needed');
    }
  }
  
  // Function to set up mobile navigation
  function setupMobileNavigation() {
    // Get elements
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) {
      console.warn('Mobile navigation elements not found');
      return;
    }
    
    console.log('Setting up mobile navigation');
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent bubbling to document click handler
      mainNav.classList.toggle('open');
      console.log('Menu toggled:', mainNav.classList.contains('open'));
    });
    
    // Close menu when clicking elsewhere
    document.addEventListener('click', (event) => {
      // If click is outside menu and toggle, close menu
      if (mainNav.classList.contains('open') && 
          !menuToggle.contains(event.target) && 
          !mainNav.contains(event.target)) {
        mainNav.classList.remove('open');
        console.log('Menu closed from outside click');
      }
    });
    
    // Close menu when a nav button is clicked
    document.querySelectorAll('.main-nav .nav-button').forEach(button => {
      button.addEventListener('click', () => {
        mainNav.classList.remove('open');
        console.log('Menu closed from nav button click');
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      // Close mobile menu if window is resized to desktop size
      if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        console.log('Menu closed from window resize');
      }
    });
    
    console.log('Mobile navigation setup complete');
  }
})();
