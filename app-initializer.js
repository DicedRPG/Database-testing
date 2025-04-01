// app-initializer.js
// This script integrates all components and initializes the application

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Initializing Diced RPG application...');
    
    try {
        // Initialize quest version checker first to check for updates
        if (window.questVersionChecker) {
            await window.questVersionChecker.initialize();
        }
        
        // Initialize the quest database
        if (window.questDatabase) {
            await window.questDatabase.initialize();
            
            // Set up a callback for quest data changes
            window.questDatabase.onDataChanged(() => {
                console.log('Quest data changed, refreshing UI...');
                
                // Refresh UI components that depend on quest data
                if (window.appController && window.appController.updateQuestList) {
                    window.appController.updateQuestList();
                }
                
                // Update other components that rely on quest data
                if (window.appController && window.appController.setupFilterButtons) {
                    window.appController.setupFilterButtons();
                }
                
                // Update user state if it depends on quest data
                if (window.userStateService && window.userStateService.initialize) {
                    window.userStateService.initialize();
                }
            });
        }
        
        // Initialize user state service
        if (window.userStateService) {
            await window.userStateService.initialize();
        }
        
        // Initialize the app controller (main application)
        if (window.appController) {
            await window.appController.initialize();
        }
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});
