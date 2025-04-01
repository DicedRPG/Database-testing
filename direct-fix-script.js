// direct-fix-script.js
// Comprehensive quest visibility cleanup respecting stage progression
(function() {
    console.log('Direct Fix: Initializing quest visibility cleanup...');
    
    // Wait longer for app to fully initialize
    setTimeout(runComprehensiveFix, 8000);
    
    // Main fix function
    function runComprehensiveFix() {
        console.log('Direct Fix: Running visibleQuests cleanup...');
        
        try {
            // Step 1: Get user state directly from localStorage
            const stateString = localStorage.getItem('diced_rpg_state');
            if (!stateString) {
                console.warn('Direct Fix: No user state found in localStorage');
                return;
            }
            
            // Parse the state and make a copy we can modify
            let state = JSON.parse(stateString);
            console.log('Direct Fix: Current user state:', state);
            
            // Step 2: Ensure required state properties exist
            state.completedQuests = state.completedQuests || [];
            state.visibleQuests = state.visibleQuests || [];
            
            // Step 3: Determine unlocked stages based on milestone quests
            const completedQuestIds = state.completedQuests.map(c => c.questId);
            const unlockedStages = determineUnlockedStages(completedQuestIds);
            
            console.log('Direct Fix: Unlocked stages:', unlockedStages);
            
            // Step 4: Filter visible quests
            const originalVisibleQuestCount = state.visibleQuests.length;
            
            // Find all visible quests for unlocked stages
            const visibleQuestIds = QUEST_DATA
                .filter(quest => 
                    unlockedStages.includes(quest.stageId) || 
                    completedQuestIds.includes(quest.id)
                )
                .map(quest => quest.id);
            
            // Update visible quests
            state.visibleQuests = [...new Set(visibleQuestIds)];
            
            // Step 5: Save changes if there are any
            if (state.visibleQuests.length !== originalVisibleQuestCount) {
                localStorage.setItem('diced_rpg_state', JSON.stringify(state));
                
                console.log('Direct Fix: Cleaned up visible quests:');
                console.log(`- Original count: ${originalVisibleQuestCount}`);
                console.log(`- New count: ${state.visibleQuests.length}`);
                
                // Notification about changes
                showQuestVisibilityNotification(
                    originalVisibleQuestCount, 
                    state.visibleQuests.length
                );
                
                // Optionally reload
                if (confirm('Quest visibility has been updated. Reload to see changes?')) {
                    window.location.reload();
                }
            } else {
                console.log('Direct Fix: No changes needed. Quest visibility is correct.');
            }
        } catch (error) {
            console.error('Direct Fix: Unexpected error:', error);
        }
    }
    
    // Determine which stages are unlocked based on completed milestone quests
    function determineUnlockedStages(completedQuestIds) {
        // Always unlock Stage 1
        const unlockedStages = [1];
        
        // Find milestone quests that unlock new stages
        QUEST_DATA.forEach(quest => {
            if (quest.milestone && quest.unlocksStage && 
                completedQuestIds.includes(quest.id)) {
                unlockedStages.push(quest.unlocksStage);
            }
        });
        
        console.log('Completed Quest IDs:', completedQuestIds);
        console.log('Unlocked Stages:', unlockedStages);
        
        return unlockedStages;
    }
    
    // Show notification about quest visibility changes
    function showQuestVisibilityNotification(originalCount, newCount) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#A2BC58';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.maxWidth = '300px';
        
        const changedCount = Math.abs(originalCount - newCount);
        
        notification.innerHTML = `
            <p style="margin: 0; font-weight: bold;">Quest Visibility Updated</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
                ${changedCount} quest${changedCount !== 1 ? 's' : ''} 
                ${newCount > originalCount ? 'added' : 'removed'}
            </p>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 10 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 10000);
    }
})();
