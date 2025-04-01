// quest-visibility-fix.js
// Script to specifically fix the visibility of new quests

(function() {
    console.log('Quest Visibility Fix: Initializing...');
    
    // Wait for app to be fully initialized
    setTimeout(runFix, 5000);
    
    // Refresh manual button
    setTimeout(addRefreshButton, 7000);
    
    function runFix() {
        console.log('Quest Visibility Fix: Running...');
        
        try {
            // Step 1: Get all quests from localStorage
            const questsString = localStorage.getItem('diced_rpg_quests');
            if (!questsString) {
                console.warn('Quest Visibility Fix: No quests found in localStorage');
                return;
            }
            
            const quests = JSON.parse(questsString);
            console.log(`Quest Visibility Fix: Found ${quests.length} quests in localStorage`);
            
            // Step 2: Get Stage 1 quest IDs
            const stage1Quests = quests.filter(quest => quest.stageId === 1);
            const stage1Ids = stage1Quests.map(quest => quest.id);
            console.log(`Quest Visibility Fix: Found ${stage1Quests.length} Stage 1 quests:`, stage1Ids);
            
            // Step 3: Get current visible quests from user state
            if (window.userStateService && typeof window.userStateService.getState === 'function') {
                window.userStateService.getState().then(state => {
                    const visibleQuests = state.visibleQuests || [];
                    console.log(`Quest Visibility Fix: Current visible quests (${visibleQuests.length}):`, visibleQuests);
                    
                    // Step 4: Find which Stage 1 quests are not visible
                    const missingQuests = stage1Ids.filter(id => !visibleQuests.includes(id));
                    console.log(`Quest Visibility Fix: Found ${missingQuests.length} missing Stage 1 quests:`, missingQuests);
                    
                    if (missingQuests.length > 0) {
                        // Step 5: Update visible quests
                        const newVisibleQuests = [...visibleQuests, ...missingQuests];
                        console.log(`Quest Visibility Fix: Adding ${missingQuests.length} quests to visible quests`);
                        
                        if (typeof window.userStateService.updateState === 'function') {
                            window.userStateService.updateState('visibleQuests', newVisibleQuests)
                                .then(() => {
                                    console.log('Quest Visibility Fix: Updated visible quests successfully');
                                    
                                    // Step 6: Force UI refresh
                                    refreshUI();
                                    
                                    // Show notification about added quests
                                    showAddedQuestsNotification(missingQuests.length);
                                })
                                .catch(error => {
                                    console.error('Quest Visibility Fix: Error updating visible quests:', error);
                                });
                        } else {
                            console.error('Quest Visibility Fix: userStateService.updateState is not a function');
                            
                            // Direct localStorage manipulation as a fallback
                            try {
                                state.visibleQuests = newVisibleQuests;
                                localStorage.setItem('diced_rpg_state', JSON.stringify(state));
                                console.log('Quest Visibility Fix: Updated state directly in localStorage');
                                
                                // Force UI refresh
                                refreshUI();
                                
                                // Show notification about added quests
                                showAddedQuestsNotification(missingQuests.length);
                            } catch (e) {
                                console.error('Quest Visibility Fix: Error updating state in localStorage:', e);
                            }
                        }
                    } else {
                        console.log('Quest Visibility Fix: All Stage 1 quests are already visible');
                    }
                }).catch(error => {
                    console.error('Quest Visibility Fix: Error getting user state:', error);
                });
            } else {
                console.error('Quest Visibility Fix: userStateService is not available');
            }
        } catch (error) {
            console.error('Quest Visibility Fix: Unexpected error:', error);
        }
    }
    
    // Refresh UI after updating visible quests
    function refreshUI() {
        // Try multiple UI refresh methods
        try {
            console.log('Quest Visibility Fix: Refreshing UI...');
            
            if (window.appController) {
                // Refresh filter buttons first
                if (typeof window.appController.setupFilterButtons === 'function') {
                    window.appController.setupFilterButtons();
                    console.log('Quest Visibility Fix: Refreshed filter buttons');
                }
                
                // Update quest list
                if (typeof window.appController.updateQuestList === 'function') {
                    window.appController.updateQuestList();
                    console.log('Quest Visibility Fix: Updated quest list');
                }
                
                // Try showing quest list if that exists
                if (typeof window.appController.showQuestList === 'function') {
                    window.appController.showQuestList();
                    console.log('Quest Visibility Fix: Showed quest list');
                }
            }
            
            // If there's a quest system object, try that too
            if (window.questSystem && typeof window.questSystem.showQuestList === 'function') {
                window.questSystem.showQuestList();
                console.log('Quest Visibility Fix: Refreshed via quest system');
            }
            
            // Try to trigger router navigation if needed
            if (window.router && typeof window.router.navigate === 'function') {
                setTimeout(() => {
                    window.router.navigate('home');
                    console.log('Quest Visibility Fix: Triggered router navigation');
                }, 1000);
            }
        } catch (error) {
            console.error('Quest Visibility Fix: Error refreshing UI:', error);
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
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }
    
    // Add manual refresh button
    function addRefreshButton() {
        // Check if button already exists
        if (document.getElementById('quest-refresh-button')) {
            return;
        }
        
        // Create button
        const button = document.createElement('button');
        button.id = 'quest-refresh-button';
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
            // Run the fix again
            runFix();
            
            // Show loading effect
            button.style.backgroundColor = '#8da649';
            setTimeout(() => {
                button.style.backgroundColor = '';
            }, 1000);
        });
        
        // Add to page
        document.body.appendChild(button);
    }
})();
