// direct-fix-script.js
// Comprehensive fix for visible quests management
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
            
            // Step 2: Get current Stage 1 quest IDs
            const stage1Quests = quests.filter(quest => quest.stageId === 1);
            const stage1Ids = stage1Quests.map(quest => quest.id);
            console.log(`Direct Fix: Found ${stage1Quests.length} Stage 1 quests:`, stage1Ids);
            
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
            // 1. Stage 1 quests
            // 2. Completed quests (even if they're not in Stage 1 anymore)
            const completedQuestIds = (state.completedQuests || []).map(c => c.questId);
            
            state.visibleQuests = state.visibleQuests.filter(questId => 
                stage1Ids.includes(questId) || 
                completedQuestIds.includes(questId)
            );
            
            // Step 6: Ensure all Stage 1 quests are visible
            const missingStage1Quests = stage1Ids.filter(
                id => !state.visibleQuests.includes(id)
            );
            
            if (missingStage1Quests.length > 0) {
                state.visibleQuests.push(...missingStage1Quests);
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
                    missingStage1Quests.length
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
                ${addedCount > 0 ? `Added ${addedCount} new Stage 1 quest${addedCount !== 1 ? 's' : ''}` : ''}
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
    
    // Create a manual fix button
    function addFixButton() {
        const button = document.createElement('button');
        button.textContent = 'Fix Quest Visibility';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
        button.style.backgroundColor = '#A2BC58';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '10px 15px';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        
        button.addEventListener('click', runComprehensiveFix);
        document.body.appendChild(button);
    }
    
    // Add manual fix button after a delay
    setTimeout(addFixButton, 10000);
})();
