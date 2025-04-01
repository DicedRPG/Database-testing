// Direct Fix Script for Quest Visibility Management
function performDirectQuestVisibilityFix() {
    try {
        // Step 1: Retrieve current state from localStorage
        const savedState = localStorage.getItem('diced_rpg_state');
        if (!savedState) {
            console.log('Direct Fix: No existing state found');
            return;
        }

        const state = JSON.parse(savedState);
        
        // Step 2: Ensure visibleQuests array exists
        state.visibleQuests = state.visibleQuests || [];
        
        // Step 3: Get all Stage 1 quest IDs from QUEST_DATA
        const stage1Ids = QUEST_DATA
            .filter(quest => quest.stageId === 1)
            .map(quest => quest.id);
        
        // Step 4: Get current visible quests
        const visibleQuests = state.visibleQuests;
        
        // Step 5: Find missing and invalid quests
        const missingQuests = stage1Ids.filter(id => !visibleQuests.includes(id));
        const invalidQuests = visibleQuests.filter(id => 
            !stage1Ids.includes(id) && 
            !QUEST_DATA.some(quest => quest.id === id)
        );
        
        // Flag to track if changes were made
        let stateModified = false;
        
        // Step 6: Add missing quests
        if (missingQuests.length > 0) {
            state.visibleQuests = [...new Set([...visibleQuests, ...missingQuests])];
            stateModified = true;
            console.log(`Direct Fix: Added ${missingQuests.length} missing Stage 1 quests:`, missingQuests);
        }
        
        // Step 7: Remove invalid quests
        if (invalidQuests.length > 0) {
            state.visibleQuests = state.visibleQuests.filter(id => 
                stage1Ids.includes(id) || 
                QUEST_DATA.some(quest => quest.id === id)
            );
            stateModified = true;
            console.log(`Direct Fix: Removed ${invalidQuests.length} invalid quests:`, invalidQuests);
        }
        
        // Step 8: Save changes if any modifications were made
        if (stateModified) {
            localStorage.setItem('diced_rpg_state', JSON.stringify(state));
            console.log('Direct Fix: Updated state in localStorage');
            
            // Notification function
            function showQuestChangeNotification(addedCount, removedCount) {
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.top = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = '#A2BC58';
                notification.style.color = 'white';
                notification.style.padding = '15px';
                notification.style.borderRadius = '5px';
                notification.style.zIndex = '1000';
                
                let message = 'Quest visibility updated:';
                if (addedCount > 0) {
                    message += ` Added ${addedCount} new quest(s)`;
                }
                if (removedCount > 0) {
                    message += `${addedCount > 0 ? ' and' : ''} Removed ${removedCount} invalid quest(s)`;
                }
                
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 5000);
            }
            
            // Show notification about changes
            showQuestChangeNotification(missingQuests.length, invalidQuests.length);
            
            // Optionally prompt for reload
            if (confirm(`Quest visibility updated. Reload page to see changes?`)) {
                window.location.reload();
            }
        } else {
            console.log('Direct Fix: No changes needed. Quest visibility is correct.');
        }
    } catch (error) {
        console.error('Direct Fix: Unexpected error:', error);
    }
}

// Run the fix when the script loads
document.addEventListener('DOMContentLoaded', performDirectQuestVisibilityFix);
