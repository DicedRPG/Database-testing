// ConfigService.js - Configuration and constants
const ConfigService = {
  // Storage keys
  STORAGE_KEYS: {
    STATE: 'diced_app_state',
    QUESTS: 'diced_rpg_quests',
    VERSION: 'diced_quest_version'
  },
  
  // Quest type colors (from QUEST_TYPE_COLORS)
  QUEST_TYPE_COLORS: {
    "Training": "#64D949",
    "Main": "#5F647C",
    "Side": "#FE3E53",
    "Explore": "#23D2E2"
  },
  
  // Rank definitions (from RANKS)
  RANKS: [
    {
      "name": "Home Cook",
      "hoursNeeded": 55,
      "totalHoursNeeded": 220,
      "color": "#CD7F32"
    },
    {
      "name": "Culinary Student",
      "hoursNeeded": 209,
      "totalHoursNeeded": 836,
      "color": "#43464B"
    },
    {
      "name": "Kitchen Assistant",
      "hoursNeeded": 530,
      "totalHoursNeeded": 2120,
      "color": "#C0C0C0"
    },
    {
      "name": "Line Cook",
      "hoursNeeded": 1177,
      "totalHoursNeeded": 4708,
      "color": "#FFD700"
    },
    {
      "name": "Sous Chef",
      "hoursNeeded": 2500,
      "totalHoursNeeded": 10000,
      "color": "#E5E4E2"
    },
    {
      "name": "Head Chef",
      "hoursNeeded": null,
      "totalHoursNeeded": null,
      "color": "#FF1493"
    }
  ],
  
  // Level definitions (from LEVELS)
  LEVELS: [
    {
      "level": 1,
      "hours": 5,
      "startAt": 0
    },
    {
      "level": 2,
      "hours": 5,
      "startAt": 5
    },
    {
      "level": 3,
      "hours": 5,
      "startAt": 10
    },
    {
      "level": 4,
      "hours": 5,
      "startAt": 15
    },
    {
      "level": 5,
      "hours": 5,
      "startAt": 20
    },
    {
      "level": 6,
      "hours": 6,
      "startAt": 25
    },
    {
      "level": 7,
      "hours": 7,
      "startAt": 31
    },
    {
      "level": 8,
      "hours": 8,
      "startAt": 38
    },
    {
      "level": 9,
      "hours": 9,
      "startAt": 46
    }
  ],
  
  // Get quest type color
  getQuestTypeColor(type) {
    return this.QUEST_TYPE_COLORS[type] || '#888888';
  }
};
