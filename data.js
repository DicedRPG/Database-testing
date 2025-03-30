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
  },
{
                "id": 45,
                "questName": "Simple Breakfast Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 1.5,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Master fundamental breakfast cooking techniques while managing multiple components that finish at the same time.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master basic egg cookery techniques",
                    "Develop timing skills for multiple breakfast components",
                    "Practice heat control and ingredient preparation"
                ],
                "equipmentNeeded": [
                    "Non-stick skillet or pan",
                    "Toaster or oven",
                    "Spatula",
                    "Small bowl for egg beating (if applicable)",
                    "Measuring cups and spoons",
                    "Timer"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Gather all ingredients and equipment before beginning. Prepare your workspace with separate areas for each component. Pre-measure ingredients for each component. Roll dice to determine your specific breakfast components."
                            },
                            {
                                "subtitle": "Component Planning",
                                "content": "Read through all instructions for your specific roll combination. Create a timeline working backward from serving time. Identify which components take longest to cook and start with those."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Phase",
                        "subsections": [
                            {
                                "subtitle": "Egg Techniques",
                                "content": "Sunny-side up: Heat pan to medium, add butter, crack egg, cook until white is set but yolk is runny. Over easy: Same as sunny-side up, but flip briefly to set top of white. Scrambled: Beat eggs with salt and pepper, cook in butter over medium-low heat, stirring frequently. Poached: Simmer water with vinegar, create gentle whirlpool, drop in egg, cook 3 minutes. Omelette: Beat eggs, pour into hot pan, add fillings, fold over when mostly set. Eggs Benedict: Poach eggs, prepare hollandaise sauce, serve on English muffin with ham."
                            },
                            {
                                "subtitle": "Toast Variations",
                                "content": "Regular toast: Toast bread, spread with butter. Avocado toast: Mash ripe avocado with lemon juice, salt, pepper; spread on toast. Cheese toast: Add cheese during last minute of toasting to melt. Cinnamon sugar toast: Mix cinnamon and sugar, spread butter on toast, sprinkle mixture. Garlic herb toast: Mix butter with minced garlic and herbs, spread on toast. French toast: Dip bread in egg/milk mixture, cook in pan until golden."
                            },
                            {
                                "subtitle": "Side Dish Preparation",
                                "content": "Fresh fruit: Wash and slice seasonal fruits. Yogurt with honey: Combine yogurt with honey and optional toppings. Roasted potatoes: Dice potatoes, toss with oil and seasonings, roast 20-25 minutes. Bacon/breakfast meat: Cook bacon or sausage until done to your liking. Sautéed vegetables: Sauté diced peppers, onions, mushrooms until tender. Overnight oats: Prepare the night before with oats, milk, and toppings."
                            },
                            {
                                "subtitle": "Critical Timing Management",
                                "content": "Start components in reverse order of cooking time. Coordinate cooking times so everything finishes simultaneously. Use the lower heat setting for eggs if other components need more attention. Keep toast warm in oven if needed while finishing other components."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Soup Base Style (d6): 1-Clear broth-based, 2-Creamy (dairy or non-dairy), 3-Tomato-based, 4-Bean or lentil foundation, 5-Pureed vegetable, 6-Stew-like (thick with chunky components)",
                            "Roll for Primary Protein (d6): 1-Chicken, 2-Beef or pork, 3-Seafood (fish, shrimp), 4-Beans or legumes, 5-Tofu or plant-based protein, 6-Multiple protein combination",
                            "Roll for Flavor Direction (d6): 1-Classic European (French, Italian), 2-Asian (choose specific cuisine), 3-Latin American, 4-Mediterranean, 5-American regional (New England, Southern, etc.), 6-Seasonal harvest focus",
                            "Roll for Special Addition (d6): 1-Grain or pasta component, 2-Herb or spice accent (unique flavor boost), 3-Creamy finish (yogurt, coconut milk, cream), 4-Crunchy topping (croutons, seeds, nuts), 5-Fresh herb or microgreen garnish, 6-Acidic finish (citrus, vinegar, pickled element)",
                            "Prepare your hearty soup based on your rolls, following the techniques described in the content sections",
                            "Roll for Egg Preparation Technique (d6): 1-Sunny-side up, 2-Over easy, 3-Scrambled, 4-Poached, 5-Omelette, 6-Eggs Benedict",
                            "Roll for Toast Preparation (d6): 1-Regular toast with butter, 2-Avocado toast, 3-Cheese toast, 4-Cinnamon sugar toast, 5-Garlic herb toast, 6-French toast",
                            "Roll for Side Dish (d6): 1-Fresh fruit, 2-Yogurt with honey, 3-Roasted potatoes, 4-Bacon or breakfast meat, 5-Sautéed vegetables, 6-Overnight oats",
                            "Prepare your breakfast based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Aromatic base development",
                    "Protein handling",
                    "Liquid management",
                    "Texture achievement",
                    "Proper cooking methods",
                    "Depth development",
                    "Seasoning balance",
                    "Flavor layering",
                    "Complementary components",
                    "Final taste adjustment",
                    "Egg cookery execution (proper doneness, appearance)",
                    "Toast preparation (properly toasted, not burnt)",
                    "Side dish execution (properly cooked, seasoned)",
                    "Mise en place organization",
                    "Timing coordination (all components finished together)",
                    "Kitchen cleanliness during process",
                    "Stress management during multi-component cooking"
                ],
                "tipsForSuccess": [
                    "Build flavor from the very beginning with proper aromatics",
                    "Don't rush the base development - it's the foundation of your soup",
                    "Season in layers throughout cooking",
                    "Taste frequently and adjust as needed",
                    "For clear soups, simmer gently; never boil vigorously",
                    "Add acids (tomatoes, citrus, vinegar) after beans are tender",
                    "Add dairy off heat or at very low temperatures",
                    "For make-ahead: slightly undercook vegetables, they'll continue cooking when reheated",
                    "Let soup rest 10-15 minutes before serving for flavors to meld",
                    "Garnish just before serving for maximum visual impact and freshness",
                    "Read all instructions before beginning",
                    "Prepare all ingredients before starting to cook",
                    "Use timers to keep track of multiple components",
                    "Practice 'clean as you go' to maintain workspace",
                    "For advanced egg techniques, consider practicing them separately before the full challenge"
                ]
            },
            {
                "id": 46,
                "questName": "Basic Sandwich Lunch Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 1.5,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Build flavor profiles and textures while learning proper sandwich construction techniques.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Learn optimal ingredient layering and sandwich construction",
                    "Develop knife skills for consistent cutting and preparation",
                    "Balance flavors and textures across a complete meal",
                    "Manage preparation of multiple components"
                ],
                "equipmentNeeded": [
                    "Cutting board",
                    "Chef's knife",
                    "Serving plates",
                    "Toaster (optional)",
                    "Small bowls for mise en place",
                    "Measuring spoons"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll your dice to determine your sandwich components. Gather all ingredients and equipment. Wash and prepare all vegetables and herbs. Set up a logical assembly area."
                            },
                            {
                                "subtitle": "Component Planning",
                                "content": "Prepare the side dish first if it requires cooking. Slice and organize all sandwich components before assembly. Consider toasting bread if appropriate for your combination."
                            }
                        ]
                    },
                    {
                        "title": "Sandwich Construction Technique",
                        "subsections": [
                            {
                                "subtitle": "Foundation Layer",
                                "content": "Apply spreads directly to both bread slices. If using mayonnaise, spread on both slices as a moisture barrier."
                            },
                            {
                                "subtitle": "Structural Ingredients",
                                "content": "Place sturdy ingredients like meat or cheese directly on bread. For leaf lettuce, place against spread to prevent soggy bread."
                            },
                            {
                                "subtitle": "Middle Layer",
                                "content": "Place tomatoes or wetter ingredients in the middle, between other ingredients. Season each layer with salt and pepper as you build."
                            },
                            {
                                "subtitle": "Moisture Management",
                                "content": "Pat wet ingredients dry with a paper towel before adding. If using avocado, place between meat and cheese to prevent oxidation. For very wet ingredients (like tomatoes), consider placing between cheese slices."
                            },
                            {
                                "subtitle": "Final Assembly",
                                "content": "Press gently to compact ingredients. Cut sandwich appropriately for the bread type (diagonal for square bread, straight for round). Secure with toothpick if necessary for tall sandwiches."
                            }
                        ]
                    },
                    {
                        "title": "Side Dish Preparation",
                        "subsections": [
                            {
                                "subtitle": "Side Dish Options",
                                "content": "Simple green salad: Toss greens with basic vinaigrette (3 parts oil to 1 part vinegar, salt, pepper). Potato chips: Serve alongside, or make quick homemade chips if ambitious. Fresh fruit: Wash and slice seasonal fruit. Quick pickled vegetables: Slice cucumber or radish, soak in vinegar, salt, and sugar for 15 minutes. Soup: Heat canned soup or prepare a simple 15-minute soup. Roasted vegetables: Toss vegetables with oil, salt, and pepper; roast at 425°F until tender."
                            },
                            {
                                "subtitle": "Plating and Presentation",
                                "content": "Arrange sandwich and side attractively on plate. Consider cutting sandwich to showcase layers. Add a small garnish if appropriate."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Bread Type (d6): 1-White sandwich bread, 2-Whole grain bread, 3-Sourdough, 4-Ciabatta roll, 5-Baguette, 6-Pita or wrap",
                            "Roll for Protein Component (d6): 1-Sliced deli turkey or ham, 2-Tuna salad, 3-Egg salad, 4-Sliced cheese (vegetarian), 5-Hummus (vegan), 6-Leftover roasted chicken or beef",
                            "Roll for Flavor Profile (d6): 1-Classic (lettuce, tomato, mayo), 2-Mediterranean (olive oil, herbs, feta), 3-Spicy (hot sauce, jalapeños, spicy mayo), 4-Sweet & savory (fruit, honey, cheese), 5-Umami-focused (mushrooms, tomatoes, parmesan), 6-Herb-forward (fresh herbs, vinaigrette)",
                            "Roll for Side Dish (d6): 1-Simple green salad, 2-Potato chips, 3-Fresh fruit, 4-Quick pickled vegetables, 5-Soup (canned or simple homemade), 6-Roasted vegetables",
                            "Prepare your sandwich and side dish based on your rolls, following the techniques in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Knife skills (even slicing, appropriate thickness)",
                    "Sandwich construction (stable, doesn't fall apart)",
                    "Moisture control (bread not soggy)",
                    "Side dish execution",
                    "Preparation sequence logic",
                    "Workspace organization",
                    "Efficiency of movement",
                    "Meal balance (nutrition, flavor, texture)"
                ],
                "tipsForSuccess": [
                    "Always toast bread if using wet ingredients",
                    "Season each layer of the sandwich, not just the spread",
                    "Cut ingredients to fit properly within the bread",
                    "Think about texture contrast: crunchy with soft, creamy with firm",
                    "Consider temperature: let hot ingredients cool slightly before assembly"
                ]
            },
            {
                "id": 47,
                "questName": "Easy Pasta Dinner Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 2,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Master pasta cookery, sauce development, and protein preparation in a cohesive dish.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master proper pasta cooking technique to achieve al dente texture",
                    "Develop a flavorful sauce from basic ingredients",
                    "Learn to coordinate cooking times for multiple components",
                    "Practice protein preparation techniques"
                ],
                "equipmentNeeded": [
                    "Large pot for pasta",
                    "Colander or strainer",
                    "Large skillet or saucepan",
                    "Cutting board and knife",
                    "Measuring cups and spoons",
                    "Wooden spoon or tongs",
                    "Timer"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your pasta dinner components. Gather all ingredients and equipment. Chop all vegetables and prep protein before starting to cook. Measure out pasta and prepare cooking water."
                            },
                            {
                                "subtitle": "Component Planning",
                                "content": "Create a timeline working backward from serving time. Identify which components take longest to cook. Plan when to start the pasta based on sauce cooking time."
                            }
                        ]
                    },
                    {
                        "title": "Pasta Cooking Technique",
                        "subsections": [
                            {
                                "subtitle": "Water Preparation",
                                "content": "Use abundant water (at least 4 quarts for 1 pound of pasta). Salt water generously (1-2 tablespoons per 4 quarts). Bring to a rolling boil before adding pasta."
                            },
                            {
                                "subtitle": "Cooking Process",
                                "content": "Add pasta to boiling water and stir immediately to prevent sticking. Set timer for 1-2 minutes less than package directions for al dente. Stir occasionally during cooking. Test for doneness by tasting a piece."
                            },
                            {
                                "subtitle": "Proper Draining",
                                "content": "Reserve 1/2 cup of pasta water before draining. Drain pasta but do not rinse (except for pasta salad). Return to pot or add directly to sauce."
                            }
                        ]
                    },
                    {
                        "title": "Sauce Preparation",
                        "subsections": [
                            {
                                "subtitle": "Sauce Types",
                                "content": "Classic Tomato Sauce: Sauté onions and garlic in olive oil until soft, add canned tomatoes, simmer 15-20 minutes, season with salt, pepper, and herbs. Aglio e Olio: Gently cook minced garlic in olive oil until fragrant but not brown, add red pepper flakes if desired. Cream-based Sauce: Create a roux with butter and flour, gradually add cream or milk, simmer until thickened. Butter-based Sauce: Brown butter slightly, add aromatics and herbs. Pesto: If using prepared pesto, simply warm gently; if making fresh, blend basil, pine nuts, garlic, parmesan, and olive oil. Broth-based Sauce: Sauté aromatics, add broth, reduce slightly, finish with herbs."
                            },
                            {
                                "subtitle": "Protein Preparation",
                                "content": "Ground Meat: Brown in a skillet, breaking into small pieces, drain excess fat if needed. Chicken Breast: Season, sauté until golden and cooked through (165°F), slice into strips. Shrimp: Season, sauté quickly just until pink and opaque (2-3 minutes). Italian Sausage: Remove from casing if necessary, brown in chunks or slices. Beans/Lentils: If using canned, drain and rinse; if cooking from dried, prepare ahead of time. Tofu: Press to remove excess moisture, cube, and sauté until golden."
                            },
                            {
                                "subtitle": "Vegetable Preparation",
                                "content": "Bell Peppers & Onions: Slice and sauté until soft. Mushrooms: Slice and sauté until browned and moisture is released. Leafy Greens: If tender, add at the end to wilt; if tougher, sauté first. Zucchini/Squash: Slice or dice, sauté until just tender. Broccoli/Cauliflower: Blanch briefly in pasta water before pasta, or sauté until crisp-tender. Cherry Tomatoes: Halve and add toward end of cooking to maintain shape."
                            }
                        ]
                    },
                    {
                        "title": "Final Assembly",
                        "subsections": [
                            {
                                "subtitle": "Component Integration",
                                "content": "Finish cooking pasta 1 minute shy of al dente. Add pasta directly to sauce (preferred method). Add reserved pasta water as needed to loosen sauce. Toss to coat pasta thoroughly. Add fresh herbs or cheese at the end if appropriate."
                            },
                            {
                                "subtitle": "Adjusting Consistency",
                                "content": "If too dry: Add reserved pasta water, a tablespoon at a time. If too wet: Simmer briefly to reduce, or add a bit of grated cheese to thicken."
                            },
                            {
                                "subtitle": "Final Seasoning",
                                "content": "Taste and adjust salt, pepper, acidity as needed. Consider a drizzle of good olive oil for richness. Add a pinch of red pepper flakes for heat if desired."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Pasta Type (d6): 1-Spaghetti, 2-Penne, 3-Fettuccine, 4-Rigatoni, 5-Farfalle (bow-tie), 6-Shells or other short pasta",
                            "Roll for Sauce Base (d6): 1-Classic tomato sauce, 2-Olive oil and garlic (aglio e olio), 3-Cream-based, 4-Butter-based, 5-Pesto, 6-Light broth-based sauce",
                            "Roll for Protein Component (d6): 1-Ground beef or turkey, 2-Chicken breast, 3-Shrimp or other shellfish, 4-Italian sausage, 5-Beans or lentils (vegetarian), 6-Tofu or plant-based protein (vegan)",
                            "Roll for Vegetable Addition (d6): 1-Bell peppers and onions, 2-Mushrooms, 3-Spinach or other leafy greens, 4-Zucchini or summer squash, 5-Broccoli or cauliflower, 6-Cherry tomatoes",
                            "Prepare your pasta dinner based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Pasta doneness (properly al dente)",
                    "Sauce consistency and flavor development",
                    "Protein cookery (properly cooked, not overcooked)",
                    "Vegetable preparation (properly cooked, not mushy)",
                    "Mise en place organization",
                    "Timing coordination (all components finished simultaneously)",
                    "Heat control and adjustment",
                    "Workspace management and cleanliness"
                ],
                "tipsForSuccess": [
                    "Always taste for seasoning at multiple stages",
                    "Start checking pasta doneness 1-2 minutes before package time",
                    "Save pasta water - it's liquid gold for adjusting sauce consistency",
                    "Cook in this order: Start protein, then sauce, then pasta, adding quick-cooking vegetables at appropriate times",
                    "Warm serving bowls or plates for best results"
                ]
            },
            {
                "id": 48,
                "questName": "Simple Weeknight Meal Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Management",
                "secondaryFocus": "Technique",
                "primaryHours": 2,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Learn kitchen management and efficiency skills to create a balanced, nutritious meal in under 45 minutes.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master time management in the kitchen",
                    "Learn parallel processing of multiple recipe steps",
                    "Develop quick cooking techniques",
                    "Practice preparing a nutritionally balanced meal"
                ],
                "equipmentNeeded": [
                    "Timer or stopwatch",
                    "Cutting board and knife",
                    "2 pots or pans",
                    "Baking sheet (optional)",
                    "Instant-read thermometer (for proteins)",
                    "Small bowls for mise en place",
                    "Measuring cups and spoons"
                ],
                "contentSections": [
                    {
                        "title": "Planning Phase",
                        "subsections": [
                            {
                                "subtitle": "Analyze Your Roll Combination",
                                "content": "Roll dice to determine your components. Write down your complete meal plan. Identify critical timing factors."
                            },
                            {
                                "subtitle": "Create a Timeline",
                                "content": "Work backward from 45-minute target. Schedule all preparation and cooking steps. Identify opportunities for parallel processing. Set specific time checkpoints."
                            }
                        ]
                    },
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Rapid Mise en Place",
                                "content": "Set timer for 10 minutes. Gather ALL ingredients before starting. Prepare protein (seasoning, trimming). Chop all vegetables. Measure out grains, liquids, and seasonings. Preheat oven if needed."
                            },
                            {
                                "subtitle": "Workspace Organization",
                                "content": "Arrange ingredients in order of use. Position tools strategically. Clear washing area for clean-as-you-go approach. Set up cooling/resting area for finished components."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Phase",
                        "subsections": [
                            {
                                "subtitle": "Critical Path Identification",
                                "content": "Start the component with longest cooking time first. Typically order is: grain/starch, protein, vegetables. Exception: roasted items often need to go first."
                            },
                            {
                                "subtitle": "Parallel Processing Technique",
                                "content": "While one component cooks, prep or cook another. Use downtime to clean workspace or set table. Check doneness of multiple items during natural pauses. Consolidate cooking methods when possible (sheet pan, one-pot)."
                            },
                            {
                                "subtitle": "Protein Cooking Techniques",
                                "content": "Pan-seared: Preheat pan well, don't crowd, flip once. Roasted: High heat (400-425°F), check temperature. Broiled: Position rack properly, watch carefully. Stir-fried: High heat, small pieces, constant movement. One-pot/sheet pan: Arrange for even cooking. Pressure cooker: Follow specific guidelines for your model."
                            },
                            {
                                "subtitle": "Efficient Vegetable Preparation",
                                "content": "Salad: Wash, dry, chop, dress at last minute. Steamed: Uniform pieces, don't overcook. Roasted: High heat, uniform pieces, single layer. Sautéed: Hot pan, don't crowd, season after cooking. Raw platter: Focus on presentation and dip. Quick soup: Use pre-chopped ingredients when possible."
                            }
                        ]
                    },
                    {
                        "title": "Final Assembly",
                        "subsections": [
                            {
                                "subtitle": "Plating Strategy",
                                "content": "Begin plating 5 minutes before deadline. Arrange components attractively. Add final garnishes or seasonings. Clean edges of plates."
                            },
                            {
                                "subtitle": "Final Quality Check",
                                "content": "Taste final dish for seasoning. Ensure proper temperature. Verify all components are properly cooked."
                            },
                            {
                                "subtitle": "Time Management Critical Points",
                                "content": "10-Minute Mark: All ingredients prepped. 25-Minute Mark: Main protein cooking. 35-Minute Mark: All components cooking or cooked. 40-Minute Mark: Begin final assembly. 45-Minute Mark: Complete meal ready to serve."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Protein Component (d6): 1-Chicken breast or thighs, 2-Fish fillets (salmon, tilapia, cod), 3-Ground meat (beef, turkey, pork), 4-Pork chops or tenderloin, 5-Tofu or tempeh, 6-Eggs (for dinner)",
                            "Roll for Cooking Method (d6): 1-Pan-seared or sautéed, 2-Roasted, 3-Broiled, 4-Stir-fried, 5-One-pot or sheet pan method, 6-Pressure cooker method (or fast simmer if no pressure cooker)",
                            "Roll for Starch/Grain Component (d6): 1-Rice (white or quick-cooking), 2-Pasta or noodles, 3-Potatoes (mashed, roasted, or quick-cooking), 4-Couscous or quick-cooking grain, 5-Bread or tortillas, 6-Beans or lentils (canned for speed)",
                            "Roll for Vegetable Preparation (d6): 1-Simple salad, 2-Steamed vegetables, 3-Roasted vegetables, 4-Sautéed vegetables, 5-Raw vegetable platter with dip, 6-Vegetable soup (quick-cooking)",
                            "Prepare your weeknight meal based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Timeline adherence (completed within 45 minutes)",
                    "Parallel processing effectiveness",
                    "Workspace organization",
                    "Clean-as-you-go implementation",
                    "Stress management under time pressure",
                    "Protein cookery (properly cooked, good flavor)",
                    "Vegetable preparation (proper doneness, presentation)",
                    "Starch/grain preparation (proper texture)",
                    "Seasoning and flavor balance",
                    "Final presentation"
                ],
                "tipsForSuccess": [
                    "Read all instructions before beginning",
                    "Set multiple timers for different components",
                    "Choose appropriate cutting sizes for cooking time (smaller = faster)",
                    "Use the 'clean as you go' method to maintain workspace",
                    "Consider pre-washed or pre-cut ingredients for speed",
                    "Keep seasoning simple but effective under time constraints"
                ]
            },
            {
                "id": 49,
                "questName": "Basic Stir Fry Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 2,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Master the fundamental techniques of stir-frying: high heat, rapid cooking, and precise timing.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master the principles of high-heat cooking",
                    "Learn proper ingredient cutting for even cooking",
                    "Develop sauce balancing skills",
                    "Practice mise en place and timing management"
                ],
                "equipmentNeeded": [
                    "Wok or large skillet",
                    "Sharp knife and cutting board",
                    "Small bowls for prepared ingredients",
                    "Rice cooker or pot for rice",
                    "Measuring spoons",
                    "Wooden spoon or stir-fry spatula",
                    "Timer"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Rice Preparation",
                                "content": "Start rice first according to package directions. For white rice: rinse, use 1:1.5 ratio of rice to water. Begin cooking before other preparations."
                            },
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your stir-fry components. Prepare all ingredients before heating the wok. Arrange in separate bowls in order of cooking. Cut all ingredients to similar sizes for even cooking. Prepare sauce mixture in a separate bowl."
                            },
                            {
                                "subtitle": "Vegetable Preparation Technique",
                                "content": "Cut vegetables on the bias (diagonal) for more surface area. Ensure uniform size for even cooking. Group vegetables by cooking time: Hard vegetables (carrots, broccoli stems): cut smaller. Medium vegetables (peppers, onions): medium pieces. Quick-cooking vegetables (leafy greens): larger pieces or add last."
                            },
                            {
                                "subtitle": "Protein Preparation Technique",
                                "content": "Cut against the grain for meat (especially beef). Uniform thin slices or bite-sized pieces. Optional: marinate briefly with soy sauce and cornstarch (velveting). Pat dry before cooking."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Phase",
                        "subsections": [
                            {
                                "subtitle": "Wok Preparation",
                                "content": "Heat wok until very hot (water droplets should instantly evaporate). Add high-smoke-point oil (canola, peanut, or vegetable). Swirl to coat sides."
                            },
                            {
                                "subtitle": "Cooking Sequence",
                                "content": "Start with aromatics (garlic, ginger, scallion whites) - 30 seconds. Add protein, spread out, allow to sear before stirring - 2-3 minutes. Remove protein if it's quick-cooking (like shrimp). Add vegetables in order of cooking time (longest first). Return protein to wok. Add sauce and toss to coat. Add final additions (nuts, herbs) at the end."
                            },
                            {
                                "subtitle": "Stir-Fry Technique",
                                "content": "Keep ingredients moving constantly. Use a scooping motion from bottom to top. Push food up sides of wok for controlled cooking. Don't overcrowd the pan (cook in batches if necessary)."
                            }
                        ]
                    },
                    {
                        "title": "Sauce Preparation",
                        "subsections": [
                            {
                                "subtitle": "Basic Components",
                                "content": "Liquid base (soy sauce, broth, vinegar). Sweetener (sugar, honey, maple syrup). Thickener (cornstarch slurry - 1 tsp cornstarch mixed with 2 tbsp cold water). Flavoring agents (based on your roll)."
                            },
                            {
                                "subtitle": "Specific Sauce Profiles",
                                "content": "Basic soy and garlic: 3 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sugar, 2 minced garlic cloves. Sweet and sour: 2 tbsp soy sauce, 3 tbsp rice vinegar, 2 tbsp sugar, 2 tbsp ketchup. Spicy Szechuan: 2 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sugar, 1-2 tsp chili paste. Ginger-scallion: 3 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sugar, 1 tbsp grated ginger, 3 chopped scallions. Curry-inspired: 2 tbsp soy sauce, 1 can coconut milk, 1-2 tbsp curry paste. Teriyaki style: 3 tbsp soy sauce, 2 tbsp mirin, 1 tbsp sugar, 1 tsp grated ginger."
                            },
                            {
                                "subtitle": "Sauce Application",
                                "content": "Add sauce after vegetables are cooked but still crisp. Allow sauce to bubble and thicken (about 30 seconds). Toss to coat all ingredients evenly."
                            }
                        ]
                    },
                    {
                        "title": "Final Assembly",
                        "subsections": [
                            {
                                "subtitle": "Serving Options",
                                "content": "Serve stir-fry over rice. Garnish according to flavor profile (scallion greens, sesame seeds, herbs). Optional: add final drizzle of sesame oil or chili oil."
                            },
                            {
                                "subtitle": "Quality Check",
                                "content": "Vegetables should be crisp-tender, not mushy. Protein should be fully cooked but not overcooked. Sauce should coat ingredients but not be too thick or too thin."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Protein Component (d6): 1-Chicken breast or thighs, 2-Beef (flank or sirloin), 3-Pork (tenderloin or loin), 4-Shrimp or other seafood, 5-Tofu or tempeh (vegetarian), 6-Seitan or plant-based protein (vegan)",
                            "Roll for Primary Vegetable Mix (d6): 1-Classic mix (carrots, broccoli, snow peas), 2-Bell peppers and onions, 3-Mushroom medley, 4-Cabbage and Asian greens, 5-Summer squash mix, 6-Root vegetable mix",
                            "Roll for Flavor Profile (d6): 1-Basic soy and garlic, 2-Sweet and sour, 3-Spicy Szechuan, 4-Ginger-scallion focus, 5-Curry-inspired, 6-Teriyaki style",
                            "Roll for Special Addition (d6): 1-Cashews or peanuts, 2-Pineapple or mandarin oranges, 3-Water chestnuts or bamboo shoots, 4-Fresh herbs (cilantro, basil, mint), 5-Sesame seeds and sesame oil, 6-Chili oil or fresh chilies",
                            "Prepare your stir-fry based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Wok/pan heat management",
                    "Cutting consistency and technique",
                    "Stir-fry motion and control",
                    "Sauce consistency and balance",
                    "Rice preparation",
                    "Mise en place organization",
                    "Ingredient sequence planning",
                    "Timing coordination",
                    "Workspace efficiency",
                    "Rice and stir-fry completion timing"
                ],
                "tipsForSuccess": [
                    "Never start stir-frying until all ingredients are prepared",
                    "Cut ingredients uniformly for even cooking",
                    "Don't overcrowd the wok - cook in batches if needed",
                    "Keep heat high and food moving",
                    "Cook proteins and vegetables separately if you're a beginner",
                    "Have sauce mixed and ready before starting to cook",
                    "Cook rice ahead of time for perfect meal timing",
                    "Taste and adjust seasoning at the end"
                ]
            },
            {
                "id": 50,
                "questName": "One-Pot Meal Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Management",
                "secondaryFocus": "Technique",
                "primaryHours": 2,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Create a complete meal in a single cooking vessel, minimizing cleanup while maximizing flavor development.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master the principles of one-pot cooking",
                    "Learn proper ingredient layering and timing",
                    "Develop skills for creating depth of flavor without multiple components",
                    "Practice efficient kitchen management"
                ],
                "equipmentNeeded": [
                    "One large pot, Dutch oven, or deep skillet with lid",
                    "Cutting board and knife",
                    "Measuring cups and spoons",
                    "Wooden spoon or heat-resistant spatula",
                    "Timer",
                    "Ladle or serving spoon"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your one-pot meal components. Gather all ingredients and equipment. Wash and prepare all vegetables. Cut protein into appropriate sizes for even cooking. Measure out liquids and seasonings. Group ingredients by cooking time."
                            },
                            {
                                "subtitle": "Layering Plan",
                                "content": "Create a sequence for adding ingredients based on cooking times. Plan when to add seasonings for maximum flavor development. Consider texture outcomes of ingredients when planning."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Phase",
                        "subsections": [
                            {
                                "subtitle": "Foundation Building",
                                "content": "Heat vessel over medium heat. Add fat (oil, butter) as needed. Begin with aromatics (onions, garlic, celery, carrots) to build flavor base. Cook until softened and fragrant."
                            },
                            {
                                "subtitle": "Protein Development",
                                "content": "Add protein and brown if appropriate. For ground meat: cook thoroughly, breaking apart. For whole pieces: create good color on all sides. For beans/lentils: add after aromatics are soft. For seafood: add later in the cooking process."
                            },
                            {
                                "subtitle": "Layering Strategy",
                                "content": "Add ingredients in order of cooking time (longest first). Dense vegetables (carrots, potatoes): add early. Grains/pasta: add with appropriate liquid amount. Tender vegetables: add later to prevent overcooking. Leafy greens: add in final minutes."
                            },
                            {
                                "subtitle": "Liquid Management",
                                "content": "Add measured liquid appropriate to your dish. For rice dishes: follow proper rice-to-liquid ratio. For pasta: enough to cook pasta while creating sauce. For stews: enough to cover ingredients. Maintain appropriate liquid level throughout cooking."
                            },
                            {
                                "subtitle": "Seasoning Approach",
                                "content": "Season in layers as you add ingredients. Add hearty herbs (rosemary, thyme) early. Reserve delicate herbs (parsley, cilantro) for end. Taste and adjust seasoning before serving."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Styles",
                        "subsections": [
                            {
                                "subtitle": "Soup/Stew Technique",
                                "content": "Build flavor base with aromatics. Add protein and brown if appropriate. Add liquid and bring to simmer. Add starch and vegetables based on cooking time. Simmer until all components are tender."
                            },
                            {
                                "subtitle": "Casserole Technique",
                                "content": "Sauté aromatics and protein. Add starch and liquid. Cover and cook until starch is tender. Stir occasionally to prevent sticking."
                            },
                            {
                                "subtitle": "Skillet Meal Technique",
                                "content": "Cook protein until nearly done. Add vegetables according to cooking time. Add pre-cooked or quick-cooking starch. Combine with sauce or liquid to finish."
                            },
                            {
                                "subtitle": "Braised Dish Technique",
                                "content": "Brown protein thoroughly. Add aromatics and cook until soft. Add liquid (½ to ⅔ up the sides of protein). Cover and cook on low heat until tender. Add vegetables in stages based on cooking time."
                            },
                            {
                                "subtitle": "Rice/Grain Based Technique",
                                "content": "Sauté aromatics and protein. Add rice/grain and toast briefly. Add measured liquid (follow grain-specific ratios). Simmer covered until liquid is absorbed. Add quick-cooking vegetables toward end."
                            },
                            {
                                "subtitle": "Curry Technique",
                                "content": "Build aromatic base with spices. Add protein and brown if appropriate. Add sauce components and liquid. Simmer until protein is cooked. Add vegetables according to cooking time."
                            }
                        ]
                    },
                    {
                        "title": "Final Touches",
                        "subsections": [
                            {
                                "subtitle": "Finishing the Dish",
                                "content": "Adjust consistency if needed (reduce for thicker, add liquid for thinner). Add fresh herbs, acid (lemon juice, vinegar), or dairy if appropriate. Let rest 5-10 minutes if appropriate for your dish. Taste and adjust final seasoning."
                            },
                            {
                                "subtitle": "Serving Strategy",
                                "content": "Serve directly from cooking vessel for family-style presentation. Garnish with fresh herbs, cheese, or acid as appropriate. Consider textural garnish (croutons, seeds, nuts) if desired."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Cooking Vessel (d6): 1-Dutch oven or heavy pot, 2-Large deep skillet, 3-Electric pressure cooker, 4-Soup pot, 5-Rice cooker or multi-cooker, 6-Slow cooker",
                            "Roll for Base Protein (d6): 1-Chicken thighs or drumsticks, 2-Ground meat (beef, turkey, pork), 3-Sausage (any variety), 4-Beans or lentils (vegetarian), 5-Cubed beef or pork, 6-Seafood (shrimp, white fish)",
                            "Roll for Starch Component (d6): 1-Rice, 2-Pasta (small shapes like orzo or shells), 3-Potatoes, 4-Quinoa or other grain, 5-Bread (for bread pudding or strata style), 6-Beans (if not already chosen as protein)",
                            "Roll for Cooking Style (d6): 1-Soup or stew, 2-Casserole, 3-Skillet meal, 4-Braised dish, 5-Rice/grain-based one-pot, 6-Curry or sauce-heavy dish",
                            "Prepare your one-pot meal based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Ingredient organization and preparation",
                    "Sequence planning and execution",
                    "Time management",
                    "Resource efficiency",
                    "Cleanup minimization",
                    "Proper ingredient layering",
                    "Flavor development",
                    "Texture control",
                    "Liquid management",
                    "Final seasoning balance"
                ],
                "tipsForSuccess": [
                    "Read through the entire recipe before beginning",
                    "Cut all ingredients to appropriate sizes for even cooking",
                    "Consider pre-cooking very dense ingredients if necessary",
                    "Maintain appropriate heat to avoid scorching the bottom",
                    "Stir occasionally but not constantly (especially for rice dishes)",
                    "Keep lid on when appropriate to maintain moisture and heat",
                    "Allow time for flavors to develop fully",
                    "Add acid at the end to brighten flavors"
                ]
            },
            {
                "id": 51,
                "questName": "Easy Sheet Pan Dinner Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Management",
                "secondaryFocus": "Technique",
                "primaryHours": 2,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Create a complete meal using a single sheet pan, taking advantage of the oven's even heat.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master sheet pan meal planning and execution",
                    "Learn proper ingredient arrangement for even cooking",
                    "Develop skills for timing and temperature management",
                    "Practice flavor development through roasting"
                ],
                "equipmentNeeded": [
                    "Rimmed baking sheet (half sheet pan preferred)",
                    "Parchment paper or aluminum foil (optional)",
                    "Cutting board and knife",
                    "Measuring spoons",
                    "Mixing bowls for marinades/seasoning",
                    "Spatula or tongs",
                    "Instant-read thermometer (for proteins)"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your sheet pan dinner components. Preheat oven to 425°F (220°C). Line sheet pan with parchment or foil if desired. Wash and prepare all vegetables. Prepare protein (trim, portion, pat dry). Mix marinades or seasoning blends based on your flavor profile."
                            },
                            {
                                "subtitle": "Cooking Time Analysis",
                                "content": "Identify cooking times for all components. Group ingredients by cooking time: Dense, long-cooking items (potatoes, carrots, beets), Medium-cooking items (protein, broccoli, cauliflower), Quick-cooking items (thin fish, asparagus, green beans). Plan staged additions if necessary."
                            }
                        ]
                    },
                    {
                        "title": "Sheet Pan Assembly",
                        "subsections": [
                            {
                                "subtitle": "Proper Sheet Pan Preparation",
                                "content": "Ensure pan is large enough for ingredients in single layer. Line with parchment/foil for easier cleanup if desired. Lightly oil or spray pan to prevent sticking. Preheat pan for certain items if extra browning is desired."
                            },
                            {
                                "subtitle": "Ingredient Arrangement Technique",
                                "content": "Place foods in a single layer with space between pieces. Position items according to cooking time: Longest-cooking items on outer edges (hotter areas), Quicker-cooking items in center, Items that release moisture away from those needing to crisp. For staged additions, leave space for later additions."
                            },
                            {
                                "subtitle": "Optimal Oil Application",
                                "content": "Toss vegetables in oil, salt, and seasonings before arranging. For protein, brush or drizzle oil on surface. Use just enough oil to coat - not swimming. Consider different oils based on flavor profile."
                            },
                            {
                                "subtitle": "Temperature Management",
                                "content": "Start high (425-450°F) for browning. Reduce if needed for longer cooking items. Consider broiler finish for additional browning. Rotate pan halfway through cooking for even results."
                            },
                            {
                                "subtitle": "Timing Strategy",
                                "content": "Start long-cooking items first. Add medium items after 10-15 minutes. Add quick-cooking items in final 10 minutes. Use timer for each addition. Test for doneness with thermometer for proteins."
                            }
                        ]
                    },
                    {
                        "title": "Cooking Approach by Protein Type",
                        "subsections": [
                            {
                                "subtitle": "Chicken Pieces",
                                "content": "Season well, start skin-side up. Cook until internal temperature reaches 165°F (74°C). Place on pan first, add vegetables around or after 10-15 minutes."
                            },
                            {
                                "subtitle": "Pork Tenderloin",
                                "content": "Sear on all sides in hot pan before sheet pan if desired. Cook to internal temperature of 145°F (63°C). Rest 3 minutes before slicing."
                            },
                            {
                                "subtitle": "Fish Fillets",
                                "content": "Start vegetables first for 15-20 minutes. Add seasoned fish for final 10-12 minutes. Cook until fish flakes easily with fork."
                            },
                            {
                                "subtitle": "Sausages",
                                "content": "Can be added at same time as most vegetables. Flip halfway through cooking. Cook until internal temperature reaches 160°F (71°C)."
                            },
                            {
                                "subtitle": "Tofu/Tempeh",
                                "content": "Press tofu to remove excess moisture. Toss in cornstarch for crispier exterior if desired. Add after 10 minutes if using firmer vegetables."
                            },
                            {
                                "subtitle": "Shrimp/Scallops",
                                "content": "Start vegetables first for at least 15-20 minutes. Add seasoned seafood for final 5-8 minutes. Cook shrimp until pink and opaque."
                            }
                        ]
                    },
                    {
                        "title": "Vegetable Preparation Tips",
                        "subsections": [
                            {
                                "subtitle": "Cut Size Principles",
                                "content": "Cut all vegetables to similar size for even cooking. Smaller cuts for dense vegetables. Larger cuts for quicker-cooking items. Consistent thickness for even results."
                            },
                            {
                                "subtitle": "Strategic Seasoning",
                                "content": "Season vegetables according to flavor profile. Add salt and pepper to all items. Toss vegetables in oil and seasonings before arranging. Reserve some fresh herbs for finishing."
                            }
                        ]
                    },
                    {
                        "title": "Final Touches",
                        "subsections": [
                            {
                                "subtitle": "Finishing the Dish",
                                "content": "Check for doneness of all components. Add finishing ingredients based on special addition roll. Let protein rest if appropriate. Drizzle with additional sauce or oil if desired."
                            },
                            {
                                "subtitle": "Serving Strategy",
                                "content": "Transfer to serving platter or serve directly from pan. Garnish with fresh elements. Add any last-minute sauces or drizzles. Serve with simple side if desired (rice, bread, salad)."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Protein Component (d6): 1-Chicken pieces (thighs, drumsticks, breasts), 2-Pork tenderloin or chops, 3-Salmon or firm white fish fillets, 4-Sausages (any variety), 5-Tofu or tempeh (vegetarian), 6-Shrimp or scallops",
                            "Roll for Vegetable Mix (d6): 1-Root vegetables (potatoes, carrots, parsnips), 2-Mediterranean mix (bell peppers, zucchini, eggplant), 3-Cruciferous vegetables (broccoli, cauliflower, Brussels sprouts), 4-Seasonal greens mix (asparagus, green beans, snap peas), 5-Squash varieties (butternut, acorn, delicata), 6-Onion family mix (onions, leeks, shallots)",
                            "Roll for Flavor Profile (d6): 1-Herbs and lemon (Mediterranean), 2-Soy-ginger-garlic (Asian), 3-Smoked paprika and herbs (Spanish), 4-Curry spices (Indian), 5-Honey-mustard (American), 6-Balsamic and herb (Italian)",
                            "Roll for Special Addition (d6): 1-Fresh herbs added after cooking, 2-Cheese finish (parmesan, feta, goat), 3-Sauce drizzle (yogurt, tahini, pesto), 4-Citrus segments or zest, 5-Nuts or seeds (pine nuts, almonds, sesame), 6-Quick-pickled element (red onions, radish)",
                            "Prepare your sheet pan dinner based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Ingredient organization and preparation",
                    "Timing strategy execution",
                    "Space utilization on sheet pan",
                    "Temperature control",
                    "Efficiency of process",
                    "Even cooking across all components",
                    "Proper protein doneness",
                    "Vegetable texture achievement",
                    "Flavor development",
                    "Final presentation"
                ],
                "tipsForSuccess": [
                    "Don't overcrowd the pan - use two pans if necessary",
                    "Cut dense vegetables smaller than quick-cooking ones",
                    "Pat protein dry for better browning",
                    "Line pan with parchment or foil for easier cleanup",
                    "Allow space between items for air circulation",
                    "Flip or stir vegetables halfway through for even browning",
                    "Use high-quality oil that can withstand high heat",
                    "Test protein temperature with thermometer",
                    "Consider par-cooking very dense vegetables"
                ]
            },
            {
                "id": 52,
                "questName": "Breakfast for Dinner Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 1.5,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Transform traditional breakfast foods into a satisfying dinner with appropriate sophistication and heartiness.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master essential breakfast cooking techniques",
                    "Learn to adapt morning foods for evening satisfaction",
                    "Develop a balanced meal using breakfast components",
                    "Practice timing management for multiple components"
                ],
                "equipmentNeeded": [
                    "Skillet or non-stick pan",
                    "Baking sheet or casserole dish",
                    "Cutting board and knife",
                    "Mixing bowls",
                    "Whisk",
                    "Spatula",
                    "Measuring cups and spoons"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your breakfast-for-dinner components. Gather all ingredients and equipment. Prepare all vegetables and proteins. Create a timeline for all components. Preheat oven if needed."
                            },
                            {
                                "subtitle": "Component Planning",
                                "content": "Identify which components can be prepared ahead. Plan cooking sequence based on holding ability. Consider how to make breakfast items more dinner-appropriate. Think about presentation that feels like dinner."
                            }
                        ]
                    },
                    {
                        "title": "Main Component Techniques",
                        "subsections": [
                            {
                                "subtitle": "Egg-Focused Dish Technique",
                                "content": "Frittata: Sauté vegetables and protein in oven-safe skillet, add beaten eggs (6-8 eggs for dinner portion), cook bottom on stovetop until edges set, finish in 375°F oven until center is just set. Quiche: Prepare or use pre-made crust, add sautéed vegetables and protein, pour over egg-dairy mixture (4-6 eggs plus 1 cup dairy), bake at 375°F until center is just set (30-40 minutes). Shakshuka: Create tomato-pepper sauce base in skillet, create wells and crack eggs directly into sauce, cover and simmer until whites set but yolks remain runny, serve with bread for dipping."
                            },
                            {
                                "subtitle": "Pancake/Waffle Technique",
                                "content": "Make batter from scratch for dinner-worthy quality. For dinner, add savory elements (herbs, cheese, corn). Cook in batches, keeping warm in 200°F oven. Serve with both sweet and savory toppings. Consider protein as side rather than mixed in."
                            },
                            {
                                "subtitle": "Hash Technique",
                                "content": "Par-boil diced potatoes for 5-7 minutes. Sauté onions and peppers until soft. Add potatoes and cook until crispy. Incorporate protein and additional vegetables. Top with eggs (fried or poached) for complete meal. Season aggressively with herbs and spices."
                            },
                            {
                                "subtitle": "Breakfast Sandwich/Burrito Technique",
                                "content": "Select substantial bread or tortilla. Cook components individually for best texture. Layer strategically to prevent sogginess. For burritos, wrap tightly and toast seam-side down. For sandwiches, consider open-faced presentation. Make dinner-sized portion (larger than breakfast)."
                            },
                            {
                                "subtitle": "Breakfast Casserole Technique",
                                "content": "Layer base ingredients (bread, potatoes, or grains). Add pre-cooked protein and vegetables. Pour over egg mixture. Let sit 15 minutes to absorb liquid. Bake at 350°F until set (35-45 minutes). Let rest 10 minutes before serving."
                            },
                            {
                                "subtitle": "French Toast/Bread Pudding Technique",
                                "content": "Use hearty bread (brioche, challah, sourdough). For savory version, reduce sugar and add herbs/cheese. Ensure bread is soaked but not soggy. Cook French toast in butter until golden. For bread pudding, bake at 350°F until set. Consider savory toppings for dinner version."
                            }
                        ]
                    },
                    {
                        "title": "Protein Preparation Tips",
                        "subsections": [
                            {
                                "subtitle": "Bacon",
                                "content": "Oven method: Bake at 400°F for even cooking (15-20 minutes). For bits: Chop before cooking. Save rendered fat for cooking other components."
                            },
                            {
                                "subtitle": "Sausage",
                                "content": "Cook thoroughly to 160°F internal temperature. For links: Pierce before cooking to prevent bursting. For patties: Form thin for quicker cooking. Consider slicing before adding to dishes."
                            },
                            {
                                "subtitle": "Ham",
                                "content": "Brief sear for color and flavor. Dice for incorporation into main dishes. Use as side in larger slices or steaks."
                            },
                            {
                                "subtitle": "Smoked Salmon",
                                "content": "No additional cooking required. Add at end of cooking process. Pair with creamy elements."
                            },
                            {
                                "subtitle": "Vegetarian Protein",
                                "content": "Prepare according to package directions. Season aggressively. Add complementary spices and herbs."
                            }
                        ]
                    },
                    {
                        "title": "Vegetable Techniques",
                        "subsections": [
                            {
                                "subtitle": "Sautéed Greens",
                                "content": "Clean thoroughly and remove tough stems. Use hot pan with oil or bacon fat. Add sliced garlic for flavor. Cook just until wilted. Finish with acid (lemon juice, vinegar)."
                            },
                            {
                                "subtitle": "Roasted Vegetables",
                                "content": "Cut into uniform pieces. Toss with oil, salt, and seasonings. Roast at 425°F until caramelized. Consider quick-cooking versus longer-cooking items."
                            },
                            {
                                "subtitle": "Fresh Salad/Slaw",
                                "content": "Prepare right before serving. Use sturdy greens for dinner satisfaction. Add substantial elements (nuts, cheese, fruit). Dress lightly to prevent wilting."
                            },
                            {
                                "subtitle": "Vegetable Hash",
                                "content": "Par-cook dense vegetables. Sauté onions until translucent. Add vegetables in order of cooking time. Season generously. Consider textural contrast (soft and crispy)."
                            }
                        ]
                    },
                    {
                        "title": "Dinner Transformation Strategies",
                        "subsections": [
                            {
                                "subtitle": "Portion Consideration",
                                "content": "Increase portion sizes from breakfast. Add more protein and vegetables for dinner satisfaction. Use dinner-sized plates for presentation."
                            },
                            {
                                "subtitle": "Sophistication Techniques",
                                "content": "Add fresh herbs as finish. Include complex flavor elements. Elevate presentation with plating. Consider wine or beer pairings. Add sauce component appropriate to cuisine."
                            },
                            {
                                "subtitle": "Balancing the Meal",
                                "content": "Ensure protein, vegetable, and starch components. Add simple green side salad if needed. Consider acid component to cut richness. Think about textural contrasts."
                            }
                        ]
                    },
                    {
                        "title": "Final Touches",
                        "subsections": [
                            {
                                "subtitle": "Finishing the Dish",
                                "content": "Garnish appropriately based on flavor direction. Add fresh components for brightness. Ensure proper temperature for service. Add finishing sauces or drizzles."
                            },
                            {
                                "subtitle": "Serving Strategy",
                                "content": "Family style or individual plating based on dish. Consider dinner-appropriate accompaniments. Ensure all components are served hot. Provide appropriate condiments."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Main Component (d6): 1-Egg-focused dish (frittata, quiche, shakshuka), 2-Pancakes or waffles, 3-Hash (potato-based with additions), 4-Breakfast sandwich or burrito, 5-Breakfast casserole, 6-French toast or bread pudding",
                            "Roll for Protein Addition (d6): 1-Bacon, 2-Sausage (breakfast or Italian), 3-Ham, 4-Smoked salmon or other fish, 5-Vegetarian protein (beans, meat alternatives), 6-Cheese as primary protein",
                            "Roll for Vegetable Approach (d6): 1-Sautéed greens (spinach, kale, chard), 2-Roasted vegetables, 3-Fresh salad or slaw, 4-Vegetable hash or home fries, 5-Avocado preparation, 6-Mushroom medley",
                            "Roll for Flavor Direction (d6): 1-Classic American breakfast, 2-Mexican-inspired, 3-Mediterranean, 4-Southern comfort, 5-Asian-inspired, 6-European café style",
                            "Prepare your breakfast-for-dinner meal based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Main component execution",
                    "Protein preparation",
                    "Vegetable handling",
                    "Flavor development",
                    "Texture achievement",
                    "Component timing coordination",
                    "Workspace organization",
                    "Process efficiency",
                    "Resource usage",
                    "Meal balance achievement"
                ],
                "tipsForSuccess": [
                    "Think beyond traditional breakfast flavors",
                    "Don't overcook eggs in any application",
                    "Consider adding more spice and seasoning than breakfast versions",
                    "Use dinner-quality ingredients (artisanal bread, farm eggs, etc.)",
                    "Focus on making the dish substantial enough for dinner",
                    "Balance sweet elements with savory components",
                    "Add fresh herbs or microgreens for sophisticated finish",
                    "Consider texture contrast for satisfaction"
                ]
            },
            {
                "id": 53,
                "questName": "Easy Soup & Sandwich Challenge",
                "rank": "Home Cook",
                "type": "Main",
                "primaryFocus": "Technique",
                "secondaryFocus": "Management",
                "primaryHours": 1.5,
                "secondaryHours": 1,
                "diceRequired": true,
                "description": "Create the quintessential comfort food pairing: soup and sandwich, with balanced flavors and textures.",
                "stageId": 4,
                "stageName": "Basic Sides & Components",
                "learningObjectives": [
                    "Master soup-making fundamentals",
                    "Learn proper sandwich construction techniques",
                    "Develop complementary flavor profiles across components",
                    "Practice timing coordination for simultaneous completion"
                ],
                "equipmentNeeded": [
                    "Medium pot for soup",
                    "Cutting board and knife",
                    "Ladle",
                    "Blender or immersion blender (optional)",
                    "Toaster or pan for bread",
                    "Measuring cups and spoons",
                    "Mixing bowls",
                    "Serving bowls and plates"
                ],
                "contentSections": [
                    {
                        "title": "Preparation Phase",
                        "subsections": [
                            {
                                "subtitle": "Mise en Place",
                                "content": "Roll dice to determine your soup and sandwich components. Gather all ingredients and equipment. Chop all vegetables and prepare proteins. Measure soup ingredients. Set up sandwich assembly station. Create timeline for both components."
                            },
                            {
                                "subtitle": "Component Planning",
                                "content": "Determine soup cooking time. Plan sandwich preparation to coincide with soup completion. Identify which components can be prepared while soup simmers. Consider how soup and sandwich flavors will complement each other."
                            }
                        ]
                    },
                    {
                        "title": "Soup Techniques",
                        "subsections": [
                            {
                                "subtitle": "Basic Soup Method",
                                "content": "Start with aromatic base (onions, carrots, celery). Cook aromatics in oil or butter until soft. Add herbs and spices, toast briefly. Add main ingredients and liquid. Simmer until all components are tender. Season throughout process, adjusting at end."
                            },
                            {
                                "subtitle": "Soup-Specific Techniques",
                                "content": "Creamy Vegetable Soup: Cook vegetables in broth until very tender, for creamy texture without cream: blend portion of soup, for creamy with dairy: add cream at end, do not boil, adjust thickness with additional liquid as needed. Clear Broth Soup: Focus on flavorful broth development, add vegetables in order of cooking time, for noodle soups: cook noodles separately or add at end, keep at gentle simmer to maintain clear broth. Bean/Lentil Soup: Sauté aromatics thoroughly for flavor base, if using dried beans, ensure they're properly soaked, simmer gently until beans are tender but not mushy, consider pureeing portion for thicker texture. Tomato-Based Soup: Cook onions and garlic thoroughly before adding tomatoes, add pinch of sugar to balance acidity if needed, for creamy version: add cream or blend with bread, consider final acid addition (vinegar, lemon). Pureed Soup: Cook all ingredients until very tender, use immersion blender or regular blender (in batches), strain for extra smoothness if desired, thin with additional broth if too thick, finish with cream, oil, or butter for richness. Quick Chowder: Begin with bacon or salt pork if using, create roux for thickening if desired, add potatoes and cook until nearly tender, add quicker-cooking items (corn, seafood), add dairy near end, do not boil after adding."
                            },
                            {
                                "subtitle": "Soup Timing Management",
                                "content": "Most soups need 20-30 minutes simmering time. Use simmering time to prepare sandwich components. Prepare garnishes while soup finishes. Taste and adjust seasoning before serving."
                            }
                        ]
                    },
                    {
                        "title": "Sandwich Construction Techniques",
                        "subsections": [
                            {
                                "subtitle": "General Sandwich Method",
                                "content": "Select appropriate bread for style. Apply spreads to both bread pieces. Layer ingredients strategically. Season each layer. Cut for optimal eating experience."
                            },
                            {
                                "subtitle": "Sandwich-Specific Techniques",
                                "content": "Grilled Cheese Variation: Butter exterior sides of bread, use combination of cheeses for flavor depth, add thin slices of additional fillings if using, cook over medium-low heat for even melting, press occasionally for good contact, look for golden brown color and melted cheese. Deli Meat Sandwich: Apply spread to both bread slices, layer lettuce or greens against bread to prevent sogginess, fold meats for volume and texture, add cheese, vegetables, and condiments, season each layer with salt and pepper, press lightly before cutting. Vegetable-Focused Sandwich: Remove excess moisture from vegetables, consider roasting vegetables for depth, layer for stability and balance, include protein element (hummus, cheese, egg), add spreads with complementary flavors, season vegetables separately before assembly. Open-Faced Melt: Toast bread before topping, layer fillings, ending with cheese, broil until cheese is melted and bubbly, watch carefully to prevent burning, finish with fresh components after melting. Wrap or Roll-Up: Warm tortilla or wrap for flexibility, apply thin layer of spread to entire surface, arrange fillings on bottom third, don't overfill, fold sides in, then roll from bottom, toast seam-side down to seal if desired. Breakfast-Style Sandwich: Cook egg to desired doneness, toast bread or English muffin, layer with breakfast meat if using, add cheese while egg is hot for melting, consider avocado or greens for freshness."
                            },
                            {
                                "subtitle": "Sandwich Timing Strategy",
                                "content": "Begin sandwich preparation when soup is 10-15 minutes from completion. For hot sandwiches: time to finish with soup. For cold sandwiches: prepare just before serving. For grilled items: have all ingredients ready before grilling."
                            }
                        ]
                    },
                    {
                        "title": "Pairing Harmony Strategies",
                        "subsections": [
                            {
                                "subtitle": "Flavor Complementation",
                                "content": "Match intensity levels (bold soup with bold sandwich). Consider contrasting flavors (creamy soup with acidic sandwich). Ensure cuisine consistency if using specific theme. Use similar herb profiles across both items."
                            },
                            {
                                "subtitle": "Texture Balance",
                                "content": "Pair creamy soup with crunchy sandwich. Consider dunking potential. Ensure textural variety within each component. Think about mouthfeel across the entire meal."
                            },
                            {
                                "subtitle": "Visual Presentation",
                                "content": "Create color contrast between soup and sandwich. Consider garnishes that tie components together. Use appropriate vessels for serving. Think about dipping logistics."
                            }
                        ]
                    },
                    {
                        "title": "Final Touches",
                        "subsections": [
                            {
                                "subtitle": "Finishing the Soup",
                                "content": "Adjust consistency if needed. Final seasoning adjustment (salt, acid, herbs). Add finishing oil or cream if appropriate. Add fresh garnishes just before serving."
                            },
                            {
                                "subtitle": "Finishing the Sandwich",
                                "content": "Cut appropriately for service and eating ease. Secure with toothpick if necessary. Add any fresh components (herbs, greens). Serve on appropriate plate or board."
                            },
                            {
                                "subtitle": "Serving Strategy",
                                "content": "Serve soup hot (unless cold soup). Provide appropriate spoon for soup type. Consider small plate for sandwich and bowl for soup. Serve any additional components (pickle, chips)."
                            }
                        ]
                    }
                ],
                "practicalExercises": [
                    {
                        "title": "Dice Roll Mechanics",
                        "steps": [
                            "Roll for Soup Style (d6): 1-Creamy vegetable soup (potato, broccoli, cauliflower), 2-Clear broth soup (vegetable, chicken noodle), 3-Bean or lentil soup, 4-Tomato-based soup, 5-Pureed soup (butternut squash, carrot), 6-Quick chowder",
                            "Roll for Sandwich Type (d6): 1-Grilled cheese variation, 2-Deli meat sandwich, 3-Vegetable-focused sandwich, 4-Open-faced melt, 5-Wrap or roll-up, 6-Breakfast-style sandwich (egg, bacon)",
                            "Roll for Flavor Theme (d6): 1-Classic American, 2-Mediterranean, 3-Southwest/Mexican, 4-Asian-inspired, 5-European bistro, 6-Seasonal/harvest",
                            "Roll for Special Addition (d6): 1-Homemade garnish (croutons, herb oil, whipped cream), 2-Side salad or slaw, 3-Quick pickle component, 4-Fresh herb finish, 5-Crispy element (chips, crackers), 6-Savory jam or chutney",
                            "Prepare your soup and sandwich based on your rolls, following the techniques described in the content sections"
                        ]
                    }
                ],
                "completionChecklist": [
                    "Soup flavor development",
                    "Sandwich construction and stability",
                    "Texture achievement in both components",
                    "Proper cooking methods",
                    "Final seasoning balance",
                    "Preparation sequencing",
                    "Timing coordination",
                    "Workspace organization",
                    "Component balance",
                    "Resource efficiency"
                ],
                "tipsForSuccess": [
                    "Make soup first, then prepare sandwich during simmering time",
                    "Don't over-puree soups - some texture is good",
                    "Season both soup and sandwich components individually",
                    "Think about dunking compatibility if desired",
                    "Cut sandwiches for easier eating",
                    "Consider temperature contrast (hot soup, room temp sandwich)",
                    "Taste soup before serving for final seasoning adjustments",
                    "Use quality bread for better sandwich results"
                ]
            }
];
