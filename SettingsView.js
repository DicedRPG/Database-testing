// SettingsView.js - Settings display and management
const SettingsView = {
  // Initialize settings view
  initialize() {
    console.log('Initializing SettingsView...');
    
    // Set up event listeners for settings actions
    this.setupEventListeners();
    
    console.log('SettingsView initialized');
  },
  
  // Setup event listeners
  setupEventListeners() {
    // Reset data button
    document.getElementById('reset-data-button')?.addEventListener('click', () => {
      this.handleResetData();
    });
    
    // Export data button
    document.getElementById('export-data-button')?.addEventListener('click', () => {
      this.handleExportData();
    });
    
    // Import data button
    document.getElementById('import-data-button')?.addEventListener('click', () => {
      this.handleImportData();
    });
    
    // Version info (toggle details)
    document.getElementById('version-info')?.addEventListener('click', () => {
      document.getElementById('version-details')?.classList.toggle('hidden');
    });
  },
  
  // Render settings
  render() {
    console.log('Rendering settings');
    
    // Get container element
    const container = document.getElementById('settings-content');
    if (!container) {
      console.error('Settings container not found');
      return;
    }
    
    // Hide loading spinner
    const spinner = document.querySelector('#settings-container .loading-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
    
    // Show settings content
    container.classList.remove('hidden');
  },
  
  // Handle reset data
  handleResetData() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      // Reset state
      StateService.resetState();
      
      // Show notification
      NotificationService.success('All data has been reset successfully.');
      
      // Navigate back to home
      Router.navigate('home');
    }
  },
  
  // Handle export data
  handleExportData() {
    // Get current state
    const state = StateService.getState();
    
    // Convert to JSON string
    const dataStr = JSON.stringify(state, null, 2);
    
    // Create download link
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    // Create invisible download link
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', `diced-rpg-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(exportLink);
    
    // Trigger download
    exportLink.click();
    
    // Clean up
    document.body.removeChild(exportLink);
    
    // Show notification
    NotificationService.success('Data exported successfully.');
  },
  
  // Handle import data
  handleImportData() {
    // Create file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    // Handle file selection
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Parse imported data
          const importedData = JSON.parse(e.target.result);
          
          // Validate data (basic check)
          if (!this.validateImportedData(importedData)) {
            NotificationService.error('Invalid data format. Import failed.');
            return;
          }
          
          // Ask for confirmation
          if (confirm('Importing will replace all current data. Continue?')) {
            // Update state
            StateService.replaceState(importedData);
            
            // Show notification
            NotificationService.success('Data imported successfully.');
            
            // Navigate back to home to refresh everything
            Router.navigate('home');
          }
        } catch (error) {
          console.error('Import error:', error);
          NotificationService.error('Failed to import data. Check file format.');
        }
      };
      
      reader.readAsText(file);
    });
    
    // Trigger file browser
    fileInput.click();
  },
  
  // Validate imported data
  validateImportedData(data) {
    // Basic validation to ensure data has expected structure
    return (
      data && 
      typeof data === 'object' &&
      data.user && 
      data.user.attributes &&
      data.quests
    );
  }
};
