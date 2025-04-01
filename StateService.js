// StateService.js - Unified state management  
const StateService = {  
  // The actual state data  
  _state: null,  
    
  // List of functions to call when state changes  
  _listeners: [],  
    
  // Storage key  
  STORAGE_KEY: 'diced_app_state',  
    
  // Initialize the service  
  initialize() {  
    console.log('Initializing StateService...');  
      
    // Try to load saved state from localStorage  
    this._state = this._loadFromStorage();  
      
    // If no saved state, create default state  
    if (!this._state) {  
      this._state = {  
        // User attributes and progress  
        user: {  
          attributes: {  
            technique: 0,  
            ingredients: 0,  
            flavor: 0,  
            management: 0  
          },  
          lastUpdate: new Date().toISOString()  
        },  
          
        // Quest-related state  
        quests: {  
          completed: [],        // List of completed quests with details  
          visible: [],          // IDs of quests the user can see  
          currentQuestId: null, // Currently viewed quest  
          questRolls: {}        // Dice roll results for quests  
        },  
          
        // UI state  
        ui: {  
          currentView: 'list',  // Current view (list, detail, etc.)  
          currentFilter: 'all'  // Current quest filter  
        }  
      };  
        
      // Save the initial state  
      this._saveToStorage();  
    }  
      
    console.log('StateService initialized with state:', this._state);  
    return this._state;  
  },  
    
  // Get the current state  
  getState() {  
    return this._state;  
  },  
    
  // Update part of the state  
  updateState(path, value) {  
    console.log(`Updating state at ${path}:`, value);  
      
    // Convert path string to array (e.g., "user.attributes.technique" -> ["user", "attributes", "technique"])  
    const pathArray = path.split('.');  
      
    // Navigate to the correct part of the state  
    let current = this._state;  
    const lastKey = pathArray.pop();  
      
    // Create the path if it doesn't exist  
    for (const key of pathArray) {  
      if (current[key] === undefined) {  
        current[key] = {};  
      }  
      current = current[key];  
    }  
      
    // Update the value  
    current[lastKey] = value;  
      
    // Update lastUpdate timestamp  
    this._state.user.lastUpdate = new Date().toISOString();  
      
    // Notify listeners about the change  
    this._notifyListeners();  
      
    // Save to localStorage  
    this._saveToStorage();  
      
    return this._state;  
  },  
    
  // Register a function to be called when state changes  
  subscribe(listener) {  
    console.log('Adding state change listener');  
    this._listeners.push(listener);  
      
    // Return a function to remove this listener  
    return () => {  
      this._listeners = this._listeners.filter(l => l !== listener);  
      console.log('Removed state change listener');  
    };  
  },  
    
  // Call all listener functions with the current state  
  _notifyListeners() {  
    console.log('Notifying state listeners');  
    this._listeners.forEach(listener => {  
      try {  
        listener(this._state);  
      } catch (error) {  
        console.error('Error in state listener:', error);  
      }  
    });  
  },  
    
  // Save state to localStorage  
  _saveToStorage() {  
    try {  
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._state));  
      console.log('State saved to localStorage');  
    } catch (error) {  
      console.error('Failed to save state to localStorage:', error);  
    }  
  },  
    
  // Load state from localStorage  
  _loadFromStorage() {  
    try {  
      const savedState = localStorage.getItem(this.STORAGE_KEY);  
        
      if (savedState) {  
        console.log('Found saved state in localStorage');  
        return JSON.parse(savedState);  
      }  
        
      console.log('No saved state found in localStorage');  
      return null;  
    } catch (error) {  
      console.error('Failed to load state from localStorage:', error);  
      return null;  
    }  
  },  
    
  // Helper function to add hours to an attribute  
  addAttributeHours(attribute, hours) {  
    const currentHours = this._state.user.attributes[attribute] || 0;  
    return this.updateState(`user.attributes.${attribute}`, currentHours + hours);  
  },  
    
  // Helper function to add a completed quest  
  addCompletedQuest(questId, completionDetails = {}) {  
    const newCompletion = {  
      questId,  
      completedAt: new Date().toISOString(),  
      ...completionDetails  
    };  
      
    const completed = [...this._state.quests.completed, newCompletion];  
    return this.updateState('quests.completed', completed);  
  },  
    
  // Helper function to make quests visible  
  makeQuestsVisible(questIds) {  
    // Create a set of current visible quests  
    const visibleSet = new Set(this._state.quests.visible);  
      
    // Add all new quest IDs to the set  
    questIds.forEach(id => visibleSet.add(id));  
      
    // Convert back to array and update state  
    return this.updateState('quests.visible', Array.from(visibleSet));  
  },  
    
  // Reset state to defaults (for testing or user reset)  
  resetState() {  
    console.log('Resetting state to defaults');  
    this.initialize();  
    this._notifyListeners();  
    return this._state;  
  }  
};
