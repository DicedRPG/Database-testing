// direct-fix-script.js
// Comprehensive quest visibility cleanup across all stages
(function() {
    console.log('Direct Fix: Initializing comprehensive quest visibility cleanup...');
    
    // Wait longer for app to fully initialize
    setTimeout(runComprehensiveFix, 8000);
    
    // Main fix function
    function runComprehensiveFix() {
        console.log('Direct Fix: Running comprehensive visibleQuests cleanup...');
        
        try {
            // Step 1: Get all quests from localStorage
            const questsString = localStorage.getItem('diced_rpg_quests');
            if (!questsString) {
                console.warn('Direct Fix: No quests found in localStorage');
                return;
            }
            
            const quests = JSON.parse(questsString);
            console.log(`Direct Fix: Found ${quests.length} quests in localStorage`);
            
            // Step 2: Get quest IDs from current QUEST_DATA
            const currentQuestIds = QUEST_DATA.map(quest => quest.id);
            const validStageIds = QUEST_DATA.map(quest => quest.stageId);
            
            console.log(`Direct Fix: Current valid quest IDs:`, currentQuestIds);
            console.log(`Direct Fix: Valid stages:`, validStageIds);
            
            // Step 3: Get user state directly from localStorage
            const stateString = localStorage.getItem('diced_rpg_state');
            if (!stateString) {
                console.warn('Direct Fix: No user state found in localStorage');
                return;
            }
            
            // Parse the state and make a copy we can modify
            let state = JSON.parse(stateString);
            console.log('Direct Fix: Current user state:', state);
            
            // Step 4: Ensure visibleQuests exists
            state.visibleQuests = state.visibleQuests || [];
            
            const originalVisibleQuestCount = state.visibleQuests.length;
            
            // Step 5: Comprehensive quest visibility cleanup
            // Keep only:
            // 1. Quests that exist in current QUEST_DATA
            // 2. Completed quests (even if they're no longer in current data)
            const completedQuestIds = (state.completedQuests || []).map(c => c.questId);
            
            // Filter visible quests to only those in current quest data or completed
            state.visibleQuests = state.visibleQuests.filter(questId => 
                currentQuestIds.includes(questId) || 
                completedQuestIds.includes(questId)
            );
            
            // Step 6: Ensure all quests from the latest QUEST_DATA are visible
            const missingQuests = currentQuestIds.filter(
                id => !state.visibleQuests.includes(id)
            );
            
            if (missingQuests.length > 0) {
                state.visibleQuests.push(...missingQuests);
            }
            
            // Deduplicate visible quests
            state.visibleQuests = [...new Set(state.visibleQuests)];
            
            // Step 7: Save changes if there are any
            if (state.visibleQuests.length !== originalVisibleQuestCount) {
                localStorage.setItem('diced_rpg_state', JSON.stringify(state));
                
                console.log('Direct Fix: Cleaned up visible quests:');
                console.log(`- Original count: ${originalVisibleQuestCount}`);
                console.log(`- New count: ${state.visibleQuests.length}`);
                
                // Notification about changes
                showQuestVisibilityNotification(
                    originalVisibleQuestCount, 
                    state.visibleQuests.length, 
                    missingQuests.length
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
    
    // Show notification about quest visibility changes
    function showQuestVisibilityNotification(originalCount, newCount, addedCount) {
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
        
        const removedCount = originalCount - newCount + addedCount;
        
        notification.innerHTML = `
            <p style="margin: 0; font-weight: bold;">Quest Visibility Updated</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
                ${addedCount > 0 ? `Added ${addedCount} new quest${addedCount !== 1 ? 's' : ''}` : ''}
                ${removedCount > 0 ? `${addedCount > 0 ? ' and ' : ''}Removed ${removedCount} invalid quest${removedCount !== 1 ? 's' : ''}` : ''}
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
