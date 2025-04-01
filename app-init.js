// app-init.js - Initialize the app
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
