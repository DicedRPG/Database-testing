// QuestService.js - Quest data management
const QuestService = {
  // Array of all quests
  _quests: null,
    
  // Storage key for quest data
  STORAGE_KEY: 'diced_rpg_quests',
  
  // List of functions to call when data changes
  _listeners: [],
    
  // Initialize the service
  async initialize() {
    console.log('Initializing QuestService...');
      
    // Load quests from storage or embedded data
    this._quests = await this._loadQuests();
    
    // Set up listener for quest data updates from QuestDataService
    document.addEventListener('questDataUpdated', this._handleQuestDataUpdate.bind(this));
      
    console.log(`QuestService initialized with ${this._quests.length} quests`);
    return this._quests;
  },
  
  /**
   * Handle quest data update events from QuestDataService
   */
  _handleQuestDataUpdate(event) {
    console.log(`Quest data updated from v${event.detail.previousVersion} to v${event.detail.version}`);
    
    // Reload quests from localStorage
    this.loadFromStorage();
    
    // Refresh the UI
    this._refreshUI();
  },
  
  /**
   * UI refresh method - update necessary components
   */
  _refreshUI() {
    // Update quest list if available
    if (window.QuestListView && typeof window.QuestListView.updateQuestList === 'function') {
      window.QuestListView.updateQuestList();
    }
    
    // Update quest filters if available
    if (window.QuestListView && typeof window.QuestListView.updateFilters === 'function') {
      window.QuestListView.updateFilters();
    }
    
    // Update current quest detail if viewing a quest
    const state = window.StateService?.getState();
    if (state && state.ui.currentView === 'detail' && state.quests.currentQuestId) {
      if (window.QuestDetailView && typeof window.QuestDetailView.render === 'function') {
        window.QuestDetailView.render(state.quests.currentQuestId);
      }
    }
  },
    
  // Get all quests
  async getAllQuests() {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Return a copy of the quests array
    return [...this._quests];
  },
    
  // Get a quest by ID
  async getQuestById(id) {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Find quest with matching ID
    return this._quests.find(quest => quest.id === id) || null;
  },
    
  // Get quests from a specific stage
  async getQuestsByStage(stageId) {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Filter quests by stage ID
    return this._quests.filter(quest => quest.stageId === stageId);
  },
    
  // Get quests of a specific type
  async getQuestsByType(type) {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Filter quests by type
    return this._quests.filter(quest => quest.type === type);
  },
    
  // Get all unique quest types
  async getQuestTypes() {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Get unique types using a Set
    const typeSet = new Set(this._quests.map(quest => quest.type));
    return [...typeSet];
  },
    
  // Get all stages
  async getStages() {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Find all unique stage IDs
    const stageIds = [...new Set(
      this._quests
        .filter(quest => quest.stageId)
        .map(quest => quest.stageId)
    )].sort();
      
    // Convert to objects with names
    return stageIds.map(id => {
      const stageQuest = this._quests.find(q => q.stageId === id);
      return {
        id,
        name: stageQuest ? stageQuest.stageName : `Stage ${id}`
      };
    });
  },
    
  // Determine which stages are unlocked based on completed quests
  async getUnlockedStages(completedQuestIds) {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Stage 1 is always unlocked
    const unlockedStages = [1];
      
    // Find milestone quests that unlock stages
    this._quests.forEach(quest => {
      if (quest.milestone && 
          quest.unlocksStage && 
          completedQuestIds.includes(quest.id)) {
        unlockedStages.push(quest.unlocksStage);
      }
    });
      
    // Return unique unlocked stage IDs
    return [...new Set(unlockedStages)];
  },
    
  // Get filtered quests
  async getFilteredQuests(filter, visibleIds, completedIds, unlockedStages) {
    if (!this._quests) {
      await this.initialize();
    }
      
    // Start with all quests
    let filteredQuests = [...this._quests];
      
    // Filter to only visible quests from unlocked stages
    filteredQuests = filteredQuests.filter(quest => {
      // Must be visible
      if (!visibleIds.includes(quest.id)) return false;
        
      // Must be from unlocked stage
      if (quest.stageId && !unlockedStages.includes(quest.stageId)) return false;
        
      return true;
    });
      
    // Apply specific filter
    if (filter && filter !== 'all') {
      if (filter.startsWith('stage-')) {
        // Filter by stage
        const stageId = parseInt(filter.replace('stage-', ''));
        filteredQuests = filteredQuests.filter(quest => quest.stageId === stageId);
      } else {
        // Filter by type
        filteredQuests = filteredQuests.filter(quest => quest.type === filter);
      }
    }
      
    return filteredQuests;
  },
    
  // Load quests from storage or embedded data
  _loadQuests() {
    try {
      // First try to load from localStorage
      const savedQuests = localStorage.getItem(this.STORAGE_KEY);
        
      if (savedQuests) {
        console.log('Loading quests from localStorage');
        return JSON.parse(savedQuests);
      }
        
      // If not in localStorage, check for embedded QUEST_DATA
      if (typeof QUEST_DATA !== 'undefined') {
        console.log('Loading quests from embedded QUEST_DATA');
          
        // Save to localStorage for future use
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(QUEST_DATA));
          
        return QUEST_DATA;
      }
        
      console.error('No quest data found');
      return [];
    } catch (error) {
      console.error('Failed to load quests:', error);
      return [];
    }
  },
  
  // Load from storage (enhanced version that triggers notifications)
  loadFromStorage() {
    try {
      const savedQuests = localStorage.getItem(this.STORAGE_KEY);
      
      if (savedQuests) {
        this._quests = JSON.parse(savedQuests);
        console.log(`Loaded ${this._quests.length} quests from storage`);
        
        // Notify listeners about data change
        this._notifyDataChanged();
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to load quests from storage:', error);
      return false;
    }
  },
    
  // Update quest data from new source
  async updateQuestData(newQuests) {
    console.log(`Updating quest data with ${newQuests.length} quests`);
      
    // Update quests array
    this._quests = newQuests;
      
    // Save to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newQuests));
    
    // Notify listeners about the change
    this._notifyDataChanged();
      
    return this._quests;
  },
  
  // Register a callback to be notified when data changes
  onDataChanged(callback) {
    if (typeof callback === 'function') {
      this._listeners.push(callback);
      return true;
    }
    return false;
  },
  
  // Notify all registered callbacks about data change
  _notifyDataChanged() {
    console.log('Notifying quest data listeners');
    this._listeners.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error in data change callback:', error);
      }
    });
  }
};

// Export for use in other files
window.QuestService = QuestService;
