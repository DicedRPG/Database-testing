// main.js - Main application entry point with PWA functionality
(async function() {
  console.log('Diced RPG Companion: Starting...');
  
  // Register service worker for PWA functionality
  await registerServiceWorker();
  
  // Set up PWA installation handling
  setupPWAInstallation();
  
  try {
    // Step 1: Initialize QuestDataService first
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
  
  // Register service worker
  async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    } else {
      console.log('Service Workers not supported in this browser');
    }
  }
  
  // PWA installation prompt handler
  function setupPWAInstallation() {
    // Variable to store the deferred prompt
    let deferredPrompt;
    
    // Add a variable to track if install banner has been shown
    window.installPromptShown = false;
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      
      // Only show the install button if we haven't shown it already
      if (!window.installPromptShown) {
        createInstallButton();
        window.installPromptShown = true;
      }
    });
    
    // Listen for the appinstalled event
    window.addEventListener('appinstalled', (evt) => {
      // Log install to analytics
      console.log('INSTALL: Diced RPG Companion was installed');
      
      // Use notification if available
      if (window.NotificationService) {
        NotificationService.success('Diced RPG Companion was successfully installed!');
      }
      
      // Hide the install button
      const pwaSection = document.querySelector('.settings-section.pwa-section');
      if (pwaSection) {
        pwaSection.style.display = 'none';
      }
    });
    
    // Function to create and display an install button
    function createInstallButton() {
      // Check if we're on the settings page initially
      const settingsContent = document.getElementById('settings-content');
      if (settingsContent) {
        addInstallButtonToSettings(settingsContent, deferredPrompt);
      } else {
        // If not on settings page, wait for it to be shown
        // Use MutationObserver to detect when settings page is displayed
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              const settingsContent = document.getElementById('settings-content');
              if (settingsContent && !settingsContent.classList.contains('hidden')) {
                addInstallButtonToSettings(settingsContent, deferredPrompt);
                observer.disconnect();
                break;
              }
            }
          }
        });
        
        // Start observing the document with the configured parameters
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
    
    // Add install button to settings page
    function addInstallButtonToSettings(settingsContent, deferredPrompt) {
      // Check if the button already exists
      if (document.getElementById('pwa-install-button')) return;
      
      // Find or create a section for PWA settings
      let pwaSection = document.querySelector('.settings-section.pwa-section');
      if (!pwaSection) {
        pwaSection = document.createElement('div');
        pwaSection.className = 'settings-section pwa-section';
        pwaSection.innerHTML = `
          <h3>App Installation</h3>
          <div class="settings-options">
            <div class="settings-option">
              <button id="pwa-install-button" class="settings-button">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                </svg>
                Install App
              </button>
              <p>Install Diced RPG Companion as an app on your device</p>
            </div>
          </div>
        `;
        settingsContent.appendChild(pwaSection);
      }
      
      // Add event listener to install button
      document.getElementById('pwa-install-button')?.addEventListener('click', async () => {
        if (deferredPrompt) {
          // Show the install prompt
          deferredPrompt.prompt();
          
          // Wait for the user to respond to the prompt
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User ${outcome} the installation`);
          
          // We've used the prompt, and can't use it again, throw it away
          deferredPrompt = null;
          
          // Hide the install button
          pwaSection.style.display = 'none';
        } else {
          // If the app is already installed or not installable
          // Use notification if available
          if (window.NotificationService) {
            NotificationService.info('The app is already installed or cannot be installed on this device');
          } else {
            alert('The app is already installed or cannot be installed on this device');
          }
        }
      });
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
