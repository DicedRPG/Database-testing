// app-init.js - Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing application...');
  
  // Initialize state service first
  StateService.initialize();
  
  // Then initialize your existing code
  // (We'll gradually replace these with our new system)
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
