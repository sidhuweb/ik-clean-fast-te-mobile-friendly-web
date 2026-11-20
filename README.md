# Carousel & Weekly Desk ⚡

> **Fast, clean, te mobile-friendly web app** (iPhone 15 Pro de Safari/Chrome layi fully optimized) designed specifically for freelance graphic designers crafting high-converting fitness coach carousels for Canva Pro Lite.

---

## 🚀 Key Features

### 1. Weekly Schedule Desk (Monday to Sunday)
- **Pre-configured Fitness Coach Schedule**:
  - **Monday**: Shivam (Testimonial Carousel)
  - **Tuesday**: Dalwinder (Testimonial Carousel), Karanpratap (Testimonial Carousel), Sukhsher (Testimonial Carousel)
  - **Wednesday**: Dalwinder (Tweet Carousel), Shivam (Tweet Carousel)
  - **Thursday**: Hardik (Tweet Carousel)
  - **Friday**: Shivam (Tweet Carousel)
  - **Saturday**: Hardik (Testimonial Carousel), Pawandeep (Single Slide Tweet), Sukhsher (Tweet Carousel)
  - **Sunday**: Karanpratap (Tweet Carousel), Pawandeep (Single Slide Tweet)
- **Client Status Tags**: `Active`, `On Hold`, `Not Started`
  - Defaults: Shivam, Dalwinder, Sukhsher, Pawandeep (**Active**); Karanpratap (**Not Started**); Hardik (**On Hold**).
  - Status toggleable anytime with persistent `localStorage` storage.
- **Instant Preload**: Click any day's item to load that client and format immediately into Slide Studio.

### 2. Slide Studio & Input Architect
- **Coach & Format Selectors**: Choose from 6 coaches and 3 formats (Testimonial Carousel, Tweet Carousel, Single Slide Tweet).
- **🔒 Strict Pawandeep Rule**: Pawandeep format is strictly locked to **Single Slide Tweet** (never split into 4-6 slides).
- **Photo & Lighting Options**:
  - Dark Background / Moody Gym
  - Bright & Airy Clean Studio
  - Busy Commercial Gym Floor
  - Before-After Transformation Collage
  - Client WhatsApp / DM Screenshot
  - Outdoor / Golden Hour
- **Strict 3-Font System**:
  - `Advercase Demo` (Editorial punch & headline hooks)
  - `Poppins` (Geometric bold & structured headers)
  - `DM Sans` (Ultra-legible modern body copy)
- **High-Contrast Text & 1-2 Highlight Words**: Dynamic accent colors (Electric Lime, Neon Orange, Solar Gold, Cyan, etc.) calculated from photo lighting and mood.

### 3. Canva Pro Lite Bulk Hub & Slide Blueprint Cards
- Individual slide cards with:
  - Slide number and sequence role
  - Editable headline & body text
  - Highlighted words with live visual accent preview
  - Recommended font pairing
  - Click-to-copy color HEX codes
  - **Canva Pro Layout Blueprint**: Exact element positioning guidelines for Canva
  - 1-click copy for slide text
- **Canva Bulk Create CSV**:
  - 1-Click `.csv` file download
  - 1-Click CSV clipboard copy
  - 1-Click plain text copy for WhatsApp/Telegram client review
- **Visual 4:5 Mobile Simulator**: Interactive Instagram Carousel preview matching 1080x1350 aspect ratio.

---

## 🛠️ Tech Stack & iPhone 15 Pro Optimization
- **React 19 + Vite 8** (lightning fast < 250ms builds, zero lag)
- **Tailwind CSS v4**
- **Lucide Icons**
- **Mobile-first ergonomics**:
  - Bottom touch navigation bar (within thumb reach on iPhone 15 Pro)
  - `viewport-fit=cover` & safe area inset padding (`env(safe-area-inset-bottom)`)
  - Fast 120Hz smooth scrolling with zero heavy render lag

---

## 📦 Canva Bulk Create: 30-Second Workflow
1. Open this app, select client/day, and generate slides.
2. Tap **Download Canva CSV** (or Copy CSV).
3. In **Canva Pro Lite**, open a 1080x1350 px carousel template.
4. Go to **Apps** → **Bulk Create** → **Upload CSV**.
5. Right click headline box → **Connect Data** → `Header_Hook`.
6. Right click body box → **Connect Data** → `Body_Text`.
7. Click **Generate Pages** → Entire carousel is ready in seconds!
