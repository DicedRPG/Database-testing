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
        Router.navigate('home');
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

    // Hide the spinner
    const spinner = document.querySelector('#quest-detail-container .loading-spinner');
if (spinner) {
  spinner.style.display = 'none';
}

    // Update breadcrumb with quest name
    // Just delete this if failure occurs
const questNameElement = document.getElementById('current-quest-name');
if (questNameElement && quest) {
  questNameElement.textContent = quest.questName;
}
    
    // Show quest detail container, hide quest list
    document.getElementById('quest-list')?.classList.add('hidden');
    container.classList.remove('hidden');
    
    // Add event listeners
    document.getElementById('back-to-quest-list')?.addEventListener('click', () => {
  Router.navigate('home');
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
  
 // Start a quest - Show cooking mode UI
startQuest(quest) {
  console.log(`Starting quest: ${quest.id}`);
  
  // Display cooking mode interface
  this.showCookingMode(quest);
},

// Show cooking mode interface with step-by-step guidance
showCookingMode(quest) {
  console.log(`Showing cooking mode for quest: ${quest.id}`);
  
  const container = document.getElementById('current-quest');
  if (!container) return;
  
  // Get dice rolls if applicable
  const state = StateService.getState();
  const rolls = state.quests.questRolls && state.quests.questRolls[quest.id] || {};
  
  // Prepare cooking steps
  let steps = [];
  
  // Use the contentSections from enhanced quest data if available
  if (quest.contentSections && quest.contentSections.length > 0) {
    // Transform content sections into cooking steps
    steps = quest.contentSections.map(section => {
      return {
        title: section.title,
        instructions: section.subsections.map(subsection => subsection.subtitle)
      };
    });
  } else {
    // Fallback to generic steps based on quest type
    if (quest.type === 'Main') {
      steps = [
        { title: 'Preparation', instructions: ['Gather all ingredients', 'Prepare your workspace'] },
        { title: 'Main Step', instructions: ['Follow the recipe guidelines'] },
        { title: 'Completion', instructions: ['Plate your dish', 'Clean your workspace'] }
      ];
    } else if (quest.type === 'Side') {
      steps = [
        { title: 'Preparation', instructions: ['Gather all ingredients'] },
        { title: 'Cooking', instructions: ['Follow the recipe guidelines'] }
      ];
    } else {
      steps = [
        { title: 'Preparation', instructions: ['Get ready for the training exercise'] },
        { title: 'Practice', instructions: ['Practice the technique described'] }
      ];
    }
  }
  
  // Show cooking mode UI
  container.innerHTML = `
    <div class="cooking-mode">
      <div class="cooking-header">
        <h2>${quest.questName}</h2>
        <p>Follow these steps to complete your quest</p>
      </div>
      
      ${Object.keys(rolls).length > 0 ? `
        <div class="roll-results">
          <h3>Your Roll Results:</h3>
          <ul>
            ${Object.entries(rolls).map(([key, value]) => 
              `<li><strong>${key}:</strong> ${value}</li>`
            ).join('')}
          </ul>
        </div>
      ` : ''}
      
      <div class="cooking-steps-container">
        <div class="cooking-steps-nav">
          ${steps.map((step, index) => `
            <div class="step-nav-item" data-step="${index}">
              <div class="step-number">${index + 1}</div>
              <div class="step-nav-title">${step.title}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="cooking-steps-content">
          ${steps.map((step, index) => `
            <div class="cooking-step" data-step="${index}" ${index > 0 ? 'style="display: none;"' : ''}>
              <h3>Step ${index + 1}: ${step.title}</h3>
              <div class="step-instructions">
                <ul>
                  ${step.instructions.map(instruction => 
                    `<li class="instruction-item">
                      <input type="checkbox" class="instruction-checkbox">
                      <span class="instruction-text">${instruction}</span>
                    </li>`
                  ).join('')}
                </ul>
              </div>
              
              ${index < steps.length - 1 ? `
                <button class="next-step-button quest-button primary">Next Step</button>
              ` : ''}
              
              ${index > 0 ? `
                <button class="prev-step-button quest-button secondary">Previous Step</button>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="cooking-actions">
        <button id="back-to-details" class="quest-button secondary">Back to Details</button>
        <button id="complete-quest" class="quest-button primary">Complete Quest</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  document.getElementById('back-to-details').addEventListener('click', () => {
    this.render(quest.id);
  });
  
  document.getElementById('complete-quest').addEventListener('click', () => {
    this.showCompletionScreen(quest);
  });
  
  // Add navigation functionality for next buttons
  document.querySelectorAll('.next-step-button').forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.cooking-step');
      const stepIndex = parseInt(currentStep.dataset.step);
      const nextStep = document.querySelector(`.cooking-step[data-step="${stepIndex + 1}"]`);
      
      currentStep.style.display = 'none';
      nextStep.style.display = 'block';
      
      // Update nav highlight
      document.querySelectorAll('.step-nav-item').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector(`.step-nav-item[data-step="${stepIndex + 1}"]`).classList.add('active');
    });
  });
  
  // Add navigation functionality for previous buttons
  document.querySelectorAll('.prev-step-button').forEach(button => {
    button.addEventListener('click', () => {
      const currentStep = button.closest('.cooking-step');
      const stepIndex = parseInt(currentStep.dataset.step);
      const prevStep = document.querySelector(`.cooking-step[data-step="${stepIndex - 1}"]`);
      
      currentStep.style.display = 'none';
      prevStep.style.display = 'block';
      
      // Update nav highlight
      document.querySelectorAll('.step-nav-item').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector(`.step-nav-item[data-step="${stepIndex - 1}"]`).classList.add('active');
    });
  });
  
  // Make step nav items clickable
  document.querySelectorAll('.step-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const stepIndex = parseInt(item.dataset.step);
      
      // Hide all steps
      document.querySelectorAll('.cooking-step').forEach(step => {
        step.style.display = 'none';
      });
      
      // Show selected step
      document.querySelector(`.cooking-step[data-step="${stepIndex}"]`).style.display = 'block';
      
      // Update nav highlight
      document.querySelectorAll('.step-nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
    });
  });
  
  // Highlight first step nav item
  document.querySelector('.step-nav-item[data-step="0"]').classList.add('active');
},

// Show completion screen for quest
showCompletionScreen(quest) {
  console.log(`Showing completion screen for quest: ${quest.id}`);
  
  // Honor system completion
  const container = document.getElementById('current-quest');
  if (!container) return;
  
  // Get completion checklist
  const checklist = quest.completionChecklist || [];
  
  container.innerHTML = `
    <div class="quest-completion">
      <h2>Quest Complete: ${quest.questName}</h2>
      
      <div class="completion-assessment">
        <h3>How did it go?</h3>
        
        <div class="completion-options">
          <label class="completion-option">
            <input type="radio" name="completion-level" value="mastered" checked>
            <span>Mastered it! (100% reward)</span>
          </label>
          
          <label class="completion-option">
            <input type="radio" name="completion-level" value="wellDone">
            <span>Did well, need practice (80% reward)</span>
          </label>
          
          <label class="completion-option">
            <input type="radio" name="completion-level" value="struggled">
            <span>Struggled but completed (60% reward)</span>
          </label>
        </div>
      </div>
      
      ${checklist.length > 0 ? `
        <div class="completion-checklist">
          <h3>Completion Checklist Review</h3>
          <p>Check off the items you completed:</p>
          <div class="checklist-review">
            ${checklist.map((item, index) => `
              <div class="checklist-review-item">
                <input type="checkbox" id="complete-check-${index}" class="checklist-checkbox">
                <label for="complete-check-${index}">${item}</label>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div class="completion-notes">
        <h3>Notes (optional):</h3>
        <textarea id="completion-notes" placeholder="Add your reflections here..."></textarea>
      </div>
      
      <div class="completion-actions">
        <button id="back-to-cooking" class="quest-button secondary">Back</button>
        <button id="confirm-completion" class="quest-button primary">Confirm Completion</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  document.getElementById('back-to-cooking').addEventListener('click', () => {
    this.showCookingMode(quest);
  });
  
  document.getElementById('confirm-completion').addEventListener('click', () => {
    const completionLevel = document.querySelector('input[name="completion-level"]:checked').value;
    const notes = document.getElementById('completion-notes').value;
    
    // Gather checked items from checklist
    const checkedItems = [];
    document.querySelectorAll('.checklist-review-item input:checked').forEach(checkbox => {
      const label = checkbox.nextElementSibling.textContent;
      checkedItems.push(label);
    });
    
    // Create completion details
    const completionDetails = {
      completionLevel,
      notes,
      checkedItems,
      completedAt: new Date().toISOString()
    };
    
    // Call QuestController to handle quest completion
    QuestController.completeQuest(quest.id, completionDetails);
  });
}
};
