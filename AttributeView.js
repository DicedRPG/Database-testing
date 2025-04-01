// AttributeView.js - Attribute display and management
const AttributeView = {
  // Initialize attribute view
  initialize() {
    console.log('Initializing AttributeView...');
    
    // Set up event listeners
    document.getElementById('add-hours-button')?.addEventListener('click', 
      () => this.handleAddHours());
      
    document.getElementById('adjust-hours-button')?.addEventListener('click', 
      () => this.handleAdjustHours());
    
    // Subscribe to state changes
    StateService.subscribe(() => this.updateDisplay());
    
    // Initial update
    this.updateDisplay();
    
    console.log('AttributeView initialized');
  },
  
  // Update attribute displays
  updateDisplay() {
    console.log('Updating attribute displays');
    
    const state = StateService.getState();
    
    // Update overall rank display
    const overallRank = this.calculateOverallRank(state);
    
    document.getElementById('overall-rank').textContent = overallRank.name;
    document.getElementById('overall-hours').textContent = overallRank.totalHours.toFixed(1);
    document.getElementById('overall-next-rank').textContent = overallRank.nextRankHours.toFixed(1);
    
    // Update progress bar
    const progressBar = document.querySelector('.overall-rank-card .progress-fill');
    if (progressBar) {
      progressBar.style.width = `${Math.min(overallRank.progress, 100)}%`;
      progressBar.style.backgroundColor = overallRank.color;
    }
    
    // Update each attribute
    ['technique', 'ingredients', 'flavor', 'management'].forEach(attribute => {
      const hours = state.user.attributes[attribute] || 0;
      const levelInfo = this.calculateLevel(hours);
      
      // Update hours display
      document.getElementById(`${attribute}-hours`).textContent = levelInfo.currentLevelHours.toFixed(1);
      
      // Update next level display
      document.getElementById(`${attribute}-next-level`).textContent = levelInfo.hoursForLevel;
      
      // Update level display
      document.getElementById(`${attribute}-level`).textContent = levelInfo.level;
      
      // Find and update attribute card
      const cards = document.querySelectorAll('.attribute-card');
      const card = Array.from(cards).find(card => {
        const header = card.querySelector('h3');
        return header && header.textContent.toLowerCase() === attribute;
      });
      
      if (card) {
        // Update rank display
        const rankDisplay = card.querySelector('.stats p:first-child');
        if (rankDisplay) {
          rankDisplay.textContent = `Current Rank: ${levelInfo.rank}`;
        }
        
        // Update progress bar
        const progressFill = card.querySelector('.progress-fill');
        if (progressFill) {
          const progressPercent = (levelInfo.currentLevelHours / levelInfo.hoursForLevel * 100);
          progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
          progressFill.style.backgroundColor = levelInfo.color;
        }
      }
    });
  },
  
  // Calculate level for an attribute
  calculateLevel(totalHours) {
    // Find current rank
    let currentRank = RANKS[RANKS.length - 1];
    for (const rank of RANKS) {
      if (totalHours < rank.hoursNeeded) {
        currentRank = rank;
        break;
      }
    }
    
    // Find level within rank
    for (let i = 0; i < LEVELS.length; i++) {
      const level = LEVELS[i];
      const nextLevel = LEVELS[i + 1];
      
      if (!nextLevel || totalHours < nextLevel.startAt) {
        const hoursIntoLevel = totalHours - level.startAt;
        
        return {
          level: level.level,
          currentLevelHours: hoursIntoLevel,
          hoursForLevel: level.hours,
          totalHours: totalHours,
          rank: currentRank.name,
          color: currentRank.color
        };
      }
    }
    
    // Default to last level if not found
    const lastLevel = LEVELS[LEVELS.length - 1];
    return {
      level: lastLevel.level,
      currentLevelHours: totalHours - lastLevel.startAt,
      hoursForLevel: lastLevel.hours,
      totalHours: totalHours,
      rank: currentRank.name,
      color: currentRank.color
    };
  },
  
  // Calculate overall rank
  calculateOverallRank(state) {
    const totalHours = Object.values(state.user.attributes).reduce((sum, hours) => sum + hours, 0);
    const minAttributeHours = Math.min(...Object.values(state.user.attributes).filter(h => h > 0), 0);
    
    // Find current rank
    let currentRank = RANKS[0];
    let previousRankTotal = 0;
    
    for (const rank of RANKS) {
      if (minAttributeHours < rank.hoursNeeded) {
        currentRank = rank;
        break;
      }
      previousRankTotal = rank.totalHoursNeeded;
    }
    
    return {
      name: currentRank.name,
      color: currentRank.color,
      totalHours: totalHours,
      currentRankHours: Math.max(0, totalHours - previousRankTotal),
      nextRankHours: currentRank.totalHoursNeeded - previousRankTotal,
      progress: ((totalHours - previousRankTotal) / (currentRank.totalHoursNeeded - previousRankTotal)) * 100
    };
  },
  
  // Handle adding hours
  handleAddHours() {
    const attribute = document.getElementById('attribute-select').value;
    const hours = parseFloat(document.getElementById('hours-input').value || 0);
    
    if (hours <= 0) {
      alert('Please enter a valid number of hours');
      return;
    }
    
    // Add hours to the attribute
    StateService.addAttributeHours(attribute, hours);
    
    // Reset input
    document.getElementById('hours-input').value = '1';
  },
  
  // Handle adjusting hours
  handleAdjustHours() {
    const attribute = document.getElementById('attribute-select').value;
    const state = StateService.getState();
    const currentHours = state.user.attributes[attribute] || 0;
    
    const newHours = prompt(
      `Current ${attribute} hours: ${currentHours}\nEnter new total hours:`, 
      currentHours
    );
    
    if (newHours === null) return; // User cancelled
    
    const newHoursNum = parseFloat(newHours);
    if (isNaN(newHoursNum) || newHoursNum < 0) {
      alert('Please enter a valid number of hours');
      return;
    }
    
    // Update the hours
    StateService.updateState(`user.attributes.${attribute}`, newHoursNum);
  }
};
