// admin.js
// Main script for the quest admin interface

// Initialize the admin controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    AdminController.initialize();
});

// Admin Controller - Main controller for the admin interface
const AdminController = {
    // State variables
    currentPanel: 'dashboard-panel',
    quests: [],
    stages: [],
    questTypes: [],
    currentPage: 1,
    itemsPerPage: 15,
    filteredQuests: [],
    currentFilter: {
        search: '',
        stage: '',
        type: ''
    },
    currentEditingQuest: null,
    templates: {},

    // Initialize the admin interface
    async initialize() {
        console.log('Initializing admin interface...');
        
        try {
            // Initialize the database
            await questDatabase.initialize();
            
            // Set up navigation
            this.setupNavigation();
            
            // Load quest data
            await this.loadQuestData();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize the quest form
            this.initializeQuestForm();
            
            // Update dashboard stats
            this.updateDashboardStats();
            
            // Show the dashboard panel by default
            this.showPanel('dashboard-panel');
            
            console.log('Admin interface initialized successfully');
        } catch (error) {
            console.error('Failed to initialize admin interface:', error);
            this.showNotification('Failed to initialize admin interface. Please check the console for details.', 'error');
        }
    },

    // Set up navigation between panels
    setupNavigation() {
        document.getElementById('nav-dashboard').addEventListener('click', () => {
            this.showPanel('dashboard-panel');
            this.updateDashboardStats();
        });
        
        document.getElementById('nav-quest-manager').addEventListener('click', () => {
            this.showPanel('quest-manager-panel');
            this.renderQuestTable();
        });
        
        document.getElementById('nav-back-to-app').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    },

    // Load quest data from the database
    async loadQuestData() {
        console.log('Loading quest data...');
        
        // Get all quests
        this.quests = await questDatabase.getAllQuests();
        
        // Get unique stages
        this.stages = await questDatabase.getStages();
        
        // Get unique quest types
        this.questTypes = await questDatabase.getQuestTypes();
        
        // Initialize filtered quests
        this.filteredQuests = [...this.quests];
        
        // Populate filter dropdowns
        this.populateFilterDropdowns();
        
        console.log(`Loaded ${this.quests.length} quests`);
    },

    // Set up event listeners for actions
    setupEventListeners() {
        // Dashboard panel actions
        document.getElementById('export-all-quests').addEventListener('click', () => this.exportQuests());
        document.getElementById('import-quests').addEventListener('click', () => this.showImportModal());
        document.getElementById('create-new-quest').addEventListener('click', () => this.showQuestEditor());
        document.getElementById('manage-quests').addEventListener('click', () => {
            this.showPanel('quest-manager-panel');
            this.renderQuestTable();
        });
        
        // Quest manager panel actions
        document.getElementById('search-button').addEventListener('click', () => this.filterQuests());
        document.getElementById('quest-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.filterQuests();
        });
        document.getElementById('reset-filters').addEventListener('click', () => this.resetFilters());
        document.getElementById('create-quest').addEventListener('click', () => this.showQuestEditor());
        document.getElementById('export-filtered').addEventListener('click', () => this.exportQuests(this.filteredQuests));
        document.getElementById('stage-filter').addEventListener('change', () => this.filterQuests());
        document.getElementById('type-filter').addEventListener('change', () => this.filterQuests());
        document.getElementById('prev-page').addEventListener('click', () => this.changePage(-1));
        document.getElementById('next-page').addEventListener('click', () => this.changePage(1));
        
        // Quest editor panel actions
        document.getElementById('back-to-quests').addEventListener('click', () => {
            this.showPanel('quest-manager-panel');
            this.renderQuestTable();
        });
        document.getElementById('cancel-quest-edit').addEventListener('click', () => {
            this.showPanel('quest-manager-panel');
            this.renderQuestTable();
        });
        document.getElementById('save-as-template').addEventListener('click', () => this.saveAsTemplate());
        
        // Form field event listeners
        document.getElementById('is-milestone').addEventListener('change', function() {
            const milestoneOptions = document.querySelectorAll('.milestone-option');
            milestoneOptions.forEach(option => {
                option.classList.toggle('visible', this.checked);
            });
        });
        
        // Quest form submission
        document.getElementById('quest-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveQuest();
        });
        
        // Add item buttons
        document.getElementById('add-learning-objective').addEventListener('click', () => this.addArrayItem('learning-objectives-container'));
        document.getElementById('add-equipment').addEventListener('click', () => this.addArrayItem('equipment-needed-container'));
        document.getElementById('add-checklist-item').addEventListener('click', () => this.addArrayItem('completion-checklist-container'));
        document.getElementById('add-tip').addEventListener('click', () => this.addArrayItem('tips-container'));
        document.getElementById('add-content-section').addEventListener('click', () => this.addContentSection());
        document.getElementById('add-practical-exercise').addEventListener('click', () => this.addPracticalExercise());
        
        // Import modal actions
        document.getElementById('close-import-modal').addEventListener('click', () => this.closeImportModal());
        document.getElementById('cancel-import').addEventListener('click', () => this.closeImportModal());
        document.getElementById('import-json-file').addEventListener('change', (e) => this.handleImportFileSelection(e));
        document.getElementById('confirm-import').addEventListener('click', () => this.importQuests());
    },

    // Initialize the quest form with default values and templates
    initializeQuestForm() {
        // Create references to the templates
        const contentSectionTemplate = document.querySelector('.content-section-template');
        const exerciseTemplate = document.querySelector('.exercise-template');
        
        // Remove the template classes to prevent them from being submitted
        contentSectionTemplate.classList.remove('content-section-template');
        exerciseTemplate.classList.remove('exercise-template');
        
        // Store templates for later use
        this.templates.contentSection = contentSectionTemplate.outerHTML;
        this.templates.exercise = exerciseTemplate.outerHTML;
        
        // Remove the templates from the DOM
        contentSectionTemplate.remove();
        exerciseTemplate.remove();
        
        // Set up event delegation for dynamic content
        document.addEventListener('click', (e) => {
            // Handle remove item buttons
            if (e.target.classList.contains('remove-item')) {
                const item = e.target.closest('.array-field-item');
                if (item && item.parentNode.children.length > 1) {
                    item.remove();
                }
            }
            
            // Handle remove section buttons
            if (e.target.classList.contains('remove-section')) {
                const section = e.target.closest('.complex-field-item');
                if (section) {
                    section.remove();
                    this.updateSectionIndices('content-sections-container', 'section-index');
                }
            }
            
            // Handle remove exercise buttons
            if (e.target.classList.contains('remove-exercise')) {
                const exercise = e.target.closest('.complex-field-item');
                if (exercise) {
                    exercise.remove();
                    this.updateSectionIndices('practical-exercises-container', 'exercise-index');
                }
            }
            
            // Handle remove subsection buttons
            if (e.target.classList.contains('remove-subsection')) {
                const subsection = e.target.closest('.subsection-item');
                if (subsection && subsection.parentNode.children.length > 1) {
                    subsection.remove();
                }
            }
            
            // Handle add subsection buttons
            if (e.target.classList.contains('add-subsection')) {
                const section = e.target.closest('.complex-field-item');
                const subsectionsContainer = section.querySelector('.subsections-container');
                const sectionIndex = Array.from(section.parentNode.children).indexOf(section);
                const subsectionItem = document.createElement('div');
                subsectionItem.className = 'subsection-item';
                subsectionItem.innerHTML = `
                    <div class="form-group">
                        <label>Subtitle:</label>
                        <input type="text" name="contentSections[${sectionIndex}].subsections[${subsectionsContainer.querySelectorAll('.subsection-item').length}].subtitle" class="subsection-subtitle" required>
                    </div>
                    <div class="form-group">
                        <label>Content:</label>
                        <textarea name="contentSections[${sectionIndex}].subsections[${subsectionsContainer.querySelectorAll('.subsection-item').length}].content" class="subsection-content" rows="3" required></textarea>
                    </div>
                    <button type="button" class="remove-subsection">Remove Subsection</button>
                `;
                subsectionsContainer.appendChild(subsectionItem);
            }
            
            // Handle add step buttons
            if (e.target.classList.contains('add-step')) {
                const exercise = e.target.closest('.complex-field-item');
                const stepsContainer = exercise.querySelector('.array-field-container');
                const exerciseIndex = Array.from(exercise.parentNode.children).indexOf(exercise);
                const stepItem = document.createElement('div');
                stepItem.className = 'array-field-item';
                stepItem.innerHTML = `
                    <input type="text" name="practicalExercises[${exerciseIndex}].steps[]" class="array-field-input" placeholder="Enter a step">
                    <button type="button" class="remove-item">×</button>
                `;
                stepsContainer.appendChild(stepItem);
            }
        });
    },

    // Show a specific panel
    showPanel(panelId) {
        // Hide all panels
        document.querySelectorAll('.admin-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show the selected panel
        document.getElementById(panelId).classList.add('active');
        
        // Update navigation buttons
        document.querySelectorAll('.admin-nav-button').forEach(button => {
            button.classList.remove('active');
        });
        
        // Determine which nav button to highlight
        if (panelId === 'dashboard-panel') {
            document.getElementById('nav-dashboard').classList.add('active');
        } else if (panelId === 'quest-manager-panel' || panelId === 'quest-editor-panel') {
            document.getElementById('nav-quest-manager').classList.add('active');
        }
        
        this.currentPanel = panelId;
    },

    // Update dashboard statistics
    async updateDashboardStats() {
        // Update quests count
        document.getElementById('total-quests').textContent = this.quests.length;
        
        // Update stages count
        document.getElementById('total-stages').textContent = this.stages.length;
        
        // Update quest types count
        document.getElementById('total-types').textContent = this.questTypes.length;
    },

    // Populate filter dropdowns with available options
    populateFilterDropdowns() {
        const stageFilter = document.getElementById('stage-filter');
        const typeFilter = document.getElementById('type-filter');
        
        // Clear existing options (keeping the default)
        while (stageFilter.options.length > 1) {
            stageFilter.remove(1);
        }
        
        while (typeFilter.options.length > 1) {
            typeFilter.remove(1);
        }
        
        // Add stage options
        this.stages.forEach(stage => {
            const option = document.createElement('option');
            option.value = stage.id;
            option.textContent = stage.name;
            stageFilter.appendChild(option);
        });
        
        // Add type options
        this.questTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
    },

    // Filter quests based on search and filter criteria
    filterQuests() {
        const searchQuery = document.getElementById('quest-search').value.toLowerCase();
        const stageFilter = document.getElementById('stage-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        
        // Update current filter
        this.currentFilter = {
            search: searchQuery,
            stage: stageFilter,
            type: typeFilter
        };
        
        // Apply filters
        this.filteredQuests = this.quests.filter(quest => {
            // Search filter
            if (searchQuery && !quest.questName.toLowerCase().includes(searchQuery) && 
                !quest.description.toLowerCase().includes(searchQuery)) {
                return false;
            }
            
            // Stage filter
            if (stageFilter && quest.stageId !== parseInt(stageFilter)) {
                return false;
            }
            
            // Type filter
            if (typeFilter && quest.type !== typeFilter) {
                return false;
            }
            
            return true;
        });
        
        // Reset to first page and re-render table
        this.currentPage = 1;
        this.renderQuestTable();
    },

    // Reset all filters
    resetFilters() {
        document.getElementById('quest-search').value = '';
        document.getElementById('stage-filter').selectedIndex = 0;
        document.getElementById('type-filter').selectedIndex = 0;
        
        this.currentFilter = {
            search: '',
            stage: '',
            type: ''
        };
        
        this.filteredQuests = [...this.quests];
        this.currentPage = 1;
        this.renderQuestTable();
    },

    // Change the current page in the quest table
    changePage(direction) {
        const totalPages = Math.ceil(this.filteredQuests.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.renderQuestTable();
        }
    },

    // Render the quest table with current filters and pagination
    renderQuestTable() {
        const tableBody = document.getElementById('quest-table-body');
        const totalQuests = this.filteredQuests.length;
        const totalPages = Math.ceil(totalQuests / this.itemsPerPage);
        
        // Calculate start and end indices for the current page
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, totalQuests);
        
        // Clear the table body
        tableBody.innerHTML = '';
        
        // Display quests for the current page
        for (let i = startIndex; i < endIndex; i++) {
            const quest = this.filteredQuests[i];
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${quest.id}</td>
                <td>${quest.questName}</td>
                <td>${quest.type}</td>
                <td>Stage ${quest.stageId}: ${quest.stageName}</td>
                <td>${quest.primaryFocus}</td>
                <td>
                    <div class="quest-actions">
                        <button class="action-icon edit-icon" data-id="${quest.id}" title="Edit Quest">✏️</button>
                        <button class="action-icon clone-icon" data-id="${quest.id}" title="Clone Quest">📋</button>
                        <button class="action-icon delete-icon" data-id="${quest.id}" title="Delete Quest">🗑️</button>
                    </div>
                </td>
            `;
            
            // Add event listeners to action buttons
            row.querySelector('.edit-icon').addEventListener('click', () => this.editQuest(quest.id));
            row.querySelector('.clone-icon').addEventListener('click', () => this.cloneQuest(quest.id));
            row.querySelector('.delete-icon').addEventListener('click', () => this.deleteQuest(quest.id));
            
            tableBody.appendChild(row);
        }
        
        // Update pagination information
        document.getElementById('page-info').textContent = `Page ${this.currentPage} of ${totalPages}`;
        
        // Update pagination buttons
        document.getElementById('prev-page').disabled = this.currentPage <= 1;
        document.getElementById('next-page').disabled = this.currentPage >= totalPages;
        
        // Display "no results" message if no quests match the filters
        if (totalQuests === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 20px;">
                    No quests found matching the current filters.
                </td>
            `;
            tableBody.appendChild(emptyRow);
        }
    },

    // Show the quest editor for creating a new quest
    showQuestEditor(questId = null) {
        this.showPanel('quest-editor-panel');
        
        const editorTitle = document.getElementById('editor-title');
        const form = document.getElementById('quest-form');
        
        // Reset the form
        form.reset();
        
        // Clear dynamic fields
        this.clearDynamicFields();
        
        if (questId) {
            // Editing an existing quest
            const quest = this.quests.find(q => q.id === questId);
            this.currentEditingQuest = quest;
            
            editorTitle.textContent = `Edit Quest: ${quest.questName}`;
            
            // Populate the form with quest data
            this.populateQuestForm(quest);
        } else {
            // Creating a new quest
            this.currentEditingQuest = null;
            
            editorTitle.textContent = 'Create New Quest';
            
            // Generate a new ID for the quest (max ID + 1)
            const maxId = Math.max(...this.quests.map(q => q.id), 0);
            document.getElementById('quest-id').value = maxId + 1;
            
            // Add default array items
            this.addArrayItem('learning-objectives-container');
            this.addArrayItem('equipment-needed-container');
            this.addArrayItem('completion-checklist-container');
            this.addArrayItem('tips-container');
            
            // Add default content section
            this.addContentSection();
            
            // Add default practical exercise
            this.addPracticalExercise();
        }
    },

    // Clear all dynamic fields in the form
    clearDynamicFields() {
        const containers = [
            'learning-objectives-container',
            'equipment-needed-container',
            'completion-checklist-container',
            'tips-container',
            'content-sections-container',
            'practical-exercises-container'
        ];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
        });
    },

    // Populate the quest form with data from an existing quest
    populateQuestForm(quest) {
        // Populate basic fields
        document.getElementById('quest-id').value = quest.id;
        document.getElementById('quest-name').value = quest.questName;
        document.getElementById('quest-description').value = quest.description;
        document.getElementById('quest-rank').value = quest.rank;
        document.getElementById('quest-stage').value = quest.stageId;
        document.getElementById('quest-stage-name').value = quest.stageName;
        document.getElementById('quest-type').value = quest.type;
        document.getElementById('primary-focus').value = quest.primaryFocus;
        document.getElementById('primary-hours').value = quest.primaryHours;
        document.getElementById('secondary-focus').value = quest.secondaryFocus;
        document.getElementById('secondary-hours').value = quest.secondaryHours;
        document.getElementById('dice-required').checked = quest.diceRequired;
        
        // Populate milestone fields
        const isMilestone = document.getElementById('is-milestone');
        isMilestone.checked = quest.milestone || false;
        
        const milestoneOptions = document.querySelectorAll('.milestone-option');
        milestoneOptions.forEach(option => {
            option.classList.toggle('visible', isMilestone.checked);
        });
        
        if (quest.unlocksStage) {
            document.getElementById('unlocks-stage').value = quest.unlocksStage;
        }
        
        if (quest.unlockMessage) {
            document.getElementById('unlock-message').value = quest.unlockMessage;
        }
        
        // Populate array fields
        this.populateArrayField('learning-objectives-container', quest.learningObjectives || []);
        this.populateArrayField('equipment-needed-container', quest.equipmentNeeded || []);
        this.populateArrayField('completion-checklist-container', quest.completionChecklist || []);
        this.populateArrayField('tips-container', quest.tipsForSuccess || []);
        
        // Populate content sections
        this.populateContentSections(quest.contentSections || []);
        
        // Populate practical exercises
        this.populatePracticalExercises(quest.practicalExercises || []);
    },

    // Populate an array field with values
    populateArrayField(containerId, values) {
        const container = document.getElementById(containerId);
        
        // Create at least one empty item if the array is empty
        if (values.length === 0) {
            values = [''];
        }
        
        values.forEach(value => {
            const item = document.createElement('div');
            item.className = 'array-field-item';
            
            const fieldName = containerId === 'learning-objectives-container' ? 'learningObjectives[]' :
                              containerId === 'equipment-needed-container' ? 'equipmentNeeded[]' :
                              containerId === 'completion-checklist-container' ? 'completionChecklist[]' :
                              'tipsForSuccess[]';
            
            item.innerHTML = `
                <input type="text" name="${fieldName}" class="array-field-input" value="${this.escapeHtml(value)}">
                <button type="button" class="remove-item">×</button>
            `;
            
            container.appendChild(item);
        });
    },

    // Populate content sections
    populateContentSections(sections) {
        const container = document.getElementById('content-sections-container');
        
        // Create at least one empty section if none exist
        if (sections.length === 0) {
            this.addContentSection();
            return;
        }
        
        sections.forEach((section, sectionIndex) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'complex-field-item';
            sectionElement.innerHTML = `
                <div class="complex-field-header">
                    <h4>Section <span class="section-index">${sectionIndex + 1}</span></h4>
                    <button type="button" class="remove-section">Remove Section</button>
                </div>
                
                <div class="form-group">
                    <label>Section Title:</label>
                    <input type="text" name="contentSections[${sectionIndex}].title" class="section-title" value="${this.escapeHtml(section.title)}" required>
                </div>
                
                <div class="subsections-container">
                    <h5>Subsections</h5>
                </div>
                
                <button type="button" class="add-subsection">Add Subsection</button>
            `;
            
            container.appendChild(sectionElement);
            
            // Add subsections
            const subsectionsContainer = sectionElement.querySelector('.subsections-container');
            
            section.subsections.forEach((subsection, subsectionIndex) => {
                const subsectionElement = document.createElement('div');
                subsectionElement.className = 'subsection-item';
                subsectionElement.innerHTML = `
                    <div class="form-group">
                        <label>Subtitle:</label>
                        <input type="text" name="contentSections[${sectionIndex}].subsections[${subsectionIndex}].subtitle" class="subsection-subtitle" value="${this.escapeHtml(subsection.subtitle)}" required>
                    </div>
                    <div class="form-group">
                        <label>Content:</label>
                        <textarea name="contentSections[${sectionIndex}].subsections[${subsectionIndex}].content" class="subsection-content" rows="3" required>${this.escapeHtml(subsection.content)}</textarea>
                    </div>
                    <button type="button" class="remove-subsection">Remove Subsection</button>
                `;
                
                subsectionsContainer.appendChild(subsectionElement);
            });
        });
    },

    // Populate practical exercises
    populatePracticalExercises(exercises) {
        const container = document.getElementById('practical-exercises-container');
        
        // Create at least one empty exercise if none exist
        if (exercises.length === 0) {
            this.addPracticalExercise();
            return;
        }
        
        exercises.forEach((exercise, exerciseIndex) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'complex-field-item';
            exerciseElement.innerHTML = `
                <div class="complex-field-header">
                    <h4>Exercise <span class="exercise-index">${exerciseIndex + 1}</span></h4>
                    <button type="button" class="remove-exercise">Remove Exercise</button>
                </div>
                
                <div class="form-group">
                    <label>Exercise Title:</label>
                    <input type="text" name="practicalExercises[${exerciseIndex}].title" class="exercise-title" value="${this.escapeHtml(exercise.title)}" required>
                </div>
                
                <div class="steps-container">
                    <h5>Steps</h5>
                    <div class="array-field-container">
                    </div>
                    <button type="button" class="add-step">Add Step</button>
                </div>
            `;
            
            container.appendChild(exerciseElement);
            
            // Add steps
            const stepsContainer = exerciseElement.querySelector('.array-field-container');
            
            exercise.steps.forEach((step, stepIndex) => {
                const stepElement = document.createElement('div');
                stepElement.className = 'array-field-item';
                stepElement.innerHTML = `
                    <input type="text" name="practicalExercises[${exerciseIndex}].steps[]" class="array-field-input" value="${this.escapeHtml(step)}">
                    <button type="button" class="remove-item">×</button>
                `;
                
                stepsContainer.appendChild(stepElement);
            });
        });
    },

    // Add a new item to an array field
    addArrayItem(containerId) {
        const container = document.getElementById(containerId);
        const item = document.createElement('div');
        item.className = 'array-field-item';
        
        const fieldName = containerId === 'learning-objectives-container' ? 'learningObjectives[]' :
                          containerId === 'equipment-needed-container' ? 'equipmentNeeded[]' :
                          containerId === 'completion-checklist-container' ? 'completionChecklist[]' :
                          'tipsForSuccess[]';
        
        const placeholder = containerId === 'learning-objectives-container' ? 'Enter a learning objective' :
                            containerId === 'equipment-needed-container' ? 'Enter equipment item' :
                            containerId === 'completion-checklist-container' ? 'Enter a checklist item' :
                            'Enter a tip';
        
        item.innerHTML = `
            <input type="text" name="${fieldName}" class="array-field-input" placeholder="${placeholder}">
            <button type="button" class="remove-item">×</button>
        `;
        
        container.appendChild(item);
    },

    // Add a new content section
    addContentSection() {
        const container = document.getElementById('content-sections-container');
        const sectionCount = container.children.length;
        
        // Create a new section from template
        const sectionHtml = this.templates.contentSection.replace(/\[0\]/g, `[${sectionCount}]`);
        container.insertAdjacentHTML('beforeend', sectionHtml);
        
        // Update section number
        const newSection = container.lastElementChild;
        newSection.querySelector('.section-index').textContent = sectionCount + 1;
        
        // Add initial subsection
        const subsectionsContainer = newSection.querySelector('.subsections-container');
        const subsectionItem = document.createElement('div');
        subsectionItem.className = 'subsection-item';
        subsectionItem.innerHTML = `
            <div class="form-group">
                <label>Subtitle:</label>
                <input type="text" name="contentSections[${sectionCount}].subsections[0].subtitle" class="subsection-subtitle" required>
            </div>
            <div class="form-group">
                <label>Content:</label>
                <textarea name="contentSections[${sectionCount}].subsections[0].content" class="subsection-content" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-subsection">Remove Subsection</button>
        `;
        subsectionsContainer.appendChild(subsectionItem);
    },

    // Add a new practical exercise
    addPracticalExercise() {
        const container = document.getElementById('practical-exercises-container');
        const exerciseCount = container.children.length;
        
        // Create a new exercise from template
        const exerciseHtml = this.templates.exercise.replace(/\[0\]/g, `[${exerciseCount}]`);
        container.insertAdjacentHTML('beforeend', exerciseHtml);
        
        // Update exercise number
        const newExercise = container.lastElementChild;
        newExercise.querySelector('.exercise-index').textContent = exerciseCount + 1;
        
        // Add initial step
        const stepsContainer = newExercise.querySelector('.array-field-container');
        const stepItem = document.createElement('div');
        stepItem.className = 'array-field-item';
        stepItem.innerHTML = `
            <input type="text" name="practicalExercises[${exerciseCount}].steps[]" class="array-field-input" placeholder="Enter a step">
            <button type="button" class="remove-item">×</button>
        `;
        stepsContainer.appendChild(stepItem);
    },

    // Update section indices after removing a section
    updateSectionIndices(containerId, indexClass) {
        const container = document.getElementById(containerId);
        const items = container.children;
        
        for (let i = 0; i < items.length; i++) {
            items[i].querySelector(`.${indexClass}`).textContent = i + 1;
            
            // Update input names
            const inputs = items[i].querySelectorAll('input, textarea');
            inputs.forEach(input => {
                const name = input.getAttribute('name');
                if (name) {
                    const newName = name.replace(/\[\d+\]/, `[${i}]`);
                    input.setAttribute('name', newName);
                }
            });
        }
    },

    // Save the current quest
    async saveQuest() {
        try {
            // Validate form
            if (!this.validateQuestForm()) {
                return;
            }
            
            // Get form data
            const formData = this.getFormData();
            
            // Convert form data to quest object
            const quest = this.formDataToQuest(formData);
            
            // Save to database
            if (this.currentEditingQuest) {
                // Update existing quest
                await questDatabase.updateQuest(quest.id, quest);
                this.showNotification(`Quest "${quest.questName}" updated successfully`, 'success');
                
                // Update quest in the local array
                const index = this.quests.findIndex(q => q.id === quest.id);
                if (index !== -1) {
                    this.quests[index] = quest;
                }
            } else {
                // Add new quest
                await questDatabase.addQuest(quest);
                this.showNotification(`Quest "${quest.questName}" created successfully`, 'success');
                
                // Add quest to the local array
                this.quests.push(quest);
            }
            
            // Refresh filtered quests
            this.filterQuests();
            
            // Show quest manager panel
            this.showPanel('quest-manager-panel');
            
        } catch (error) {
            console.error('Failed to save quest:', error);
            this.showNotification('Failed to save quest. Please check the console for details.', 'error');
        }
    },

    // Validate the quest form
    validateQuestForm() {
        const form = document.getElementById('quest-form');
        
        // Check HTML5 validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        
        // Additional validation if needed
        return true;
    },

    // Get form data as an object
    getFormData() {
        const form = document.getElementById('quest-form');
        const formData = new FormData(form);
        
        // Convert FormData to a more usable object
        const data = {};
        
        formData.forEach((value, key) => {
            // Handle array fields
            if (key.includes('[]')) {
                const cleanKey = key.replace('[]', '');
                if (!data[cleanKey]) {
                    data[cleanKey] = [];
                }
                data[cleanKey].push(value);
            }
            // Handle nested objects (using dot notation)
            else if (key.includes('.')) {
                const parts = key.split('.');
                let obj = data;
                
                for (let i = 0; i < parts.length - 1; i++) {
                    const part = parts[i];
                    
                    // Handle array indices in the key (contentSections[0].title)
                    const match = part.match(/([^\[]+)\[(\d+)\]/);
                    if (match) {
                        const propName = match[1];
                        const index = parseInt(match[2]);
                        
                        if (!obj[propName]) {
                            obj[propName] = [];
                        }
                        
                        if (!obj[propName][index]) {
                            obj[propName][index] = {};
                        }
                        
                        obj = obj[propName][index];
                    } else {
                        if (!obj[part]) {
                            obj[part] = {};
                        }
                        obj = obj[part];
                    }
                }
                
                obj[parts[parts.length - 1]] = value;
            }
            // Handle normal fields
            else {
                data[key] = value;
            }
        });
        
        return data;
    },

    // Convert form data to a quest object
    formDataToQuest(formData) {
        // Create the base quest object
        const quest = {
            id: parseInt(formData.id),
            questName: formData.questName,
            description: formData.description,
            rank: formData.rank,
            stageId: parseInt(formData.stageId),
            stageName: formData.stageName,
            type: formData.type,
            primaryFocus: formData.primaryFocus,
            primaryHours: parseFloat(formData.primaryHours),
            secondaryFocus: formData.secondaryFocus,
            secondaryHours: parseFloat(formData.secondaryHours),
            diceRequired: formData.diceRequired === 'on'
        };
        
        // Add milestone properties if checked
        if (formData.milestone === 'on') {
            quest.milestone = true;
            
            if (formData.unlocksStage) {
                quest.unlocksStage = parseInt(formData.unlocksStage);
            }
            
            if (formData.unlockMessage) {
                quest.unlockMessage = formData.unlockMessage;
            }
        }
        
        // Add array fields
        if (formData.learningObjectives) {
            quest.learningObjectives = Array.isArray(formData.learningObjectives) ? 
                formData.learningObjectives : [formData.learningObjectives];
        }
        
        if (formData.equipmentNeeded) {
            quest.equipmentNeeded = Array.isArray(formData.equipmentNeeded) ? 
                formData.equipmentNeeded : [formData.equipmentNeeded];
        }
        
        if (formData.completionChecklist) {
            quest.completionChecklist = Array.isArray(formData.completionChecklist) ? 
                formData.completionChecklist : [formData.completionChecklist];
        }
        
        if (formData.tipsForSuccess) {
            quest.tipsForSuccess = Array.isArray(formData.tipsForSuccess) ? 
                formData.tipsForSuccess : [formData.tipsForSuccess];
        }
        
        // Add content sections
        if (formData.contentSections) {
            // Ensure contentSections is an array
            quest.contentSections = Array.isArray(formData.contentSections) ? 
                formData.contentSections : [formData.contentSections];
            
            // Process each section
            quest.contentSections.forEach(section => {
                // Ensure subsections is an array
                if (section.subsections && !Array.isArray(section.subsections)) {
                    section.subsections = [section.subsections];
                }
            });
        }
        
        // Add practical exercises
        if (formData.practicalExercises) {
            // Ensure practicalExercises is an array
            quest.practicalExercises = Array.isArray(formData.practicalExercises) ? 
                formData.practicalExercises : [formData.practicalExercises];
            
            // Process each exercise
            quest.practicalExercises.forEach(exercise => {
                // Ensure steps is an array
                if (exercise.steps && !Array.isArray(exercise.steps)) {
                    exercise.steps = [exercise.steps];
                }
            });
        }
        
        return quest;
    },

    // Edit an existing quest
    editQuest(questId) {
        this.showQuestEditor(questId);
    },

    // Clone an existing quest
    async cloneQuest(questId) {
        try {
            // Get the quest to clone
            const originalQuest = this.quests.find(q => q.id === questId);
            
            if (!originalQuest) {
                this.showNotification('Quest not found', 'error');
                return;
            }
            
            // Create a copy of the quest
            const clonedQuest = JSON.parse(JSON.stringify(originalQuest));
            
            // Generate a new ID
            const maxId = Math.max(...this.quests.map(q => q.id), 0);
            clonedQuest.id = maxId + 1;
            
            // Update the name to indicate it's a clone
            clonedQuest.questName = `${originalQuest.questName} (Copy)`;
            
            // Save the cloned quest
            await questDatabase.addQuest(clonedQuest);
            
            // Add to the local array
            this.quests.push(clonedQuest);
            
            // Refresh the quest table
            this.filterQuests();
            
            this.showNotification(`Quest "${originalQuest.questName}" cloned successfully`, 'success');
        } catch (error) {
            console.error('Failed to clone quest:', error);
            this.showNotification('Failed to clone quest. Please check the console for details.', 'error');
        }
    },

    // Delete a quest
    async deleteQuest(questId) {
        try {
            // Confirm deletion
            const quest = this.quests.find(q => q.id === questId);
            const confirmed = confirm(`Are you sure you want to delete the quest "${quest.questName}"? This action cannot be undone.`);
            
            if (!confirmed) {
                return;
            }
            
            // Delete from database
            await questDatabase.deleteQuest(questId);
            
            // Remove from local arrays
            this.quests = this.quests.filter(q => q.id !== questId);
            this.filteredQuests = this.filteredQuests.filter(q => q.id !== questId);
            
            // Refresh the quest table
            this.renderQuestTable();
            
            this.showNotification(`Quest "${quest.questName}" deleted successfully`, 'success');
        } catch (error) {
            console.error('Failed to delete quest:', error);
            this.showNotification('Failed to delete quest. Please check the console for details.', 'error');
        }
    },

    // Save the current form state as a template
    saveAsTemplate() {
        try {
            // Get form data
            const formData = this.getFormData();
            
            // Convert to a template (excluding ID and some other fields)
            const template = {
                questName: formData.questName,
                description: formData.description,
                rank: formData.rank,
                stageId: parseInt(formData.stageId),
                stageName: formData.stageName,
                type: formData.type,
                primaryFocus: formData.primaryFocus,
                primaryHours: parseFloat(formData.primaryHours),
                secondaryFocus: formData.secondaryFocus,
                secondaryHours: parseFloat(formData.secondaryHours),
                diceRequired: formData.diceRequired === 'on'
            };
            
            // Add template fields similar to formDataToQuest
            if (formData.learningObjectives) {
                template.learningObjectives = Array.isArray(formData.learningObjectives) ? 
                    formData.learningObjectives : [formData.learningObjectives];
            }
            
            if (formData.equipmentNeeded) {
                template.equipmentNeeded = Array.isArray(formData.equipmentNeeded) ? 
                    formData.equipmentNeeded : [formData.equipmentNeeded];
            }
            
            if (formData.completionChecklist) {
                template.completionChecklist = Array.isArray(formData.completionChecklist) ? 
                    formData.completionChecklist : [formData.completionChecklist];
            }
            
            if (formData.tipsForSuccess) {
                template.tipsForSuccess = Array.isArray(formData.tipsForSuccess) ? 
                    formData.tipsForSuccess : [formData.tipsForSuccess];
            }
            
            // Add content sections
            if (formData.contentSections) {
                template.contentSections = Array.isArray(formData.contentSections) ? 
                    formData.contentSections : [formData.contentSections];
                
                template.contentSections.forEach(section => {
                    if (section.subsections && !Array.isArray(section.subsections)) {
                        section.subsections = [section.subsections];
                    }
                });
            }
            
            // Add practical exercises
            if (formData.practicalExercises) {
                template.practicalExercises = Array.isArray(formData.practicalExercises) ? 
                    formData.practicalExercises : [formData.practicalExercises];
                
                template.practicalExercises.forEach(exercise => {
                    if (exercise.steps && !Array.isArray(exercise.steps)) {
                        exercise.steps = [exercise.steps];
                    }
                });
            }
            
            // Convert to JSON
            const templateJson = JSON.stringify(template, null, 2);
            
            // Create a download link
            const blob = new Blob([templateJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quest-template-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Template saved successfully', 'success');
        } catch (error) {
            console.error('Failed to save template:', error);
            this.showNotification('Failed to save template. Please check the console for details.', 'error');
        }
    },

    // Export quests to a JSON file
    exportQuests(questsToExport = null) {
        try {
            // Use all quests if none specified
            const quests = questsToExport || this.quests;
            
            // Convert to JSON
            const questsJson = JSON.stringify(quests, null, 2);
            
            // Create a download link
            const blob = new Blob([questsJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `diced-quests-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            const exportCount = quests.length;
            this.showNotification(`${exportCount} quests exported successfully`, 'success');
        } catch (error) {
            console.error('Failed to export quests:', error);
            this.showNotification('Failed to export quests. Please check the console for details.', 'error');
        }
    },

    // Show the import modal
    showImportModal() {
        const modal = document.getElementById('import-modal');
        modal.classList.add('active');
        
        // Reset the file input
        document.getElementById('import-json-file').value = '';
        document.getElementById('preview-content').innerHTML = '';
        document.getElementById('confirm-import').disabled = true;
    },

    // Close the import modal
    closeImportModal() {
        const modal = document.getElementById('import-modal');
        modal.classList.remove('active');
    },

    // Handle import file selection
    handleImportFileSelection(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const json = e.target.result;
                const quests = JSON.parse(json);
                
                // Validate that it's an array
                if (!Array.isArray(quests)) {
                    this.showNotification('Invalid quest data format. Expected an array of quests.', 'error');
                    return;
                }
                
                // Show preview
                const previewContent = document.getElementById('preview-content');
                
                previewContent.innerHTML = `
                    <p><strong>Found ${quests.length} quests:</strong></p>
                    <ul>
                        ${quests.slice(0, 5).map(quest => `<li>${quest.questName} (ID: ${quest.id})</li>`).join('')}
                        ${quests.length > 5 ? `<li>...and ${quests.length - 5} more</li>` : ''}
                    </ul>
                `;
                
                // Enable import button
                document.getElementById('confirm-import').disabled = false;
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                this.showNotification('Failed to parse JSON. Please check if the file is valid.', 'error');
            }
        };
        
        reader.readAsText(file);
    },

    // Import quests from selected file
    async importQuests() {
        try {
            const fileInput = document.getElementById('import-json-file');
            const file = fileInput.files[0];
            
            if (!file) {
                this.showNotification('Please select a file to import.', 'warning');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const json = e.target.result;
                    const quests = JSON.parse(json);
                    
                    // Validate that it's an array
                    if (!Array.isArray(quests)) {
                        this.showNotification('Invalid quest data format. Expected an array of quests.', 'error');
                        return;
                    }
                    
                    // Get import options
                    const skipExisting = document.getElementById('skip-existing').checked;
                    const updateExisting = document.getElementById('update-existing').checked;
                    
                    // Get existing quest IDs
                    const existingIds = new Set(this.quests.map(q => q.id));
                    
                    // Process each quest
                    let addedCount = 0;
                    let updatedCount = 0;
                    let skippedCount = 0;
                    
                    for (const quest of quests) {
                        // Check if quest already exists
                        if (existingIds.has(quest.id)) {
                            if (updateExisting) {
                                // Update existing quest
                                await questDatabase.updateQuest(quest.id, quest);
                                
                                // Update in local array
                                const index = this.quests.findIndex(q => q.id === quest.id);
                                if (index !== -1) {
                                    this.quests[index] = quest;
                                }
                                
                                updatedCount++;
                            } else if (skipExisting) {
                                // Skip existing quest
                                skippedCount++;
                            } else {
                                // Generate a new ID for the quest
                                const maxId = Math.max(...this.quests.map(q => q.id), 0);
                                quest.id = maxId + 1;
                                
                                // Add quest with new ID
                                await questDatabase.addQuest(quest);
                                
                                // Add to local array
                                this.quests.push(quest);
                                
                                addedCount++;
                            }
                        } else {
                            // Add new quest
                            await questDatabase.addQuest(quest);
                            
                            // Add to local array
                            this.quests.push(quest);
                            
                            addedCount++;
                        }
                    }
                    
                    // Close the modal
                    this.closeImportModal();
                    
                    // Refresh the quest table
                    this.filterQuests();
                    
                    // Update dashboard stats
                    this.updateDashboardStats();
                    
                    // Show success notification
                    const message = `Import complete: ${addedCount} added, ${updatedCount} updated, ${skippedCount} skipped.`;
                    this.showNotification(message, 'success');
                } catch (error) {
                    console.error('Failed to import quests:', error);
                    this.showNotification('Failed to import quests. Please check the console for details.', 'error');
                }
            };
            
            reader.readAsText(file);
        } catch (error) {
            console.error('Failed to import quests:', error);
            this.showNotification('Failed to import quests. Please check the console for details.', 'error');
        }
    },

    // Show a notification
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    },

    // Helper function to escape HTML in strings
    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};
