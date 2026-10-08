import { DayMilestoneInfo, Helpline } from '../types/recovery';

export const RECOVERY_MILESTONES: DayMilestoneInfo[] = [
  {
    day: 1,
    title: "The Sankalp (The Decision)",
    hindiTitle: "पहला दिन: पक्का इरादा",
    stage: 'acute-detox',
    neuroScience: "Your liver and kidneys begin filtering toxins. Blood pressure and heart rate start normalizing. Your brain registers the sudden absence of artificial dopamine stimulation.",
    withdrawalChallenge: "Mental anxiety, fear of withdrawal, strong habit reflexes (reach-out triggers).",
    mission: "Clean your personal space. Discard all paraphernalia, lighters, foil, pouches, or numbers associated with dealers.",
    affirmation: "I am taking the reins of my life back. Today, no matter how strong the urge, I stay clean.",
    copingTips: [
      "Drink 2-3 liters of warm water with lemon to flush metabolites.",
      "Clear your bedroom of old triggers and stash spots.",
      "Keep phone away during high-risk evening hours."
    ]
  },
  {
    day: 2,
    title: "Riding the First Wave",
    hindiTitle: "दूसरा दिन: लहर का सामना",
    stage: 'acute-detox',
    neuroScience: "Peak physical detoxification. Your autonomic nervous system is on high alert. Body temperature fluctuations, cold sweats, and irritability are signs of cellular reset.",
    withdrawalChallenge: "Physical restlessness, tremors, appetite shifts, and insomnia.",
    mission: "Surrender to the discomfort. Don't fight the sweat or chills—welcome them as evidence of poison leaving your veins.",
    affirmation: "Physical discomfort is just poison leaving my body. I can tolerate this for my future.",
    copingTips: [
      "Take warm showers or hot water foot soaks when restlessness hits.",
      "Eat light, easy-to-digest khichdi, porridge, or fruit.",
      "Do 5 minutes of 4-7-8 breathing when muscles tighten."
    ]
  },
  {
    day: 3,
    title: "Peak Chemical Resistance",
    hindiTitle: "तीसरा दिन: सबसे कठिन मोड़",
    stage: 'acute-detox',
    neuroScience: "Often the peak withdrawal day. Dopamine baseline reaches its lowest point. The prefrontal cortex feels deprived, screaming for quick relief.",
    withdrawalChallenge: "The 'Just once to stop the pain' rationalization trap. Extreme mood swings.",
    mission: "When an intense craving strikes, set a timer for 15 minutes. Cravings have a bell-curve lifecycle and will fade.",
    affirmation: "This craving is not a command; it is merely a brain sensation. It will peak and pass.",
    copingTips: [
      "Use Urge Surfing: Observe the sensation without judging or acting.",
      "Splash ice-cold water onto your face (triggers mammalian dive reflex to lower heart rate).",
      "Call your trusted contact or helpline before making any decision."
    ]
  },
  {
    day: 4,
    title: "Emotional Flashpoints",
    hindiTitle: "चौथा दिन: दबी हुई भावनाएं",
    stage: 'emotional-surge',
    neuroScience: "Numbed emotions come roaring back. The amygdala is hyper-reactive without the substance's sedative or artificial euphoria cushion.",
    withdrawalChallenge: "Unexplained anger, sudden crying, remorse over past mistakes.",
    mission: "Write down everything you feel without filtering. Do not drown feelings; let them breathe.",
    affirmation: "I am allowed to feel angry or sad. Feeling feelings is proof I am alive and healing.",
    copingTips: [
      "Go for a brisk 30-minute walk outside in natural light.",
      "Avoid arguments or intense discussions with family today.",
      "Listen to calming acoustic music or nature sounds."
    ]
  },
  {
    day: 5,
    title: "Mapping the Landmines",
    hindiTitle: "पांचवां दिन: ट्रिगर की पहचान",
    stage: 'emotional-surge',
    neuroScience: "Contextual conditioning: Cues (certain friends, corners, evening 7 PM, paydays) trigger anticipatory dopamine spikes that feel like cravings.",
    withdrawalChallenge: "Social peer pressure, boredom, evening empty slots.",
    mission: "Map your top 3 triggers (People, Places, Times) and write down an airtight exit script for each.",
    affirmation: "I choose my peace over old companions who keep me trapped in addiction.",
    copingTips: [
      "Block or mute contact with acquaintances who consume substances.",
      "Take a completely different walking or driving route home.",
      "Keep your hands busy with tea, a stress ball, or drawing."
    ]
  },
  {
    day: 6,
    title: "Filling the Void",
    hindiTitle: "छठा दिन: खालीपन को भरना",
    stage: 'emotional-surge',
    neuroScience: "Substance use previously consumed 4 to 8 hours daily. That empty space now feels like an abyss if not proactively scheduled.",
    withdrawalChallenge: "Profound boredom, lethargy, feeling like life is 'dull' without high.",
    mission: "Schedule your afternoon and evening in 1-hour blocks. Include physical movement and a creative outlet.",
    affirmation: "Peace and calm may feel like boredom at first, but it is actually freedom.",
    copingTips: [
      "Cook a nutritious meal from scratch.",
      "Clean, organize your wardrobe, or repair something in the house.",
      "Drink chamomile, tulsi, or peppermint tea in the evening."
    ]
  },
  {
    day: 7,
    title: "One Week Clean: Cellular Reset",
    hindiTitle: "सातवां दिन: पहला हफ़्ता विजय!",
    stage: 'rebuilding',
    neuroScience: "Major milestone! Physical withdrawal symptoms drop significantly. Serotonin and dopamine receptors start up-regulating. Lungs and liver function show marked recovery.",
    withdrawalChallenge: "Premature celebration: 'I beat it, so one hit won't hurt'.",
    mission: "Celebrate this week without substances! Buy yourself a wholesome meal or a gift with money you saved.",
    affirmation: "7 days of absolute victory. What felt impossible a week ago is now my reality.",
    copingTips: [
      "Check your money-saved counter. Feel the tangible win.",
      "Look in the mirror at your eyes—notice clearer skin and gaze.",
      "Write a letter to yourself thanking yourself for holding on."
    ]
  },
  {
    day: 8,
    title: "The 'Just Once' Mirage",
    hindiTitle: "आठवां दिन: धोखेबाज़ विचार",
    stage: 'rebuilding',
    neuroScience: "The addiction voice changes tactics: from desperate screaming to calm, rational whispers ('You've proven you can quit, one joint/sip/dose is safe now').",
    withdrawalChallenge: "Cognitive dissonance and bargaining thoughts.",
    mission: "Play the whole tape to the end: Remember the morning after, the shame, the hospital/police/family pain, the relapse spiral.",
    affirmation: "One is too many, and a thousand is never enough. I say NO to the first hit.",
    copingTips: [
      "Never negotiate with the addiction mind. Change physical location immediately.",
      "Remind yourself: 'I don't do that anymore'.",
      "Do 25 pushups or deep squats to reset brain chemistry."
    ]
  },
  {
    day: 9,
    title: "Clearing the Mental Fog",
    hindiTitle: "नौवां दिन: दिमागी धुंध का हटना",
    stage: 'rebuilding',
    neuroScience: "REM sleep cycles begin normalizing. You may experience vivid dreams as your subconscious processes repressed material. Working memory and attention span sharpen.",
    withdrawalChallenge: "Vivid 'using' dreams that make you wake up scared you relapsed.",
    mission: "If you had a drug dream, breathe with gratitude that it was just a dream and you woke up clean.",
    affirmation: "My mind is sharpening every day. Clarity is returning to my thoughts.",
    copingTips: [
      "Keep a dream journal and release it.",
      "Limit screen time 1 hour before sleep.",
      "Practice yoga nidra or guided relaxation in bed."
    ]
  },
  {
    day: 10,
    title: "Natural Dopamine Reignited",
    hindiTitle: "दसवां दिन: असली खुशियों की वापसी",
    stage: 'rebuilding',
    neuroScience: "Your brain's reward center begins responding to subtle, natural stimuli again—sunshine, a hearty laugh, good food, genuine music.",
    withdrawalChallenge: "Impatience with the recovery pace.",
    mission: "Engage in 45 minutes of vigorous exercise (jogging, cycling, gym, brisk hill walk) to induce endorphins.",
    affirmation: "I don't need artificial chemicals to feel alive. Pure nature and health are my true high.",
    copingTips: [
      "Spend 20 minutes in morning sunlight.",
      "Listen to an uplifting playlist with headphones on.",
      "Eat foods rich in L-tyrosine (bananas, almonds, avocados, legumes)."
    ]
  },
  {
    day: 11,
    title: "Healing Guilt & Self-Forgiveness",
    hindiTitle: "ग्यारहवां दिन: खुद को माफ़ करना",
    stage: 'rebuilding',
    neuroScience: "Prefrontal cortex activity stabilizes. You can now objectively evaluate past mistakes without falling into catastrophic shame spirals.",
    withdrawalChallenge: "Intense guilt about hurting parents, partner, kids, or career.",
    mission: "Acknowledge that guilt was about your actions under addiction; self-hatred only fuels relapse. Focus on living amends.",
    affirmation: "The best apology is changed behavior. Today my sobriety is the greatest gift to my loved ones.",
    copingTips: [
      "Do an act of kindness for someone you love without expecting anything in return.",
      "Write down 3 things you forgive yourself for.",
      "Remember: Relapse is fed by shame; recovery is fed by courage."
    ]
  },
  {
    day: 12,
    title: "The Unbreakable Shield",
    hindiTitle: "बारहवां दिन: मज़बूत सीमाएं (Boundaries)",
    stage: 'rebuilding',
    neuroScience: "Neural pathways of willpower strengthen like physical muscles. Prefrontal inhibition of impulsive desires is now noticeably firmer.",
    withdrawalChallenge: "Unexpected encounters with old peers or high-stress days at work.",
    mission: "Practice saying a clean, unapologetic 'No thanks, I don't touch that anymore' or 'I have an early morning commitment.'",
    affirmation: "My boundaries protect my life. Saying NO to drugs is saying YES to my destiny.",
    copingTips: [
      "Always have your own transportation or exit strategy at gatherings.",
      "Have a non-alcoholic, healthy drink in hand so no one offers you anything.",
      "Step away to the restroom and do 3 deep breaths if you feel triggered."
    ]
  },
  {
    day: 13,
    title: "Looking in the Mirror",
    hindiTitle: "तेरहवां दिन: नया रूप, नया जीवन",
    stage: 'rebuilding',
    neuroScience: "Near complete acute detox. Brain neuroplasticity is flourishing. Habit formation reaches crucial consolidation.",
    withdrawalChallenge: "Fear of what comes after Day 14 ('Can I do this for months?').",
    mission: "Do not worry about 10 years from now. You proved you can conquer 13 days; you conquer life by winning today.",
    affirmation: "I am becoming the reliable, strong, clear-headed human I was always meant to be.",
    copingTips: [
      "Review your Day 1 notes and see how far you have traveled.",
      "Spend quality time with someone who has always believed in you.",
      "Plan your Day 14 celebration and long-term support network."
    ]
  },
  {
    day: 14,
    title: "The 14-Day Freedom Milestone!",
    hindiTitle: "चौदहवां दिन: 14 दिनों की जीत!",
    stage: 'victory',
    neuroScience: "The initial physical withdrawal storm is broken. Your dopamine system has passed the acute shock. You have proven to your nervous system that you can survive, sleep, and smile without chemicals.",
    withdrawalChallenge: "Complacency. Recovery is an ongoing garden that thrives with daily watering.",
    mission: "Receive your 14-Day Conqueror Shield! Commit to the next 30-day chapter with an NA/AA group or counselor.",
    affirmation: "I broke the chains. 14 days clean proves my spirit is stronger than any substance.",
    copingTips: [
      "Print or save your 14-day recovery report.",
      "Share your milestone with your trusted emergency contact or support group.",
      "Remember the golden rule: One day at a time, today I stay clean."
    ]
  }
];

export const HELPLINES: Helpline[] = [
  {
    name: "Kiran National Mental Health Helpline (India)",
    number: "1800-599-0019",
    hours: "24/7 Free & Confidential",
    country: "India",
    description: "Govt of India helpline providing clinical de-addiction and distress counseling in 13 languages."
  },
  {
    name: "Nasha Mukt Bharat Abhiyaan Toll-Free (India)",
    number: "1800-11-0031",
    hours: "24/7 Toll-Free",
    country: "India",
    description: "National drug de-addiction helpline by Ministry of Social Justice and Empowerment."
  },
  {
    name: "Vandrevala Foundation Crisis Support",
    number: "+91 9999 666 555",
    hours: "24/7 Available",
    country: "India / Global",
    description: "Free 24x7 psychological intervention and acute crisis helpline via call and WhatsApp."
  },
  {
    name: "Tele-MANAS National Tele-Mental Health",
    number: "14416",
    hours: "24/7 Toll-Free",
    country: "India",
    description: "Direct government mental health and addiction support across all states."
  },
  {
    name: "SAMHSA National Substance Helpline (US)",
    number: "1-800-662-4357",
    hours: "24/7 Free & Confidential",
    country: "USA",
    description: "Substance Abuse and Mental Health Services Administration treatment referral helpline."
  },
  {
    name: "Talk to FRANK Drug Support (UK)",
    number: "0300 123 6600",
    hours: "24/7 Live Support",
    country: "UK",
    description: "Confidential drugs information, advice, and live support service."
  }
];

export const COMMON_SYMPTOMS = [
  "Restlessness & Agitation",
  "Insomnia / Sleep disruption",
  "Cold sweats / Chills",
  "Headache / Body aches",
  "Appetite loss / Nausea",
  "Mood swings / Irritability",
  "Intense substance craving",
  "Anxiety / Chest tightness",
  "Clear head & calmer breathing",
  "Energy returning"
];

export const COMMON_COPING_TOOLS = [
  "Drank cold water / Herbal tea",
  "Did Urge Surfing (3-min breathing)",
  "Took a hot shower / ice splash",
  "Called trusted friend / sponsor",
  "Went for a brisk walk / exercise",
  "Avoided trigger place / friends",
  "Cleaned room / Distracted hands",
  "Prayed / Meditated in quiet",
  "Ate healthy food / fruits",
  "Repeated recovery pledge"
];
