// main.js - Main application entry point
(async function() {
  console.log('Diced RPG Companion: Starting...');
  
  try {
    // Step 1: Initialize core services
    await StateService.initialize();
    await QuestService.initialize();
    
    // Step 2: Migrate legacy data if needed
    await migrateOldData();
    
    // Step 3: Initialize views
    AttributeView.initialize();
    
    // Step 4: Initialize controllers
    QuestController.initialize();
    
    // Step 5: Initialize router (last so everything else is ready)
    Router.initialize();
    
    console.log('Diced RPG Companion: Initialization complete');
  } catch (error) {
    console.error('Diced RPG Companion: Initialization failed:', error);
    NotificationService.error('Application failed to initialize properly. Please refresh the page.');
  }
  
  // Function to migrate data from old system to new system
  async function migrateOldData() {
    console.log('Checking for data migration needs...');
    
    // Check for old state storage
    const oldState = localStorage.getItem('diced_rpg_state');
    if (oldState) {
      try {
        console.log('Found old state data, migrating...');
        const parsedOldState = JSON.parse(oldState);
        
        // Migrate attributes
        if (parsedOldState.attributeHours) {
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
        
        // Consider removing old data after successful migration
        // localStorage.removeItem('diced_rpg_state');
      } catch (error) {
        console.error('Error migrating old data:', error);
      }
    } else {
      console.log('No old data found, migration not needed');
    }
  }
})();
