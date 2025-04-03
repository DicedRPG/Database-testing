// quest-data-service.js
/**
 * QuestDataService - Handles fetching and updating quest data from a CDN
 * 
 * This service manages:
 * 1. Checking for updates to quest data from a remote source
 * 2. Storing updated quest data in localStorage
 * 3. Notifying the app when updates are available
 * 4. Providing a manual update mechanism
 * 5. Automatically refreshing the UI when updates occur
 */
const QuestDataService = {
  // Storage keys
  VERSION_KEY: 'diced_quest_version',
  DATA_KEY: 'diced_rpg_quests',
  LAST_CHECK_KEY: 'diced_quest_last_check',
  
  // Replace with your GitHub Pages URL for the quest data
  CDN_URL: 'https://dicedrpg.github.io/diced-rpg-data/data/quests.json',
  
  // Version check interval (once per day)
  CHECK_INTERVAL: 24 * 60 * 60 * 1000,
  
  // Last check timestamp to prevent excessive checks
  lastCheck: 0,
  
  // Current version
  currentVersion: '0.0.0',
  
  // Initialize the service
  async initialize() {
    console.log('Initializing QuestDataService...');
    
    // Get saved lastCheck time
    const savedLastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
    if (savedLastCheck) {
      this.lastCheck = parseInt(savedLastCheck);
    }
    
    // Get current version
    this.currentVersion = localStorage.getItem(this.VERSION_KEY) || '0.0.0';
    console.log(`Current quest data version: ${this.currentVersion}`);
    
    // Check for updates immediately on startup
    const updated = await this.checkAndUpdateQuestData(true);
    
    // Set up periodic checks
    setInterval(() => this.checkAndUpdateQuestData(), this.CHECK_INTERVAL);
    
    // Check for updates when app comes back online
    window.addEventListener('online', () => {
      console.log('App came back online, checking for quest updates...');
      this.checkAndUpdateQuestData();
    });
    
    // Add refresh button to the UI
    this.createRefreshButton();
    
    console.log('QuestDataService initialized', updated ? '(updated data)' : '(no updates)');
    return true;
  },
  
  // Check for and apply quest data updates
  async checkAndUpdateQuestData(force = false) {
    try {
      const now = Date.now();
      
      // Don't check too frequently unless forced
      if (!force && (now - this.lastCheck < 3600000)) { // 1 hour minimum between checks
        console.log('Skipping quest update check (checked recently)');
        return false;
      }
      
      console.log('Checking for quest data updates...');
      
      // Update last check time
      this.lastCheck = now;
      localStorage.setItem(this.LAST_CHECK_KEY, now.toString());
      
      // Get current version
      const currentVersion = this.currentVersion;
      console.log('Current version:', currentVersion);
      
      // Add cache-busting parameter to URL
      const url = `${this.CDN_URL}?nocache=${Math.random()}&t=${now}`;
      console.log('Checking URL:', url);
      
      // Fetch latest quest data
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`Failed to fetch quest data: ${response.status}`);
        return false;
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      console.log('New version from server:', data.version);
      
      // Check if data has the expected structure
      if (!data.version || !Array.isArray(data.quests)) {
        console.error('Invalid quest data format received');
        return false;
      }
      
      // Compare versions (simple string comparison works for semver)
      if (data.version > currentVersion) {
        console.log(`Quest data updated from ${currentVersion} to ${data.version}`);
        console.log(`Updated quests count: ${data.quests.length}`);
        console.log(`First quest in new data: ${data.quests[0].questName}`);
        
        // Store new quest data
        localStorage.setItem(this.DATA_KEY, JSON.stringify(data.quests));
        localStorage.setItem(this.VERSION_KEY, data.version);
        this.currentVersion = data.version;
        
        // Update QuestService data directly if available
        if (window.QuestService && window.QuestService._quests) {
          window.QuestService._quests = data.quests;
          
          // Trigger QuestService's change notification if available
          if (typeof window.QuestService._notifyDataChanged === 'function') {
            window.QuestService._notifyDataChanged();
          }
        }
        
        // Create and dispatch a custom event
        const event = new CustomEvent('questDataUpdated', { 
          detail: { 
            version: data.version,
            previousVersion: currentVersion,
            timestamp: data.timestamp
          } 
        });
        document.dispatchEvent(event);
        
        // Show notification to user
        this.showUpdateNotification(data.version);
        return true;
      }
      
      console.log(`No updates available (current v${currentVersion})`);
      return false;
    } catch (error) {
      console.error('Error checking for quest data updates:', error);
      return false;
    }
  },
  
  // Show notification about the update and trigger UI refresh
  showUpdateNotification(version) {
    // First, show notification using NotificationService
    if (window.NotificationService) {
      NotificationService.success(`Quest data updated to version ${version}! Refreshing content...`);
    } else {
      // Simple notification fallback
      const notification = document.createElement('div');
      notification.className = 'notification update-notification';
      notification.style.position = 'fixed';
      notification.style.top = '20px';  // Notice at top for better visibility
      notification.style.right = '20px';
      notification.style.backgroundColor = '#A2BC58';
      notification.style.color = 'white';
      notification.style.padding = '15px';
      notification.style.borderRadius = '5px';
      notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
      notification.style.zIndex = '1000';
      notification.style.display = 'flex';
      notification.style.alignItems = 'center';
      notification.style.justifyContent = 'space-between';
      notification.style.maxWidth = '300px';
      
      notification.innerHTML = `
        <div style="margin-right: 15px;">
          <p style="margin: 0; font-weight: bold;">Quest data updated!</p>
          <p style="margin: 5px 0 0 0; font-size: 14px;">New version: ${version}</p>
        </div>
        <button style="background: none; border: none; color: white; cursor: pointer; font-size: 20px; font-weight: bold; padding: 0 5px;">&times;</button>
      `;
      
      // Add to page
      document.body.appendChild(notification);
      
      // Add close handler
      const closeButton = notification.querySelector('button');
      closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.body.removeChild(notification);
      });
      
      // Remove after 30 seconds
      setTimeout(function() {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 30000);
    }
    
    // Then trigger a comprehensive UI refresh
    this.triggerFullUIRefresh();
  },
  
  // Trigger a full UI refresh after data update
  triggerFullUIRefresh() {
    // First, refresh quest list if that view is available
    if (window.QuestListView && typeof window.QuestListView.updateQuestList === 'function') {
      window.QuestListView.updateQuestList();
    }
    
    // Then, update quest filters
    if (window.QuestListView && typeof window.QuestListView.updateFilters === 'function') {
      window.QuestListView.updateFilters();
    }
    
    // Update the current quest detail if we're viewing a quest
    const state = window.StateService?.getState();
    if (state && state.ui && state.ui.currentView === 'detail' && state.quests && state.quests.currentQuestId) {
      if (window.QuestDetailView && typeof window.QuestDetailView.render === 'function') {
        window.QuestDetailView.render(state.quests.currentQuestId);
      }
    }
    
    // Refresh attribute displays if they're using quest data
    if (window.AttributeView && typeof window.AttributeView.updateDisplay === 'function') {
      window.AttributeView.updateDisplay();
    }
    
    console.log('Automatically refreshed UI after quest data update');
    
    // Option 1: For more drastic UI refresh, uncomment this code:
    /*
    setTimeout(() => {
      // Ask user if they want to refresh the page for latest changes
      if (confirm('Quest data has been updated. Reload page to ensure all changes are applied?')) {
        window.location.reload();
      }
    }, 1000);
    */
    
    // Option 2: For automatic page refresh without confirmation, uncomment this code:
    /*
    setTimeout(() => {
      console.log('Automatically reloading page to apply all quest data changes...');
      window.location.reload();
    }, 2000); // 2-second delay to show notification first
    */
  },
  
  // Force an immediate update check (for manual refresh)
  async forceUpdate() {
    const updated = await this.checkAndUpdateQuestData(true);
    
    // Show message if no updates available
    if (!updated && window.NotificationService) {
      NotificationService.info("You already have the latest quest data.");
    }
    
    return updated;
  },
  
  // Force reset version tracking (for debugging)
  forceReset() {
    localStorage.removeItem(this.VERSION_KEY);
    localStorage.removeItem(this.LAST_CHECK_KEY);
    console.log('Reset quest data version tracking');
    return this.forceUpdate();
  },
  
  // Create refresh button UI
  createRefreshButton() {
    // Wait a bit to ensure the rest of the UI is loaded
    setTimeout(() => {
      // Check if button already exists
      if (document.getElementById('quest-data-refresh-button')) {
        return;
      }
      
      // Create button
      const button = document.createElement('button');
      button.id = 'quest-data-refresh-button';
      button.className = 'quest-button primary';
      button.style.position = 'fixed';
      button.style.bottom = '20px';
      button.style.right = '20px';
      button.style.zIndex = '999';
      button.style.borderRadius = '50%';
      button.style.width = '50px';
      button.style.height = '50px';
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
      button.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
      button.title = 'Check for Quest Updates';
      
      // Add refresh icon
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
          <path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
          <path d="M3 21v-5h5"/>
        </svg>
      `;
      
      // Add click event
      button.addEventListener('click', async () => {
        // Show loading animation
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        `;
        button.style.pointerEvents = 'none';
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 1s linear infinite;
          }
        `;
        document.head.appendChild(style);
        
        // Force update
        await this.forceUpdate();
        
        // Restore button after delay
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.pointerEvents = 'auto';
        }, 1500);
      });
      
      // Add to page
      document.body.appendChild(button);
      
    }, 3000); // Wait 3 seconds after initialization to add the button
  },
  
  // Get current quest data version
  getVersion() {
    return this.currentVersion;
  }
};

// Export for use in other files
window.QuestDataService = QuestDataService;
