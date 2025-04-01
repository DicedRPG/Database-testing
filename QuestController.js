// QuestController.js - Quest management controller
const QuestController = {
  // Initialize the controller
  initialize() {
    console.log('Initializing QuestController...');
    
    // Set up event listeners
    document.getElementById('random-quest')?.addEventListener('click', 
      () => this.selectRandomQuest());
      
    document.getElementById('view-all-quests')?.addEventListener('click', 
      () => this.showQuestList());
    
    // Set up quest filter buttons
    QuestListView.updateFilters();
    
    // Initialize quest visibility if needed
    this.initializeVisibleQuests();
    
    // Show initial quest list
    this.showQuestList();
    
    console.log('QuestController initialized');
  },
  
  // Initialize visible quests if needed
  async initializeVisibleQuests() {
    const state = StateService.getState();
    
    if (!state.quests.visible || state.quests.visible.length === 0) {
      console.log('Initializing visible quests...');
      
      // Initially only make Stage 1 quests visible
      const stage1Quests = await QuestService.getQuestsByStage(1);
      const stage1QuestIds = stage1Quests.map(quest => quest.id);
      
      // Update state
      StateService.updateState('quests.visible', stage1QuestIds);
      
      console.log(`Initial ${stage1QuestIds.length} Stage 1 quests are now visible`);
    }
  },
  
  // Show the quest list
  async showQuestList() {
    console.log('Showing quest list...');
    
    // Update current view in state
    StateService.updateState('ui.currentView', 'list');
    
    // Update quest list
    await QuestListView.updateQuestList();
  },
  
  // Show details for a specific quest
  async showQuestDetail(questId) {
    console.log(`Showing quest detail: ${questId}`);
    
    // Update current view and quest ID in state
    StateService.updateState('ui.currentView', 'detail');
    StateService.updateState('quests.currentQuestId', questId);
    
    // Render quest detail
    await QuestDetailView.render(questId);
  },
  
  // Select a random quest
  async selectRandomQuest() {
    console.log('Selecting random quest...');
    
    // Get state
    const state = StateService.getState();
    
    // Get visible quests
    const visibleQuestIds = state.quests.visible;
    const completedQuestIds = state.quests.completed.map(c => c.questId);
    const unlockedStages = await QuestService.getUnlockedStages(completedQuestIds);
    
    // Get filtered quests
    const filter = state.ui.currentFilter || 'all';
    const quests = await QuestService.getFilteredQuests(
      filter, 
      visibleQuestIds, 
      completedQuestIds, 
      unlockedStages
    );
    
    if (quests.length === 0) {
      alert('No quests available with current filter');
      return;
    }
    
    // Select random quest
    const randomIndex = Math.floor(Math.random() * quests.length);
    
    // Show quest detail
    this.showQuestDetail(quests[randomIndex].id);
  },
  
  // Complete a quest
  async completeQuest(questId, completionDetails = {}) {
    console.log(`Completing quest: ${questId}`);
    
    // Get quest data
    const quest = await QuestService.getQuestById(questId);
    
    if (!quest) {
      console.error(`Quest not found: ${questId}`);
      return;
    }
    
    // Calculate rewards based on completion level
    let primaryMultiplier = 1.0;
    let secondaryMultiplier = 1.0;
    
    if (completionDetails.completionLevel === 'wellDone') {
      primaryMultiplier = 0.8;
      secondaryMultiplier = 0.8;
    } else if (completionDetails.completionLevel === 'struggled') {
      primaryMultiplier = 0.6;
      secondaryMultiplier = 0.6;
    }
    
    const primaryHours = quest.primaryHours * primaryMultiplier;
    const secondaryHours = quest.secondaryHours * secondaryMultiplier;
    
    // Add completion record
    StateService.addCompletedQuest(questId, completionDetails);
    
    // Add attribute hours
    const primaryAttr = quest.primaryFocus.toLowerCase();
    const secondaryAttr = quest.secondaryFocus.toLowerCase();
    
    StateService.addAttributeHours(primaryAttr, primaryHours);
    StateService.addAttributeHours(secondaryAttr, secondaryHours);
    
    // Check for milestone quest
    if (quest.milestone === true && quest.unlocksStage) {
      console.log(`Milestone quest completed, unlocking Stage ${quest.unlocksStage}`);
      
      // Find all quests from the next stage
      const nextStageQuests = await QuestService.getQuestsByStage(quest.unlocksStage);
      
      if (nextStageQuests.length > 0) {
        // Make these quests visible
        const nextStageQuestIds = nextStageQuests.map(q => q.id);
        StateService.makeQuestsVisible(nextStageQuestIds);
        
        // Show notification
        if (quest.unlockMessage) {
          this.showNotification(quest.unlockMessage);
        }
      }
    }
    
    // Unlock new quests
    await this.unlockNewQuests(quest);
    
    // Show completion summary
    this.showCompletionSummary(quest, primaryHours, secondaryHours);
  },
  
  // Unlock new quests
  async unlockNewQuests(completedQuest) {
    console.log(`Unlocking new quests after completing: ${completedQuest.id}`);
    
    // Get state
    const state = StateService.getState();
    const visibleQuestIds = state.quests.visible;
    const completedQuestIds = state.quests.completed.map(c => c.questId);
    
    // Get all quests
    const allQuests = await QuestService.getAllQuests();
    
    // Find similar quests
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
        !similarQuests.some(sq => sq.id === q.id)
      );
      
      similarQuests = [...similarQuests, ...sameTypeQuests];
    }
    
    // Sort by ID (as a proxy for difficulty)
    similarQuests.sort((a, b) => a.id - b.id);
    
    // Take the first 2 quests to unlock
    const questsToUnlock = similarQuests.slice(0, 2);
    
    if (questsToUnlock.length > 0) {
      // Make these quests visible
      const questIdsToUnlock = questsToUnlock.map(q => q.id);
      StateService.makeQuestsVisible(questIdsToUnlock);
      
      console.log(`Unlocked ${questsToUnlock.length} new quests`);
    }
    
    return questsToUnlock;
  },
  
  // Show completion summary
  showCompletionSummary(quest, primaryHours, secondaryHours) {
    console.log(`Showing completion summary for quest: ${quest.id}`);
    
    // Get container
    const container = document.getElementById('current-quest');
    if (!container) return;
    
    // Show completion summary UI
    container.innerHTML = `
      <div class="quest-reflection">
        <h3>Quest Completed!</h3>
        
        <div class="quest-rewards">
          <h4>Rewards Earned:</h4>
          <p>${quest.primaryFocus}: +${primaryHours.toFixed(1)} hours</p>
          <p>${quest.secondaryFocus}: +${secondaryHours.toFixed(1)} hours</p>
        </div>
        
        <div class="reflection-actions">
          <button id="return-home" class="quest-button primary">Return Home</button>
        </div>
      </div>
    `;
    
    // Add event listener
    document.getElementById('return-home')?.addEventListener('click', () => {
      this.showQuestList();
    });
  },
  
  // Show a notification
  showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
};
