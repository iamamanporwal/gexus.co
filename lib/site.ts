/**
 * Every piece of copy on the page lives here.
 *
 * House style: write like a person talking to another engineer. No hyphens,
 * en dashes or em dashes anywhere in visible text; recast the sentence
 * instead. Keep claims concrete and specific.
 */

export const site = {
  name: 'Gexus',
  legalName: 'Gexus AI',
  title: 'Gexus: Design at the Speed of Thought',
  tagline: 'Design at the Speed of Thought.',
  description:
    'Gexus is an AI native CAD platform. Describe the part you need in plain language and get a manufacturable design back, complete with topology, stress results and a machining plan.',
  url: 'https://gexus.ai',
  locale: 'en_US',
}

export const navLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Technology', href: '#technology' },
  { label: 'Impact', href: '#impact' },
  { label: 'Company', href: '#company' },
]

export const hero = {
  eyebrow: 'AI Native CAD Platform',
  title: ['Design at', 'the Speed of', 'Thought.'],
  body: 'Gexus understands engineering the way your best engineers do. Say what the part has to survive, and watch a design you can actually manufacture take shape in front of you.',
  cta: 'Request Early Access',
  scroll: 'Scroll to Explore',
  tags: [
    { label: 'Topology', value: 'Optimized' },
    { label: 'Lightweight', value: '37% lighter' },
    { label: 'Stress', value: 'Validated' },
    { label: 'Manufacturing', value: 'Ready' },
  ],
}

export const conversation = {
  prompt:
    'Design a high performance bracket for a drone arm. Carbon fiber. High strength. Lightweight.',
  reply: 'Got it. Generating multiple solutions...',
  placeholder: 'Ask Gexus anything...',
}

export const think = {
  index: '02',
  title: ['Think.', 'Describe.', 'Build.'],
  body: 'Conversation is the new command line.',
  lede: 'You brief Gexus the way you would brief a colleague. It comes back with real options, each one weighed against the constraints you gave it.',
  concepts: [
    {
      src: '/images/concept-lattice.svg',
      name: 'Lattice core',
      spec: '312 g, stiffest of the three',
      alt: 'Drone arm bracket with a triangulated lattice filling the three webs, the lightest and stiffest of the generated options.',
    },
    {
      src: '/images/concept-ribbed.svg',
      name: 'Ribbed web',
      spec: '340 g, quickest to machine',
      alt: 'The same bracket rebuilt with straight radial ribs and lightening slots, chosen for fast three axis machining.',
    },
    {
      src: '/images/concept-shell.svg',
      name: 'Solid shell',
      spec: '402 g, lowest tooling cost',
      alt: 'A solid shell version of the bracket with generous fillets, the cheapest option to tool up for.',
    },
  ],
}

export const technology = {
  index: '03',
  title: ['AI That', 'Understands', 'Engineering.'],
  body: 'Gexus is built on first principles, real manufacturing limits and physics that holds up on the bench. It is not pattern matching on pretty pictures.',
  link: 'Explore Technology',
  features: [
    {
      title: ['Engineering', 'Intelligence'],
      body: 'It knows how loads travel, how materials behave and where a part gives up first.',
    },
    {
      title: ['Design', 'Reasoning'],
      body: 'It weighs the tradeoffs and commits to a choice, the way a senior engineer would.',
    },
    {
      title: ['Manufacturing', 'Aware'],
      body: 'Every geometry it proposes can be cut, printed or moulded on machines you already own.',
    },
    {
      title: ['Continuously', 'Learning'],
      body: 'Every design your team ships makes the next one sharper.',
    },
  ],
}

export const process = {
  index: '04',
  title: ['From Idea', 'to Manufacturing.'],
  body: 'One continuous thread from the first sketch to the finished part. Nothing to export, nothing to rebuild, no intent lost between tools.',
  link: 'See how it works',
  steps: [
    {
      label: 'Concept',
      src: '/images/step-sketch.svg',
      alt: 'Dimensioned wireframe sketch of the drone arm bracket with construction geometry and a 192 mm span callout.',
    },
    {
      label: 'Design',
      src: '/images/step-model.svg',
      alt: 'Finished solid model of the bracket in machined aluminium with three bored mounting bosses.',
    },
    {
      label: 'Simulate',
      src: '/images/step-stress.svg',
      alt: 'Finite element stress plot of the bracket under load, with a colour legend in megapascals running from blue to red.',
    },
    {
      label: 'Manufacture',
      src: '/images/step-machining.svg',
      alt: 'Five axis mill cutting the bracket from billet, spindle down on the workpiece.',
    },
    {
      label: 'Validate',
      src: '/images/step-inspection.svg',
      alt: 'Inspection view of the finished bracket with probe points on each boss and a 0.02 mm tolerance callout.',
    },
  ],
}

export const impact = {
  index: '05',
  title: ['Built for Engineers.', 'Designed for', 'Visionaries.'],
  body: 'For teams building things that have never existed. For people who would rather solve the hard problem than route around it.',
  link: 'For Teams',
  image: {
    src: '/images/lab.svg',
    alt: 'An engineer standing in a robotics assembly cell, facing a powertrain rig flanked by two articulated arms.',
  },
  quotes: [
    {
      quote:
        "Gexus doesn't just speed up our workflow. It unlocks ideas we couldn't build before.",
      name: 'Lead Mechanical Engineer',
      org: 'Advanced Robotics Team',
    },
    {
      quote:
        'We went from a napkin sketch to a validated, machinable part in an afternoon. That used to be a whole sprint.',
      name: 'Director of Engineering',
      org: 'Aerospace Structures Group',
    },
    {
      quote:
        'It reasons about tolerances and tooling the way a senior engineer does, long before anyone opens a drawing.',
      name: 'Principal Design Engineer',
      org: 'Autonomous Systems Lab',
    },
    {
      quote:
        'Every iteration teaches the model something about how we build. The platform compounds.',
      name: 'Head of Manufacturing',
      org: 'Electric Powertrain Division',
    },
  ],
}

export const finalCta = {
  index: '06',
  title: ['The Next Generation', 'of CAD.'],
  body: 'This is not another modelling tool. It is the operating system your engineering and manufacturing teams will run on.',
  cta: 'Request Early Access',
}

export const partners = {
  heading: "Trusted by engineers building what's next.",
  logos: ['Aeva', 'Telo', 'Field AI', 'Machina', 'Anduril'],
}

export const footer = {
  tagline: ['Engineering the', 'future, together.'],
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Vision', href: '#vision' },
        { label: 'Technology', href: '#technology' },
        { label: 'Impact', href: '#impact' },
        { label: 'Request Access', href: '#access' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#company' },
        { label: 'Careers', href: '#company' },
        { label: 'News', href: '#company' },
        { label: 'Contact', href: '#company' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#resources' },
        { label: 'Documentation', href: '#resources' },
        { label: 'Security', href: '#resources' },
        { label: 'Privacy', href: '#resources' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Security', href: '#security' },
  ],
  copyright: '© 2024 Gexus AI. All rights reserved.',
}
