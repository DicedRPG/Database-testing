// quest-version-checker.js
// This module handles version checking for quest data

class QuestVersionChecker {
    constructor() {
        this.VERSION_STORAGE_KEY = 'diced_quest_version';
        this.DATA_TIMESTAMP_KEY = 'diced_data_timestamp';
        this.CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour
        this.lastCheck = 0;
    }

    /**
     * Initialize the version checker
     */
    async initialize() {
        console.log('Initializing quest version checker...');
        
        // Get stored version info
        const storedVersion = localStorage.getItem(this.VERSION_STORAGE_KEY);
        const storedTimestamp = localStorage.getItem(this.DATA_TIMESTAMP_KEY);
        
        if (storedTimestamp) {
            this.lastCheck = parseInt(storedTimestamp);
        }
        
        // Check for updates immediately on startup
        await this.checkForUpdates();
        
        // Set up periodic checks
        setInterval(() => this.checkForUpdates(), this.CHECK_INTERVAL);
        
        console.log('Quest version checker initialized');
    }

    /**
     * Check for quest data updates
     */
    async checkForUpdates() {
        // Don't check too frequently
        const now = Date.now();
        if (now - this.lastCheck < this.CHECK_INTERVAL) {
            return;
        }
        
        try {
            // Add a cache-busting parameter to prevent using cached version
            const response = await fetch('data.js?t=' + now);
            
            if (!response.ok) {
                console.warn('Failed to fetch data.js:', response.status);
                return;
            }
            
            // Extract the timestamp from the first line comment
            const text = await response.text();
            const timestampMatch = text.match(/\/\/ Generated on ([^\n]+)/);
            
            if (timestampMatch && timestampMatch[1]) {
                const newTimestamp = new Date(timestampMatch[1]).getTime();
                const storedTimestamp = localStorage.getItem(this.DATA_TIMESTAMP_KEY);
                
                // If we have a new version
                if (!storedTimestamp || newTimestamp > parseInt(storedTimestamp)) {
                    console.log('New quest data detected:', new Date(newTimestamp).toISOString());
                    
                    // Update local storage with the new content
                    this.updateQuestData(text, newTimestamp);
                    
                    // Show notification to user
                    this.showUpdateNotification();
                }
            }
            
            // Update last check time
            this.lastCheck = now;
            localStorage.setItem(this.DATA_TIMESTAMP_KEY, now.toString());
            
        } catch (error) {
            console.error('Error checking for quest data updates:', error);
        }
    }

    /**
     * Update the quest data in localStorage
     */
    updateQuestData(dataJsContent, timestamp) {
        try {
            // Clear any existing QUEST_DATA global variable
            window.QUEST_DATA = [];
            
            // Execute the JavaScript to get QUEST_DATA
            const executeScript = new Function(dataJsContent);
            executeScript();
            
            // Check if QUEST_DATA was populated
            if (window.QUEST_DATA && window.QUEST_DATA.length > 0) {
                // Update localStorage with the fresh data
                localStorage.setItem('diced_rpg_quests', JSON.stringify(window.QUEST_DATA));
                localStorage.setItem(this.VERSION_STORAGE_KEY, timestamp.toString());
                
                console.log(`Updated quest data with ${window.QUEST_DATA.length} quests`);
                
                // Trigger a refresh of the quest database if it's available
                if (window.questDatabase && typeof window.questDatabase.loadFromStorage === 'function') {
                    window.questDatabase.loadFromStorage();
                }
            }
        } catch (error) {
            console.error('Error updating quest data:', error);
        }
    }

    /**
     * Show a notification about the update
     */
    showUpdateNotification() {
        // Only show if we haven't shown it recently
        const lastNotificationTime = localStorage.getItem('last_update_notification');
        if (lastNotificationTime && (Date.now() - parseInt(lastNotificationTime)) < 86400000) {
            // Don't show more than once per day
            return;
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <p>Quest data has been updated!</p>
                <button class="close-notification">×</button>
            </div>
        `;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#A2BC58';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        
        // Add to page
        document.body.appendChild(notification);
        
        // Add close handler
        const closeButton = notification.querySelector('.close-notification');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(notification);
        });
        
        // Remove after 5 seconds
        setTimeout(function() {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 5000);
        
        // Store notification time
        localStorage.setItem('last_update_notification', Date.now().toString());
    }
}

// Create a singleton instance
const questVersionChecker = new QuestVersionChecker();

// Export the checker
window.questVersionChecker = questVersionChecker;
