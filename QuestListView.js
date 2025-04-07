// QuestListView.js - Quest list display
const QuestListView = {
  // Render quest list to container
  render(quests, filter = 'all') {
    console.log(`Rendering quest list with ${quests.length} quests, filter: ${filter}`);
    
    // Get container element
    const container = document.getElementById('quest-list');
    if (!container) {
      console.error('Quest list container not found');
      return;
    }
    
    // Get state for completed quests
    const state = StateService.getState();
    const completedQuestIds = state.quests.completed.map(c => c.questId);
    
    // Build HTML for quest list
    let html = `
      <div class="quest-list-header">
        <div class="quest-list-counts">
          Showing ${quests.length} quests
          ${filter !== 'all' ? ` (filtered to ${filter})` : ''}
        </div>
      </div>
      <div class="quest-grid">
    `;
    
    // Generate HTML for each quest
    quests.forEach(quest => {
      const hasCompleted = completedQuestIds.includes(quest.id);
      const typeColor = ConfigService.getQuestTypeColor(quest.type) || '#888888';
      
      html += `
        <div class="quest-item ${hasCompleted ? 'completed' : ''}" data-quest-id="${quest.id}">
          <div class="quest-type-banner" style="background-color: ${typeColor};"></div>
          <div class="quest-content">
            <h4>${quest.questName}</h4>
            <div class="quest-badges">
              ${quest.milestone ? `<div class="milestone-badge-small" title="Milestone Quest">🏆 Milestone</div>` : ''}
              ${quest.diceRequired ? `<div class="dice-badge-small" title="Dice Required">🎲 Dice Required</div>` : ''}
            </div>
            <p>${quest.description}</p>
            <div class="quest-details">
              <span>${quest.primaryFocus}: ${quest.primaryHours}h</span>
              <span>${quest.secondaryFocus}: ${quest.secondaryHours}h</span>
              ${hasCompleted ? `<span class="completion-badge">✓ ${state.quests.completed.filter(c => c.questId === quest.id).length}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    
    // Set the container HTML
    container.innerHTML = html;
    
    // Add click handlers for quest items
    document.querySelectorAll('.quest-item').forEach(item => {
      item.addEventListener('click', () => {
        const questId = parseInt(item.dataset.questId);
        this.handleQuestClick(questId);
      });
    });
  },
  
  // Handle quest item click
  handleQuestClick(questId) {
    console.log(`Quest clicked: ${questId}`);
    
    // Just use Router for navigation - it will handle the state updates
    Router.navigate('quest', questId);
  },
  
  // Update quest filters
  async updateFilters() {
    const container = document.getElementById('quest-filters');
    if (!container) return;
    
    // Get current state
    const state = StateService.getState();
    const currentFilter = state.ui.currentFilter || 'all';
    
    // Get unlocked stages
    const completedQuestIds = state.quests.completed.map(c => c.questId);
    const unlockedStages = await QuestService.getUnlockedStages(completedQuestIds);
    
    // Clear existing filters
    container.innerHTML = '';
    
    // Add 'All' filter
    const allButton = document.createElement('button');
    allButton.className = `filter-button ${currentFilter === 'all' ? 'active' : ''}`;
    allButton.textContent = 'All Quests';
    allButton.dataset.filter = 'all';
    container.appendChild(allButton);
    
    // Add type filters
    const types = await QuestService.getQuestTypes();
    types.forEach(type => {
      const button = document.createElement('button');
      button.className = `filter-button ${currentFilter === type ? 'active' : ''}`;
      button.textContent = type;
      button.dataset.filter = type;
      button.dataset.type = type;
      container.appendChild(button);
    });
    
    // Add stage filters
    const stages = await QuestService.getStages();
    stages.forEach(stage => {
      const button = document.createElement('button');
      const isUnlocked = unlockedStages.includes(stage.id);
      const stageFilter = `stage-${stage.id}`;
      
      button.className = `filter-button stage-filter ${currentFilter === stageFilter ? 'active' : ''} ${!isUnlocked ? 'disabled' : ''}`;
      button.textContent = stage.name;
      button.dataset.filter = stageFilter;
      button.dataset.stage = stage.id;
      
      if (!isUnlocked) {
        button.title = `Complete Stage ${stage.id - 1} milestone quest to unlock`;
        button.disabled = true;
      }
      
      container.appendChild(button);
    });
    
    // Add click handlers for filters
    container.querySelectorAll('.filter-button:not(.disabled)').forEach(button => {
      button.addEventListener('click', () => {
        this.handleFilterClick(button.dataset.filter);
      });
    });
  },
  
  // Handle filter button click
  handleFilterClick(filter) {
    console.log(`Filter clicked: ${filter}`);
    
    // Update current filter in state
    StateService.updateState('ui.currentFilter', filter);
    
    // Update active button
    document.querySelectorAll('.filter-button').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
    
    // Update quest list
    this.updateQuestList();
  },
  
  // Update quest list based on current filter
  async updateQuestList() {
    // Get state
    const state = StateService.getState();
    const filter = state.ui.currentFilter || 'all';
    const visibleQuestIds = state.quests.visible;
    const completedQuestIds = state.quests.completed.map(c => c.questId);
    
    // Get unlocked stages
    const unlockedStages = await QuestService.getUnlockedStages(completedQuestIds);
    
    // Get filtered quests
    const quests = await QuestService.getFilteredQuests(
      filter, 
      visibleQuestIds, 
      completedQuestIds, 
      unlockedStages
    );
    
    // Render quest list
    this.render(quests, filter);
  }
};
