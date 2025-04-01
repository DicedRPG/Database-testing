// direct-fix-script.js
// Direct fix for visible quests without depending on userStateService

(function() {
    console.log('Direct Fix: Initializing...');
    
    // Wait longer for app to fully initialize
    setTimeout(runFix, 8000);
    
    // Main fix function
    function runFix() {
        console.log('Direct Fix: Running direct visibleQuests fix...');
        
        try {
            // Step 1: Get all quests from localStorage
            const questsString = localStorage.getItem('diced_rpg_quests');
            if (!questsString) {
                console.warn('Direct Fix: No quests found in localStorage');
                return;
            }
            
            const quests = JSON.parse(questsString);
            console.log(`Direct Fix: Found ${quests.length} quests in localStorage`);
            
            // Step 2: Get Stage 1 quest IDs
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
            
            // Step 4: Check if visibleQuests exists and create it if not
            if (!state.visibleQuests) {
                console.log('Direct Fix: Creating visibleQuests array');
                state.visibleQuests = [];
            }
            
            const visibleQuests = state.visibleQuests;
            console.log(`Direct Fix: Current visible quests (${visibleQuests.length}):`, visibleQuests);
            
            // Step 5: Find which Stage 1 quests are not visible
            const missingQuests = stage1Ids.filter(id => !visibleQuests.includes(id));
            console.log(`Direct Fix: Found ${missingQuests.length} missing Stage 1 quests:`, missingQuests);
            
            if (missingQuests.length > 0) {
                // Step 6: Update visible quests directly
                state.visibleQuests = [...visibleQuests, ...missingQuests];
                
                // Save back to localStorage
                localStorage.setItem('diced_rpg_state', JSON.stringify(state));
                console.log('Direct Fix: Updated state in localStorage with new visible quests');
                
                // Show notification
                showAddedQuestsNotification(missingQuests.length);
                
                // Force page reload to see changes
                if (confirm(`Added ${missingQuests.length} new quest(s). Reload page to see them?`)) {
                    window.location.reload();
                }
            } else {
                console.log('Direct Fix: All Stage 1 quests are already visible');
            }
        } catch (error) {
            console.error('Direct Fix: Unexpected error:', error);
        }
    }
    
    // Show notification about added quests
    function showAddedQuestsNotification(count) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#A2BC58';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        
        notification.innerHTML = `
            <p style="margin: 0; font-weight: bold;">
                ${count} new quest${count > 1 ? 's' : ''} added!
            </p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
                Reload the page to see them
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
    
    // Create a button for manual fix
    function addFixButton() {
        const button = document.createElement('button');
        button.textContent = 'Fix Quest Visibility';
        button.className = 'quest-button primary';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
        
        button.addEventListener('click', runFix);
        document.body.appendChild(button);
    }
    
    // Also add a button for manual fix after a delay
    setTimeout(addFixButton, 10000);
})();
