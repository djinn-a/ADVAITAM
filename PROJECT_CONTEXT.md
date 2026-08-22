# PROJECT CONTEXT

## A. Project Purpose
Advaitam is a nature-inspired luxury real estate/villa project set in the serene landscapes of Jim Corbett. The website serves to showcase these exquisite residences, pristine surroundings, and thoughtful spaces, aiming to convey luxury, nature, and wellbeing to potential buyers.

## B. Current Development Phase
Current Phase: UI / Frontend Development
Current Focus: Responsive and production-quality frontend UI across all devices.
Current Scope: Static UI implementation of the landing page sections.
No API/data fetching currently exists for these sections.

## C. Technology Stack
Framework: Next.js
Language: TypeScript
UI: React
Styling: Tailwind CSS, Custom CSS
Icons: Lucide React
Animation: Framer Motion
Assets: public/images/

## D. User Flow
User lands on homepage
        ↓
Hero Section (Overview of luxury villa)
        ↓
Nature-Inspired Section (Values: Luxury, Nature, Wellbeing)
        ↓
(Additional sections to be developed)

## E. Page / Component Relationship
Home Page
│
├── Hero (`Hero.tsx`): Hero presentation, primary visual impact.
├── NatureInspired (`NatureInspired.tsx`): Brand values and image grid showcasing spaces.
└── (Other sections)

## F. Component Responsibilities
- `Hero`: Renders the full-screen landing background and main headline. Responsible for first impressions.
- `NatureInspired`: Renders a responsive bento-box-style grid of images and introductory text highlighting the core philosophy of the project.

## G. Frontend Constraints & Responsive Strategy
- Utilize fluid typography (`clamp`) and responsive padding/gaps.
- Avoid fixed pixel heights that break on small devices.
- Design must remain robust and accessible on low-end devices (4x CPU slowdown).
- Avoid unnecessary React state updates on scroll.
- Use CSS grid and flexbox for fluid layouts.
- Fallback to minimum heights (`min-h-[100svh]`) instead of hard constraints (`h-screen`) on mobile to prevent overflow.

## H. Architecture Decisions
- **Hero Single Sticky Viewport Architecture**: The Hero encapsulates all foreground and background elements inside a single `sticky top-0 h-[100svh] w-full overflow-hidden bg-ink z-10` viewport within a `500svh` scroll sequence.
  - **Persistent Foreground Layer (Navbar, Text, Indicator)**: The Navbar (`z-50`), Hero headline/paragraph/CTA, and `ScrollIndicator` (`z-20`) live inside the sticky viewport. As the user scrolls across slides 01 → 02 → 03 → 04 → 05, the Navbar and foreground UI stay permanently anchored at the top of the viewport and never detach or disappear.
  - **Transitioning Visual Layer**: The 5 background images transition smoothly behind the persistent UI via vertical slide reveals (`translate-y-full` → `translate-y-0`) and scale depth effects.
  - **Responsive Mobile Clearance**: Content vertical rhythm and indicator spacing adapt responsively across short (568px–667px) and tall (844px+) mobile viewports, ensuring dedicated clearance between the CTA button and the top of the scroll indicator.
  - **Zero-Overhead Indicator Sync**: A lightweight `IntersectionObserver` with center-line root margin (`-49% 0px -49% 0px`) tracks the active slide index.

## I. Current State / Handoff
- Navbar persistent across all 5 Hero slides without disappearing.
- Mobile indicator collision resolved with responsive vertical clearance.
- Hero reverse scroll and boundary containment fully verified.
