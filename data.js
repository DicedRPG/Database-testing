// Constants - Quest Types Colors
const QUEST_TYPE_COLORS = {
    'Training': '#64D949', // Green
    'Main': '#5F647C',     // Dark Gray
    'Side': '#FE3E53',     // Red
    'Explore': '#23D2E2'   // Blue
};

// Rank definitions
const RANKS = [
    { name: 'Home Cook', hoursNeeded: 55, totalHoursNeeded: 220, color: '#CD7F32' },  // Bronze
    { name: 'Culinary Student', hoursNeeded: 209, totalHoursNeeded: 836, color: '#43464B' },  // Iron
    { name: 'Kitchen Assistant', hoursNeeded: 530, totalHoursNeeded: 2120, color: '#C0C0C0' },  // Silver
    { name: 'Line Cook', hoursNeeded: 1177, totalHoursNeeded: 4708, color: '#FFD700' },  // Gold
    { name: 'Sous Chef', hoursNeeded: 2500, totalHoursNeeded: 10000, color: '#E5E4E2' },  // Platinum
    { name: 'Head Chef', hoursNeeded: Infinity, totalHoursNeeded: Infinity, color: '#FF1493' }  // Master
];

// Level definitions (for Home Cook)
const LEVELS = [
    { level: 1, hours: 5, startAt: 0 },
    { level: 2, hours: 5, startAt: 5 },
    { level: 3, hours: 5, startAt: 10 },
    { level: 4, hours: 5, startAt: 15 },
    { level: 5, hours: 5, startAt: 20 },
    { level: 6, hours: 6, startAt: 25 },
    { level: 7, hours: 7, startAt: 31 },
    { level: 8, hours: 8, startAt: 38 },
    { level: 9, hours: 9, startAt: 46 }
];

// Quest Data
// Enhanced quest data structure
const QUEST_DATA = [
  {
    id: 1,
    questName: "Kitchen Safety & Cleaning",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Learn safe food handling, cleaning, and cross-contamination prevention",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    learningObjectives: [
      "Understand fundamental food safety principles",
      "Master proper handwashing and personal hygiene techniques",
      "Learn to prevent cross-contamination between different food items",
      "Develop proper cleaning routines for different kitchen surfaces and tools",
      "Understand safe food storage temperatures and practices",
      "Create systems for maintaining a clean, efficient kitchen workspace"
    ],
    equipmentNeeded: [
      "Cleaning supplies (dish soap, all-purpose cleaner, sanitizing solution)",
      "Cleaning tools (scrub brushes, sponges, microfiber cloths)",
      "Cutting boards (preferably multiple)",
      "Storage containers",
      "Sanitizing solution or bleach",
      "Kitchen towels"
    ],
    contentSections: [
      {
        title: "Food Safety Fundamentals",
        subsections: [
          {
            subtitle: "Personal Hygiene",
            content: "Learn comprehensive handwashing technique: Wet hands with clean water, apply soap, lather thoroughly for 20 seconds, scrub all surfaces, rinse completely, and dry with a clean towel. Understand critical handwashing moments in food preparation."
          },
          {
            subtitle: "Cross-Contamination Prevention",
            content: "Implement strategies to prevent bacterial transfer between foods. Use color-coded cutting boards, separate raw and ready-to-eat foods, wash hands between handling different food types, and maintain proper food storage practices."
          }
        ]
      },
      {
        title: "Kitchen Cleaning Systems",
        subsections: [
          {
            subtitle: "Surface Cleaning",
            content: "Master cleaning techniques for different kitchen surfaces. Learn to create effective cleaning solutions, understand proper sanitization methods, and develop a systematic approach to kitchen cleanliness."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Kitchen Safety Audit",
        steps: [
          "Assess current kitchen setup for safety and cleanliness",
          "Identify potential cross-contamination risks",
          "Create a comprehensive cleaning and organization plan",
          "Implement color-coding system for kitchen tools",
          "Develop a personal food safety checklist"
        ]
      }
    ],
    completionChecklist: [
      "Completed thorough kitchen safety assessment",
      "Implemented proper food storage practices",
      "Created cleaning and sanitization routine",
      "Established cross-contamination prevention system",
      "Developed personal hygiene protocol for food preparation"
    ],
    tipsForSuccess: [
      "Clean as you go to maintain a safe cooking environment",
      "Regularly sanitize cutting boards and kitchen surfaces",
      "Create a systematic approach to kitchen organization",
      "Stay vigilant about personal hygiene during food preparation",
      "Regularly update and review your kitchen safety practices"
    ]
  },
  {
    id: 3,
    questName: "Mise en Place",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master the art of preparation and organization in cooking",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    learningObjectives: [
      "Understand the concept and importance of mise en place",
      "Learn to properly prepare and organize ingredients before cooking",
      "Develop efficient workspace organization techniques",
      "Practice time management in recipe preparation",
      "Create systems for reducing cooking stress and improving results"
    ],
    equipmentNeeded: [
      "Cutting board",
      "Chef's knife",
      "Various prep bowls or containers",
      "Measuring cups and spoons",
      "Kitchen towels",
      "Timer or clock"
    ],
    contentSections: [
      {
        title: "Mise en Place Fundamentals",
        subsections: [
          {
            subtitle: "Understanding Preparation",
            content: "Mise en place, meaning 'everything in its place' in French, is a crucial culinary principle. It involves completely preparing and organizing ingredients before cooking begins, reducing stress and improving efficiency in the kitchen."
          },
          {
            subtitle: "Workspace Organization",
            content: "Create clear zones in your kitchen: preparation zone, cooking zone, and finishing zone. Learn to arrange tools and ingredients for maximum efficiency and minimal movement."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Recipe Preparation Challenge",
        steps: [
          "Select a recipe with multiple components",
          "Read the entire recipe carefully",
          "Measure and prepare all ingredients before starting",
          "Create a timeline for recipe preparation",
          "Practice 'clean as you go' method",
          "Reflect on efficiency and organization"
        ]
      }
    ],
    completionChecklist: [
      "Prepared all ingredients before cooking",
      "Organized workspace efficiently",
      "Created a logical preparation timeline",
      "Maintained cleanliness during preparation",
      "Reduced stress and improved cooking flow"
    ],
    tipsForSuccess: [
      "Always read the entire recipe before beginning",
      "Group ingredients by preparation stage",
      "Use small bowls to organize measured ingredients",
      "Clean work surfaces between preparation steps",
      "Practice mise en place even for simple meals"
    ]
  },
  {
    id: 4,
    questName: "Recipe Reading",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Develop skills to effectively read, understand, and follow recipes",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    learningObjectives: [
      "Understand standard recipe formats and terminology",
      "Develop skills to interpret cooking instructions",
      "Learn to identify implicit techniques and requirements",
      "Practice recipe adaptation and scaling",
      "Create personal systems for recipe annotation and organization"
    ],
    equipmentNeeded: [
      "Cookbook or recipe collection",
      "Notebook or digital note-taking device",
      "Highlighters or colored pens",
      "Measuring tools",
      "Cooking reference guide (optional)"
    ],
    contentSections: [
      {
        title: "Recipe Comprehension",
        subsections: [
          {
            subtitle: "Recipe Components",
            content: "Identify key recipe elements: title, ingredient list, equipment requirements, step-by-step instructions, and additional notes. Learn to quickly extract critical information from various recipe formats."
          },
          {
            subtitle: "Terminology Mastery",
            content: "Study common cooking verbs, measurement abbreviations, and technical terms. Create a personal glossary of culinary terminology to improve recipe understanding."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Recipe Analysis Challenge",
        steps: [
          "Select recipes of varying complexity",
          "Analyze recipe components and terminology",
          "Practice scaling recipes for different serving sizes",
          "Develop a personal recipe annotation system",
          "Attempt recipe modifications based on available ingredients"
        ]
      }
    ],
    completionChecklist: [
      "Analyzed multiple recipes thoroughly",
      "Created personal recipe terminology reference",
      "Successfully scaled a recipe",
      "Developed recipe annotation method",
      "Identified potential ingredient substitutions"
    ],
    tipsForSuccess: [
      "Always read the entire recipe before starting",
      "Pay attention to recipe headnotes and additional instructions",
      "Create a personal system for marking and organizing recipes",
      "Don't be afraid to adapt recipes to your taste or available ingredients",
      "Practice reading recipes as if you were following them step-by-step"
    ]
  },
  {
    id: 6,
    questName: "Measuring & Scaling",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master precise measurement techniques and recipe scaling",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    learningObjectives: [
      "Learn accurate measuring techniques for different ingredient types",
      "Understand measurement conversions and equivalents",
      "Develop skills for scaling recipes up or down",
      "Practice weight vs. volume measurements",
      "Learn to adjust recipes for different pan sizes"
    ],
    equipmentNeeded: [
      "Dry measuring cups",
      "Liquid measuring cups",
      "Measuring spoons",
      "Digital scale (if available)",
      "Various ingredients for practice",
      "Calculator",
      "Notebook"
    ],
    contentSections: [
      {
        title: "Measurement Fundamentals",
        subsections: [
          {
            subtitle: "Measuring Tool Techniques",
            content: "Master different measuring methods: spoon and level for flour, pack firmly for brown sugar, read liquid measurements at eye level. Understand the importance of precise measurement in cooking and baking."
          },
          {
            subtitle: "Conversion Mastery",
            content: "Learn standard measurement equivalents: teaspoons to tablespoons, cups to pints, weight conversions. Develop skills to quickly and accurately convert between different measurement systems."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Measurement Precision Challenge",
        steps: [
          "Practice measuring various ingredient types",
          "Compare weight and volume measurements",
          "Scale a recipe up and down",
          "Adjust a recipe for different pan sizes",
          "Create a personal measurement conversion reference"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated accurate measuring techniques",
      "Successfully converted between different measurement units",
      "Scaled a recipe for different serving sizes",
      "Created a personal measurement reference guide",
      "Understood impact of precise measurements on cooking results"
    ],
    tipsForSuccess: [
      "Consistency matters more than the exact method",
      "Write down scaled measurements before starting",
      "Baking requires more precision than cooking",
      "A digital scale dramatically improves measurement accuracy",
      "Create a personal reference sheet for common conversions"
    ]
  },
  {
    id: 103,
    questName: "Basic Cookbook Research",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Develop research skills through systematic cookbook exploration",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    learningObjectives: [
      "Develop critical recipe analysis skills",
      "Learn to identify key techniques across multiple recipes",
      "Practice comparing different approaches to similar dishes",
      "Build a personalized collection of recipes to try",
      "Understand how cookbooks communicate cooking principles"
    ],
    equipmentNeeded: [
      "At least one cookbook (physical or digital)",
      "Notebook or digital note-taking system",
      "Bookmarks or sticky notes",
      "Writing utensils",
      "Access to additional cookbooks (optional)"
    ],
    contentSections: [
      {
        title: "Cookbook Exploration",
        subsections: [
          {
            subtitle: "Cookbook Selection",
            content: "Choose cookbooks that match your current interests and skill level. Look for books with clear explanations, technique sections, and comprehensive information beyond just recipes."
          },
          {
            subtitle: "Analytical Reading",
            content: "Go beyond simply reading recipes. Study introductory chapters, technique explanations, equipment recommendations, and author's notes to gain deeper culinary insights."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Cookbook Analysis Challenge",
        steps: [
          "Select 2-3 cookbooks from different sources",
          "Read introductory and technique sections thoroughly",
          "Compare similar recipes across different cookbooks",
          "Document key techniques and principles",
          "Choose 3 recipes to potentially cook"
        ]
      }
    ],
    completionChecklist: [
      "Analyzed multiple cookbooks in-depth",
      "Documented key cooking techniques",
      "Compared approaches in different cookbooks",
      "Selected recipes for future cooking",
      "Created a personal cooking technique reference"
    ],
    tipsForSuccess: [
      "Don't just look at recipes—read introductory sections carefully",
      "Pay attention to sidebars and chef's notes",
      "Look for cookbooks with explanations of why techniques work",
      "Consider borrowing books from the library before purchasing",
      "Focus on understanding techniques more than specific recipes"
    ]
  },
  {
    id: 108,
    questName: "Kitchen Equipment Research",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Management",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Research and understand essential kitchen tools and equipment",
    stageId: 1,
    stageName: "Kitchen Fundamentals",
    milestone: true,
      unlocksStage: 2,
      unlockMessage: "Stage 2: Knife Skills & Heat Control is now available!",
    learningObjectives: [
      "Understand the function and purpose of essential kitchen tools",
      "Learn to evaluate quality and value in kitchen equipment",
      "Develop knowledge about proper tool use and care",
      "Create a prioritized list for building kitchen equipment collection",
      "Understand how equipment choices affect cooking techniques"
    ],
    equipmentNeeded: [
      "Access to internet or reference books",
      "Notebook or digital note-taking system",
      "Current kitchen inventory list",
      "Budget planning worksheet (optional)",
      "Access to kitchen supply stores (physical or online)"
    ],
    contentSections: [
      {
        title: "Equipment Evaluation",
        subsections: [
          {
            subtitle: "Essential Equipment Categories",
            content: "Research key kitchen equipment categories: knives, cookware, bakeware, small tools, measuring tools, and small appliances. Understand the differences between essential items and nice-to-have gadgets."
          },
          {
            subtitle: "Quality Assessment",
            content: "Learn to evaluate kitchen tools based on materials, construction, durability, and value. Understand the difference between home cook and professional-grade equipment."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Kitchen Equipment Inventory and Research",
        steps: [
          "Create a comprehensive inventory of current kitchen tools",
          "Research at least two options in different price ranges for key tools",
          "Compare features, materials, and customer reviews",
          "Develop a prioritized equipment acquisition plan",
          "Create a maintenance strategy for existing and future tools"
        ]
      }
    ],
    completionChecklist: [
      "Completed kitchen tool inventory",
      "Researched equipment quality and value",
      "Created prioritized equipment acquisition list",
      "Developed tool maintenance strategy",
      "Identified gaps in current kitchen equipment"
    ],
    tipsForSuccess: [
      "Focus on versatile, multi-purpose tools when starting out",
      "Quality matters more than quantity",
      "Avoid professional-grade equipment when first starting",
      "Start with basics and add specialized equipment as skills grow",
      "Always research before making significant equipment investments"
    ]
  },

    // Stage 2 Data
    {
    id: 2,
    questName: "Basic Knife Skills I",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master foundational cutting techniques for basic vegetable preparation",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
    learningObjectives: [
      "Understand the anatomy of a chef's knife and proper handling",
      "Master fundamental knife grips and safe cutting techniques",
      "Learn essential vegetable cutting methods: rough chop, dice, and slice",
      "Practice proper knife safety and care",
      "Develop efficient cutting workspace organization"
    ],
    equipmentNeeded: [
      "Chef's knife",
      "Cutting board",
      "Vegetables for practice (onions, carrots, celery)",
      "Kitchen towel or paper towels",
      "Container for scraps",
      "Honing rod (optional)"
    ],
    contentSections: [
      {
        title: "Knife Fundamentals",
        subsections: [
          {
            subtitle: "Knife Anatomy",
            content: "Learn the key parts of a chef's knife: tip, edge, heel, spine, bolster, handle, and tang. Understand the differences between Western-style and Japanese-style knives and their specific purposes."
          },
          {
            subtitle: "Proper Grip Techniques",
            content: "Master two primary grips: 1) Blade grip (pinch grip): Pinch blade between thumb and forefinger at bolster, wrap remaining fingers around handle. 2) Handle grip: For more delicate tasks, traditionally grip the handle."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Cutting Technique Mastery",
        steps: [
          "Practice slicing vegetables with uniform thickness",
          "Create precise dice with consistent cube sizes",
          "Perform rough chopping for herbs and leafy vegetables",
          "Focus on proper hand positioning and safety",
          "Assess and improve cutting consistency"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated safe knife handling",
      "Created consistent vegetable slices",
      "Produced uniform diced vegetables",
      "Performed efficient rough chopping",
      "Maintained a clean, organized workspace"
    ],
    tipsForSuccess: [
      "Start slowly and prioritize accuracy over speed",
      "Keep your knife extremely sharp",
      "Let the knife's weight do most of the work",
      "Practice regularly with different vegetables",
      "Always maintain the 'claw' hand position for safety"
    ]
  },
  {
    id: 5,
    questName: "Basic Knife Skills II",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Build on basic skills with more advanced cutting techniques",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
    learningObjectives: [
      "Master professional-level knife cuts: julienne, brunoise, and chiffonade",
      "Understand culinary applications for specialized cuts",
      "Develop greater knife control and precision",
      "Learn to maintain consistency in cut sizes",
      "Practice efficient cutting workflows"
    ],
    equipmentNeeded: [
      "Sharp chef's knife",
      "Cutting board",
      "Vegetables for practice (carrots, celery, herbs)",
      "Ruler or measuring tape (optional)",
      "Kitchen towel",
      "Prep bowls"
    ],
    contentSections: [
      {
        title: "Advanced Cutting Techniques",
        subsections: [
          {
            subtitle: "Julienne (Matchstick Cut)",
            content: "Create precise 1/8 inch × 1/8 inch × 2 inch strips. Practice with firm vegetables like carrots, zucchini, and bell peppers. Used in stir-fries, salads, and garnishes."
          },
          {
            subtitle: "Brunoise (Fine Dice)",
            content: "Transform julienne cuts into tiny 1/8 inch cubes. Requires extreme precision and is used for refined sauces, clear soups, and elegant presentations."
          },
          {
            subtitle: "Chiffonade (Ribbon Cut)",
            content: "Stack and roll large, flat leaves tightly, then slice thinly to create delicate herb ribbons. Perfect for garnishing and adding fresh herb flavor."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Precision Cutting Challenge",
        steps: [
          "Create julienne cuts of increasing precision",
          "Transform julienne into perfect brunoise cubes",
          "Practice chiffonade with different leaf types",
          "Measure and verify cut dimensions",
          "Create a dish showcasing multiple cutting techniques"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated julienne cutting technique",
      "Created uniform brunoise cubes",
      "Produced delicate chiffonade ribbons",
      "Maintained consistent cut sizes",
      "Applied cuts in a practical cooking scenario"
    ],
    tipsForSuccess: [
      "Take your time—advanced cuts require patience",
      "Keep your knife extremely sharp",
      "Use the tip of the knife for precise brunoise cutting",
      "Practice these cuts regularly to build muscle memory",
      "Focus on precision first, then gradually increase speed"
    ]
  },
  {
    id: 8,
    questName: "Heat Control Fundamentals",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master understanding and control of cooking temperatures",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
    learningObjectives: [
      "Understand different heat levels and their applications",
      "Master heat adjustment techniques on various cooking appliances",
      "Learn to recognize visual and sensory cues for proper heat",
      "Practice precise temperature control through egg cookery",
      "Develop troubleshooting skills for heat-related cooking problems"
    ],
    equipmentNeeded: [
      "Medium pot or pan",
      "Skillet or sauté pan",
      "Eggs (6-12 for practice)",
      "Butter or oil",
      "Spatula or spoon",
      "Instant-read thermometer (optional)",
      "Timer"
    ],
    contentSections: [
      {
        title: "Heat Level Understanding",
        subsections: [
          {
            subtitle: "Temperature Ranges",
            content: "Learn standard heat levels: Low (180-200°F), Medium-Low (200-300°F), Medium (300-375°F), Medium-High (375-450°F), High (450-650°F). Understand appropriate uses for each heat level."
          },
          {
            subtitle: "Cookware and Heat Behavior",
            content: "Study how different materials conduct heat: Stainless Steel (uneven but heat-retentive), Cast Iron (slow but even heating), Nonstick (quick heating), Copper (extremely responsive)."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Egg Cookery Heat Control",
        steps: [
          "Practice cooking eggs using different techniques",
          "Identify proper heat levels for each egg style",
          "Recognize visual and sensory cues of correct heat",
          "Adjust heat to maintain proper cooking conditions",
          "Compare results of different heat management approaches"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated understanding of heat levels",
      "Cooked eggs with precise temperature control",
      "Recognized proper heat indicators",
      "Adjusted heat effectively during cooking",
      "Produced consistent, well-cooked eggs"
    ],
    tipsForSuccess: [
      "Heat control takes practice—be patient with yourself",
      "Focus on visual and sensory cues rather than dial settings",
      "Learn the specific behavior of your own stove",
      "Preheating properly is critical for most cooking methods",
      "Start with lower heat when uncertain—you can always increase"
    ]
  },
  {
    id: 10,
    questName: "Boiling & Simmering",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master cooking techniques for foods in liquid",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
    learningObjectives: [
      "Understand the difference between boiling and simmering temperatures",
      "Learn proper techniques for cooking various foods in liquid",
      "Master timing and doneness indicators for pasta, grains, and vegetables",
      "Develop skills for managing multiple items cooking in liquid",
      "Practice proper salting and seasoning of cooking liquid"
    ],
    equipmentNeeded: [
      "Large pot for pasta/vegetables",
      "Medium saucepan for grains",
      "Colander or strainer",
      "Timer",
      "Measuring cups and spoons",
      "Slotted spoon",
      "Long-handled spoon for stirring",
      "Tongs",
      "Instant-read thermometer (optional)"
    ],
    contentSections: [
      {
        title: "Water Temperature Fundamentals",
        subsections: [
          {
            subtitle: "Temperature Spectrum",
            content: "Learn water temperature ranges: Cold (32-80°F), Warm (80-110°F), Hot (110-150°F), Poaching (160-180°F), Simmering (180-205°F), Boiling (212°F at sea level). Understand practical applications for each range."
          },
          {
            subtitle: "Altitude Considerations",
            content: "Understand how altitude affects boiling point: Sea Level (212°F), 2,000 feet (208°F), 5,000 feet (203°F). Learn to adjust cooking times and liquid quantities accordingly."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Liquid Cooking Techniques",
        steps: [
          "Practice boiling pasta to al dente perfection",
          "Cook different types of grains using absorption method",
          "Blanch various vegetables to maintain color and texture",
          "Practice maintaining consistent liquid temperatures",
          "Coordinate cooking of multiple ingredients in liquid"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated proper boiling and simmering techniques",
      "Cooked pasta to correct doneness",
      "Prepared perfectly cooked grains",
      "Maintained appropriate cooking liquid temperatures",
      "Seasoned cooking liquids effectively"
    ],
    tipsForSuccess: [
      "Salt pasta water generously—it should taste like sea water",
      "Use a timer rather than guessing cooking times",
      "Test for doneness frequently as cooking time approaches",
      "Save pasta water for sauces—it's liquid gold",
      "Don't crowd the pot when blanching vegetables"
    ]
  },
  {
    id: 118,
    questName: "Knife Skills Video Study",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Learn advanced knife skills through video instruction",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
    learningObjectives: [
      "Understand proper knife grip and cutting techniques",
      "Learn standard cuts and their culinary applications",
      "Develop awareness of safety practices and workflow",
      "Create a progressive skill-building plan for knife technique"
    ],
    equipmentNeeded: [
      "Device with internet access",
      "Notebook or digital note-taking system",
      "Knife (for reference and potential practice)",
      "Kitchen towel"
    ],
    contentSections: [
      {
        title: "Video Research Approach",
        subsections: [
          {
            subtitle: "Video Selection Criteria",
            content: "Look for high-quality knife skills videos from culinary schools, professional chefs, and reputable cooking websites. Prioritize videos with multiple camera angles, slow-motion demonstrations, and clear explanations."
          },
          {
            subtitle: "Analysis Techniques",
            content: "Focus on hand positioning, knife handling, cutting motion, and safety practices. Take detailed notes on techniques, common mistakes, and professional tips."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Knife Technique Video Analysis",
        steps: [
          "Select 3-5 high-quality knife skills tutorial videos",
          "Watch videos multiple times, taking detailed notes",
          "Sketch or diagram proper hand and knife positioning",
          "Identify key techniques and safety considerations",
          "Create a personal reference guide for knife skills"
        ]
      }
    ],
    completionChecklist: [
      "Analyzed multiple knife skills tutorial videos",
      "Created detailed notes on cutting techniques",
      "Documented proper hand and knife positioning",
      "Identified key safety practices",
      "Developed a personal knife skills reference guide"
    ],
    tipsForSuccess: [
      "Focus on understanding body mechanics rather than just visual outcomes",
      "Study variations in technique between different expert demonstrators",
      "Pay special attention to transitions between cuts",
      "Note workflow patterns that maximize efficiency and safety",
      "Consider filming your own practice sessions to compare"
    ]
  },
  {
    id: 109,
    questName: "Food Science Basics",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1.5,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Explore the scientific principles behind cooking techniques",
    stageId: 2,
    stageName: "Knife Skills & Heat Control",
      milestone: true,
      unlocksStage: 3,
      unlockMessage: "Stage 3: Flavor Development is now available!",
    learningObjectives: [
      "Understand fundamental scientific principles in cooking",
      "Learn how different cooking methods affect food at a molecular level",
      "Discover the reasons behind common cooking practices",
      "Apply scientific knowledge to improve cooking technique"
    ],
    equipmentNeeded: [
      "Reference materials (books, trusted websites)",
      "Notebook or digital note-taking system",
      "Access to internet for research",
      "Basic kitchen tools for optional demonstrations",
      "Common household ingredients"
    ],
    contentSections: [
      {
        title: "Food Science Exploration",
        subsections: [
          {
            subtitle: "Scientific Cooking Principles",
            content: "Investigate key scientific concepts in cooking: protein denaturation, Maillard reaction, emulsification, fermentation, and heat transfer methods. Understand how chemical and physical changes occur during cooking."
          },
          {
            subtitle: "Practical Applications",
            content: "Explore how scientific understanding can improve cooking techniques, from choosing the right cooking method to understanding why certain ingredients interact the way they do."
          }
        ]
      }
    ],
    practicalExercises: [
    {
      title: "Cooking Science Research Project",
      steps: [
        "Select 3-4 fundamental food science principles",
        "Research scientific explanations for each principle",
        "Document how these principles apply to cooking techniques",
        "Conduct a simple kitchen experiment to demonstrate a principle",
        "Create a presentation or summary of your findings"
      ]
    }
  ],
  contentSections: [
    {
      title: "Food Science Exploration",
      subsections: [
        {
          subtitle: "Scientific Cooking Principles",
          content: "Investigate key scientific concepts in cooking: protein denaturation, Maillard reaction, emulsification, fermentation, and heat transfer methods. Understand how chemical and physical changes occur during cooking."
        },
        {
          subtitle: "Practical Applications",
          content: "Explore how scientific understanding can improve cooking techniques, from choosing the right cooking method to understanding why certain ingredients interact the way they do."
        }
      ]
    }
  ],
  completionChecklist: [
    "Researched multiple food science principles",
    "Documented scientific explanations for cooking techniques",
    "Conducted a practical experiment",
    "Created a comprehensive summary of findings",
    "Applied scientific insights to cooking methods"
  ],
  tipsForSuccess: [
    "Focus on understanding rather than memorizing terminology",
    "Look for sources that explain concepts simply",
    "Draw connections between different scientific principles",
    "Start with familiar cooking problems you've encountered",
    "Create your reference guide with your future self in mind"
  ]
},

    //stage 3 content
  {
    id: 7,
    questName: "Pantry Organization",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Management",
    secondaryFocus: "Ingredients",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Create a strategic and efficient kitchen pantry system",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Design an organized, functional pantry system",
      "Learn what staple ingredients to keep on hand",
      "Understand proper food storage methods and shelf life",
      "Create an inventory and shopping system",
      "Maximize space and accessibility in storage areas",
      "Develop strategies for food waste reduction"
    ],
    equipmentNeeded: [
      "Storage containers (clear if possible)",
      "Labels and marker",
      "Shelf liner (optional)",
      "Measuring tape",
      "Notebook or digital inventory system",
      "Cleaning supplies",
      "Step stool (if needed for high shelves)"
    ],
    contentSections: [
      {
        title: "Pantry Organization Fundamentals",
        subsections: [
          {
            subtitle: "Storage Zone Assessment",
            content: "Identify and evaluate storage areas including dry pantry shelves, refrigerator zones, freezer space, counter storage, and deep storage for bulk items. Consider temperature, light, and humidity factors."
          },
          {
            subtitle: "Essential Pantry Categories",
            content: "Develop a comprehensive approach to organizing dry goods, canned items, oils, vinegars, herbs, spices, and refrigerated staples. Create a systematic method for tracking and maintaining your pantry."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Pantry Transformation Challenge",
        steps: [
          "Completely empty and clean all storage areas",
          "Discard expired or questionable items",
          "Group similar items together",
          "Create an inventory of current pantry contents",
          "Develop a storage organization system",
          "Implement a labeling and tracking method"
        ]
      }
    ],
    completionChecklist: [
      "Completed full pantry audit and clean-out",
      "Created organized storage system",
      "Developed inventory tracking method",
      "Implemented proper food storage practices",
      "Reduced potential food waste"
    ],
    tipsForSuccess: [
      "Start small with one area before tackling the entire kitchen",
      "Consistency in your system matters more than perfection",
      "Clear containers save time by making contents visible",
      "Label everything, even if it seems obvious",
      "Do regular mini-cleanouts rather than waiting for major overhauls"
    ]
  },
  {
    id: 9,
    questName: "Salt, Pepper & Acid",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Flavor",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Master the fundamental flavor elements of salt, pepper, and acid",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Understand how salt, pepper, and acid affect food on a technical level",
      "Learn proper seasoning techniques and timing",
      "Develop skills for tasting and adjusting flavors",
      "Master the use of different salt types and applications",
      "Explore various pepper varieties and their flavor profiles",
      "Understand how different acids can transform and balance dishes"
    ],
    equipmentNeeded: [
      "Various salt types (kosher, sea salt, table salt)",
      "Black peppercorns and grinder",
      "Various acids (lemon, lime, vinegars)",
      "Small bowls for tasting",
      "Spoons for tasting",
      "Neutral foods for seasoning practice (rice, potato, vegetables)",
      "Small saucepan",
      "Cutting board and knife"
    ],
    contentSections: [
      {
        title: "Seasoning Science",
        subsections: [
          {
            subtitle: "Salt's Culinary Magic",
            content: "Explore how salt enhances flavor perception, suppresses bitterness, dissolves and spreads flavor, draws moisture through osmosis, and tenderizes proteins. Learn the art of strategic salting."
          },
          {
            subtitle: "Pepper and Acid Principles",
            content: "Understand the complex flavor profiles of different pepper varieties and how acids brighten, balance, and transform dishes. Learn to use these elements to create depth and contrast in cooking."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Flavor Balance Laboratory",
        steps: [
          "Prepare neutral base foods for seasoning experiments",
          "Systematically add salt, pepper, and acids",
          "Taste and document flavor transformations",
          "Practice adjusting seasoning in stages",
          "Create a dish that demonstrates perfect flavor balance"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated understanding of salt's flavor-enhancing properties",
      "Explored multiple salt and pepper varieties",
      "Created dishes with balanced seasoning",
      "Developed ability to adjust flavors systematically",
      "Understood the role of acid in cooking"
    ],
    tipsForSuccess: [
      "Always start with less seasoning than you think you need",
      "Taste frequently throughout the cooking process",
      "Keep salt within reach while cooking",
      "Invest in a quality pepper grinder",
      "Remember that salt and acid can enhance sweetness too"
    ]
  },
  {
    id: 11,
    questName: "Herbs & Spices Intro",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Flavor",
    secondaryFocus: "Ingredients",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Discover and understand the world of culinary herbs and spices",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Identify and understand common culinary herbs and spices",
      "Learn appropriate uses and combinations for different seasonings",
      "Develop knowledge about when to add herbs and spices during cooking",
      "Master basic techniques for storing and preparing herbs and spices",
      "Begin building a well-rounded spice collection",
      "Understand cultural spice traditions and signature combinations"
    ],
    equipmentNeeded: [
      "Selection of dried herbs and spices",
      "Fresh herbs (if available)",
      "Small bowls for tasting",
      "Mortar and pestle (optional)",
      "Spice grinder or coffee grinder (optional)",
      "Small skillet for toasting spices",
      "Cutting board and knife",
      "Storage containers for spices"
    ],
    contentSections: [
      {
        title: "Herb and Spice Fundamentals",
        subsections: [
          {
            subtitle: "Fresh Herb Identification",
            content: "Study common fresh and dried herbs, understanding their flavor profiles, intensity, and appropriate uses. Learn techniques for handling, storing, and preparing different herb varieties."
          },
          {
            subtitle: "Spice Exploration",
            content: "Investigate various spice categories including seed, berry, bark, root, and chili spices. Learn about their origins, flavor characteristics, and culinary applications across different cuisines."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Herb and Spice Mastery Challenge",
        steps: [
          "Create a personal herb and spice inventory",
          "Practice identifying herbs and spices by sight, smell, and taste",
          "Experiment with different preparation methods",
          "Create a flavor notes journal",
          "Develop a storage and organization system for herbs and spices"
        ]
      }
    ],
    completionChecklist: [
      "Identified and learned about multiple herbs and spices",
      "Created a personal herb and spice collection",
      "Developed proper storage techniques",
      "Practiced various herb and spice preparation methods",
      "Understood culinary applications of different seasonings"
    ],
    tipsForSuccess: [
      "Start with small quantities of new spices",
      "Date your spices when purchased to track freshness",
      "Buy whole spices when possible for longer shelf life",
      "Smell herbs and spices frequently to train your nose",
      "Experiment with one new herb or spice at a time",
      "Toast spices right before using for maximum flavor"
    ]
  },
  {
    id: 12,
    questName: "Taste Development",
    rank: "Home Cook",
    type: "Training",
    primaryFocus: "Flavor",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Train your palate to recognize, analyze, and balance flavors",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Understand the five basic tastes and how to recognize them",
      "Learn how to analyze flavor components in food",
      "Develop systematic tasting methodology",
      "Practice adjusting and balancing flavors",
      "Train your palate to detect subtle differences",
      "Build confidence in seasoning by taste"
    ],
    equipmentNeeded: [
      "Small tasting bowls",
      "Tasting spoons",
      "Palette cleansers (water, plain crackers)",
      "Notebook for tasting notes",
      "Basic ingredients representing taste categories",
      "Various seasonings for adjustment practice",
      "Small saucepan or skillet for testing"
    ],
    contentSections: [
      {
        title: "Taste Perception Fundamentals",
        subsections: [
          {
            subtitle: "The Five Basic Tastes",
            content: "Deep dive into sweet, salty, sour, bitter, and umami taste sensations. Learn how each taste is perceived, its biological purpose, and its role in culinary experiences."
          },
          {
            subtitle: "Sensory Exploration",
            content: "Investigate additional sensory elements including aromatics, texture, temperature, and how these interact with basic tastes to create complex flavor experiences."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Palate Training Laboratory",
        steps: [
          "Create solutions representing each basic taste",
          "Practice systematic tasting techniques",
          "Develop a flavor recognition and description system",
          "Experiment with flavor balancing and adjustment",
          "Create a personal flavor memory catalog"
        ]
      }
    ],
    completionChecklist: [
      "Demonstrated understanding of basic taste sensations",
      "Developed systematic tasting methodology",
      "Created flavor description vocabulary",
      "Practiced flavor balancing techniques",
      "Built personal flavor recognition skills"
    ],
    tipsForSuccess: [
      "Taste mindfully during everyday eating",
      "Develop a personal vocabulary that's meaningful to you",
      "Practice describing flavors out loud or in writing",
      "Taste ingredients in both raw and cooked states",
      "Compare similar items from different sources",
      "Stay curious about unfamiliar flavors"
    ]
  },
  {
    id: 80,
    questName: "Basic Vinaigrette",
    rank: "Home Cook",
    type: "Side",
    primaryFocus: "Flavor",
    secondaryFocus: "Technique",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: true,
    description: "Master the art of creating balanced vinaigrettes",
    stageId: 3,
    stageName: "Flavor Development",
    milestone: true,
      unlocksStage: 4,
      unlockMessage: "Stage 4: Basic Sides & Components is now available!",
    learningObjectives: [
      "Master basic emulsion principles",
      "Understand oil and acid balancing",
      "Learn flavor building and seasoning techniques",
      "Develop vinaigrette variations and adaptations",
      "Create stable, well-balanced dressings"
    ],
    equipmentNeeded: [
      "Small bowl or jar with tight-fitting lid",
      "Whisk",
      "Measuring spoons",
      "Fine grater or microplane",
      "Small knife and cutting board",
      "Tasting spoons"
    ],
    contentSections: [
      {
        title: "Vinaigrette Fundamentals",
        subsections: [
          {
            subtitle: "Emulsion Science",
            content: "Learn the principles of creating and maintaining an emulsion: suspending oil droplets in water-based liquid, understanding the role of emulsifiers, and techniques for stable mixture creation."
          },
          {
            subtitle: "Ingredient Balance",
            content: "Master the art of balancing oils, acids, emulsifiers, and seasonings to create a perfectly harmonious vinaigrette. Understand the classic 3:1 oil to acid ratio and variations."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Vinaigrette Mastery Challenge",
        steps: [
          "Create classic vinaigrette using different mixing methods",
          "Experiment with various oil and acid combinations",
          "Practice emulsification techniques",
          "Develop flavor variations",
          "Test vinaigrettes with different salad bases"
        ]
      }
    ],
    completionChecklist: [
      "Created stable vinaigrette emulsion",
      "Demonstrated understanding of oil-acid balance",
      "Developed multiple vinaigrette variations",
      "Practiced different emulsification techniques",
      "Matched vinaigrettes to appropriate salad ingredients"
    ],
    tipsForSuccess: [
      "Always taste before serving and adjust as needed",
      "Room temperature ingredients emulsify better",
      "Add salt to the acid, not the oil, for better distribution",
      "A touch of honey helps balance acidity and stabilize emulsion",
      "Don't be afraid to experiment with different ratios"
    ]
  },
     {
    id: 104,
    questName: "Cooking YouTube Research",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Technique",
    secondaryFocus: "Management",
    primaryHours: 1,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Learn cooking techniques through visual online tutorials",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Learn to identify reliable, instructional cooking content online",
      "Develop skills in analyzing visual cooking demonstrations",
      "Practice taking useful notes from video instruction",
      "Build a collection of technique references for future use",
      "Enhance understanding of cooking methods through visual learning"
    ],
    equipmentNeeded: [
      "Device with internet access and video playback",
      "Notebook or digital note-taking system",
      "Bookmarking or playlist creation system",
      "Basic knowledge of YouTube or other video platforms",
      "Optional: printer for screenshots of key techniques"
    ],
    contentSections: [
      {
        title: "Video Learning Strategies",
        subsections: [
          {
            subtitle: "Channel Discovery",
            content: "Learn to search for and evaluate high-quality cooking content. Identify creators with credentials, clear explanations, and comprehensive technique demonstrations."
          },
          {
            subtitle: "Analytical Viewing",
            content: "Develop a systematic approach to watching cooking videos, focusing on technique details, instructor explanations, and practical applications of cooking methods."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Cooking Tutorial Analysis",
        steps: [
          "Select 3-5 cooking technique tutorial videos",
          "Watch videos multiple times, taking detailed notes",
          "Identify key techniques and safety considerations",
          "Create a personal reference guide for learned techniques",
          "Plan how to apply learned techniques in your cooking"
        ]
      }
    ],
    completionChecklist: [
      "Analyzed multiple cooking tutorial videos",
      "Created detailed notes on cooking techniques",
      "Documented key learning points from videos",
      "Developed a personal cooking technique reference",
      "Identified potential techniques to practice"
    ],
    tipsForSuccess: [
      "Quality over quantity—focus on reliable, detailed content",
      "Create playlists organized by technique",
      "Watch videos shortly before attempting techniques",
      "Pay attention to troubleshooting advice in videos",
      "Look for instructors who show mistakes as well as successes"
    ]
  },
  {
    id: 105,
    questName: "Grocery Store Exploration",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Ingredients",
    secondaryFocus: "Management",
    primaryHours: 1.5,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Discover new ingredients and expand culinary knowledge through grocery store exploration",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Discover unfamiliar ingredients and their culinary applications",
      "Learn to compare products for quality, value, and cooking purposes",
      "Develop skills in selecting fresh produce and specialty items",
      "Expand your ingredient vocabulary and cooking repertoire",
      "Build knowledge of product availability and sourcing"
    ],
    equipmentNeeded: [
      "Notebook or digital note-taking device",
      "Shopping list with basic needed items (as cover for exploration)",
      "Camera or smartphone for taking photos",
      "Small budget for 1-3 new ingredient purchases (optional)",
      "Grocery store map or layout (if available)",
      "Reusable shopping bag"
    ],
    contentSections: [
      {
        title: "Strategic Store Exploration",
        subsections: [
          {
            subtitle: "Section Investigation",
            content: "Systematically explore different grocery store sections, examining product packaging, origin details, nutritional content, and potential culinary uses. Focus on understanding ingredient varieties and potential applications."
          },
          {
            subtitle: "Product Comparison",
            content: "Develop skills in evaluating different products, comparing brands, understanding quality indicators, and identifying unique or specialty ingredients."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Ingredient Discovery Challenge",
        steps: [
          "Create a plan to explore unfamiliar store sections",
          "Document interesting ingredients and their potential uses",
          "Compare similar products across different brands",
          "Select 1-3 new ingredients to purchase and experiment with",
          "Research cooking methods for discovered ingredients"
        ]
      }
    ],
    completionChecklist: [
      "Explored multiple grocery store sections",
      "Documented new and interesting ingredients",
      "Compared product varieties and qualities",
      "Purchased and planned to use new ingredients",
      "Created a personal ingredient discovery reference"
    ],
    tipsForSuccess: [
      "Take your time—this is about discovery, not efficiency",
      "Read origin stories and company backgrounds on packaging",
      "Take photos of interesting ingredients or preparation instructions",
      "Compare prices by unit for true value",
      "Ask for samples at service counters when available"
    ]
  },
  {
    id: 107,
    questName: "Meal Planning Study",
    rank: "Home Cook",
    type: "Explore",
    primaryFocus: "Management",
    secondaryFocus: "Ingredients",
    primaryHours: 1.5,
    secondaryHours: 0.5,
    diceRequired: false,
    description: "Learn effective strategies for systematic meal planning and preparation",
    stageId: 3,
    stageName: "Flavor Development",
    learningObjectives: [
      "Understand the principles of effective meal planning",
      "Learn different approaches to weekly and monthly food preparation",
      "Develop skills in creating balanced, practical meal plans",
      "Practice budget-conscious food planning techniques",
      "Create personalized planning systems and tools"
    ],
    equipmentNeeded: [
      "Notebook or digital planning tool",
      "Calendar or weekly planner",
      "Recipe resources (cookbooks, websites, saved recipes)",
      "Information about your typical schedule",
      "Basic understanding of food budget",
      "Knowledge of dietary preferences/restrictions",
      "Access to internet for research"
    ],
    contentSections: [
      {
        title: "Meal Planning Strategies",
        subsections: [
          {
            subtitle: "Personal Habit Analysis",
            content: "Conduct a comprehensive assessment of current cooking habits, time availability, energy levels, and typical meal patterns. Develop a personalized approach to meal planning that fits your lifestyle."
          },
          {
            subtitle: "Planning Methodology",
            content: "Explore various meal planning approaches including theme-based planning, batch cooking, component preparation, and budget-focused strategies. Learn to create flexible, adaptable meal plans."
          }
        ]
      }
    ],
    practicalExercises: [
      {
        title: "Comprehensive Meal Planning Challenge",
        steps: [
          "Analyze current cooking and eating habits",
          "Develop a detailed meal plan for 5-7 days",
          "Create a corresponding shopping list",
          "Implement the plan and track results",
          "Reflect on challenges and successes"
        ]
      }
    ],
    completionChecklist: [
      "Completed comprehensive personal cooking habit assessment",
      "Developed a detailed 5-7 day meal plan",
      "Created an efficient shopping list",
      "Implemented meal plan successfully",
      "Reflected on meal planning process and potential improvements"
    ],
    tipsForSuccess: [
      "Start with a shorter timeframe (3-4 days) before attempting full weeks",
      "Be realistic about your time and energy levels",
      "Plan for 'low effort' meals after busy days",
      "Remember that meal planning is iterative",
      "Create a 'meal idea bank' for inspiration"
    ]
  }
];
