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

