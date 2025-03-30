// user-state-service.js
// This service handles the user's state and progress

class UserStateService {
    constructor() {
        this.STORAGE_KEY = 'diced_rpg_state';
        this._state = null;
        this._listeners = [];
        this.initialized = false;
        
        // Initialize with default state
        this._defaultState = {
            attributeHours: {
                technique: 0,
                ingredients: 0,
                flavor: 0,
                management: 0
            },
            completedQuests: [],    // List of completed quests
            visibleQuests: [],      // List of visible quest IDs
            pathProgress: {},       // For path-based learning
            questRolls: {},         // For dice mechanics
            lastUpdate: new Date().toISOString()
        };
    }
    
    // Initialize the service
    async initialize() {
        if (this.initialized) return this._state;
        
        try {
            // Try to load state from localStorage
            const savedState = localStorage.getItem(this.STORAGE_KEY);
            
            if (savedState) {
                // Parse saved state and merge with default state
                const parsedState = JSON.parse(savedState);
                this._state = {
                    ...this._defaultState,
                    ...parsedState,
                    attributeHours: {
                        ...this._defaultState.attributeHours,
                        ...(parsedState.attributeHours || {})
                    }
                };
            } else {
                // Start with default state
                this._state = { ...this._defaultState };
            }
            
            this.initialized = true;
            return this._state;
        } catch (error) {
            console.error('Failed to initialize user state:', error);
            this._state = { ...this._defaultState };
            return this._state;
        }
    }
    
    // Save state to storage
    _saveToStorage() {
        try {
            this._state.lastUpdate = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._state));
            return true;
        } catch (error) {
            console.error('Failed to save state:', error);
            return false;
        }
    }
    
    // Get the current state
    async getState() {
        await this.initialize();
        return { ...this._state };
    }
    
    // Update the entire state
    async setState(newState) {
        await this.initialize();
        this._state = { ...newState };
        this._notifyListeners();
        this._saveToStorage();
        return this._state;
    }
    
    // Update a specific path in the state
    async updateState(path, value) {
        await this.initialize();
        
        // Handle dot notation paths (e.g., 'attributeHours.technique')
        const parts = path.split('.');
        let current = this._state;
        const lastKey = parts.pop();
        
        for (const key of parts) {
            if (current[key] === undefined) {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
        
        this._notifyListeners();
        this._saveToStorage();
        return this._state;
    }
    
    // Subscribe to state changes
    subscribe(listener) {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        };
    }
    
    // Notify all listeners of state changes
    _notifyListeners() {
        this._listeners.forEach(listener => listener(this._state));
    }
    
    // Get completed quests
    async getCompletedQuests() {
        await this.initialize();
        return [...this._state.completedQuests];
    }
    
    // Get visible quests
    async getVisibleQuests() {
        await this.initialize();
        return [...this._state.visibleQuests];
    }
    
    // Check if a quest is visible
    async isQuestVisible(questId) {
        await this.initialize();
        return this._state.visibleQuests.includes(questId);
    }
    
    // Check if a quest is completed
    async isQuestCompleted(questId) {
        await this.initialize();
        return this._state.completedQuests.some(q => q.questId === questId);
    }
    
    // Add a completed quest
    async addCompletedQuest(questId, completionDetails = {}) {
        await this.initialize();
        
        const completion = {
            questId,
            completedAt: new Date().toISOString(),
            ...completionDetails
        };
        
        this._state.completedQuests.push(completion);
        this._notifyListeners();
        this._saveToStorage();
        
        return completion;
    }
    
    // Make a quest visible
    async makeQuestVisible(questId) {
        await this.initialize();
        
        if (!this._state.visibleQuests.includes(questId)) {
            this._state.visibleQuests.push(questId);
            this._notifyListeners();
            this._saveToStorage();
        }
        
        return this._state.visibleQuests;
    }
    
    // Make multiple quests visible
    async makeQuestsVisible(questIds) {
        await this.initialize();
        
        let changed = false;
        questIds.forEach(id => {
            if (!this._state.visibleQuests.includes(id)) {
                this._state.visibleQuests.push(id);
                changed = true;
            }
        });
        
        if (changed) {
            this._notifyListeners();
            this._saveToStorage();
        }
        
        return this._state.visibleQuests;
    }
    
    // Get unlocked stages based on completed milestones
    async getUnlockedStages() {
        await this.initialize();
        
        // Stage 1 is always unlocked
        const unlockedStages = [1];
        
        // Check for milestone quests that unlock stages
        // This requires knowledge of quest data
        // For now, let's assume we have a helper function to check if a quest is a milestone
        // We'll implement the full logic elsewhere when we have the quest data
        
        return unlockedStages;
    }
    
    // Add attribute hours
    async addAttributeHours(attribute, hours) {
        await this.initialize();
        
        if (!this._state.attributeHours[attribute]) {
            this._state.attributeHours[attribute] = 0;
        }
        
        this._state.attributeHours[attribute] += hours;
        this._notifyListeners();
        this._saveToStorage();
        
        return this._state.attributeHours[attribute];
    }
    
    // Reset user state (for testing/development)
    async resetState() {
        this._state = { ...this._defaultState };
        this._notifyListeners();
        this._saveToStorage();
        return this._state;
    }
}

// Create a singleton instance
const userStateService = new UserStateService();
