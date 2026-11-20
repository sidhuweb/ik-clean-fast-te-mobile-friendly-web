// Intelligent, Human, Zero-AI-Slop Slide Generator for Canva Pro Lite
// Adheres strictly to:
// 1. Fonts: Only "Advercase Demo", "Poppins", "DM Sans"
// 2. High-contrast readable text + 1-2 highlight words with dynamic accent color based on photo lighting
// 3. Testimonial Carousel: Slide 1 (Hook + Coach), Middle (Proof/Metrics), Last (Coach + CTA)
// 4. Tweet Carousel: 4-6 slides clean flow
// 5. Pawandeep: ALWAYS Single Slide Tweet

import { PHOTO_LIGHTING_OPTIONS, MOOD_OPTIONS } from '../data/scheduleData.js';

// Filter out robotic AI cliches
const AI_SLOP_REPLACEMENTS = [
  { regex: /embark on (your|a) fitness journey/gi, replace: 'start real training' },
  { regex: /unleash your (inner )?(potential|beast)/gi, replace: 'build real strength' },
  { regex: /in today's fast-paced world/gi, replace: 'with a busy 9-to-5 schedule' },
  { regex: /transform your mind, body and soul/gi, replace: 'drop fat and keep it off' },
  { regex: /unlock the secrets of/gi, replace: 'master the basics of' },
  { regex: /game-changing/gi, replace: 'proven' },
  { regex: /testament to/gi, replace: 'proof of' },
  { regex: /dive in/gi, replace: 'break it down' },
  { regex: /delve into/gi, replace: 'look at' }
];

export function cleanHumanCopy(text) {
  if (!text) return '';
  let cleaned = text;
  for (const item of AI_SLOP_REPLACEMENTS) {
    cleaned = cleaned.replace(item.regex, item.replace);
  }
  return cleaned.trim();
}

// Extract 1 or 2 punchy high-contrast words from a line
export function extractHighlightWords(text, fallbackWords = []) {
  if (!text) return fallbackWords.join(' ');

  // Look for numbers + units e.g. "15kg", "14 weeks", "130kg", "8,500 steps"
  const metricMatch = text.match(/\b(\d+([.,]\d+)?\s*(kg|kgs|lbs|weeks|days|steps|%|mins|hours)?)\b/i);
  if (metricMatch && metricMatch[0].length >= 2) {
    return metricMatch[0].toUpperCase();
  }

  // Look for strong power verbs / contrast words
  const powerWords = [
    'STOP', 'NEVER', 'ZERO', 'TRUTH', 'MISTAKE', 'HABITS', 'PROOF', 
    'REBUILD', 'PAIN-FREE', 'REALITY', 'SECRET', 'FAT LOSS', 'MUSCLE', 
    'CONSISTENCY', 'BORING', 'LOCKED', 'RELAX', 'EASY', 'NOT CARDIO'
  ];

  for (const pw of powerWords) {
    const regex = new RegExp(`\\b${pw}\\b`, 'i');
    if (regex.test(text)) {
      return pw;
    }
  }

  // First 1-2 words of short hook
  const words = text.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
  if (words.length > 0 && words[0].length > 3) {
    return words[0].toUpperCase();
  }

  return fallbackWords[0] || 'THE TRUTH';
}

// Get font pairing strictly based on mood from the 3 permitted fonts:
// "Advercase Demo", "Poppins", "DM Sans"
export function getFontPairing(moodId) {
  switch (moodId) {
    case 'aggressive_minimalist':
      return {
        hookFont: 'Advercase Demo',
        bodyFont: 'DM Sans',
        tagline: 'Hook: Advercase Demo • Body: DM Sans',
        hookWeight: 'Bold',
        bodyWeight: 'Regular'
      };
    case 'executive_clean':
      return {
        hookFont: 'Poppins',
        bodyFont: 'DM Sans',
        tagline: 'Hook: Poppins SemiBold • Body: DM Sans',
        hookWeight: 'SemiBold',
        bodyWeight: 'Regular'
      };
    case 'athletic_modern':
      return {
        hookFont: 'Advercase Demo',
        bodyFont: 'Poppins',
        tagline: 'Hook: Advercase Demo • Body: Poppins Medium',
        hookWeight: 'Bold',
        bodyWeight: 'Medium'
      };
    case 'proof_first':
    default:
      return {
        hookFont: 'Poppins',
        bodyFont: 'DM Sans',
        tagline: 'Hook: Poppins Bold • Body: DM Sans',
        hookWeight: 'Bold',
        bodyWeight: 'Regular'
      };
  }
}

// Get contrast color suggestions based on photo lighting
export function getColorScheme(lightingId, customAccent) {
  const lighting = PHOTO_LIGHTING_OPTIONS.find(l => l.id === lightingId) || PHOTO_LIGHTING_OPTIONS[0];
  return {
    textColor: lighting.textColor,
    textName: lighting.textName,
    accentColor: customAccent || lighting.accentColor,
    accentName: customAccent ? `Custom (${customAccent})` : lighting.accentName,
    lightingNotes: lighting.notes
  };
}

// Main generation function
export function generateSlides({
  clientName,
  handle = '@coach',
  format,
  rawText,
  lighting = 'dark',
  mood = 'aggressive_minimalist',
  slideCount = 5,
  customAccent = null
}) {
  const cleanedText = cleanHumanCopy(rawText);
  const fontPair = getFontPairing(mood);
  const colorScheme = getColorScheme(lighting, customAccent);

  // STRICT RULE: Pawandeep is always Single Slide Tweet
  const effectiveFormat = clientName.toLowerCase() === 'pawandeep' ? 'Single Slide Tweet' : format;

  let slides = [];

  if (effectiveFormat === 'Single Slide Tweet') {
    slides = generateSingleTweetSlide({
      clientName,
      handle,
      cleanedText,
      fontPair,
      colorScheme,
      lighting
    });
  } else if (effectiveFormat === 'Testimonial Carousel') {
    slides = generateTestimonialCarouselSlides({
      clientName,
      handle,
      cleanedText,
      fontPair,
      colorScheme,
      lighting,
      slideCount: Math.min(Math.max(slideCount || 4, 3), 4) // 3 or 4 slides for testimonial
    });
  } else {
    // Tweet Carousel (4 to 6 slides)
    slides = generateTweetCarouselSlides({
      clientName,
      handle,
      cleanedText,
      fontPair,
      colorScheme,
      lighting,
      slideCount: Math.min(Math.max(slideCount || 5, 4), 6) // strictly 4 to 6 slides
    });
  }

  return {
    client: clientName,
    handle,
    format: effectiveFormat,
    mood,
    lighting,
    fontPair,
    colorScheme,
    totalSlides: slides.length,
    generatedAt: new Date().toISOString(),
    slides
  };
}

// 1. Single Slide Tweet Generator (Pawandeep Rule)
function generateSingleTweetSlide({ clientName, handle, cleanedText, fontPair, colorScheme, lighting }) {
  const lines = cleanedText.split('\n').filter(l => l.trim().length > 0);
  const mainContent = lines.join(' ') || 
    "Stop looking for the secret workout split. The guy in top physical shape has been showing up on days he didn't feel like it for 730 consecutive days. Boring consistency will always outperform exciting novelty.";

  // Extract a hook / opening punch
  const sentences = mainContent.match(/[^.!?]+[.!?]+/g) || [mainContent];
  const hookSentence = sentences[0]?.trim() || "Stop looking for the secret workout split.";
  const remainingBody = sentences.slice(1).join(' ').trim() || 
    "Boring consistency will always outperform exciting novelty. Show up daily.";

  const highlightWords = extractHighlightWords(hookSentence, ['BORING CONSISTENCY', 'STOP']);

  return [
    {
      slideNumber: 1,
      role: 'Single Slide Tweet (X Card)',
      hook: hookSentence,
      body: remainingBody,
      highlightWords,
      fontPairing: `${fontPair.hookFont} Bold (Headline) + ${fontPair.bodyFont} (Body)`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Centered dark tweet card (1080x1350 canvas). Profile photo at top-left (120x120 circle), Coach name '${clientName}' + '${handle}' in ${fontPair.hookFont}. Main tweet text in center with 48px font size, line height 1.4. Highlight word '${highlightWords}' in accent color ${colorScheme.accentColor}. Bottom row with mock Retweet/Like icons for authentic engagement aesthetic.`,
      canvaTip: 'Use a subtle dark gym background with 70% black overlay so the white text and neon highlight pop instantly.'
    }
  ];
}

// 2. Testimonial Carousel Generator
// Strict Rule: Slide 1 = Coach Photo + Hook; Middle = Proof / DM / Metrics; Last = Coach Photo + Link-in-Bio CTA
function generateTestimonialCarouselSlides({ clientName, handle, cleanedText, fontPair, colorScheme, lighting, slideCount }) {
  const isFourSlides = slideCount >= 4;

  // Extract key info from cleanedText
  const weightMatch = cleanedText.match(/(\d+([.,]\d+)?\s*(kg|kgs|lbs|inches|weeks))/gi);
  const quoteMatch = cleanedText.match(/["“]([^"”]+)["”]/);
  const ctaMatch = cleanedText.match(/(DM\s+["“]?[A-Z0-9_-]+["“]?|Link in bio|Comment\s+["“]?[A-Z0-9_-]+["“]?)[^.]*/i);

  const clientMetric = weightMatch ? weightMatch.slice(0, 2).join(' in ') : '-15 kg in 14 weeks';
  const rawQuote = quoteMatch ? quoteMatch[1] : 
    "I bought size 32 jeans after 7 years. Best part? Never felt like I was starving on a diet.";
  const detectedCta = ctaMatch ? ctaMatch[0] : `DM "REBUILD" to claim 1 of 4 spots for next intake.`;

  // Slide 1: Hook & Coach Image Placement
  const slide1Hook = `How Rahul dropped ${clientMetric} without giving up ghar ki roti.`;
  const slide1Highlight = extractHighlightWords(slide1Hook, ['DROPPED', clientMetric.toUpperCase()]);

  // Slide 2: Middle Slide (Proof / WhatsApp DM / The Diagnosis)
  const slide2Hook = `The Breakthrough: We fixed the 10 PM friction, not his food.`;
  const slide2Body = `• Kept daily dinner intact (roti + dal + high protein)\n• Replaced midnight pantry raiding with 250g Greek yogurt\n• 8,500 non-negotiable daily steps (15-min post-meal walks)\n• 3x 45-minute strength workouts weekly. Zero 2-hour cardio.`;
  const slide2Highlight = extractHighlightWords(slide2Hook, ['BREAKTHROUGH', '8,500 STEPS']);

  // Slide 3 (if 4 slides): The Emotional Client Quote / Screenshot Proof
  const slide3Hook = `"${rawQuote}"`;
  const slide3Body = `Real screenshot proof from client WhatsApp. Notice he didn't just lose body fat—he regained daily energy for work and family without gym burnout.`;
  const slide3Highlight = extractHighlightWords(slide3Hook, ['REAL PROOF', 'ENERGY']);

  // Last Slide: Coach Image + Link-in-Bio CTA
  const lastSlideHook = `Ready for your own sustainable transformation?`;
  const lastSlideBody = `${detectedCta}\n\n100% custom nutrition & progressive training built around your work hours.`;
  const lastSlideHighlight = extractHighlightWords(detectedCta, ['DM REBUILD', 'LINK IN BIO']);

  if (isFourSlides) {
    return [
      {
        slideNumber: 1,
        role: 'Slide 1 of 4 • Hook & Coach Cutout',
        hook: slide1Hook,
        body: `Swipe to see the exact 4-step protocol we used to fix his metabolism →`,
        highlightWords: slide1Highlight,
        fontPairing: `Headline: ${fontPair.hookFont} Bold • Sub: ${fontPair.bodyFont}`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Full-height portrait cutout of Coach ${clientName} on right 45% of slide. Left 55% dedicated to high-contrast hook text in 64px ${fontPair.hookFont}. Highlight '${slide1Highlight}' in ${colorScheme.accentColor}. Top tag: 'REAL CLIENT WIN'. Bottom swipe arrow.`,
        canvaTip: 'Remove coach background using Canva Pro Background Remover. Drop shadow: 15% blur, angle 45°.'
      },
      {
        slideNumber: 2,
        role: 'Slide 2 of 4 • Middle Proof & Protocol',
        hook: slide2Hook,
        body: slide2Body,
        highlightWords: slide2Highlight,
        fontPairing: `Headline: ${fontPair.hookFont} • Bullets: ${fontPair.bodyFont}`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Clean 2-column or structured card layout. Top badge: 'THE STRATEGY'. Bullet points with custom checkmark icons in accent color ${colorScheme.accentColor}. High-contrast spacing between bullets for mobile readability.`,
        canvaTip: 'Do not crowd text boxes. Keep 80px margin from all 4 borders for Instagram carousel safe zone.'
      },
      {
        slideNumber: 3,
        role: 'Slide 3 of 4 • Client WhatsApp DM Screenshot',
        hook: `Real Client Feedback:`,
        body: slide3Hook + `\n\nNo extreme starvation diets. Just progressive overload & sustainable habits.`,
        highlightWords: slide3Highlight,
        fontPairing: `Headline: ${fontPair.hookFont} • Quote: ${fontPair.bodyFont} Medium`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Centered mobile mockup / WhatsApp chat card with subtle 2px border (#334155) and soft shadow. Yellow or green chat bubble snippet. Bottom annotation highlighting '${slide3Highlight}'.`,
        canvaTip: 'Blur client last name or personal phone number for privacy before exporting.'
      },
      {
        slideNumber: 4,
        role: 'Slide 4 of 4 • Coach Photo & Link-in-Bio CTA',
        hook: lastSlideHook,
        body: lastSlideBody,
        highlightWords: lastSlideHighlight,
        fontPairing: `Headline: ${fontPair.hookFont} Bold • CTA Button: ${fontPair.bodyFont} Bold`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Coach ${clientName} photo looking toward CTA text. Large contrast button shape in accent color ${colorScheme.accentColor} with dark bold text: '${lastSlideHighlight}'. Subtext: 'Only 4 spots available this month'. Bottom coach handle: ${handle}.`,
        canvaTip: 'Make the CTA action unmistakable. High contrast button shape increases profile clicks by 40%.'
      }
    ];
  } else {
    // 3 Slides Version
    return [
      {
        slideNumber: 1,
        role: 'Slide 1 of 3 • Hook & Coach Cutout',
        hook: slide1Hook,
        body: `Swipe to see the exact protocol →`,
        highlightWords: slide1Highlight,
        fontPairing: `Headline: ${fontPair.hookFont} Bold • Sub: ${fontPair.bodyFont}`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Coach ${clientName} portrait on right. Left text block with hook in 68px ${fontPair.hookFont}. Highlight words '${slide1Highlight}' in ${colorScheme.accentColor}.`,
        canvaTip: 'Keep top-left 100px clear for Instagram username overlay.'
      },
      {
        slideNumber: 2,
        role: 'Slide 2 of 3 • Client Proof & Metrics',
        hook: `The Metric Win: ${clientMetric}`,
        body: `"${rawQuote}"\n\n• Zero extreme starvation\n• 8,500 daily steps\n• 3x weekly strength sessions`,
        highlightWords: slide2Highlight,
        fontPairing: `Metric: ${fontPair.hookFont} Bold • Body: ${fontPair.bodyFont}`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Top split: Before/After badge or WhatsApp DM snippet. Bottom split: 3 punchy takeaways with accent color checkmarks.`,
        canvaTip: 'Use a 24px rounded card backing for the quote block to make it look native and crisp.'
      },
      {
        slideNumber: 3,
        role: 'Slide 3 of 3 • Coach Photo & Link-in-Bio CTA',
        hook: lastSlideHook,
        body: lastSlideBody,
        highlightWords: lastSlideHighlight,
        fontPairing: `Headline: ${fontPair.hookFont} • CTA: ${fontPair.bodyFont} Bold`,
        textColor: colorScheme.textColor,
        accentColor: colorScheme.accentColor,
        layoutBlueprint: `Canva Pro Layout: Coach portrait cutout bottom-right. Large bold CTA pill button in ${colorScheme.accentColor} with dark text. Direct command: 'Tap link in bio to apply'.`,
        canvaTip: 'Keep button height at least 110px in Canva for thumb-stopping mobile visual weight.'
      }
    ];
  }
}

// 3. Tweet Carousel Generator (4 to 6 slides clean logical flow)
// Slide 1: Hook / Pattern Interrupt
// Slide 2: The Myth / Why normal advice fails
// Slide 3: The Reframe / Core Rule
// Slide 4: Real-Life Step-by-Step Execution
// Slide 5: Key Mindset Takeaway / Rule of Thumb
// Slide 6 (if 6 slides): Save & Share CTA + Coach Handle
function generateTweetCarouselSlides({ clientName, handle, cleanedText, fontPair, colorScheme, lighting, slideCount }) {
  const lines = cleanedText.split('\n').filter(l => l.trim().length > 0);
  const fullText = lines.join(' ');

  // Parse potential numbered points from raw text
  const numberedPoints = lines.filter(l => /^\d+[.)]\s*/.test(l.trim()));

  // Fallbacks if user provided short text
  const defaultHooks = [
    `The biggest fat loss myth is believing you need 60 mins of cardio.`,
    `5 fitness truths that will save you 2 years of wasted gym time:`,
    `If your knees hurt during squats, stop blaming heavy weights.`
  ];

  const slide1Hook = lines[0] && lines[0].length < 120 ? lines[0] : defaultHooks[0];
  const slide1Highlight = extractHighlightWords(slide1Hook, ['BIGGEST MYTH', 'STOP']);

  const baseSlides = [
    {
      slideNumber: 1,
      role: 'Slide 1 • Pattern Interrupt Hook',
      hook: slide1Hook,
      body: `Most people get this completely backwards.\n\nSwipe to fix it before your next session →`,
      highlightWords: slide1Highlight,
      fontPairing: `Hook: ${fontPair.hookFont} Bold • Body: ${fontPair.bodyFont}`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Dark minimalist canvas. Coach handle '${handle}' at top left with verified blue icon. Hook in 64px ${fontPair.hookFont} with line-height 1.25. Highlight words '${slide1Highlight}' in accent ${colorScheme.accentColor}. Bottom swipe cue '1/5'.`,
      canvaTip: 'Keep hook within 3 lines maximum. Anything longer loses 50% swipe-through rate.'
    },
    {
      slideNumber: 2,
      role: 'Slide 2 • The Hidden Friction / Myth',
      hook: `Why conventional advice fails:`,
      body: lines[1] || `A grueling 45-minute treadmill run burns ~300 calories. A single cold coffee is 350 calories.\n\nYou cannot out-train a chaotic diet with endless cardio. It only drives up hunger hormones.`,
      highlightWords: extractHighlightWords(lines[1] || 'FAT LOSS MYTH', ['CONVENTIONAL ADVICE', 'FAILS']),
      fontPairing: `Headline: ${fontPair.hookFont} • Body: ${fontPair.bodyFont}`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Tweet-style quote card. Centered red/accent pill badge 'THE PROBLEM'. Text with 44px ${fontPair.bodyFont} and generous paragraph spacing.`,
      canvaTip: 'Leave 24px between paragraphs to prevent text clump on mobile screens.'
    },
    {
      slideNumber: 3,
      role: 'Slide 3 • The Exact Reframe (Steps 1 & 2)',
      hook: `The 3-Step Sustainable Fix:`,
      body: numberedPoints.length >= 2 
        ? `${numberedPoints[0]}\n\n${numberedPoints[1]}`
        : `1. Hit 1.6g to 2.0g protein per kg. High thermic effect and eliminates evening pantry cravings.\n\n2. Walk 8,000 daily steps. Daily casual movement burns up to 5x more calories over a week than cardio.`,
      highlightWords: extractHighlightWords('8,000 DAILY STEPS', ['PROTEIN', '8,000 STEPS']),
      fontPairing: `Headline: ${fontPair.hookFont} • Steps: ${fontPair.bodyFont} Medium`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Two distinct card boxes or numbered badges. Number '1' and '2' in ${fontPair.hookFont} with accent color fill ${colorScheme.accentColor}. Clean indented copy.`,
      canvaTip: 'Use Canva shape rectangles with 16px radius for the step containers.'
    },
    {
      slideNumber: 4,
      role: 'Slide 4 • Real-Life Execution (Step 3 & Example)',
      hook: `3. Prioritize Progressive Strength:`,
      body: numberedPoints.length >= 3 
        ? `${numberedPoints[2]}\n\nConsistency for 6 months beats perfection for 2 weeks.`
        : `Lift weights 3-4 days a week. Progressive overload sends the signal to keep muscle while burning fat.\n\nWithout weights, 30% of weight loss comes from muscle, leading to the dreaded "skinny-fat" look.`,
      highlightWords: extractHighlightWords('PROGRESSIVE OVERLOAD', ['PROGRESSIVE', 'STRENGTH']),
      fontPairing: `Headline: ${fontPair.hookFont} • Body: ${fontPair.bodyFont}`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Single prominent card with warning / note callout box. Text highlighted with accent color underline or pill background.`,
      canvaTip: 'Add coach photo watermark at bottom right (30% opacity) for brand recognition.'
    }
  ];

  if (slideCount >= 5) {
    baseSlides.push({
      slideNumber: 5,
      role: slideCount === 5 ? 'Slide 5 of 5 • Final Takeaway & CTA' : 'Slide 5 of 6 • The Golden Rule',
      hook: slideCount === 5 ? `The Takeaway:` : `The 80/20 Mindset Rule:`,
      body: slideCount === 5 
        ? `Consistency beats intensity every single time.\n\n4 decent workouts a week for 6 months beats 7 crazy workouts for 2 weeks before burnout.\n\nSave this post for your next workout • Follow ${handle} for daily fitness truths.`
        : `Fat loss is 80% whole foods and 20% flexibility. If your diet bans your favorite food completely, you will binge within 30 days. Build habits you can keep for 5 years.`,
      highlightWords: extractHighlightWords('CONSISTENCY BEATS INTENSITY', ['CONSISTENCY', 'SAVE THIS']),
      fontPairing: `Headline: ${fontPair.hookFont} Bold • Body: ${fontPair.bodyFont}`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Large quote layout with quotation marks in 20% accent color ${colorScheme.accentColor}. Bottom row with Save & Share icon buttons and coach handle.`,
      canvaTip: 'Make the Save CTA prominent. Saves trigger the Instagram algorithm more than likes.'
    });
  }

  if (slideCount === 6) {
    baseSlides.push({
      slideNumber: 6,
      role: 'Slide 6 of 6 • Save & Share CTA',
      hook: `Found this valuable?`,
      body: `1. Tap the Bookmark icon to save this for your next gym session.\n2. Share with a friend who is still doing 60 mins of cardio.\n\nFollow ${handle} for evidence-based fitness and sustainable fat loss.`,
      highlightWords: extractHighlightWords('SAVE & SHARE', ['SAVE THIS', 'SHARE']),
      fontPairing: `Headline: ${fontPair.hookFont} Bold • CTA: ${fontPair.bodyFont} Bold`,
      textColor: colorScheme.textColor,
      accentColor: colorScheme.accentColor,
      layoutBlueprint: `Canva Pro Layout: Coach profile card at center. Big accent CTA button: 'SAVE THIS POST' in ${colorScheme.accentColor}. Clean Instagram icon graphics (Like, Comment, Share, Save).`,
      canvaTip: 'Place bookmark icon right next to where user thumbs naturally rest on mobile.'
    });
  }

  return baseSlides;
}
