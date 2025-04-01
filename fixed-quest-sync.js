// fixed-quest-sync.js
// Fixed version to address specific issues

/**
 * FixedDicedSync - Optimized quest data synchronization
 */
(function() {
    // Constants
    const QUEST_STORAGE_KEY = 'diced_rpg_quests';
    const VERSION_KEY = 'diced_quest_version';
    const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes
    const DATA_HASH_KEY = 'diced_data_hash'; // New key to store content hash
    
    // Initialize after a short delay to let app load first
    setTimeout(initialize, 3000);
    
    // Initialize the sync system
    function initialize() {
        console.log('FixedDicedSync: Initializing...');
        
        // Perform initial check
        checkForUpdates();
        
        // Set up periodic checks
        setInterval(checkForUpdates, CHECK_INTERVAL);
        
        // Add refresh button to UI for manual updates
        addRefreshButton();
    }
    
    // Check for updates to quest data
    async function checkForUpdates() {
        console.log('FixedDicedSync: Checking for quest data updates...');
        
        try {
            // Add cache-busting parameter
            const response = await fetch('data.js?t=' + Date.now());
            
            if (!response.ok) {
                console.warn('FixedDicedSync: Failed to fetch data.js:', response.status);
                return;
            }
            
            const text = await response.text();
            
            // Extract quest data from JS file
            const questDataMatch = text.match(/const QUEST_DATA = (\[[\s\S]*?\]);/);
            
            if (questDataMatch && questDataMatch[1]) {
                // Create a hash of the quest data content to detect changes
                const contentHash = simpleHash(questDataMatch[1]);
                const storedHash = localStorage.getItem(DATA_HASH_KEY);
                
                // Check if content has changed by comparing hashes
                if (contentHash !== storedHash) {
                    console.log('FixedDicedSync: Quest data has changed! New hash:', contentHash);
                    updateQuestData(questDataMatch[1], contentHash);
                    return;
                } else {
                    console.log('FixedDicedSync: No changes detected in quest data');
                }
            } else {
                console.warn('FixedDicedSync: Could not extract QUEST_DATA from data.js');
            }
        } catch (error) {
            console.error('FixedDicedSync: Error checking for quest data updates:', error);
        }
    }
    
    // Create a simple hash of content to detect changes
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }
    
    // Update quest data and refresh UI
    function updateQuestData(questDataString, contentHash) {
        try {
            // Parse the quest data
            const questData = JSON.parse(questDataString);
            
            if (questData && questData.length > 0) {
                console.log(`FixedDicedSync: Updating quest data with ${questData.length} quests`);
                
                // Get existing data for comparison
                let existingData = [];
                try {
                    const existingDataString = localStorage.getItem(QUEST_STORAGE_KEY);
                    if (existingDataString) {
                        existingData = JSON.parse(existingDataString);
                    }
                } catch (e) {
                    console.error('FixedDicedSync: Error parsing existing quest data:', e);
                }
                
                // Compare quest counts
                console.log('FixedDicedSync: Previous quest count:', existingData.length);
                console.log('FixedDicedSync: New quest count:', questData.length);
                
                // Look for new quests (for debugging)
                if (questData.length > existingData.length) {
                    const existingIds = new Set(existingData.map(q => q.id));
                    const newQuests = questData.filter(q => !existingIds.has(q.id));
                    console.log('FixedDicedSync: Found new quests:', newQuests.map(q => q.id));
                }
                
                // Update localStorage with new quest data
                localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(questData));
                
                // Store the content hash to prevent duplicate notifications
                localStorage.setItem(DATA_HASH_KEY, contentHash);
                
                // Show notification to user
                showUpdateNotification();
                
                // Try to reload quest data in the app if possible
                forceAppRefresh();
            }
        } catch (error) {
            console.error('FixedDicedSync: Error updating quest data:', error);
        }
    }
    
    // More aggressive app refresh approach with focus on missing quests
    function forceAppRefresh() {
        console.log('FixedDicedSync: Forcing complete app refresh...');
        
        try {
            // APPROACH 1: Complete reset of all quest data in memory
            if (window.questDatabase) {
                // First, clear the quests array
                window.questDatabase.quests = [];
                window.questDatabase.initialized = false;
                
                console.log('FixedDicedSync: Reset questDatabase state');
                
                // Force a reload from storage
                if (typeof window.questDatabase.loadFromStorage === 'function') {
                    window.questDatabase.loadFromStorage();
                    console.log('FixedDicedSync: Reloaded database from storage');
                } else if (typeof window.questDatabase.initialize === 'function') {
                    window.questDatabase.initialize();
                    console.log('FixedDicedSync: Reinitialized database');
                }
            }
            
            // APPROACH 2: Force reload all visible quests
            setTimeout(() => {
                try {
                    // If user state service exists, update visible quests
                    if (window.userStateService && typeof window.userStateService.getState === 'function') {
                        window.userStateService.getState().then(state => {
                            if (state.visibleQuests) {
                                // Make sure all quests from Stage 1 are visible
                                const questData = JSON.parse(localStorage.getItem(QUEST_STORAGE_KEY));
                                const stage1Quests = questData.filter(q => q.stageId === 1);
                                const stage1Ids = stage1Quests.map(q => q.id);
                                
                                // Make sure all Stage 1 quests are visible
                                let visibleQuestIds = [...state.visibleQuests];
                                let changed = false;
                                
                                stage1Ids.forEach(id => {
                                    if (!visibleQuestIds.includes(id)) {
                                        visibleQuestIds.push(id);
                                        changed = true;
                                    }
                                });
                                
                                if (changed && window.userStateService.updateState) {
                                    window.userStateService.updateState('visibleQuests', visibleQuestIds)
                                        .then(() => {
                                            console.log('FixedDicedSync: Updated visible quests');
                                            refreshUI();
                                        });
                                } else {
                                    refreshUI();
                                }
                            }
                        });
                    } else {
                        refreshUI();
                    }
                } catch (err) {
                    console.error('FixedDicedSync: Error updating visible quests:', err);
                    refreshUI();
                }
            }, 500);
            
        } catch (error) {
            console.error('FixedDicedSync: Error during force refresh:', error);
        }
    }
    
    // Final UI refresh after all data is updated
    function refreshUI() {
        // Try multiple UI refresh methods
        try {
            // Try to refresh UI components
            if (window.appController) {
                // Restore filter buttons first
                if (typeof window.appController.setupFilterButtons === 'function') {
                    window.appController.setupFilterButtons();
                    console.log('FixedDicedSync: Refreshed filter buttons');
                }
                
                // Then update quest list
                if (typeof window.appController.updateQuestList === 'function') {
                    window.appController.updateQuestList();
                    console.log('FixedDicedSync: Updated quest list');
                }
                
                // Try showing quest list if that exists
                if (typeof window.appController.showQuestList === 'function') {
                    window.appController.showQuestList();
                    console.log('FixedDicedSync: Showed quest list');
                }
            }
            
            // If there's a quest system object, try that too
            if (window.questSystem && typeof window.questSystem.showQuestList === 'function') {
                window.questSystem.showQuestList();
                console.log('FixedDicedSync: Refreshed via quest system');
            }
            
            // Last resort: try to trigger router navigation
            if (window.router && typeof window.router.navigate === 'function') {
                setTimeout(() => {
                    window.router.navigate('home');
                    console.log('FixedDicedSync: Triggered router navigation');
                }, 1000);
            }
        } catch (err) {
            console.error('FixedDicedSync: Error during UI refresh:', err);
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
            button.title = 'Refresh Quest Data';
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
                
                // Force refresh localStorage from data.js
                fetch('data.js?t=' + Date.now())
                    .then(response => response.text())
                    .then(text => {
                        const questDataMatch = text.match(/const QUEST_DATA = (\[[\s\S]*?\]);/);
                        if (questDataMatch && questDataMatch[1]) {
                            try {
                                const questData = JSON.parse(questDataMatch[1]);
                                localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(questData));
                                
                                // Update content hash
                                const contentHash = simpleHash(questDataMatch[1]);
                                localStorage.setItem(DATA_HASH_KEY, contentHash);
                                
                                console.log('FixedDicedSync: Manually updated quest data');
                                
                                // Force complete refresh
                                forceAppRefresh();
                            } catch (e) {
                                console.error('FixedDicedSync: Error parsing quest data:', e);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('FixedDicedSync: Error fetching data.js:', error);
                    })
                    .finally(() => {
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
        notification.style.top = '20px';
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
