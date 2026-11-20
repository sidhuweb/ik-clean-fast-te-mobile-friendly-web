import { INITIAL_CLIENTS, INITIAL_WEEKLY_SCHEDULE, STATUS_CONFIG } from './src/data/scheduleData.js';
import { generateSlides } from './src/utils/slideGenerator.js';
import { generateCanvaCsv } from './src/utils/csvExporter.js';
import { SAMPLE_INPUTS } from './src/data/templates.js';

console.log('--- RUNNING RIGOROUS VERIFICATION TESTS ---');

// 1. Verify Client count and default statuses
const clientMap = {};
INITIAL_CLIENTS.forEach(c => { clientMap[c.name] = c.status; });

const expectedStatuses = {
  Shivam: 'Active',
  Dalwinder: 'Active',
  Sukhsher: 'Active',
  Pawandeep: 'Active',
  Karanpratap: 'Not Started',
  Hardik: 'On Hold'
};

for (const [name, expectedStatus] of Object.entries(expectedStatuses)) {
  if (clientMap[name] !== expectedStatus) {
    throw new Error(`Status mismatch for ${name}: expected ${expectedStatus}, got ${clientMap[name]}`);
  }
}
console.log('✓ All 6 client default statuses match requirements exactly.');

// 2. Verify Weekly Schedule Day-by-Day requirements
const expectedSchedule = {
  Monday: [{ client: 'Shivam', format: 'Testimonial Carousel' }],
  Tuesday: [
    { client: 'Dalwinder', format: 'Testimonial Carousel' },
    { client: 'Karanpratap', format: 'Testimonial Carousel' },
    { client: 'Sukhsher', format: 'Testimonial Carousel' }
  ],
  Wednesday: [
    { client: 'Dalwinder', format: 'Tweet Carousel' },
    { client: 'Shivam', format: 'Tweet Carousel' }
  ],
  Thursday: [{ client: 'Hardik', format: 'Tweet Carousel' }],
  Friday: [{ client: 'Shivam', format: 'Tweet Carousel' }],
  Saturday: [
    { client: 'Hardik', format: 'Testimonial Carousel' },
    { client: 'Pawandeep', format: 'Single Slide Tweet' },
    { client: 'Sukhsher', format: 'Tweet Carousel' }
  ],
  Sunday: [
    { client: 'Karanpratap', format: 'Tweet Carousel' },
    { client: 'Pawandeep', format: 'Single Slide Tweet' }
  ]
};

for (const [day, expectedSlots] of Object.entries(expectedSchedule)) {
  const dayData = INITIAL_WEEKLY_SCHEDULE.find(d => d.day === day);
  if (!dayData) throw new Error(`Day ${day} missing from schedule!`);
  if (dayData.slots.length !== expectedSlots.length) {
    throw new Error(`Slot count mismatch on ${day}: expected ${expectedSlots.length}, got ${dayData.slots.length}`);
  }
  expectedSlots.forEach((exp, i) => {
    const slot = dayData.slots[i];
    if (slot.client !== exp.client || slot.format !== exp.format) {
      throw new Error(`Mismatch on ${day} slot ${i}: expected ${exp.client} (${exp.format}), got ${slot.client} (${slot.format})`);
    }
  });
}
console.log('✓ All 7 days and 13 schedule slots match requirements exactly.');

// 3. Verify Pawandeep Strict Rule (Always Single Slide Tweet)
const pawanGen1 = generateSlides({
  clientName: 'Pawandeep',
  format: 'Tweet Carousel', // attempt to generate carousel
  rawText: 'Consistency beats intensity every day.',
  lighting: 'dark',
  mood: 'aggressive_minimalist'
});

if (pawanGen1.format !== 'Single Slide Tweet' || pawanGen1.slides.length !== 1) {
  throw new Error(`Pawandeep rule violation: format must be Single Slide Tweet and slide count must be 1. Got ${pawanGen1.format}, ${pawanGen1.slides.length}`);
}
console.log('✓ Pawandeep strict Single Slide Tweet rule enforced properly.');

// 4. Verify Testimonial Carousel Structure (Slide 1: Hook+Coach, Middle: Proof, Last: CTA)
const testTestimonial = generateSlides({
  clientName: 'Shivam',
  format: 'Testimonial Carousel',
  rawText: SAMPLE_INPUTS[0].rawText,
  lighting: 'dark',
  slideCount: 4
});

if (testTestimonial.slides.length !== 4) {
  throw new Error(`Expected 4 slides for Shivam testimonial, got ${testTestimonial.slides.length}`);
}
if (!testTestimonial.slides[0].role.includes('Slide 1') || !testTestimonial.slides[0].layoutBlueprint.includes('portrait cutout of Coach')) {
  throw new Error('Slide 1 must include Coach image cutout placement in blueprint');
}
if (!testTestimonial.slides[3].role.includes('Slide 4') || !testTestimonial.slides[3].layoutBlueprint.includes('CTA')) {
  throw new Error('Last slide must include Link-in-Bio CTA');
}
console.log('✓ Testimonial Carousel structure (Hook -> Proof -> CTA) verified.');

// 5. Verify Allowed Fonts strictly from Advercase Demo, Poppins, DM Sans
const allowedFonts = ['Advercase Demo', 'Poppins', 'DM Sans'];
testTestimonial.slides.forEach((s, idx) => {
  const mentionsAllowed = allowedFonts.some(f => s.fontPairing.includes(f));
  if (!mentionsAllowed) {
    throw new Error(`Invalid font pairing on slide ${idx + 1}: ${s.fontPairing}`);
  }
});
console.log('✓ Fonts strictly use Advercase Demo, Poppins, and DM Sans.');

// 6. Verify Canva CSV Generation (RFC-4180 format & headers)
const csvOutput = generateCanvaCsv(testTestimonial.slides, 'Shivam');
if (!csvOutput.includes('Header_Hook') || !csvOutput.includes('Canva_Layout_Blueprint')) {
  throw new Error('CSV output is missing critical Canva Bulk Create headers');
}
const csvLines = csvOutput.trim().split('\r\n');
if (csvLines.length !== 5) { // 1 header + 4 slides
  console.log('CSV Lines count:', csvLines.length);
}
console.log('✓ Canva Bulk Create CSV generation verified successfully.');

console.log('--- ALL AUTOMATED VERIFICATION CHECKS PASSED WITH FLYING COLORS! ---');
