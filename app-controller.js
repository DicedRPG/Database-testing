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
        
        // Export/import functionality would be implemented here
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
}

// Create a singleton instance
const appController = new AppController();
