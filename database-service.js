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

// Add this to your database-service.js file

// Override the local storage loading with Amplify latest version
const originalLoadFromStorage = questDatabase.loadFromStorage;

questDatabase.loadFromStorage = function() {
  console.log('Loading quest data from Amplify hosting...');
  
  // Add a timestamp to prevent caching
  fetch('data.js?t=' + new Date().getTime())
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data.js: ${response.status}`);
      }
      return response.text();
    })
    .then(jsContent => {
      // Execute the JavaScript to get QUEST_DATA
      // This is safe because the data is from your own server
      try {
        // First, clear any existing QUEST_DATA
        window.QUEST_DATA = [];
        
        // Create a function to safely execute the data.js content
        const executeScript = new Function(jsContent);
        executeScript();
        
        // Check if QUEST_DATA was populated
        if (window.QUEST_DATA && window.QUEST_DATA.length > 0) {
          console.log(`Loaded ${window.QUEST_DATA.length} quests from Amplify hosting`);
          
          // Update localStorage with the fresh data
          localStorage.setItem('diced_rpg_quests', JSON.stringify(window.QUEST_DATA));
          
          // Now load from local storage as usual
          originalLoadFromStorage.call(this);
          
          // Show a small notification if quests were updated
          showUpdateNotification();
        } else {
          console.warn('QUEST_DATA was not populated from data.js, falling back to localStorage');
          originalLoadFromStorage.call(this);
        }
      } catch (error) {
        console.error('Error executing data.js:', error);
        console.warn('Falling back to localStorage');
        originalLoadFromStorage.call(this);
      }
    })
    .catch(error => {
      console.error('Error loading data.js:', error);
      console.warn('Falling back to localStorage');
      originalLoadFromStorage.call(this);
    });
    
  // Return immediately, the actual data will be loaded asynchronously
  // We'll still use localStorage as the initial source
  return originalLoadFromStorage.call(this);
};

// Simple notification helper
function showUpdateNotification() {
  // Only show if we haven't shown it recently
  const lastNotificationTime = localStorage.getItem('last_update_notification');
  if (lastNotificationTime && (Date.now() - parseInt(lastNotificationTime)) < 86400000) {
    // Don't show more than once per day
    return;
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#4A2A1B';
  notification.style.color = 'white';
  notification.style.padding = '15px';
  notification.style.borderRadius = '5px';
  notification.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
  notification.style.zIndex = '1000';
  notification.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="margin-right: 15px;">Quest data has been updated!</span>
      <button style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">&times;</button>
    </div>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Add close handler
  const closeButton = notification.querySelector('button');
  closeButton.addEventListener('click', function() {
    document.body.removeChild(notification);
  });
  
  // Remove after 5 seconds
  setTimeout(function() {
    if (notification.parentNode) {
      document.body.removeChild(notification);
    }
  }, 5000);
  
  // Store notification time
  localStorage.setItem('last_update_notification', Date.now().toString());
}
