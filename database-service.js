// database-service.js
// This service handles all quest data operations

class QuestDatabase {
    constructor() {
        this.STORAGE_KEY = 'diced_rpg_quests';
        this.quests = [];
        this.initialized = false;
    }

    // Initialize the database
    async initialize() {
        if (this.initialized) return;
        
        try {
            // Try to load quests from localStorage first
            const savedQuests = localStorage.getItem(this.STORAGE_KEY);
            
            if (savedQuests) {
                // If we have saved quests, use those
                this.quests = JSON.parse(savedQuests);
                console.log(`Loaded ${this.quests.length} quests from storage`);
            } else {
                // Otherwise load the default quests from data.js (which is loaded in the HTML)
                this.quests = QUEST_DATA || [];
                // Save the default quests to storage
                this.saveToStorage();
                console.log(`Initialized database with ${this.quests.length} default quests`);
            }
            
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize quest database:', error);
            // Fall back to empty quests array
            this.quests = [];
        }
        
        return this.quests;
    }
    
    // Save all quests to localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.quests));
            return true;
        } catch (error) {
            console.error('Failed to save quests to storage:', error);
            return false;
        }
    }
    
    // Get all quests
    async getAllQuests() {
        await this.initialize();
        return [...this.quests]; // Return a copy to prevent direct modification
    }
    
    // Get a single quest by ID
    async getQuestById(id) {
        await this.initialize();
        return this.quests.find(quest => quest.id === id) || null;
    }
    
    // Get quests filtered by stage
    async getQuestsByStage(stageId) {
        await this.initialize();
        return this.quests.filter(quest => quest.stageId === stageId);
    }
    
    // Get quests filtered by type
    async getQuestsByType(type) {
        await this.initialize();
        return this.quests.filter(quest => quest.type === type);
    }
    
    // Get quests filtered by multiple criteria
    async getQuestsFiltered({ type, stage, focus, diceRequired, completed, visible }) {
        await this.initialize();
        
        return this.quests.filter(quest => {
            // Apply type filter
            if (type && quest.type !== type) return false;
            
            // Apply stage filter
            if (stage && quest.stageId !== stage) return false;
            
            // Apply focus filter
            if (focus && quest.primaryFocus !== focus && quest.secondaryFocus !== focus) return false;
            
            // Apply dice filter
            if (diceRequired !== undefined && quest.diceRequired !== diceRequired) return false;
            
            // For completed and visible filters, we would need to check against user state
            // This will be handled at a higher level when combining with the user's state
            
            return true;
        });
    }
    
    // Add a new quest
    async addQuest(quest) {
        await this.initialize();
        
        // Generate a new ID if none is provided
        if (!quest.id) {
            const maxId = Math.max(...this.quests.map(q => q.id), 0);
            quest.id = maxId + 1;
        }
        
        this.quests.push(quest);
        this.saveToStorage();
        return quest;
    }
    
    // Update an existing quest
    async updateQuest(id, updatedQuest) {
        await this.initialize();
        
        const index = this.quests.findIndex(quest => quest.id === id);
        if (index === -1) return null;
        
        // Preserve the original ID
        updatedQuest.id = id;
        
        this.quests[index] = updatedQuest;
        this.saveToStorage();
        return updatedQuest;
    }
    
    // Delete a quest
    async deleteQuest(id) {
        await this.initialize();
        
        const index = this.quests.findIndex(quest => quest.id === id);
        if (index === -1) return false;
        
        this.quests.splice(index, 1);
        this.saveToStorage();
        return true;
    }
    
    // Import quests from JSON
    async importQuests(questsJson) {
        try {
            const newQuests = JSON.parse(questsJson);
            if (!Array.isArray(newQuests)) {
                throw new Error('Invalid quest data format - expected an array');
            }
            
            await this.initialize();
            this.quests = newQuests;
            this.saveToStorage();
            return this.quests.length;
        } catch (error) {
            console.error('Failed to import quests:', error);
            return -1;
        }
    }
    
    // Export quests to JSON
    async exportQuests() {
        await this.initialize();
        return JSON.stringify(this.quests);
    }
    
    // Get all unique quest types
    async getQuestTypes() {
        await this.initialize();
        return [...new Set(this.quests.map(quest => quest.type))];
    }
    
    // Get all unique stages
    async getStages() {
        await this.initialize();
        const stageIds = [...new Set(this.quests.filter(q => q.stageId).map(q => q.stageId))];
        
        return stageIds.map(id => {
            const stageQuest = this.quests.find(q => q.stageId === id);
            return {
                id,
                name: stageQuest ? stageQuest.stageName : `Stage ${id}`
            };
        }).sort((a, b) => a.id - b.id);
    }
    
    // Get all milestone quests that unlock stages
    async getMilestoneQuests() {
        await this.initialize();
        return this.quests.filter(quest => quest.milestone && quest.unlocksStage);
    }
}

// Create a singleton instance
const questDatabase = new QuestDatabase();
