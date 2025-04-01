// enhanced-quest-sync.js
// An improved solution to synchronize quest data across devices

/**
 * EnhancedDicedSync - More aggressive quest data synchronization
 */
(function() {
    // Constants
    const QUEST_STORAGE_KEY = 'diced_rpg_quests';
    const VERSION_KEY = 'diced_quest_version';
    const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes
    
    // Initialize after a short delay to let app load first
    setTimeout(initialize, 3000);
    
    // Initialize the sync system
    function initialize() {
        console.log('EnhancedDicedSync: Initializing...');
        
        // Perform initial check
        checkForUpdates();
        
        // Set up periodic checks
        setInterval(checkForUpdates, CHECK_INTERVAL);
        
        // Add refresh button to UI for manual updates
        addRefreshButton();
    }
    
    // Check for updates to quest data
    async function checkForUpdates() {
        console.log('EnhancedDicedSync: Checking for quest data updates...');
        
        try {
            // Add cache-busting parameter
            const response = await fetch('data.js?t=' + Date.now());
            
            if (!response.ok) {
                console.warn('EnhancedDicedSync: Failed to fetch data.js:', response.status);
                return;
            }
            
            const text = await response.text();
            
            // Directly check the content to see if it's different
            const currentData = localStorage.getItem(QUEST_STORAGE_KEY);
            
            // Extract quest data from JS file
            const questDataMatch = text.match(/const QUEST_DATA = (\[[\s\S]*?\]);/);
            
            if (questDataMatch && questDataMatch[1]) {
                // Compare with current data (after normalizing whitespace)
                const newDataString = questDataMatch[1].replace(/\s+/g, ' ');
                const currentDataString = currentData ? currentData.replace(/\s+/g, ' ') : '';
                
                if (newDataString !== currentDataString) {
                    console.log('EnhancedDicedSync: Quest data has changed!');
                    updateQuestData(questDataMatch[1]);
                    return;
                }
                
                // If content comparison didn't detect changes, check timestamp
                const timestampMatch = text.match(/\/\/ Generated on ([^\n]+)/);
                
                if (timestampMatch && timestampMatch[1]) {
                    const newTimestamp = new Date(timestampMatch[1]).getTime();
                    const storedTimestamp = localStorage.getItem(VERSION_KEY);
                    
                    // If we have a new version
                    if (!storedTimestamp || newTimestamp > parseInt(storedTimestamp)) {
                        console.log('EnhancedDicedSync: New timestamp detected:', new Date(newTimestamp).toISOString());
                        updateQuestData(questDataMatch[1], newTimestamp);
                    } else {
                        console.log('EnhancedDicedSync: No new quest data available');
                    }
                }
            }
        } catch (error) {
            console.error('EnhancedDicedSync: Error checking for quest data updates:', error);
        }
    }
    
    // Update quest data and refresh UI
    function updateQuestData(questDataString, timestamp) {
        try {
            // Parse the quest data
            const questData = JSON.parse(questDataString);
            
            if (questData && questData.length > 0) {
                console.log(`EnhancedDicedSync: Updating quest data with ${questData.length} quests`);
                
                // Get existing data for logging
                let existingData = null;
                try {
                    existingData = JSON.parse(localStorage.getItem(QUEST_STORAGE_KEY));
                } catch (e) {
                    // Ignore parsing errors
                }
                
                // Log what's changing
                console.log('EnhancedDicedSync: Previous quest count:', existingData ? existingData.length : 0);
                console.log('EnhancedDicedSync: New quest count:', questData.length);
                
                // Update localStorage with new quest data
                localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(questData));
                
                if (timestamp) {
                    localStorage.setItem(VERSION_KEY, timestamp.toString());
                }
                
                // Show notification to user
                showUpdateNotification();
                
                // Try to reload quest data in the app if possible
                forceAppRefresh();
            }
        } catch (error) {
            console.error('EnhancedDicedSync: Error updating quest data:', error);
        }
    }
    
    // More aggressive app refresh approach
    function forceAppRefresh() {
        console.log('EnhancedDicedSync: Forcing app refresh...');
        
        try {
            // Try multiple refresh strategies
            
            // 1. First, try to refresh database directly
            if (window.questDatabase) {
                // Clear existing quests array to force reload
                window.questDatabase.quests = [];
                
                // Force a reload from storage
                if (typeof window.questDatabase.loadFromStorage === 'function') {
                    window.questDatabase.loadFromStorage();
                    console.log('EnhancedDicedSync: Reloaded database from storage');
                }
            }
            
            // 2. Try to refresh UI components
            setTimeout(() => {
                if (window.appController) {
                    // Try each potential refresh method
                    
                    // Update quest list
                    if (typeof window.appController.updateQuestList === 'function') {
                        window.appController.updateQuestList();
                        console.log('EnhancedDicedSync: Updated quest list');
                    }
                    
                    // Refresh filter buttons 
                    if (typeof window.appController.setupFilterButtons === 'function') {
                        window.appController.setupFilterButtons();
                        console.log('EnhancedDicedSync: Updated filter buttons');
                    }
                    
                    // Try showing quest list if that exists
                    if (typeof window.appController.showQuestList === 'function') {
                        window.appController.showQuestList();
                        console.log('EnhancedDicedSync: Showed quest list');
                    }
                    
                    // If there's a quest system object, try that too
                    if (window.questSystem && typeof window.questSystem.showQuestList === 'function') {
                        window.questSystem.showQuestList();
                        console.log('EnhancedDicedSync: Refreshed via quest system');
                    }
                }
            }, 500);
            
            // 3. Third, try to trigger router navigation if possible
            setTimeout(() => {
                if (window.router && typeof window.router.navigate === 'function') {
                    // Try to navigate to home to refresh the view
                    window.router.navigate('home');
                    console.log('EnhancedDicedSync: Triggered router navigation');
                }
            }, 1000);
            
        } catch (error) {
            console.error('EnhancedDicedSync: Error during force refresh:', error);
        }
    }
    
    // Add a manual refresh button to the UI
    function addRefreshButton() {
        // Wait a bit to ensure UI is loaded
        setTimeout(() => {
            // Check if button already exists
            if (document.getElementById('quest-sync-refresh-button')) {
                return;
            }
            
            // Create button
            const button = document.createElement('button');
            button.id = 'quest-sync-refresh-button';
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
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M3 21v-5h5"/>
                </svg>
            `;
            
            // Add click event
            button.addEventListener('click', function() {
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
                
                // Check for updates
                checkForUpdates().then(() => {
                    // Force refresh regardless of update check result
                    forceAppRefresh();
                    
                    // Restore button after delay
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.style.pointerEvents = 'auto';
                    }, 1500);
                });
            });
            
            // Add to page
            document.body.appendChild(button);
            
        }, 5000); // Wait 5 seconds to ensure UI is loaded
    }
    
    // Show a notification about the update
    function showUpdateNotification() {
        // Create notification element
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
                <p style="margin: 5px 0 0 0; font-size: 14px;">Click here to reload the page</p>
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
        
        // Add click handler to reload page
        notification.addEventListener('click', function(e) {
            if (e.target !== closeButton) {
                window.location.reload();
            }
        });
        
        // Remove after 30 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 30000);
    }
})();
