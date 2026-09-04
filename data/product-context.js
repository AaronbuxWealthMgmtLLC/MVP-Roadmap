export const horizons = [
  {
    id: 'now',
    label: 'Now',
    subtitle: 'Minimum viable intelligence product',
    description: 'Converge committed MVP behaviors toward a coherent user-ready and monetizable intelligence experience.'
  },
  {
    id: 'next',
    label: 'Next',
    subtitle: 'Commercialize + validate',
    description: 'Add account/commercial enablement, launch to users, collect evidence, and finish remaining committed MVP behavior.'
  },
  {
    id: 'later',
    label: 'Later',
    subtitle: 'Execution layer',
    description: 'Brokerage, funding, real holdings, orders, and intelligence applied to live portfolios.'
  }
];

export const readinessStages = [
  'Thesis',
  'Working behavior',
  'Exercised',
  'Product learning',
  'Behavioral decision',
  'Refined implementation',
  'User-ready',
  'Commercial-ready'
];

export const sourceDocs = [
  { id: 'mvp1', label: 'April MVP1', path: 'docs/source-of-truth/april-mvp1.pdf', note: 'Insights/planning product; clarity, confidence and decision support; no execution.' },
  { id: 'mvp2', label: 'April MVP2', path: 'docs/source-of-truth/april-mvp2.pdf', note: 'Execution + premium intelligence concept.' },
  { id: 'roadmap-april', label: 'April staged roadmap', path: 'docs/source-of-truth/april-mvp-roadmap-vf2.pdf', note: 'Earlier progression from educational beta through execution and premium AI.' },
  { id: 'roadmap-latest', label: 'Latest delivery roadmap', path: 'docs/source-of-truth/divya-roadmap-mvp1-mvp2-delivery.docx', note: 'Current sequencing toward September commercial V1, Oct–Dec customer validation, brokerage from V3 onward.' }
];

export const features = [
  {
    id: 'portfolio-builder',
    horizon: 'now',
    title: 'Portfolio Builder / Recommended System',
    userJob: 'Give me a sensible investing structure I can understand.',
    minimumBehavior: 'Profile inputs produce a recommended portfolio system with understandable sleeve roles and reasoning.',
    discoveryQuestion: 'What is the minimum recommendation structure and explanation that creates confidence?',
    exitCriterion: 'A user can explain what system they received, why it fits, and what each sleeve is for.',
    nonScope: ['Optimization engine', 'Automated investing', 'Continuous auto-management'],
    stage: 6,
    scopeImpact: 'None — committed MVP capability.',
    evidence: [
      { type: 'IMPLEMENT', title: 'Portfolio systems codified', detail: 'Recommended portfolio systems and sleeve structure exist in the web app.', source: 'Current project state' },
      { type: 'VALIDATE', title: 'Explanation model exercised', detail: 'System and sleeve explanation behavior has been iteratively refined before moving deeper into paid decision features.', source: 'Current project state' }
    ]
  },
  {
    id: 'asset-selection-fit',
    horizon: 'now',
    title: 'Asset Selection + Assess Fit',
    userJob: 'Help me decide whether a security meaningfully improves or changes my recommended sleeve.',
    minimumBehavior: 'Contextual candidate discovery → portfolio delta → overlap/contribution → tradeoffs → valid choices → preferred default.',
    discoveryQuestion: 'What must “fit” minimally tell the user so the decision is useful rather than merely classified?',
    exitCriterion: 'A user can distinguish useful addition, intentional tilt, alternative implementation, replacement, and poor contextual fit.',
    nonScope: ['Best-investment ranking', 'Return forecasting', 'Automated optimization', 'Trade execution'],
    stage: 5,
    scopeImpact: 'None — behavior refinement inside committed Asset Selection / Assess Fit.',
    evidence: [
      { type: 'IMPLEMENT', title: 'Four-outcome structural fit', detail: 'Initial behavior implemented Add / Replace / Redundant / Do not add.', source: 'Project update' },
      { type: 'LEARN', title: 'Catalogue behavior exposed low-value redundancy', detail: 'Testing showed populated sleeves often classified most similar candidates as redundant, which was technically correct but not decision-rich.', source: 'Catalogue audit' },
      { type: 'DECIDE', title: 'Move from fit classifier to decision support', detail: 'Assess what changes in the sleeve, explain benefits/costs, preserve valid choices, and recommend a default rather than expose only one verdict.', source: 'Product decision' },
      { type: 'IMPLEMENT', title: 'Phase-3 contribution / tradeoff / action model', detail: 'Incremental contribution, overlap interpretation, tradeoff, available-action, and preferred-action layers are being built.', source: 'Project update' },
      { type: 'LEARN', title: 'Flat candidate lists are also weak discovery', detail: 'The next refinement is contribution-oriented candidate discovery instead of long lists of interchangeable securities.', source: 'Product decision' }
    ]
  },
  {
    id: 'what-if',
    horizon: 'now',
    title: 'What-If Comparison',
    userJob: 'Help me understand the consequence of a contemplated portfolio change before I make it.',
    minimumBehavior: 'Show before → proposed change → after → explain material changes in risk, diversification, exposure and effort where supported.',
    discoveryQuestion: 'Which consequences must be visible for the simulation to change a user decision?',
    exitCriterion: 'The user can answer what materially changed and what tradeoff they accepted.',
    nonScope: ['Sophisticated optimizer', 'Institutional Monte Carlo', 'Predictive guarantees'],
    stage: 2,
    scopeImpact: 'None — committed MVP1 feature.',
    evidence: [{ type: 'IMPLEMENT', title: 'Decision-support foundation being reused', detail: 'Current asset-selection work is establishing the before/after and tradeoff primitives needed by What-If.', source: 'Current project dependency' }]
  },
  {
    id: 'portfolio-analyzer',
    horizon: 'now',
    title: 'Portfolio Analyzer',
    userJob: 'Help me understand what my portfolio actually looks like.',
    minimumBehavior: 'Holdings → exposures/structure → concentration/diversification observations → explain why the important issues matter.',
    discoveryQuestion: 'What analysis is minimally useful rather than merely descriptive?',
    exitCriterion: 'The user can identify what is represented, duplicated, missing or concentrated and why it matters.',
    nonScope: ['Institutional analytics terminal', 'Tax optimizer', 'Execution'],
    stage: 1,
    scopeImpact: 'None — committed MVP1 feature.',
    evidence: []
  },
  {
    id: 'risk-diversification',
    horizon: 'now',
    title: 'Risk & Diversification Insights',
    userJob: 'Show me where my portfolio is vulnerable and whether it deserves attention.',
    minimumBehavior: 'Identify meaningful concentration/diversification/risk conditions in portfolio-system context.',
    discoveryQuestion: 'Which signals are credible and actionable enough to warrant attention?',
    exitCriterion: 'The user understands what risk exists, where it comes from and whether it warrants review.',
    nonScope: ['Guarantees', 'Predictive risk claims', 'Automatic remediation'],
    stage: 1,
    scopeImpact: 'None — committed MVP1 feature.',
    evidence: []
  },
  {
    id: 'market-context',
    horizon: 'now',
    title: 'Market Context + Trend Monitoring',
    userJob: 'Tell me what changed in the market that matters to my portfolio.',
    minimumBehavior: 'Relevant market event/trend → affected portfolio exposure → contextual significance → whether review is warranted.',
    discoveryQuestion: 'How much personalization turns generic market news into useful portfolio intelligence?',
    exitCriterion: 'The user can answer what changed, which part of their system it relates to, and whether they need to review anything.',
    nonScope: ['News terminal', 'Price prediction', 'Trading signals'],
    stage: 1,
    scopeImpact: 'None — committed MVP1 feature.',
    evidence: []
  },
  {
    id: 'effort-review',
    horizon: 'now',
    title: 'Effort / Review Cadence',
    userJob: 'Help me understand how much attention this strategy deserves and when to review it.',
    minimumBehavior: 'System/sleeve → monitoring effort/cadence → why that cadence fits the strategy.',
    discoveryQuestion: 'What representation makes “effort” useful rather than abstract metadata?',
    exitCriterion: 'The user knows how often the strategy deserves attention and why.',
    nonScope: ['Productivity tracker', 'Complex time accounting'],
    stage: 1,
    scopeImpact: 'None — committed delivery-roadmap behavior.',
    evidence: []
  },
  {
    id: 'alerts',
    horizon: 'now',
    title: 'Review Alerts / Smart Nudges',
    userJob: 'Tell me when something deserves my attention.',
    minimumBehavior: 'Trigger → reason → affected portfolio area → review prompt.',
    discoveryQuestion: 'What conditions genuinely deserve interruption?',
    exitCriterion: 'The user understands why they were alerted and what deserves review without being told to trade.',
    nonScope: ['Automatic trading', 'Generic engagement notifications'],
    stage: 1,
    scopeImpact: 'None — committed MVP1 feature.',
    evidence: []
  },
  {
    id: 'account-commercial',
    horizon: 'next',
    title: 'Account + Payment + Commercial Enablement',
    userJob: 'Let me securely access and pay for the intelligence product.',
    minimumBehavior: 'Account creation + required identity flow + payment/subscription + entitlement.',
    discoveryQuestion: 'What is the smallest reliable commercial flow needed to charge for V1?',
    exitCriterion: 'A user can create an account, complete required checks, pay, and access the paid experience.',
    nonScope: ['Brokerage onboarding', 'Trading', 'Complex packaging experimentation'],
    stage: 1,
    scopeImpact: 'Sequencing decision — pulled forward to enable monetizable V1.',
    evidence: []
  },
  {
    id: 'customer-validation',
    horizon: 'next',
    title: 'Launch + Customer Validation',
    userJob: 'Prove that internally accepted behavior creates value for real users.',
    minimumBehavior: 'Show user-ready features, capture usage/feedback, separate trust/correctness blockers from enhancement requests.',
    discoveryQuestion: 'Do target users understand the value and show willingness to keep using or pay?',
    exitCriterion: 'External evidence supports the value proposition or clearly identifies the next bounded refinement.',
    nonScope: ['Open-ended feature expansion'],
    stage: 0,
    scopeImpact: 'None — explicitly planned Oct–Dec validation period.',
    evidence: []
  },
  {
    id: 'journal-goals',
    horizon: 'next',
    title: 'Decision Journal + Basic Goals',
    userJob: 'Connect my decisions to my intent and revisit why I made them.',
    minimumBehavior: 'Capture a basic goal and decision rationale; revisit later with relevant context.',
    discoveryQuestion: 'What is the smallest interaction users will actually repeat?',
    exitCriterion: 'A decision can be recorded and later revisited meaningfully, with goal context influencing the experience somewhere visible.',
    nonScope: ['Full note app', 'Full financial planning suite'],
    stage: 0,
    scopeImpact: 'None — remaining committed MVP1 behavior.',
    evidence: []
  },
  {
    id: 'execution',
    horizon: 'later',
    title: 'Brokerage + Real Holdings',
    userJob: 'Apply AaronBux intelligence to actual holdings and eventually execute deliberately.',
    minimumBehavior: 'Brokerage connection, real holdings, safe execution flow, status and transparency.',
    discoveryQuestion: 'Which intelligence behaviors become materially better once the portfolio is live?',
    exitCriterion: 'Real holdings and order state are reliable enough for the intelligence layer to operate on live context.',
    nonScope: ['Autonomous AI trading'],
    stage: 0,
    scopeImpact: 'Deferred by latest roadmap to V3 onward.',
    evidence: []
  },
  {
    id: 'funding-orders',
    horizon: 'later',
    title: 'Funding + Orders + Confirmations',
    userJob: 'Move money and understand exactly what happened to my transactions.',
    minimumBehavior: 'Bank link/funding → order review → submit → confirmation/history.',
    discoveryQuestion: 'What is the minimum safe and transparent execution lifecycle?',
    exitCriterion: 'Users can determine what they submitted, what happened, and the current status.',
    nonScope: ['Complex active-trading terminal'],
    stage: 0,
    scopeImpact: 'Deferred by latest roadmap to V3 onward.',
    evidence: []
  }
];
