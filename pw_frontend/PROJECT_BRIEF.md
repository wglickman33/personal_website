# Personal Website Project Brief

## Project Overview
Complete redesign of personal website for William Glickman - a full-stack engineer, UI/UX designer, agentic AI engineer, and product manager. The site will showcase his unique journey from neuroscience to coding, feature his work, and build his personal brand.

---

## Core Identity

### Professional Roles
- Full Stack Software Engineer
- UI/UX Designer
- Agentic AI Engineer (Voice and Chat)
- Product Manager

### Unique Journey
- **Background**: Neuroscience major, enrolled in Masters in Molecular and Cellular Pharmacology
- **Research**: Wrote paper on treating heroin addiction (non-pharmacological anti-addiction treatment) - never published
- **Transition**: Dropped PhD program, started teaching himself to code on **June 9, 2024**
- **Bootcamp**: Full-scholarship at BrainStation (July 2024 - October 2024)
- **First Job**: Junior AI Engineer at Quant Inc. (November 5, 2024 - less than a month out of bootcamp)
  - Built AI agents for utility companies, pizza shops, restaurants, retail, malls, banks, policy, government
- **Current Job**: Agentic AI and Software Engineer at Further (Talk Further/Further Technologies) - Started June 9, 2025
  - Built voice AI agents for:
    1. Admissions and intake agents into substance abuse programs
    2. Mental health programs
    3. Eating disorder programs
    4. Outpatient facilities
    5. Alumni coordinator chat agent
  - Maintains instant answer chat agents for facilities
  - Creates AI personas that call human admissions agents for training scenarios
  - Works with customer success managers, directors, VPs of sales, clients
  - Product management responsibilities

### Key Projects

#### 1. BG Workspace Solutions
- **URL**: www.bgworkspace.com
- **Purpose**: Represents office furniture manufacturers, routes clients to boost sales efficiency
- **Tech Stack**: React JS, JavaScript, SCSS

#### 2. My Kosher Delivery
- **URL**: www.mykosherdelivery.netlify.app soon to be www.mykosherdelivery.com
- **Purpose**: Kosher food delivery service (similar to DoorDash but specialized)
- **Coverage**: New York area - 5 Boroughs and Long Island
- **Unique Features**: 
  - Delivers kosher food for weekends
  - Can deliver 2+ hours away (e.g., Five Towns to Hamptons)
  - Customers can order from multiple restaurants in one order (unlike DoorDash)
- **Stats**:
  - 850 hours of work
  - 74,000+ lines of code
- **Tech Stack**: 
  - Frontend: ReactJS, JavaScript, SCSS
  - Backend: Express/Node.js
  - Database: Postgres
- **Frontend Features**:
  - Restaurant search
  - Blog reading
  - Helpful videos
  - Account statistics and order tracking
  - Multi-restaurant ordering in single order
- **Backend Features**:
  - User authentication
  - Full admin analytics
  - Order tracking integrated with ShipDay (automatic order management)
  - Manual order editing, refunds, partial refunds
  - Restaurant management (details, menu items, menu item types)
  - Active/inactive marking for holidays, sales, out of stock
  - Seasonal restaurant management
  - Analytics: orders, users, restaurants, items
  - Promo codes
  - Admin logs
  - Ticket contact system
  - Gift cards
  - Countdown features
  - Integrations: ShipDay (order tracking), MailChimp (marketing), EmailJS (order confirmations)
  - User types: Admin users, regular users (future: restaurant owners)
  - Order export functionality

---

## Design Philosophy

### Core Values
- **Professional**: Trustworthy and credible
- **Warm**: Approachable and friendly
- **Approachable**: Easy to connect with
- **Trustworthy**: Reliable and authentic
- **Clean**: Minimal and uncluttered
- **Creative**: Innovative and unique

### Design Anti-Patterns (STRICTLY AVOID)
- ❌ Purple colors (AI-generated design stereotype)
- ❌ Rainbow gradients
- ❌ Em dashes (—) in copy
- ❌ Robotic/AI-sounding language
- ❌ Excessive animations
- ❌ Generic AI-looking patterns

### Tone & Voice
- **Style**: Casual and friendly
- **Writing**: How William naturally talks
- **Approach**: Authentic, personal, genuine
- **Language**: No corporate jargon, no robotic phrases

---

## Site Goals

### Primary Objectives
1. **Showcase Portfolio/Work**: Display projects and accomplishments
2. **Personal Brand**: Build and establish personal brand
3. **Get to Know Me**: Share story, journey, and personality
4. **Contact**: Enable people to reach out via contact form

### Secondary Objectives
- Not focused on getting hired (but contact form available)
- Build credibility and trust
- Tell unique story (neuroscience to coding)
- Highlight versatility (full-stack, AI, design, PM)

---

## Site Structure

### Pages/Sections
1. **Home** - Landing page with hero, featured content
2. **About** - Story, skills, values, personal interests
3. **Projects** - Portfolio of work (timeline view)
4. **Skills** - Categorized skills with ratings
5. **Experience** - Resume/work history
6. **Blog** - Structure for future (maybe later)
7. **Contact** - Contact form
8. **Playground** - Experiments and demos

---

## Navigation System

### Sidebar Navigation (DoorDash-style)
- **Desktop**: Full sidebar with labels
- **Tablet**: Icon-only sidebar
- **Mobile**: Hidden sidebar, hamburger menu toggle
- **Dark/Light Mode Toggle**: Located in sidebar
- **Smooth Transitions**: Between all states

### Navigation Items
- Home
- About
- Projects
- Skills
- Experience
- Blog (if applicable)
- Contact
- Playground

---

## Homepage Hero Section

### Elements
- **Name**: William Glickman
- **Title/Roles**: Rotating between:
  - Full Stack Engineer
  - UI/UX Designer
  - Agentic AI Engineer
  - Product Manager
- **Tagline**: To be drafted (casual, friendly)
- **CTA Buttons**:
  - View Projects
  - Contact Me
  - Download Resume
- **Visual Element**: Subtle, non-AI-looking background or illustration

### First Impression
Visitors should see a **mix of everything**:
- Who you are
- What you do
- Your work
- How to reach you

---

## Skills Section

### Organization
- **Categories**: 
  - Frontend
  - Backend
  - AI/ML
  - Design
  - Product Management

### Rating System
- **Custom 5-Star Component** with decimal precision
- **Example**: 4.2/5 stars
- **Icon**: Star shape
- **Visual**: Stars fill based on decimal value
- **Animation**: Toggleable (can be turned on/off)

### Display
- Clear category organization
- Visual star ratings
- Clean, readable layout

---

## Projects Section

### Layout
- **View**: Timeline layout (chronological)
- **Display**: All projects on homepage (not just featured)

### Project Information (Required Fields)
- Title & Description
- Tech Stack
- Live Link
- GitHub Link
- Challenges & Solutions
- Results/Impact

### Project Images
- **Display**: Image carousel/gallery
- Multiple screenshots per project
- Easy navigation between images

### Featured Projects
1. **My Kosher Delivery**
   - Highlight: 850 hours, 74,000+ lines of code
   - Full-stack complexity
   - Multiple features and integrations

2. **BG Workspace Solutions**
   - Sales efficiency platform
   - React-based

3. **AI Agent Projects**
   - Quant Inc. work (various industries)
   - Further work (healthcare-focused agents)

---

## About Page

### Content Focus
- **Story/Journey**: Neuroscience to coding transition
- **Skills & Expertise**: Technical capabilities
- **Values & Philosophy**: What drives you
- **Personal Interests**: Hobbies and passions
- **Timeline**: Journey integrated naturally

### Timeline Animation
- **Visual**: Grey line that transforms to light blue as you scroll
- **Behavior**: Frame-by-frame progression based on scroll position
- **Smooth Scrolling**: No jumping - smooth forward and backward animation
- **Bidirectional**: Works when scrolling up or down
- **Frame Control**: Each timeline milestone activates based on scroll position
- **Color Transition**: Grey → Light blue (smooth gradient transition)
- **Implementation**: Scroll-based animation with intersection observer or scroll position tracking

### Writing Style
- Casual and friendly
- Authentic voice
- Personal storytelling
- No corporate speak

### Photo
- Maybe later (not priority)

---

## Experience/Resume Page

### Content Sections
- **Work Experience**: 
  - Quant Inc. (Nov 2024 - June 2025)
  - Further (June 2025 - Present)
- **Education**: 
  - Neuroscience background
  - BrainStation Bootcamp
- **Key Projects**: Major accomplishments
- **Achievements**: Notable milestones
- **Certifications**: Relevant credentials

### Resume Download
- **Format**: PDF download option
- Available on site

---

## Contact Form

### Form Fields
- Name
- Email
- Subject
- Company
- Project Type
- Message

### Submission
- **Method**: Email notification
- Clean, friendly form design
- Validation and success states
- User-friendly error handling

---

## Playground Section

### Purpose
- Structure for future experiments
- More permissive with animations

### Supported Content Types
- Interactive demos
- Code snippets
- AI demos
- Visual/design experiments
- Mix of all types

### Visitor Experience
- Try interactive features
- See code behind experiments
- Learn how things work
- Play around
- All of the above

---

## Capital Venture Game Widget

### Overview
An idle clicker game widget inspired by AdVenture Capitalist, themed around building a portfolio of creative and business ventures. Players click to earn capital, invest in various business ventures, purchase upgrades, and progress through milestones.

### Core Mechanics

#### Ventures
- **10 Different Ventures**: Creative Studio, Productized Service, Newsletter, Micro-SaaS, Templates & Assets, Consulting Retainer, Online Courses, Developer Tooling, Strategic Partnerships, Holdings Company
- **Leveling System**: Each venture can be leveled up, increasing income exponentially
- **Cost Growth**: Each venture has a cost growth rate (1.15-1.4) that determines how expensive it becomes per level
- **Unlock System**: Ventures unlock based on total earned capital
- **Managers**: Each venture can have managers that multiply income (1 + managerLevel * 2)
- **Milestone System**: Ventures earn boosts at specific level thresholds (income boosts, multiplier boosts)

#### Clicking System
- **Manual Clicking**: Click button to earn capital per click
- **Auto-Click**: Toggleable auto-clicking system
- **Click Speed Upgrades**: Purchaseable upgrades that increase clicks per second (base: 10/s, +5 per level)
- **Click Value Upgrades**: Purchaseable upgrades that increase capital per click (base: 1, +1 per level)
- **Cost Scaling**: Click speed/value costs scale only with level (1.5x for speed, 1.8x for value) - NOT with total earned

#### Income System
- **Passive Income**: Ventures generate income per second based on level
- **Income Calculation**: 
  - Base: `baseIncomePerSec * level`
  - Milestone boosts: Income type adds to base, multiplier type multiplies total
  - Manager multiplier: `1 + (managerLevel * 2)`
  - Upgrade multipliers: Venture-specific, global, click value/speed upgrades
  - Prestige multiplier: `1 + (prestigePoints * 0.02)`

#### Milestone System
- **Thresholds**: Each venture has milestone thresholds (e.g., 30, 60, 120, 240, 480, 960)
- **Boost Types**:
  - `income`: Adds to base income per second
  - `multiplier`: Multiplies total income
  - `speed`: (Future implementation for click speed)
- **Progress Display**: Shows current level / next milestone (e.g., "20/30")
- **Active Boost Indicators**: Visual badges showing active boosts on venture cards

#### Upgrade System
- **Dynamic Generation**: System automatically generates new upgrades when fewer than 3 are available
- **Upgrade Types**:
  - `global`: Multiplies all income
  - `venture`: Multiplies specific venture income
  - `clickValue`: Multiplies click value
  - `clickSpeed`: Multiplies click speed
- **Unlock Conditions**: Based on total earned or specific venture level
- **Cost Scaling**: Upgrades have fixed costs (no inflation based on progress)

#### Prestige System
- **Prestige Points**: Earned based on total earned capital
  - Formula: `floor(sqrt(totalEarned / 1e12))`
  - Minimum: 1e15 total earned required
- **Prestige Multiplier**: Each point provides 2% permanent multiplier
- **Reset**: Prestiging resets all progress but keeps prestige points

#### Buy Modes
- `x1`, `x5`, `x10`, `x100`: Buy exactly N levels (or as many as affordable)
- `Next`: Buy to next milestone level
- `Max`: Buy as many levels as affordable (capped at 1000 per purchase for safety)

### Technical Implementation

#### BigNumber System
- Custom implementation to handle very large numbers without floating-point precision issues
- Numbers stored as `{ mantissa, exponent }` where mantissa is normalized to [1, 10) range
- Allows accurate calculations up to extremely large values (10^30+)
- Formatting with suffixes: K, M, B, T, Qa, Qi, Sx, Sp, Oc, No, Dc...

#### Game Loop
- Uses `requestAnimationFrame` for smooth 60fps updates
- Income calculated based on delta time: `income = incomePerSec * deltaTime`
- Delta time clamped to 0.1 seconds to prevent large jumps if tab is inactive
- All calculations use refs to ensure latest state snapshot

#### Storage System
- Auto-saves to `localStorage` every 2 seconds and on important events
- Storage key: `pw:capital-venture:state`
- Includes migration logic for backward compatibility with older saves
- Serializes/deserializes BigNumber objects properly

#### Economy Calculations
- **Venture Cost**: Geometric series calculation for buying multiple levels
- **Max Affordable**: Binary search algorithm to find maximum affordable levels (capped at 1000)
- **Income Per Second**: Complex calculation incorporating all multipliers and boosts
- **Manager Cost**: Scales with current manager level and venture cost growth

### UI/UX Features

#### Visual Indicators
- **Milestone Progress**: Flag icon with "current/next" display
- **Active Boosts**: Colored badges showing active milestone boosts (income, multiplier icons)
- **Manager Badge**: Shows manager level and multiplier on venture cards
- **Affordable Highlighting**: Ventures/upgrades you can afford are highlighted
- **Locked State**: Locked ventures show unlock requirement prominently

#### Responsive Design
- Compact, game-like UI optimized for rapid buying
- All buttons and cards sized for quick interaction
- Mobile-friendly touch interactions
- Clear visual hierarchy

### Recent Fixes & Improvements

#### Milestone System Fix
- **Problem**: Milestone boosts weren't being applied (using old `milestoneMultipliers` system)
- **Solution**: Switched to `milestoneBoosts` system with proper type handling (income, multiplier, speed)
- **Result**: Milestone boosts now properly apply when ventures reach threshold levels

#### Upgrade Cost Inflation Fix
- **Problem**: Click speed/value upgrade costs were increasing as player earned money
- **Solution**: Removed `totalEarned` scaling from cost calculations
- **Result**: Upgrade costs now only scale with level, making them predictable and fair

#### Upgrade Generation
- **Problem**: Upgrades were locked and not generating dynamically
- **Solution**: Added automatic upgrade generation when fewer than 3 are available
- **Result**: Players always have upgrades to purchase as they progress

#### UI Indicators
- **Added**: Active milestone boost badges on venture cards
- **Added**: Better milestone progress display
- **Added**: Clearer locked venture display with unlock requirements

### Game Balance Considerations

#### Cost Scaling
- **Venture Costs**: Exponential growth (1.15-1.4 per level) ensures progression feels meaningful
- **Manager Costs**: Scale with manager level and venture cost (2^managerLevel multiplier)
- **Click Upgrades**: Fixed exponential scaling (1.5x for speed, 1.8x for value) - no inflation
- **Upgrade Costs**: Fixed costs based on upgrade index - no dynamic inflation

#### Income Scaling
- **Base Income**: Linear with level (baseIncomePerSec * level)
- **Milestone Boosts**: Provide significant income jumps at key thresholds
- **Manager Multipliers**: Significant boost (2x per manager level)
- **Upgrade Multipliers**: Stack multiplicatively for exponential growth

#### Progression Curve
- **Early Game**: Fast progression, many unlocks
- **Mid Game**: Milestone boosts provide meaningful progression gates
- **Late Game**: Prestige system provides long-term progression
- **No Offline Earnings**: Keeps game balanced and prevents exploitation

### File Structure

```
CapitalVenture/
├── CapitalVenture.tsx          # Main component
├── CapitalVenture.scss         # Styling (BEM naming)
├── types/
│   └── capitalVentureTypes.ts  # TypeScript interfaces
├── data/
│   └── capitalVentureData.ts   # Initial game state, ventures, upgrades
├── utils/
│   ├── bigNumber.ts         # BigNumber implementation
│   ├── economy.ts           # Economic calculations
│   └── storage.ts           # LocalStorage save/load with migration
└── hooks/
    ├── useGameLoop.ts       # Game loop using requestAnimationFrame
    └── useLocalSave.ts      # Auto-save hook (throttled)
```

### Key Design Decisions

1. **No Offline Earnings**: Intentional design to keep game balanced
2. **Fixed Upgrade Costs**: Costs don't inflate with progress - only scale with level
3. **Milestone System**: Provides meaningful progression gates and visual feedback
4. **Dynamic Upgrade Generation**: Ensures players always have options
5. **BigNumber System**: Handles extremely large numbers accurately
6. **Ref-Based State**: Game loop uses refs to ensure latest state in calculations
7. **Safety Caps**: Max purchase capped at 1000 levels to prevent accidental large purchases

---

## Animation System

### Global Toggle
- **Feature**: Animation on/off toggle
- **Default**: Animations enabled (but subtle)
- **User Control**: Can disable all animations

### Animation Rules
- **Subtle Only**: No excessive animations
- **Buttons**: Hover animations only (no auto-animate)
- **Spinning Elements**: Start static, can be toggled to spin
- **Playground**: More permissive (can have more animations)

### Implementation
- Global animation context/state
- Respects user preferences
- Smooth transitions when toggled

---

## Theme System

### Options
- **Light Mode**: Light color scheme
- **Dark Mode**: Dark color scheme
- **System Preference**: Auto-detect user's system setting

### Toggle Location
- **Placement**: Sidebar navigation
- **Behavior**: Smooth transitions
- **Persistence**: Remember user choice

### Color Palette
- **Style**: Warm and professional
- **Avoid**: Purple, blue gradients (AI stereotype)
- **Current**: Earth tones (can be refined)
- **Feel**: Professional yet approachable

---

## Typography

### Style
- **Preference**: Simple text
- **Tech-Friendly**: If simple tech fonts available, can use
- **Readability**: Clean and readable
- **No Preference**: Open to suggestions

---

## Footer

### Content
- Social links (GitHub, LinkedIn, Email)
- Quick navigation links
- Copyright/credits
- Contact information
- **Style**: Minimal and clean

---

## Testimonials

### Display
- **Section**: Yes, include testimonials
- **Content**: Recommendations from colleagues/clients
- **Style**: Clean, professional presentation
- **Animation**: Subtle (toggleable)

---

## Metrics & Statistics

### Approach
- **Display**: Subtle mentions only
- **Examples**: 
  - "850 hours" for My Kosher Delivery
  - "74,000+ lines of code"
- **Not**: Prominent metrics dashboard
- **Style**: Natural integration into project descriptions

---

## Blog Section

### Status
- **Current**: Maybe later
- **Structure**: Set up architecture for future
- **Style**: Simple "thoughts" or "notes" format
- **Priority**: Low (not immediate focus)

---

## Key Messages

### What Should Visitors Remember?
1. **Versatility**: Full-stack, AI, design, PM capabilities
2. **Personality**: Casual, friendly, approachable
3. **Approach**: How you work and think
4. **Impact**: The impact of your work (AI agents, products)
5. **Journey**: Unique neuroscience to coding story

---

## Technical Requirements

### Stack
- React
- TypeScript
- SCSS
- Existing infrastructure

### Code Standards & Preferences
- **Simplicity**: Simple, clean code
- **Component Structure**: Code broken into well-organized components
- **Styling Organization**: Neatly organized styling files
- **Naming Methodology**: BEM (Block Element Modifier) naming convention
- **No Style Overlap**: Strict separation - no overlapping styles
- **Code Quality**: Meticulous, neat, minimal code
- **Functionality**: Optimal functionality with clean implementation
- **Maintainability**: Code should be easy to read, understand, and maintain

### Performance
- Fast loading
- Optimized images
- Smooth transitions
- Mobile-first responsive

### Accessibility
- WCAG compliance
- Keyboard navigation
- Screen reader support
- Proper semantic HTML

### SEO
- Proper meta tags
- Semantic structure
- Fast performance
- Mobile-friendly

---

## Content Strategy

### Writing Guidelines
- **Tone**: Casual, friendly, authentic
- **Voice**: How William naturally talks
- **Avoid**: 
  - Em dashes (—)
  - Robotic language
  - Corporate jargon
  - AI-generated patterns
- **Include**: 
  - Personal stories
  - Real experiences
  - Genuine voice

### Story Integration
- Neuroscience journey is compelling
- Integrate naturally (not forced)
- Timeline format works well
- Show progression and growth

### Project Highlights
- My Kosher Delivery: Emphasize complexity (850 hours, 74k lines)
- AI Work: Showcase agentic AI projects
- Full-stack capabilities: Demonstrate range

---

## Implementation Priority

### Phase 1: Foundation
1. Sidebar navigation system
2. Color palette & design system
3. Hero section redesign
4. Animation toggle system

### Phase 2: Core Content
5. Skills section with ratings
6. Projects timeline
7. About page
8. Experience page

### Phase 3: Functionality
9. Contact form
10. Theme system (light/dark/system)
11. Footer & social links

### Phase 4: Polish
12. Testimonials (if available)
13. Playground structure
14. Content population
15. Final refinements

---

## Success Criteria

### User Experience
- Professional yet warm
- Easy to navigate
- Fast and responsive
- Accessible to all users

### Brand Representation
- Authentic voice
- Unique story told well
- Versatility showcased
- Impact demonstrated

### Technical
- Clean, maintainable code
- Performance optimized
- Mobile-responsive
- SEO-friendly

---

## Notes & Considerations

- Start from scratch - remove all existing styles and content
- Build feature by feature
- Reference this document throughout development
- Maintain authentic voice
- Avoid AI design patterns
- Keep it personal and genuine

---

*This document serves as the complete project brief and should be referenced throughout the development process.*

