// QuestDetailView.js - Quest detail display
const QuestDetailView = {
  // Render quest detail to container
  async render(questId) {
    console.log(`Rendering quest detail for ID: ${questId}`);
    
    // Get container element
    const container = document.getElementById('current-quest');
    if (!container) {
      console.error('Quest detail container not found');
      return;
    }
    
    // Get quest data
    const quest = await QuestService.getQuestById(parseInt(questId));
    
    if (!quest) {
      // Handle quest not found
      container.innerHTML = `
        <div class="error-message">
          <h2>Quest Not Found</h2>
          <p>The requested quest (ID: ${questId}) could not be found.</p>
          <button id="back-to-quest-list" class="quest-button primary">Back to Quest List</button>
        </div>
      `;
      
      // Add back button handler
      document.getElementById('back-to-quest-list')?.addEventListener('click', () => {
        StateService.updateState('ui.currentView', 'list');
        document.getElementById('quest-list').classList.remove('hidden');
        container.classList.add('hidden');
      });
      
      return;
    }
    
    // Get state for completion info
    const state = StateService.getState();
    const completions = state.quests.completed.filter(c => c.questId === quest.id);
    
    // Get quest type color
    const questColor = QUEST_TYPE_COLORS[quest.type] || '#888888';
    
    // Build HTML for quest detail
    let html = `
      <div class="quest-details">
        <div class="quest-type-banner-large" style="background-color: ${questColor}"></div>
        
        <div class="quest-header">
          <div>
            <h2 class="quest-title">${quest.questName}</h2>
            <p class="quest-meta">
              Stage ${quest.stageId || '?'}: ${quest.stageName || 'Unknown'} • 
              <span class="quest-type-text" style="color: ${questColor}">${quest.type}</span>
              ${completions.length > 0 ? `
                <span class="completed-text">
                  • Completed ${completions.length} time${completions.length > 1 ? 's' : ''}
                </span>
              ` : ''}
            </p>
          </div>
          ${quest.diceRequired ? `
            <div class="quest-dice-required">
              <span>🎲</span>
              Dice Roll Required
            </div>
          ` : ''}
        </div>
        
        <div class="quest-description">
          <p>${quest.description}</p>
        </div>
        
        <div class="quest-focus-grid">
          <div class="focus-box primary">
            <p class="focus-label">Primary Focus</p>
            <p class="focus-value">${quest.primaryFocus} • ${quest.primaryHours}h</p>
          </div>
          <div class="focus-box secondary">
            <p class="focus-label">Secondary Focus</p>
            <p class="focus-value">${quest.secondaryFocus} • ${quest.secondaryHours}h</p>
          </div>
        </div>
    `;
    
    // Add detailed content sections if available
    html += this.buildDetailedContent(quest);
    
    // Add dice roll section if required
    if (quest.diceRequired) {
      html += this.buildDiceRollSection(quest);
    }
    
    // Add action buttons
    html += `
        <div class="quest-screen-actions">
          <button id="back-to-quest-list" class="quest-button secondary">
            Back to Quest List
          </button>
          <button id="start-quest-button" class="quest-button primary">
            ${quest.diceRequired && !this.hasRolledDice(quest.id) 
              ? 'Roll Dice & Start Quest' 
              : 'Start Quest'}
          </button>
        </div>
      </div>
    `;
    
    // Set the container HTML
    container.innerHTML = html;
    
    // Show quest detail container, hide quest list
    document.getElementById('quest-list')?.classList.add('hidden');
    container.classList.remove('hidden');
    
    // Add event listeners
    document.getElementById('back-to-quest-list')?.addEventListener('click', () => {
      StateService.updateState('ui.currentView', 'list');
      document.getElementById('quest-list').classList.remove('hidden');
      container.classList.add('hidden');
    });
    
    document.getElementById('start-quest-button')?.addEventListener('click', () => {
      if (quest.diceRequired && !this.hasRolledDice(quest.id)) {
        this.rollDiceForQuest(quest);
      } else {
        this.startQuest(quest);
      }
    });
    
    // Add expand/collapse functionality to sections
    document.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('collapsed');
        header.classList.toggle('collapsed');
      });
    });
    
    console.log('Quest detail rendering complete');
  },
  
  // Build detailed content sections
  buildDetailedContent(quest) {
    if (!quest.learningObjectives && 
        !quest.equipmentNeeded && 
        !quest.contentSections) {
      return ''; // No enhanced content available
    }
    
    let html = '<div class="detailed-quest-content">';
    
    // Learning Objectives
    if (quest.learningObjectives && quest.learningObjectives.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Learning Objectives</h3>
          <div class="section-content">
            <ul class="objective-list">
              ${quest.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
    
    // Equipment Needed
    if (quest.equipmentNeeded && quest.equipmentNeeded.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Equipment Needed</h3>
          <div class="section-content">
            <ul class="equipment-list">
              ${quest.equipmentNeeded.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
    
    // Content Sections
    if (quest.contentSections && quest.contentSections.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Instructions</h3>
          <div class="section-content">
            ${quest.contentSections.map(section => `
              <div class="content-section">
                <h4 class="content-section-title">${section.title}</h4>
                ${section.subsections.map(subsection => `
                  <div class="content-subsection">
                    <h5 class="subsection-title">${subsection.subtitle}</h5>
                    <div class="subsection-content">
                      <p>${subsection.content}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Practical Exercises
    if (quest.practicalExercises && quest.practicalExercises.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Practical Exercises</h3>
          <div class="section-content">
            ${quest.practicalExercises.map(exercise => `
              <div class="exercise">
                <h4 class="exercise-title">${exercise.title}</h4>
                <ol class="exercise-steps">
                  ${exercise.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Tips for Success
    if (quest.tipsForSuccess && quest.tipsForSuccess.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Tips for Success</h3>
          <div class="section-content">
            <ul class="tips-list">
              ${quest.tipsForSuccess.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
    
    // Completion Checklist
    if (quest.completionChecklist && quest.completionChecklist.length > 0) {
      html += `
        <div class="quest-section">
          <h3 class="section-header">Completion Checklist</h3>
          <div class="section-content">
            <div class="checklist">
              ${quest.completionChecklist.map(item => `
                <div class="checklist-item">
                  <input type="checkbox" id="check-${item.replace(/\s+/g, '-')}" class="checklist-checkbox">
                  <label for="check-${item.replace(/\s+/g, '-')}">${item}</label>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  },
  
  // Build dice roll section
  buildDiceRollSection(quest) {
    // Check if dice have already been rolled
    const state = StateService.getState();
    const rolls = state.quests.questRolls && state.quests.questRolls[quest.id];
    
    if (rolls) {
      // Show existing roll results
      return `
        <div class="dice-roll-section">
          <h4>Your Dice Roll Results:</h4>
          <ul class="dice-results">
            ${Object.entries(rolls).map(([key, value]) => `
              <li><strong>${key}:</strong> ${value}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    
    // Placeholder for future roll
    return `
      <div class="dice-roll-section">
        <h4>Dice Roll Required</h4>
        <p>This quest uses dice mechanics to add variety to your cooking experience. 
        Click "Roll Dice & Start Quest" to generate your unique combination.</p>
      </div>
    `;
  },
  
  // Check if dice have been rolled for a quest
  hasRolledDice(questId) {
    const state = StateService.getState();
    return state.quests.questRolls && state.quests.questRolls[questId];
  },
  
  // Roll dice for a quest
  rollDiceForQuest(quest) {
    console.log(`Rolling dice for quest: ${quest.id}`);
    
    // Example dice roll implementation
    const diceResult = {
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
      timePressure: ['Relaxed', 'Normal', 'Rushed'][Math.floor(Math.random() * 3)],
      surprise: ['None', 'Minor Twist', 'Major Twist'][Math.floor(Math.random() * 3)]
    };
    
    // Update state with dice result
    const state = StateService.getState();
    const questRolls = { ...(state.quests.questRolls || {}) };
    questRolls[quest.id] = diceResult;
    
    StateService.updateState('quests.questRolls', questRolls);
    
    // Start the quest
    this.startQuest(quest);
  },
  
  // Start a quest
  startQuest(quest) {
    console.log(`Starting quest: ${quest.id}`);
    
    // For now, just show an alert
    alert(`Starting quest: ${quest.questName}`);
    
    // In a complete implementation, you would show the cooking mode UI
    // this.showCookingMode(quest);
  }
};
