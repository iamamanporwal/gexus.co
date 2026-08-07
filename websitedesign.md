# ROLE

You are an award-winning frontend engineer, creative director, motion designer, and UI/UX architect. Your job is to recreate the attached Gexus website **as close as technically possible**. Treat the reference image as the source of truth. Every pixel, spacing, typography, layout, animation, interaction, and visual hierarchy should closely match the design.

Do not reinterpret the design.
Do not simplify it.
Do not add your own ideas.

The final result should feel like a production website from Apple, Linear, OpenAI, Figure AI, Tesla, and Ferrari.

---

# OBJECTIVE

Build a fully responsive, production-ready website for **Gexus**, an AI-native CAD platform.

The website should visually match the provided reference image almost 1:1.

The final website should be launch-ready.

---

# TECH STACK

Use:

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Three.js + React Three Fiber
* GSAP ScrollTrigger (where appropriate)
* Lenis smooth scrolling
* Lucide Icons
* shadcn/ui
* next/image
* next/font

Everything should be optimized for production.

---

# DESIGN SYSTEM

Use an ultra-clean premium design language.

Background:

Pure white

#FFFFFF

Cards

#FAFAFA

Borders

#E9E9E9

Text

#111111

Secondary text

#6B7280

Accent

Black only

Avoid bright colors except product renders.

Lots of whitespace.

Rounded corners

24px

Buttons

18px radius

Soft shadows

Almost invisible

Very subtle.

---

# TYPOGRAPHY

Use **Inter** throughout the entire website.

Weights:

300

400

500

600

700

Hero heading

72–84px

Section headings

56px

Body

18px

Small labels

12px

Line height

Very generous.

Letter spacing

Slightly negative on large titles.

The typography should feel similar to Apple.

---

# WEBSITE STRUCTURE

The page is a long storytelling landing page.

Exactly follow this order.

---

SECTION 1

Navigation

---

Left

GEXUS logo

Center

Vision

Technology

Impact

Company

Right

Request Early Access button

Navigation height

80px

Transparent background

Sticky

Backdrop blur while scrolling.

---

SECTION 2

Hero

---

Left side

Small label

AI-NATIVE CAD PLATFORM

Huge title

Design at
the Speed of
Thought.

Body

Gexus understands engineering like no software before.

Describe your idea in plain language and watch it become reality.

Button

Request Early Access

Small scroll indicator

Scroll to Explore

Right side

Large floating metallic CAD bracket.

Exactly like reference.

The render should appear suspended in space.

Around the object

Floating engineering tags

Topology Optimized

Stress Validated

Manufacturing Ready

Lightweight -37%

On the far right

Floating AI chat panel.

Glassmorphism.

Rounded corners.

Conversation:

Design a high-performance bracket for a drone arm.

Carbon fiber.

High strength.

Lightweight.

Assistant

Generating multiple optimized solutions...

Preview image below.

This entire hero should animate on page load.

Fade

Translate

Scale

Soft parallax

Very premium.

---

SECTION 3

Think.
Describe.
Build.

Split layout.

Left

Large title.

Conversation is the new command line.

Right

Prompt card

Three generated CAD thumbnails.

Horizontal slider.

Hover animations.

---

SECTION 4

AI That Understands Engineering

Huge white space.

Center

Particle wave

Grey dots

Neural network style.

Below

Four feature cards

Engineering Intelligence

Design Reasoning

Manufacturing Aware

Continuous Learning

Minimal icons.

Thin dividers.

Hover elevation.

---

SECTION 5

From Idea to Manufacturing

Horizontal process.

Concept

↓

Design

↓

Simulate

↓

Manufacture

↓

Validate

Each step

Image card.

Hover scale.

Arrow connectors.

Very clean.

---

SECTION 6

Built for Engineers.
Designed for Visionaries.

Large cinematic image.

Industrial robotics lab.

Engineer standing.

Glass testimonial card floating.

Quote:

"Gexus doesn't just speed up our workflow.
It unlocks ideas we couldn't build before."

Include pagination dots.

---

SECTION 7

Final CTA

Large metallic G logo

Centered.

White gradient background.

Heading

The Next Generation
of CAD.

Body

This is not just software.

This is the new operating system for engineering and manufacturing.

Primary button

Request Early Access

Partner logos underneath

AEVA

TELO

FIELD AI

MACHINA

ANDURIL

Large spacing.

---

FOOTER

Black background.

Columns

Product

Company

Resources

Social icons

Privacy

Terms

Security

Minimal.

---

# COMPONENT STYLE

Every card

Rounded

Soft border

Tiny shadow

Hover

TranslateY(-4px)

Every button

Micro scale animation

Every image

Lazy loaded

Smooth fade

---

# ANIMATIONS

Nothing should feel fast.

Everything should feel premium.

Use Framer Motion.

Page reveal

Staggered children

Fade + Y

Scroll animations

Opacity

Translate

Scale

Parallax

CAD object

Floating animation

Very slow

Mouse movement

2 degrees

Particle wave

Subtle motion

AI panel

Fade in

Cards

Lift on hover

CTA

Glow very softly

Respect prefers-reduced-motion.

Maintain 60fps.

---

# RESPONSIVENESS

Desktop

1920px

1440px

1280px

Tablet

1024px

768px

Mobile

430px

390px

375px

On mobile

Stack sections vertically.

Navigation becomes hamburger.

Typography scales perfectly.

Cards become swipeable.

Images maintain proportions.

Nothing breaks.

---

# IMAGES

Extract the visual style from the reference.

Recreate similar assets where needed.

Need:

Metallic CAD bracket hero

Generated CAD thumbnails

Particle wave

Industrial robotics image

Manufacturing image

Metallic G logo

Use high-quality placeholders if necessary.

All images should appear premium.

---

# PERFORMANCE

95+ Lighthouse

Image optimization

Code splitting

Tree shaking

Font optimization

Lazy loading

SEO

Metadata

Open Graph

Twitter

robots.txt

sitemap.xml

Structured Data

Accessibility

Keyboard navigation

ARIA labels

Proper semantic HTML

WCAG AA

---

# PROJECT STRUCTURE

/app

/components

/sections

/ui

/hooks

/lib

/public/images

/public/logos

/styles

Create reusable components for every section.

No duplicated code.

Clean architecture.

---

# FINAL DELIVERABLE

Produce a fully functional production website that visually matches the supplied reference image with extremely high fidelity.

The finished result should feel indistinguishable from the mockup, including:

* Matching layout, spacing, grid system, typography scale, card proportions, button styling, icon placement, image positioning, and overall composition.
* Matching messaging exactly as shown in the reference:

  * "Design at the Speed of Thought."
  * "Think. Describe. Build."
  * "AI That Understands Engineering."
  * "From Idea to Manufacturing."
  * "Built for Engineers. Designed for Visionaries."
  * "The Next Generation of CAD."
* The same navigation structure, section ordering, CTA placement, footer organization, partner logos, engineering tags, AI conversation panel, testimonial layout, and process timeline.
* Premium Apple-quality animations, smooth scrolling, polished micro-interactions, and flawless responsiveness across desktop, tablet, and mobile.
* Production-ready code with no placeholders in the layout, clean component architecture, excellent performance, accessibility, SEO, and deployment readiness.

Before considering the implementation complete, compare every section against the reference image and continue refining until the visual differences are negligible.
