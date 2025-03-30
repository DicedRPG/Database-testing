// app-controller.js
// This is the main controller that coordinates between services

class AppController {
    constructor() {
        this.initialized = false;
    }
    
    // Initialize the app
    async initialize() {
        if (this.initialized) return;
        
        console.log('Initializing Diced RPG application...');
        
        // Initialize services
        await questDatabase.initialize();
        await userStateService.initialize();
        
        // Perform initial setup if needed
        await this.performInitialSetup();
        
        // Register routes
        this.registerRoutes();
        
        // Initialize UI components
        this.initializeUI();
        
        // Start the router
        router.init();
        
        this.initialized = true;
        console.log('Application initialized successfully');
    }
    
    // Register routes for navigation
    registerRoutes() {
        console.log('Registering routes...');
        
        // Home page route
        router.register('home', () => {
            console.log('Navigating to home page');
            this.showHomePage();
        }, true); // This is the default route
        
        // Quest detail page
        router.register('quest', (params) => {
            console.log(`Navigating to quest detail page with ID: ${params.id}`);
            this.showQuestDetailPage(params.id);
        });
        
        // Add more routes as needed
        router.register('settings', () => {
            console.log('Navigating to settings page');
            this.showSettingsPage();
        });
    }
    
    // Initialize UI components
    initializeUI() {
        console.log('Initializing UI components...');
        
        // Set up event listeners
        document.getElementById('add-hours-button')?.addEventListener('click', 
            () => this.handleAddHours());
            
        document.getElementById('adjust-hours-button')?.addEventListener('click', 
            () => this.handleAdjustHours());
        
        // Initialize attribute displays
        this.updateAttributeDisplays();
        
        // Subscribe to state changes to update UI
        userStateService.subscribe(() => {
            this.updateAttributeDisplays();
        });
    }
    
    // Check if initial setup is needed and perform if necessary
    async performInitialSetup() {
        const state = await userStateService.getState();
        
        // If there are no visible quests, initialize them
        if (!state.visibleQuests || state.visibleQuests.length === 0) {
            await this.initializeVisibleQuests();
        }
    }
    
    // Initialize visible quests (initially only Stage 1)
    async initializeVisibleQuests() {
        console.log('Initializing visible quests...');
        
        // Get all Stage 1 quests
        const stage1Quests = await questDatabase.getQuestsByStage(1);
        const stage1QuestIds = stage1Quests.map(quest => quest.id);
        
        // Make these quests visible
        await userStateService.makeQuestsVisible(stage1QuestIds);
        
        console.log(`Made ${stage1QuestIds.length} Stage 1 quests visible`);
    }
    
    // Show home page
    async showHomePage() {
        console.log('Showing home page...');
        
        // Get container elements
        const mainContainer = document.getElementById('main-container');
        const questListContainer = document.getElementById('quest-list');
        
        if (!mainContainer || !questListContainer) {
            console.error('Required container elements not found');
            return;
        }
        
        // Show main container, hide other pages
        this.showContainer('main-container');
        
        // Update quest list
        await this.updateQuestList();
        
        // Update attribute displays
        this.updateAttributeDisplays();
    }
    
    // Show quest detail page
    async showQuestDetailPage(questId) {
        console.log(`Showing quest detail page for ID: ${questId}`);
        
        // Get container elements
        const questDetailContainer = document.getElementById('quest-detail-container');
        
        if (!questDetailContainer) {
            console.error('Quest detail container not found');
            return;
        }
        
        // Show quest detail container, hide other pages
        this.showContainer('quest-detail-container');
        
        // Get the quest data
        const quest = await questDatabase.getQuestById(parseInt(questId));
        
        if (!quest) {
            questDetailContainer.innerHTML = `
                <div class="error-message">
                    <h2>Quest Not Found</h2>
                    <p>The requested quest (ID: ${questId}) could not be found.</p>
                    <button id="back-to-home" class="quest-button primary">Back to Home</button>
                </div>
            `;
            
            document.getElementById('back-to-home')?.addEventListener('click', () => {
                router.navigate('home');
            });
            
            return;
        }
        
        // Render the quest detail view
        await this.renderQuestDetailView(quest);
    }
    
    // Show settings page
    showSettingsPage() {
    console.log('Showing settings page...');
    
    // Get container elements
    const settingsContainer = document.getElementById('settings-container');
    
    if (!settingsContainer) {
        console.error('Settings container not found');
        return;
    }
    
    // Show settings container, hide other pages
    this.showContainer('settings-container');
    
    // Render settings content
    settingsContainer.innerHTML = `
        <div class="settings-header">
            <h2>Settings</h2>
            <button id="back-from-settings" class="quest-button secondary">Back</button>
        </div>
        
        <div class="settings-content">
            <div class="settings-section">
                <h3>User Data</h3>
                <button id="reset-progress-button" class="quest-button secondary">Reset Progress</button>
                <button id="export-data-button" class="quest-button primary">Export Data</button>
                <button id="import-data-button" class="quest-button primary">Import Data</button>
            </div>
            
            <!-- New Admin Section -->
            <div class="settings-section">
                <h3>Administration</h3>
                <button id="admin-login-button" class="quest-button primary">Admin Dashboard</button>
                <p class="settings-description">Access the quest management interface.</p>
            </div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('back-from-settings')?.addEventListener('click', () => {
        router.back();
    });
    
    document.getElementById('reset-progress-button')?.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            userStateService.resetState();
            alert('Progress has been reset.');
            router.navigate('home');
        }
    });
    
    // Add admin login button event listener
    document.getElementById('admin-login-button')?.addEventListener('click', () => {
        this.handleAdminLogin();
    });
    
    // Export/import functionality would be implemented here
}

// Add this method to handle admin login
handleAdminLogin() {
    // For a basic implementation, we'll simply redirect to the admin page
    // In a real application, you would implement proper authentication here
    window.location.href = 'admin.html';
    
    /* 
    // Alternative: implement a simple password check
    const password = prompt('Enter admin password:');
    if (password === 'your-secure-password') { // Replace with a secure authentication method
        window.location.href = 'admin.html';
    } else {
        alert('Incorrect password');
    }
    */
}
    
    // Helper to show a specific container and hide others
    showContainer(containerId) {
        // Get all page containers
        const containers = document.querySelectorAll('.page-container');
        
        // Hide all containers
        containers.forEach(container => {
            container.classList.add('hidden');
        });
        
        // Show the specified container
        const container = document.getElementById(containerId);
        if (container) {
            container.classList.remove('hidden');
        }
    }
    
    // Update quest list on home page
    async updateQuestList(filter = {}) {
        console.log('Updating quest list with filter:', filter);
        
        const questListContainer = document.getElementById('quest-list');
        if (!questListContainer) return;
        
        // Get all quests
        let quests = await questDatabase.getAllQuests();
        
        // Get user state
        const state = await userStateService.getState();
        const visibleQuestIds = state.visibleQuests || [];
        
        // Filter to only visible quests
        quests = quests.filter(quest => visibleQuestIds.includes(quest.id));
        
        // Apply additional filters if provided
        if (filter.type && filter.type !== 'all') {
            quests = quests.filter(quest => quest.type === filter.type);
        }
        
        if (filter.stage) {
            quests = quests.filter(quest => quest.stageId === filter.stage);
        }
        
        // Render quest list
        await this.renderQuestList(quests, questListContainer);
    }
    
    // Render quest list in container
    async renderQuestList(quests, container) {
        // Get user state to check completed quests
        const state = await userStateService.getState();
        const completedQuestIds = state.completedQuests.map(c => c.questId);
        
        // Create HTML for quest grid
        let html = `
            <div class="quest-list-header">
                <div class="quest-list-counts">
                    Showing ${quests.length} quests
                </div>
            </div>
            <div class="quest-grid">
        `;
        
        // Add each quest item
        quests.forEach(quest => {
            const hasCompleted = completedQuestIds.includes(quest.id);
            const typeColor = QUEST_TYPE_COLORS[quest.type] || '#888888';
            
            html += `
                <div class="quest-item ${hasCompleted ? 'completed' : ''}" data-quest-id="${quest.id}">
                    <div class="quest-type-banner" style="background-color: ${typeColor};"></div>
                    <div class="quest-content">
                        <h4>${quest.questName} ${quest.stageId ? `<span class="stage-badge">Stage ${quest.stageId}</span>` : ''}</h4>
                        <p>${quest.description}</p>
                        <div class="quest-details">
                            <span>${quest.primaryFocus}: ${quest.primaryHours}h</span>
                            <span>${quest.secondaryFocus}: ${quest.secondaryHours}h</span>
                            ${quest.diceRequired ? '<span class="dice-required">🎲</span>' : ''}
                            ${hasCompleted ? `<span class="completion-badge">✓ ${state.completedQuests.filter(c => c.questId === quest.id).length}</span>` : ''}
                            ${quest.milestone ? '<span class="milestone-badge">🏆 Milestone</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Set container HTML
        container.innerHTML = html;
        
        // Add click handlers for quest items
        document.querySelectorAll('.quest-item').forEach(item => {
            item.addEventListener('click', () => {
                const questId = item.getAttribute('data-quest-id');
                router.navigate('quest', { id: questId });
            });
        });
    }
    
    // Render detailed quest view
    async renderQuestDetailView(quest) {
        console.log(`Rendering detail view for quest: ${quest.id}`);
        
        const questDetailContainer = document.getElementById('quest-detail-container');
        if (!questDetailContainer) return;
        
        // Get user state for completion info
        const state = await userStateService.getState();
        const completions = state.completedQuests.filter(c => c.questId === quest.id);
        const completionCount = completions.length;
        
        // Quest type color
        const questColor = QUEST_TYPE_COLORS[quest.type] || '#888888';
        
        questDetailContainer.innerHTML = `
            <div class="quest-detail-header">
                <div class="quest-detail-type-banner" style="background-color: ${questColor}"></div>
                <div class="quest-detail-header-content">
                    <button id="back-to-home" class="quest-button secondary back-button">
                        ← Back
                    </button>
                    <h1>${quest.questName}</h1>
                    <div class="quest-detail-meta">
                        Stage ${quest.stageId || '?'}: ${quest.stageName || 'Unknown'} • 
                        <span class="quest-type-text" style="color: ${questColor}">${quest.type}</span>
                        ${completionCount > 0 ? `
                            <span class="completed-text">
                                • Completed ${completionCount} time${completionCount > 1 ? 's' : ''}
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="quest-detail-body">
                <div class="quest-detail-sidebar">
                    <div class="sidebar-section">
                        <h3>Summary</h3>
                        <p>${quest.description}</p>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Focus Areas</h3>
                        <div class="focus-box primary">
                            <p class="focus-label">Primary Focus</p>
                            <p class="focus-value">${quest.primaryFocus} • ${quest.primaryHours}h</p>
                        </div>
                        <div class="focus-box secondary">
                            <p class="focus-label">Secondary Focus</p>
                            <p class="focus-value">${quest.secondaryFocus} • ${quest.secondaryHours}h</p>
                        </div>
                    </div>
                    
                    <div class="sidebar-section">
                        <h3>Equipment Needed</h3>
                        ${quest.equipmentNeeded && quest.equipmentNeeded.length > 0 ? `
                            <ul class="equipment-list">
                                ${quest.equipmentNeeded.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        ` : '<p>No special equipment required.</p>'}
                    </div>
                    
                    <div class="sidebar-actions">
                        <button id="start-quest-button" class="quest-button primary">
                            ${quest.diceRequired ? 'Roll Dice & Start Quest' : 'Start Quest'}
                        </button>
                    </div>
                </div>
                
                <div class="quest-detail-main">
                    <div class="quest-section-tabs">
                        <button class="section-tab active" data-tab="objectives">Learning Objectives</button>
                        <button class="section-tab" data-tab="instructions">Instructions</button>
                        <button class="section-tab" data-tab="exercises">Practical Exercises</button>
                        <button class="section-tab" data-tab="tips">Tips for Success</button>
                        <button class="section-tab" data-tab="checklist">Completion Checklist</button>
                    </div>
                    
                    <div class="quest-detail-tab-content">
                        <!-- Learning Objectives Tab -->
                        <div class="tab-panel active" id="objectives-panel">
                            ${quest.learningObjectives && quest.learningObjectives.length > 0 ? `
                                <ul class="objective-list">
                                    ${quest.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
                                </ul>
                            ` : '<p>No learning objectives specified for this quest.</p>'}
                        </div>
                        
                        <!-- Instructions Tab -->
                        <div class="tab-panel" id="instructions-panel">
                            ${quest.contentSections && quest.contentSections.length > 0 ? `
                                ${quest.contentSections.map(section => `
                                    <div class="content-section">
                                        <h3 class="content-section-title">${section.title}</h3>
                                        ${section.subsections.map(subsection => `
                                            <div class="content-subsection">
                                                <h4 class="subsection-title">${subsection.subtitle}</h4>
                                                <div class="subsection-content">
                                                    <p>${subsection.content}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                `).join('')}
                            ` : '<p>No detailed instructions available for this quest.</p>'}
                        </div>
                        
                        <!-- Practical Exercises Tab -->
                        <div class="tab-panel" id="exercises-panel">
                            ${quest.practicalExercises && quest.practicalExercises.length > 0 ? `
                                ${quest.practicalExercises.map(exercise => `
                                    <div class="exercise">
                                        <h3 class="exercise-title">${exercise.title}</h3>
                                        <ol class="exercise-steps">
                                            ${exercise.steps.map(step => `<li>${step}</li>`).join('')}
                                        </ol>
                                    </div>
                                `).join('')}
                            ` : '<p>No practical exercises specified for this quest.</p>'}
                        </div>
                        
                        <!-- Tips Tab -->
                        <div class="tab-panel" id="tips-panel">
                            ${quest.tipsForSuccess && quest.tipsForSuccess.length > 0 ? `
                                <ul class="tips-list">
                                    ${quest.tipsForSuccess.map(tip => `<li>${tip}</li>`).join('')}
                                </ul>
                            ` : '<p>No tips for success specified for this quest.</p>'}
                        </div>
                        
                        <!-- Completion Checklist Tab -->
                        <div class="tab-panel" id="checklist-panel">
                            ${quest.completionChecklist && quest.completionChecklist.length > 0 ? `
                                <div class="checklist">
                                    ${quest.completionChecklist.map(item => `
                                        <div class="checklist-item">
                                            <input type="checkbox" id="check-${item.replace(/\\s+/g, '-')}" class="checklist-checkbox">
                                            <label for="check-${item.replace(/\\s+/g, '-')}">${item}</label>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<p>No completion checklist specified for this quest.</p>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for tabs
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all panels
                document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
                
                // Show corresponding panel
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-panel`).classList.add('active');
            });
        });
        
        // Add event listener for back button
        document.getElementById('back-to-home')?.addEventListener('click', () => {
            router.navigate('home');
        });
        
        // Add event listener for start quest button
        document.getElementById('start-quest-button')?.addEventListener('click', () => {
            this.handleStartQuest(quest);
        });
    }
    
    // Handle starting a quest
    async handleStartQuest(quest) {
        console.log(`Starting quest: ${quest.id}`);
        
        // If quest requires dice, handle that first
        if (quest.diceRequired) {
            // Implement dice rolling functionality here
            alert('This would roll dice for the quest!');
        }
        
        // For now, just show a cooking mode alert
        alert(`This would start the cooking mode for quest: ${quest.questName}`);
        
        // In a full implementation, this would navigate to a cooking mode view
    }
    
    // Calculate level for an attribute
    calculateLevel(attribute) {
        // Implementation copied from original attributeSystem
        console.log(`Calculating level for ${attribute}...`);
    }
    
    // Update attribute displays
    async updateAttributeDisplays() {
        console.log('Updating attribute displays...');
        
        const state = await userStateService.getState();
        
        // Update overall rank display
        const overallRank = await this.calculateOverallRank();
        
        const overallRankElement = document.getElementById('overall-rank');
        const overallHoursElement = document.getElementById('overall-hours');
        const overallNextRankElement = document.getElementById('overall-next-rank');
        
        if (overallRankElement) overallRankElement.textContent = overallRank.name;
        if (overallHoursElement) overallHoursElement.textContent = overallRank.totalHours.toFixed(1);
        if (overallNextRankElement) overallNextRankElement.textContent = overallRank.nextRankHours.toFixed(1);
        
        // Update progress bar
        const progressBar = document.querySelector('.overall-rank-card .progress-fill');
        if (progressBar) {
            progressBar.style.width = `${Math.min(overallRank.progress, 100)}%`;
            progressBar.style.backgroundColor = overallRank.color;
        }
        
        // Update each attribute
        ['technique', 'ingredients', 'flavor', 'management'].forEach(attribute => {
            const hours = state.attributeHours[attribute] || 0;
            const levelInfo = this.calculateAttributeLevel(hours);
            
            // Update hours display
            const hoursElement = document.getElementById(`${attribute}-hours`);
            if (hoursElement) hoursElement.textContent = levelInfo.currentLevelHours.toFixed(1);
            
            // Update next level display
            const nextLevelElement = document.getElementById(`${attribute}-next-level`);
            if (nextLevelElement) nextLevelElement.textContent = levelInfo.hoursForLevel;
            
            // Update level display
            const levelElement = document.getElementById(`${attribute}-level`);
            if (levelElement) levelElement.textContent = levelInfo.level;
            
            // Find and update attribute card
            const cards = document.querySelectorAll('.attribute-card');
            cards.forEach(card => {
                const header = card.querySelector('h3');
                if (header && header.textContent.toLowerCase() === attribute) {
                    // Update rank display
                    const rankDisplay = card.querySelector('.stats p:first-child');
                    if (rankDisplay) rankDisplay.textContent = `Current Rank: ${levelInfo.rank}`;
                    
                    // Update progress bar
                    const progressFill = card.querySelector('.progress-fill');
                    if (progressFill) {
                        const progressPercent = (levelInfo.currentLevelHours / levelInfo.hoursForLevel * 100);
                        progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
                        progressFill.style.backgroundColor = levelInfo.color;
                    }
                }
            });
        });
    }
    
    // Calculate level for an attribute (from original attributeSystem)
    calculateAttributeLevel(totalHours) {
        // Find current rank
        let currentRank = RANKS[RANKS.length - 1];
        for (const rank of RANKS) {
            if (totalHours < rank.hoursNeeded) {
                currentRank = rank;
                break;
            }
        }
        
        // Find level within rank
        for (let i = 0; i < LEVELS.length; i++) {
            const level = LEVELS[i];
            const nextLevel = LEVELS[i + 1];
            
            if (!nextLevel || totalHours < nextLevel.startAt) {
                const hoursIntoLevel = totalHours - level.startAt;
                
                return {
                    level: level.level,
                    currentLevelHours: hoursIntoLevel,
                    hoursForLevel: level.hours,
                    totalHours: totalHours,
                    rank: currentRank.name,
                    color: currentRank.color
                };
            }
        }
        
        // Default to last level if not found
        const lastLevel = LEVELS[LEVELS.length - 1];
        return {
            level: lastLevel.level,
            currentLevelHours: totalHours - lastLevel.startAt,
            hoursForLevel: lastLevel.hours,
            totalHours: totalHours,
            rank: currentRank.name,
            color: currentRank.color
        };
    }
    
    // Calculate overall rank (from original attributeSystem)
    async calculateOverallRank() {
        const state = await userStateService.getState();
        const totalHours = Object.values(state.attributeHours).reduce((sum, hours) => sum + hours, 0);
        const minAttributeHours = Math.min(...Object.values(state.attributeHours).filter(h => h > 0), 0);
        
        // Find current rank
        let currentRank = RANKS[0];
        let previousRankTotal = 0;
        
        for (const rank of RANKS) {
            if (minAttributeHours < rank.hoursNeeded) {
                currentRank = rank;
                break;
            }
            previousRankTotal = rank.totalHoursNeeded;
        }
        
        return {
            name: currentRank.name,
            color: currentRank.color,
            totalHours: totalHours,
            currentRankHours: Math.max(0, totalHours - previousRankTotal),
            nextRankHours: currentRank.totalHoursNeeded - previousRankTotal,
            progress: ((totalHours - previousRankTotal) / (currentRank.totalHoursNeeded - previousRankTotal)) * 100
        };
    }
    
    // Handle adding hours
    async handleAddHours() {
        const attributeSelect = document.getElementById('attribute-select');
        const hoursInput = document.getElementById('hours-input');
        
        if (!attributeSelect || !hoursInput) return;
        
        const attribute = attributeSelect.value;
        const hours = parseFloat(hoursInput.value || 0);
        
        if (hours <= 0) {
            alert('Please enter a valid number of hours');
            return;
        }
        
        // Add hours to the attribute
        await userStateService.addAttributeHours(attribute, hours);
        
        // Reset input
        hoursInput.value = '1';
    }
    
    // Handle adjusting hours
    async handleAdjustHours() {
        const attributeSelect = document.getElementById('attribute-select');
        if (!attributeSelect) return;
        
        const attribute = attributeSelect.value;
        const state = await userStateService.getState();
        const currentHours = state.attributeHours[attribute] || 0;
        
        const newHours = prompt(
            `Current ${attribute} hours: ${currentHours}\nEnter new total hours:`, 
            currentHours
        );
        
        if (newHours === null) return; // User cancelled
        
        const newHoursNum = parseFloat(newHours);
        if (isNaN(newHoursNum) || newHoursNum < 0) {
            alert('Please enter a valid number of hours');
            return;
        }
        
        // Update the hours
        await userStateService.updateState(`attributeHours.${attribute}`, newHoursNum);
    }

// 1. Add filter functionality
async setupFilterButtons() {
    console.log('Setting up filter buttons...');
    
    const filterContainer = document.getElementById('quest-filters');
    if (!filterContainer) return;
    
    // Clear previous filters
    filterContainer.innerHTML = '';
    
    // Add 'All' filter
    const allButton = document.createElement('button');
    allButton.className = `filter-button active`;
    allButton.textContent = 'All Quests';
    allButton.addEventListener('click', () => this.setFilter('all'));
    filterContainer.appendChild(allButton);
    
    // Add type-specific filters
    const questTypes = await questDatabase.getQuestTypes();
    questTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.setAttribute('data-type', type);
        button.textContent = type;
        button.addEventListener('click', () => this.setFilter(type));
        filterContainer.appendChild(button);
    });
    
    // Get unlocked stages
    const unlockedStages = await userStateService.getUnlockedStages();
    
    // Add stage filters
    const stages = await questDatabase.getStages();
    stages.forEach(stage => {
        const button = document.createElement('button');
        const isUnlocked = unlockedStages.includes(stage.id);
        
        button.className = `filter-button stage-filter ${!isUnlocked ? 'disabled' : ''}`;
        button.setAttribute('data-stage', stage.id);
        button.textContent = stage.name;
        
        if (isUnlocked) {
            button.addEventListener('click', () => this.setFilter(`stage-${stage.id}`));
        } else {
            button.title = `Complete Stage ${stage.id - 1} milestone quest to unlock`;
        }
        
        filterContainer.appendChild(button);
    });
}

// 2. Add filter setting functionality
async setFilter(filter) {
    console.log(`Setting filter to: ${filter}`);
    
    // Store current filter
    this.currentFilter = filter;
    
    // Update button styles
    document.querySelectorAll('.filter-button').forEach(button => {
        button.classList.remove('active');
        
        // For stage filters
        if (filter.startsWith('stage-') && button.classList.contains('stage-filter')) {
            const stageId = parseInt(filter.replace('stage-', ''));
            if (button.getAttribute('data-stage') == stageId) {
                button.classList.add('active');
            }
        } else if (!filter.startsWith('stage-')) {
            // For regular type filters
            if (button.textContent === (filter === 'all' ? 'All Quests' : filter)) {
                button.classList.add('active');
            }
        }
    });
    
    // Refresh quest list with the new filter
    await this.updateQuestList(this.getFilterCriteria(filter));
}

// Helper method to convert filter string to criteria object
getFilterCriteria(filter) {
    if (filter === 'all') {
        return {};
    } else if (filter.startsWith('stage-')) {
        return { stage: parseInt(filter.replace('stage-', '')) };
    } else {
        return { type: filter };
    }
}

// 3. Add random quest functionality
async handleRandomQuest() {
    console.log('Selecting a random quest...');
    
    // Get filtered quests based on current filter
    const filteredQuests = await this.getFilteredQuests();
    
    if (filteredQuests.length === 0) {
        this.showNotification('No quests available with current filter', 'warning');
        return;
    }
    
    // Select a random quest
    const randomIndex = Math.floor(Math.random() * filteredQuests.length);
    const randomQuest = filteredQuests[randomIndex];
    
    // Navigate to the quest detail page
    router.navigate('quest', { id: randomQuest.id });
}

// Helper to get filtered quests
async getFilteredQuests() {
    // Get all quests
    let quests = await questDatabase.getAllQuests();
    
    // Get visible quests
    const state = await userStateService.getState();
    const visibleQuestIds = state.visibleQuests || [];
    
    // Filter to only visible quests
    quests = quests.filter(quest => visibleQuestIds.includes(quest.id));
    
    // Apply current filter if any
    if (this.currentFilter && this.currentFilter !== 'all') {
        if (this.currentFilter.startsWith('stage-')) {
            const stageId = parseInt(this.currentFilter.replace('stage-', ''));
            quests = quests.filter(q => q.stageId === stageId);
        } else {
            quests = quests.filter(q => q.type === this.currentFilter);
        }
    }
    
    return quests;
}

// 4. Enhanced start quest functionality
async handleStartQuest(quest) {
    console.log(`Starting quest: ${quest.id}`);
    
    // Store current quest ID in the state
    await userStateService.updateState('currentActiveQuest', quest.id);
    
    // If quest requires dice, handle that first
    if (quest.diceRequired) {
        const diceResult = this.rollDiceForQuest(quest);
        
        // Store dice result in state
        const state = await userStateService.getState();
        const questRolls = state.questRolls || {};
        questRolls[quest.id] = diceResult;
        await userStateService.updateState('questRolls', questRolls);
        
        this.showNotification(`Dice rolled for ${quest.questName}!`, 'success');
    }
    
    // Show cooking mode
    this.showCookingMode(quest);
}

// 5. Roll dice for a quest
rollDiceForQuest(quest) {
    // Simple implementation - can be enhanced later
    const diceResult = {
        difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        timePressure: ['Relaxed', 'Normal', 'Rushed'][Math.floor(Math.random() * 3)],
        surprise: ['None', 'Minor Twist', 'Major Twist'][Math.floor(Math.random() * 3)]
    };
    
    console.log('Dice roll result:', diceResult);
    return diceResult;
}

// 6. Show cooking mode
async showCookingMode(quest) {
    console.log(`Showing cooking mode for quest: ${quest.id}`);
    
    // Get container
    const questDetailContainer = document.getElementById('quest-detail-container');
    if (!questDetailContainer) return;
    
    // Get dice roll results if applicable
    const state = await userStateService.getState();
    const rolls = state.questRolls && state.questRolls[quest.id] || {};
    
    // Prepare cooking steps
    let steps = [];
    
    // Use the contentSections from enhanced quest data if available
    if (quest.contentSections && quest.contentSections.length > 0) {
        // Transform content sections into cooking steps
        steps = quest.contentSections.map(section => {
            return {
                title: section.title,
                instructions: section.subsections.map(subsection => 
                    `${subsection.subtitle}: ${subsection.content}`)
            };
        });
    } else {
        // Fallback to generic steps based on quest type
        if (quest.type === 'Main') {
            steps = [
                { title: 'Preparation', instructions: ['Gather all ingredients', 'Prepare your workspace'] },
                { title: 'Main Step', instructions: ['Follow the recipe guidelines'] },
                { title: 'Completion', instructions: ['Plate your dish', 'Clean your workspace'] }
            ];
        } else if (quest.type === 'Side') {
            steps = [
                { title: 'Preparation', instructions: ['Gather all ingredients'] },
                { title: 'Cooking', instructions: ['Follow the recipe guidelines'] }
            ];
        } else {
            steps = [
                { title: 'Preparation', instructions: ['Get ready for the training exercise'] },
                { title: 'Practice', instructions: ['Practice the technique described'] }
            ];
        }
    }
    
    // Show cooking mode UI
    questDetailContainer.innerHTML = `
        <div class="cooking-mode">
            <div class="cooking-header">
                <h2>${quest.questName}</h2>
                <p>Follow these steps to complete your quest</p>
            </div>
            
            ${Object.keys(rolls).length > 0 ? `
                <div class="roll-results">
                    <h3>Your Roll Results:</h3>
                    <ul>
                        ${Object.entries(rolls).map(([key, value]) => 
                            `<li><strong>${key}:</strong> ${value}</li>`
                        ).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="cooking-steps-container">
                <div class="cooking-steps-nav">
                    ${steps.map((step, index) => `
                        <div class="step-nav-item ${index === 0 ? 'active' : ''}" data-step="${index}">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-nav-title">${step.title}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cooking-steps-content">
                    ${steps.map((step, index) => `
                        <div class="cooking-step" data-step="${index}" ${index > 0 ? 'style="display: none;"' : ''}>
                            <h3>Step ${index + 1}: ${step.title}</h3>
                            <div class="step-instructions">
                                <ul>
                                    ${step.instructions.map(instruction => 
                                        `<li class="instruction-item">
                                            <input type="checkbox" class="instruction-checkbox">
                                            <span class="instruction-text">${instruction}</span>
                                        </li>`
                                    ).join('')}
                                </ul>
                            </div>
                            
                            ${index < steps.length - 1 ? `
                                <button class="next-step-button quest-button primary">Next Step</button>
                            ` : ''}
                            
                            ${index > 0 ? `
                                <button class="prev-step-button quest-button secondary">Previous Step</button>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="cooking-actions">
                <button id="back-to-details" class="quest-button secondary">Back to Details</button>
                <button id="complete-quest" class="quest-button primary">Complete Quest</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('back-to-details').addEventListener('click', () => {
        this.showQuestDetailPage(quest.id);
    });
    
    document.getElementById('complete-quest').addEventListener('click', () => {
        this.showCompletionScreen(quest);
    });
    
    // Add navigation functionality
    document.querySelectorAll('.next-step-button').forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.cooking-step');
            const stepIndex = parseInt(currentStep.dataset.step);
            const nextStep = document.querySelector(`.cooking-step[data-step="${stepIndex + 1}"]`);
            
            currentStep.style.display = 'none';
            nextStep.style.display = 'block';
            
            // Update nav highlight
            document.querySelectorAll('.step-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`.step-nav-item[data-step="${stepIndex + 1}"]`).classList.add('active');
        });
    });
    
    document.querySelectorAll('.prev-step-button').forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.cooking-step');
            const stepIndex = parseInt(currentStep.dataset.step);
            const prevStep = document.querySelector(`.cooking-step[data-step="${stepIndex - 1}"]`);
            
            currentStep.style.display = 'none';
            prevStep.style.display = 'block';
            
            // Update nav highlight
            document.querySelectorAll('.step-nav-item').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelector(`.step-nav-item[data-step="${stepIndex - 1}"]`).classList.add('active');
        });
    });
    
    // Make step nav items clickable
    document.querySelectorAll('.step-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const stepIndex = parseInt(item.dataset.step);
            
            // Hide all steps
            document.querySelectorAll('.cooking-step').forEach(step => {
                step.style.display = 'none';
            });
            
            // Show selected step
            document.querySelector(`.cooking-step[data-step="${stepIndex}"]`).style.display = 'block';
            
            // Update nav highlight
            document.querySelectorAll('.step-nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            item.classList.add('active');
        });
    });
}

// 7. Show completion screen
async showCompletionScreen(quest) {
    console.log(`Showing completion screen for quest: ${quest.id}`);
    
    // Get container
    const questDetailContainer = document.getElementById('quest-detail-container');
    if (!questDetailContainer) return;
    
    // Get completion checklist
    const checklist = quest.completionChecklist || [];
    
    questDetailContainer.innerHTML = `
        <div class="quest-completion">
            <div class="completion-header">
                <h2>Quest Complete: ${quest.questName}</h2>
                <button id="back-to-cooking-mode" class="quest-button secondary back-button">
                    ← Back
                </button>
            </div>
            
            <div class="completion-assessment">
                <h3>How did it go?</h3>
                
                <div class="completion-options">
                    <label class="completion-option">
                        <input type="radio" name="completion-level" value="mastered" checked>
                        <span>Mastered it! (100% reward)</span>
                    </label>
                    
                    <label class="completion-option">
                        <input type="radio" name="completion-level" value="wellDone">
                        <span>Did well, need practice (80% reward)</span>
                    </label>
                    
                    <label class="completion-option">
                        <input type="radio" name="completion-level" value="struggled">
                        <span>Struggled but completed (60% reward)</span>
                    </label>
                </div>
            </div>
            
            ${checklist.length > 0 ? `
                <div class="completion-checklist">
                    <h3>Completion Checklist Review</h3>
                    <p>Check off the items you completed:</p>
                    <div class="checklist-review">
                        ${checklist.map((item, index) => `
                            <div class="checklist-review-item">
                                <input type="checkbox" id="complete-check-${index}" class="checklist-checkbox">
                                <label for="complete-check-${index}">${item}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="completion-notes">
                <h3>Notes (optional):</h3>
                <textarea id="completion-notes" placeholder="Add your reflections here..."></textarea>
            </div>
            
            <div class="completion-actions">
                <button id="cancel-completion" class="quest-button secondary">Cancel</button>
                <button id="confirm-completion" class="quest-button primary">Confirm Completion</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('back-to-cooking-mode').addEventListener('click', () => {
        this.showCookingMode(quest);
    });
    
    document.getElementById('cancel-completion').addEventListener('click', () => {
        this.showCookingMode(quest);
    });
    
    document.getElementById('confirm-completion').addEventListener('click', () => {
        const completionLevel = document.querySelector('input[name="completion-level"]:checked').value;
        const notes = document.getElementById('completion-notes').value;
        
        // Gather checked items from checklist
        const checkedItems = [];
        document.querySelectorAll('.checklist-review-item input:checked').forEach(checkbox => {
            const label = checkbox.nextElementSibling.textContent;
            checkedItems.push(label);
        });
        
        this.completeQuest(quest, completionLevel, notes, checkedItems);
    });
}

// 8. Complete quest
async completeQuest(quest, completionLevel = 'mastered', notes = '', checkedItems = []) {
    console.log(`Completing quest ${quest.id} with level: ${completionLevel}`);
    
    // Calculate rewards based on completion level
    let primaryMultiplier = 1.0;
    let secondaryMultiplier = 1.0;
    
    if (completionLevel === 'wellDone') {
        primaryMultiplier = 0.8;
        secondaryMultiplier = 0.8;
    } else if (completionLevel === 'struggled') {
        primaryMultiplier = 0.6;
        secondaryMultiplier = 0.6;
    }
    
    const primaryHours = quest.primaryHours * primaryMultiplier;
    const secondaryHours = quest.secondaryHours * secondaryMultiplier;
    
    // Add completion record
    await userStateService.addCompletedQuest(quest.id, {
        completionLevel,
        notes,
        checkedItems,
        completedAt: new Date().toISOString()
    });
    
    // Add attribute hours
    const primaryAttr = quest.primaryFocus.toLowerCase();
    const secondaryAttr = quest.secondaryFocus.toLowerCase();
    
    await userStateService.addAttributeHours(primaryAttr, primaryHours);
    await userStateService.addAttributeHours(secondaryAttr, secondaryHours);
    
    // Check for milestone quests
    if (quest.milestone === true && quest.unlocksStage) {
        console.log(`Milestone quest completed, unlocking Stage ${quest.unlocksStage}`);
        
        // Find all quests from the next stage
        const nextStageQuests = await questDatabase.getQuestsByStage(quest.unlocksStage);
        
        // Make sure we have quests for the next stage
        if (nextStageQuests.length > 0) {
            // Make next stage quests visible
            const nextStageQuestIds = nextStageQuests.map(q => q.id);
            await userStateService.makeQuestsVisible(nextStageQuestIds);
            
            // Show notification to user
            if (quest.unlockMessage) {
                this.showNotification(quest.unlockMessage, 'success');
            }
            
            // Update filter buttons to reflect newly unlocked stages
            await this.setupFilterButtons();
        }
    }
    
    // Unlock new quests (similar quests)
    await this.unlockNewQuests(quest);
    
    // Show completion summary
    this.showCompletionSummary(quest, primaryHours, secondaryHours);
}

// 9. Show completion summary
async showCompletionSummary(quest, primaryHours, secondaryHours) {
    console.log(`Showing completion summary for quest: ${quest.id}`);
    
    // Get container
    const questDetailContainer = document.getElementById('quest-detail-container');
    if (!questDetailContainer) return;
    
    // Show completion summary
    questDetailContainer.innerHTML = `
        <div class="quest-reflection">
            <div class="reflection-header">
                <h2>Quest Completed!</h2>
                <button id="back-to-home-from-completion" class="quest-button secondary back-button">
                    ← Back to Home
                </button>
            </div>
            
            <div class="quest-rewards">
                <h3>Rewards Earned:</h3>
                <p>${quest.primaryFocus}: +${primaryHours.toFixed(1)} hours</p>
                <p>${quest.secondaryFocus}: +${secondaryHours.toFixed(1)} hours</p>
            </div>
            
            <div class="reflection-actions">
                <button id="view-more-quests" class="quest-button primary">View More Quests</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    document.getElementById('back-to-home-from-completion').addEventListener('click', () => {
        router.navigate('home');
    });
    
    document.getElementById('view-more-quests').addEventListener('click', () => {
        router.navigate('home');
    });
}

// 10. Unlock new quests (similar quests)
async unlockNewQuests(completedQuest) {
    console.log(`Finding similar quests to unlock after ${completedQuest.id}`);
    
    // Get visible and completed quests
    const visibleQuestIds = await userStateService.getVisibleQuests();
    const completedQuestIds = (await userStateService.getCompletedQuests()).map(c => c.questId);
    const allQuests = await questDatabase.getAllQuests();
    
    // Find similar quests (same type and focus)
    let similarQuests = allQuests.filter(q => 
        !visibleQuestIds.includes(q.id) && // Not already visible
        !completedQuestIds.includes(q.id) && // Not already completed
        q.type === completedQuest.type && // Same type
        (q.primaryFocus === completedQuest.primaryFocus || 
         q.secondaryFocus === completedQuest.primaryFocus) // Similar focus
    );
    
    // If not enough similar quests, find more of the same type
    if (similarQuests.length < 2) {
        const sameTypeQuests = allQuests.filter(q => 
            !visibleQuestIds.includes(q.id) && 
            !completedQuestIds.includes(q.id) && 
            q.type === completedQuest.type &&
            !similarQuests.find(sq => sq.id === q.id)
        );
        
        similarQuests = [...similarQuests, ...sameTypeQuests];
    }
    
    // Sort by ID (proxy for difficulty)
    similarQuests.sort((a, b) => a.id - b.id);
    
    // Take the first 2 quests to unlock
    const questsToUnlock = similarQuests.slice(0, 2);
    if (questsToUnlock.length > 0) {
        const questIdsToUnlock = questsToUnlock.map(q => q.id);
        await userStateService.makeQuestsVisible(questIdsToUnlock);
        
        // Show notification
        if (questsToUnlock.length === 1) {
            this.showNotification(`New quest unlocked: ${questsToUnlock[0].questName}`, 'success');
        } else if (questsToUnlock.length > 1) {
            this.showNotification(`${questsToUnlock.length} new quests unlocked!`, 'success');
        }
    }
    
    return questsToUnlock;
}

// 11. Show a notification
showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// 12. Update initializeUI method to include new event listeners
initializeUI() {
    console.log('Initializing UI components...');
    
    // Set up quest filter buttons
    this.currentFilter = 'all';
    this.setupFilterButtons();
    
    // Set up event listeners for add hours
    document.getElementById('add-hours-button')?.addEventListener('click', 
        () => this.handleAddHours());
        
    document.getElementById('adjust-hours-button')?.addEventListener('click', 
        () => this.handleAdjustHours());
    
    // Set up random quest button
    document.getElementById('random-quest')?.addEventListener('click', 
        () => this.handleRandomQuest());
    
    // Initialize attribute displays
    this.updateAttributeDisplays();
    
    // Subscribe to state changes to update UI
    userStateService.subscribe(() => {
        this.updateAttributeDisplays();
    });
}
}

// Create a singleton instance
const appController = new AppController();
