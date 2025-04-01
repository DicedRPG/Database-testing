// app-init.js - Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
  console.log('Initializing application...');
  
  try {
    // Initialize services first
    await StateService.initialize();
    await QuestService.initialize();
    
    // Migrate data if needed
    await migrateOldData();
    
    // Initialize views
    AttributeView.initialize();
    
    // Initialize controllers
    QuestController.initialize();

    // Initialize router (should be last so everything else is ready)
    Router.initialize();
    
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});

// Function to migrate data from old system to new system
async function migrateOldData() {
  console.log('Checking for data migration needs...');
  
  // Check for old state storage
  const oldState = localStorage.getItem('diced_rpg_state');
  if (oldState) {
    try {
      const parsedOldState = JSON.parse(oldState);
      const newState = StateService.getState();
      
      // Migrate attributes
      if (parsedOldState.attributeHours) {
        // Update state with old attribute values
        for (const [attr, value] of Object.entries(parsedOldState.attributeHours)) {
          StateService.updateState(`user.attributes.${attr}`, value);
        }
        console.log('Migrated attribute hours');
      }
      
      // Migrate completed quests
      if (parsedOldState.completedQuests && parsedOldState.completedQuests.length > 0) {
        StateService.updateState('quests.completed', parsedOldState.completedQuests);
        console.log(`Migrated ${parsedOldState.completedQuests.length} completed quests`);
      }
      
      // Migrate visible quests
      if (parsedOldState.visibleQuests && parsedOldState.visibleQuests.length > 0) {
        StateService.updateState('quests.visible', parsedOldState.visibleQuests);
        console.log(`Migrated ${parsedOldState.visibleQuests.length} visible quests`);
      }
      
      // Migrate quest rolls
      if (parsedOldState.questRolls) {
        StateService.updateState('quests.questRolls', parsedOldState.questRolls);
        console.log('Migrated quest rolls');
      }
      
      console.log('Data migration complete');
    } catch (error) {
      console.error('Error migrating old data:', error);
    }
  } else {
    console.log('No old data found, migration not needed');
  }
}

// Call the migration function during initialization
document.addEventListener('DOMContentLoaded', async function() {
  console.log('Initializing application...');

  // Initialize services
  await StateService.initialize();
  await QuestService.initialize();
  
  // Initialize existing code (to be gradually replaced)
  if (window.store) {
    window.store.loadFromStorage();
  }
  
  if (window.attributeSystem) {
    window.attributeSystem.initialize();
  }
  
  if (window.questSystem) {
    window.questSystem.initialize();
  }
  
  console.log('Application initialized');
});
