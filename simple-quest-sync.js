// simple-quest-sync.js
// A minimal solution to synchronize quest data across devices without breaking app functionality

/**
 * SimpleDicedSync - Checks for updated quest data without affecting existing app functionality
 */
(function() {
    // Wait until the app is fully loaded and initialized
    let appCheckInterval;
    let checkCount = 0;
    
    // Constants
    const QUEST_STORAGE_KEY = 'diced_rpg_quests';
    const VERSION_KEY = 'diced_quest_version';
    const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
    const MAX_CHECKS = 10; // Maximum number of checks to determine if app is loaded
    
    // Start by waiting for app to load
    function initialize() {
        console.log('SimpleDicedSync: Initializing...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', waitForAppLoaded);
        } else {
            waitForAppLoaded();
        }
    }
    
    // Wait for app to be fully loaded
    function waitForAppLoaded() {
        appCheckInterval = setInterval(() => {
            // Check if app is loaded by looking for quest items and ensuring buttons work
            const questItemsExist = document.querySelectorAll('.quest-item').length > 0;
            const appControllerInitialized = window.appController && window.appController.initialized;
            
            checkCount++;
            
            if (questItemsExist && appControllerInitialized) {
                clearInterval(appCheckInterval);
                console.log('SimpleDicedSync: App detected as fully loaded');
                
                // Start checking for updates after a delay to ensure app is stable
                setTimeout(() => {
                    checkForUpdates();
                    
                    // Set up periodic checks
                    setInterval(checkForUpdates, CHECK_INTERVAL);
                }, 5000);
            } else if (checkCount >= MAX_CHECKS) {
                // Stop checking if we've exceeded max attempts
                clearInterval(appCheckInterval);
                console.log('SimpleDicedSync: Could not detect fully loaded app, will still attempt updates');
                
                // Still try to check for updates, but with a longer delay
                setTimeout(() => {
                    checkForUpdates();
                    
                    // Set up periodic checks
                    setInterval(checkForUpdates, CHECK_INTERVAL);
                }, 15000);
            }
        }, 1000);
    }
    
    // Check for updates to quest data
    async function checkForUpdates() {
        console.log('SimpleDicedSync: Checking for quest data updates...');
        
        try {
            // Add cache-busting parameter
            const response = await fetch('data.js?t=' + Date.now());
            
            if (!response.ok) {
                console.warn('SimpleDicedSync: Failed to fetch data.js:', response.status);
                return;
            }
            
            const text = await response.text();
            
            // Look for timestamp in the file
            const timestampMatch = text.match(/\/\/ Generated on ([^\n]+)/);
            
            if (timestampMatch && timestampMatch[1]) {
                const newTimestamp = new Date(timestampMatch[1]).getTime();
                const storedTimestamp = localStorage.getItem(VERSION_KEY);
                
                // If we have a new version
                if (!storedTimestamp || newTimestamp > parseInt(storedTimestamp)) {
                    console.log('SimpleDicedSync: New quest data detected:', new Date(newTimestamp).toISOString());
                    
                    // Update quest data
                    updateQuestData(text, newTimestamp);
                } else {
                    console.log('SimpleDicedSync: No new quest data available');
                }
            } else {
                console.log('SimpleDicedSync: No timestamp found in data.js');
            }
        } catch (error) {
            console.error('SimpleDicedSync: Error checking for quest data updates:', error);
        }
    }
    
    // Update quest data while preserving progress
    function updateQuestData(dataJsContent, timestamp) {
        try {
            // Extract QUEST_DATA without executing arbitrary code
            const questDataMatch = dataJsContent.match(/const QUEST_DATA = (\[[\s\S]*?\]);/);
            
            if (questDataMatch && questDataMatch[1]) {
                // Convert the string representation to actual data
                const questData = JSON.parse(questDataMatch[1]);
                
                if (questData && questData.length > 0) {
                    // Update localStorage with new quest data
                    localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(questData));
                    localStorage.setItem(VERSION_KEY, timestamp.toString());
                    
                    console.log(`SimpleDicedSync: Updated quest data with ${questData.length} quests`);
                    
                    // Show notification to user
                    showUpdateNotification();
                    
                    // Try to reload quest data in the app if possible
                    reloadQuestData();
                }
            }
        } catch (error) {
            console.error('SimpleDicedSync: Error updating quest data:', error);
        }
    }
    
    // Try to reload quest data in the existing app
    function reloadQuestData() {
        // If questDatabase exists and has loadFromStorage method, use it
        if (window.questDatabase && typeof window.questDatabase.loadFromStorage === 'function') {
            console.log('SimpleDicedSync: Refreshing quest data in app...');
            window.questDatabase.loadFromStorage();
            
            // If there's a callback system for data changes, notify
            if (window.questDatabase._notifyDataChanged && typeof window.questDatabase._notifyDataChanged === 'function') {
                window.questDatabase._notifyDataChanged();
            }
            
            // Try to refresh UI
            if (window.appController && window.appController.updateQuestList) {
                setTimeout(() => {
                    window.appController.updateQuestList();
                    
                    // Also try to update filter buttons if that function exists
                    if (window.appController.setupFilterButtons) {
                        window.appController.setupFilterButtons();
                    }
                }, 500);
            }
        }
    }
    
    // Show a notification about the update
    function showUpdateNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification update-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
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
                <p style="margin: 5px 0 0 0; font-size: 14px;">New quests are now available.</p>
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
        
        // Add click handler to reload page if user wants
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
    
    // Start the initialization process
    initialize();
})();
