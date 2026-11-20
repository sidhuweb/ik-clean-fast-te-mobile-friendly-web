// Weekly schedule, client defaults, and status tags for "Carousel & Weekly Desk"

export const INITIAL_CLIENTS = [
  {
    name: 'Shivam',
    role: 'Fat Loss & High-Energy Coach',
    status: 'Active',
    defaultFormat: 'Testimonial Carousel',
    handle: '@coachshivam',
    accentHint: '#CCFF00',
    notes: 'Likes high-contrast electric lime accents, punchy hooks, clean coach cutout photos.'
  },
  {
    name: 'Dalwinder',
    role: 'Strength & Biomechanics Coach',
    status: 'Active',
    defaultFormat: 'Testimonial Carousel',
    handle: '@dalwinder_strength',
    accentHint: '#FF5E00',
    notes: 'Focus on proof, barbell metrics, knee/back pain relief testimonials.'
  },
  {
    name: 'Karanpratap',
    role: 'Executive Physique & Muscle Building',
    status: 'Not Started',
    defaultFormat: 'Testimonial Carousel',
    handle: '@karanpratap_fit',
    accentHint: '#00F0FF',
    notes: 'Luxury aesthetic, dark gym portraits, busy executive transformation angles.'
  },
  {
    name: 'Sukhsher',
    role: 'Flexible Nutrition & Sustainable Fat Loss',
    status: 'Active',
    defaultFormat: 'Testimonial Carousel',
    handle: '@sukhsher_nutrition',
    accentHint: '#FFD600',
    notes: 'Clean studio photos, food swaps, realistic grocery & habit tweets.'
  },
  {
    name: 'Hardik',
    role: 'Mobility, Posture & Athletic Rehab',
    status: 'On Hold',
    defaultFormat: 'Tweet Carousel',
    handle: '@hardik_mobility',
    accentHint: '#38BDF8',
    notes: 'Desk posture resets, joint mobility carousels, clean diagram annotations.'
  },
  {
    name: 'Pawandeep',
    role: 'Minimalist Daily Fitness & Mindset',
    status: 'Active',
    defaultFormat: 'Single Slide Tweet',
    handle: '@pawandeep.daily',
    accentHint: '#F43F5E',
    notes: 'STRICT RULE: Pawandeep is always Single Slide Tweet. 1 crisp punchy slide.'
  }
];

export const INITIAL_WEEKLY_SCHEDULE = [
  {
    day: 'Monday',
    dayShort: 'MON',
    slots: [
      {
        id: 'slot-mon-1',
        client: 'Shivam',
        format: 'Testimonial Carousel',
        status: 'Active',
        recommendedSlides: 4,
        timing: 'Morning 9:00 AM'
      }
    ]
  },
  {
    day: 'Tuesday',
    dayShort: 'TUE',
    slots: [
      {
        id: 'slot-tue-1',
        client: 'Dalwinder',
        format: 'Testimonial Carousel',
        status: 'Active',
        recommendedSlides: 4,
        timing: 'Morning 10:00 AM'
      },
      {
        id: 'slot-tue-2',
        client: 'Karanpratap',
        format: 'Testimonial Carousel',
        status: 'Not Started',
        recommendedSlides: 4,
        timing: 'Afternoon 2:00 PM'
      },
      {
        id: 'slot-tue-3',
        client: 'Sukhsher',
        format: 'Testimonial Carousel',
        status: 'Active',
        recommendedSlides: 3,
        timing: 'Evening 6:00 PM'
      }
    ]
  },
  {
    day: 'Wednesday',
    dayShort: 'WED',
    slots: [
      {
        id: 'slot-wed-1',
        client: 'Dalwinder',
        format: 'Tweet Carousel',
        status: 'Active',
        recommendedSlides: 5,
        timing: 'Morning 9:30 AM'
      },
      {
        id: 'slot-wed-2',
        client: 'Shivam',
        format: 'Tweet Carousel',
        status: 'Active',
        recommendedSlides: 5,
        timing: 'Evening 5:30 PM'
      }
    ]
  },
  {
    day: 'Thursday',
    dayShort: 'THU',
    slots: [
      {
        id: 'slot-thu-1',
        client: 'Hardik',
        format: 'Tweet Carousel',
        status: 'On Hold',
        recommendedSlides: 5,
        timing: 'Morning 10:00 AM'
      }
    ]
  },
  {
    day: 'Friday',
    dayShort: 'FRI',
    slots: [
      {
        id: 'slot-fri-1',
        client: 'Shivam',
        format: 'Tweet Carousel',
        status: 'Active',
        recommendedSlides: 6,
        timing: 'Evening 6:30 PM'
      }
    ]
  },
  {
    day: 'Saturday',
    dayShort: 'SAT',
    slots: [
      {
        id: 'slot-sat-1',
        client: 'Hardik',
        format: 'Testimonial Carousel',
        status: 'On Hold',
        recommendedSlides: 4,
        timing: 'Morning 9:00 AM'
      },
      {
        id: 'slot-sat-2',
        client: 'Pawandeep',
        format: 'Single Slide Tweet',
        status: 'Active',
        recommendedSlides: 1,
        timing: 'Afternoon 12:00 PM'
      },
      {
        id: 'slot-sat-3',
        client: 'Sukhsher',
        format: 'Tweet Carousel',
        status: 'Active',
        recommendedSlides: 5,
        timing: 'Evening 7:00 PM'
      }
    ]
  },
  {
    day: 'Sunday',
    dayShort: 'SUN',
    slots: [
      {
        id: 'slot-sun-1',
        client: 'Karanpratap',
        format: 'Tweet Carousel',
        status: 'Not Started',
        recommendedSlides: 5,
        timing: 'Morning 11:00 AM'
      },
      {
        id: 'slot-sun-2',
        client: 'Pawandeep',
        format: 'Single Slide Tweet',
        status: 'Active',
        recommendedSlides: 1,
        timing: 'Evening 6:00 PM'
      }
    ]
  }
];

export const STATUS_CONFIG = {
  Active: {
    label: 'Active',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
    description: 'Post scheduled & currently running'
  },
  'On Hold': {
    label: 'On Hold',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    description: 'Waiting on client review / paused'
  },
  'Not Started': {
    label: 'Not Started',
    bg: 'bg-zinc-700/25',
    text: 'text-zinc-400',
    border: 'border-zinc-700/40',
    dot: 'bg-zinc-500',
    description: 'Ready to draft in generator'
  }
};

export const FORMAT_OPTIONS = [
  {
    id: 'Testimonial Carousel',
    name: 'Testimonial Carousel',
    slides: '3-4 Slides',
    description: 'Slide 1: Hook + Coach Photo • Middle: Proof / DM • Last: CTA',
    icon: 'Award'
  },
  {
    id: 'Tweet Carousel',
    name: 'Tweet Carousel (4-6 Slides)',
    slides: '4-6 Slides',
    description: 'Clean Twitter-style flow: Hook -> Myth -> Reframe -> Steps -> CTA',
    icon: 'MessageSquareText'
  },
  {
    id: 'Single Slide Tweet',
    name: 'Single Slide Tweet',
    slides: '1 Slide',
    description: '1 high-impact single slide with punchy truth (Mandatory for Pawandeep)',
    icon: 'FileText'
  }
];

export const PHOTO_LIGHTING_OPTIONS = [
  {
    id: 'dark',
    name: 'Dark Background / Moody Gym',
    textColor: '#FFFFFF',
    textName: 'Pure White (#FFFFFF)',
    accentColor: '#CCFF00',
    accentName: 'Electric Lime (#CCFF00)',
    notes: 'Deep shadow tones. White bold headline pops with fluorescent lime highlight.'
  },
  {
    id: 'bright',
    name: 'Bright & Airy Clean Studio',
    textColor: '#0F172A',
    textName: 'Deep Slate (#0F172A)',
    accentColor: '#2563EB',
    accentName: 'Royal Cobalt (#2563EB)',
    notes: 'Clean white/gray studio backdrop. Deep onyx text with royal blue accent word.'
  },
  {
    id: 'busy',
    name: 'Busy Commercial Gym Floor',
    textColor: '#FFFFFF',
    textName: 'Ghost White (#F8FAFC)',
    accentColor: '#FF5E00',
    accentName: 'Neon Flare Orange (#FF5E00)',
    notes: 'Background has equipment & people. Suggest a 75% dark tinted backing card in Canva.'
  },
  {
    id: 'before_after',
    name: 'Before-After Transformation Collage',
    textColor: '#FFFFFF',
    textName: 'Pure White (#FFFFFF)',
    accentColor: '#10B981',
    accentName: 'Emerald Win Green (#10B981)',
    notes: 'Dual photo layout. Place text in top or bottom dark badge band with emerald metric.'
  },
  {
    id: 'screenshot',
    name: 'Client WhatsApp / DM Proof',
    textColor: '#FFFFFF',
    textName: 'Pure White (#FFFFFF)',
    accentColor: '#00F0FF',
    accentName: 'Cyber Cyan (#00F0FF)',
    notes: 'Centered screenshot card with 16px radius and dark drop shadow.'
  },
  {
    id: 'outdoor',
    name: 'Outdoor / Golden Hour Lighting',
    textColor: '#FFFFFF',
    textName: 'Pure White (#FFFFFF)',
    accentColor: '#FFD600',
    accentName: 'Solar Gold (#FFD600)',
    notes: 'Warm sunlight rim. Use soft dark gradient overlay from bottom to ground text.'
  }
];

export const MOOD_OPTIONS = [
  {
    id: 'aggressive_minimalist',
    name: 'Aggressive Minimalist',
    fontPairing: 'Hook: Advercase Demo • Body: DM Sans',
    style: 'Raw, punchy, high-impact numbers, high visual contrast'
  },
  {
    id: 'executive_clean',
    name: 'Executive & High-Ticket',
    fontPairing: 'Hook: Poppins SemiBold • Body: DM Sans',
    style: 'Spacious margins, luxury editorial alignment, zero clutter'
  },
  {
    id: 'athletic_modern',
    name: 'Athletic Modern',
    fontPairing: 'Hook: Advercase Demo • Body: Poppins',
    style: 'Dynamic bold typography, angled lines, high-tempo layout'
  },
  {
    id: 'proof_first',
    name: 'Proof & Authentic Trust',
    fontPairing: 'Hook: Poppins Bold • Body: DM Sans',
    style: 'Screenshot focus, raw quotes, unedited transformation stats'
  }
];
