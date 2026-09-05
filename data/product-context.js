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

// Canonical v0.2 values for the dated solution-discovery contract. The
// readinessStages export above remains in place for the existing stage-indexed
// UI until that UI is migrated to consume readinessStage directly.
export const discoveryTypes = [
  'IMPLEMENT',
  'LEARN',
  'DECIDE',
  'VALIDATE'
];

export const productEvolutionMarkers = [
  'commitment',
  'behavior',
  'finding',
  'completion'
];

export const readinessStates = [
  'THESIS',
  'WORKING',
  'EXERCISED',
  'BEHAVIOR_REFINING',
  'BEHAVIOR_FROZEN',
  'USER_READY',
  'CUSTOMER_VALIDATING',
  'COMMERCIAL_READY'
];

export const sourceRepositories = {
  'onboarding-v3': {
    id: 'onboarding-v3',
    label: 'AaronBux MVP Webapp',
    owner: 'a73955184-droid',
    repo: 'Onboarding-V3',
    baseUrl: 'https://github.com/a73955184-droid/Onboarding-V3'
  },
  'mvp-roadmap': {
    id: 'mvp-roadmap',
    label: 'MVP Readiness Tracker',
    owner: 'AaronbuxWealthMgmtLLC',
    repo: 'MVP-Roadmap',
    baseUrl: 'https://github.com/AaronbuxWealthMgmtLLC/MVP-Roadmap'
  }
};

// v0.2 rollups are explicitly curated product data. They are not calculated
// from commit counts or inferred from discovery-trace activity.
export const roadmapRollup = {
  label: 'NOW — COMMERCIAL V1',
  items: [
    { label: 'Portfolio Builder', readinessStage: 'USER_READY' },
    { label: 'Asset Selection', readinessStage: 'BEHAVIOR_REFINING' },
    { label: 'Assess Fit', readinessStage: 'BEHAVIOR_REFINING' },
    { label: 'What-If', readinessStage: 'WORKING' },
    { label: 'Portfolio Analyzer', readinessStage: 'WORKING' },
    { label: 'Risk & Diversification', readinessStage: 'WORKING' },
    { label: 'Market Context', readinessStage: 'THESIS' },
    { label: 'Review Alerts', readinessStage: 'THESIS' }
  ]
};

export const scopeHealth = {
  label: 'THIS WEEK',
  items: [
    { label: 'Committed MVP features added', value: 0 },
    { label: 'Behavior refinements', value: 2 },
    { label: 'Features moved toward User Ready', value: 1 },
    { label: 'New capabilities deferred', value: 3 }
  ]
};

export const timelineCalendar = {
  startDate: '2026-08-20'
};

/**
 * discoveryTrace item contract:
 * {
 *   type: one of discoveryTypes,
 *   stageDate: 'YYYY-MM-DD' | null,
 *   dateStatus: 'needs-product-owner-confirmation' (only when stageDate is null),
 *   title: string,
 *   plainEnglish: string,
 *   significance: string,
 *   scopeImpact: string,
 *   githubEvidence: [{
 *     repositoryId: a key in sourceRepositories,
 *     commitSha: string,
 *     commitDate: 'YYYY-MM-DD',
 *     commitMessage: string
 *   }]
 * }
 *
 * stageDate records the product-discovery event. commitDate records when its
 * supporting GitHub change was committed; neither date is derived from the
 * other.
 */

/**
 * Reference product-evolution feature contract:
 * {
 *   userJob: string,
 *   committedScope: string,
 *   howItWorks: {
 *     steps: [{ id: string, label: string }],
 *     explanation: string
 *   },
 *   currentBehavior: string,
 *   currentQuestion: string,
 *   exitCriterion: string,
 *   completion: {
 *     date: 'YYYY-MM-DD' | null,
 *     status: 'not-yet-frozen' | 'minimum-behavior-complete',
 *     evidence: [] (required and non-empty when minimum behavior is complete)
 *   },
 *   productEvolution: [{
 *     date: 'YYYY-MM-DD' | null,
 *     dateStatus: 'needs-product-owner-confirmation' (only when date is null),
 *     marker: one of productEvolutionMarkers,
 *     showInHorizonTimeline: boolean (optional; product-owner curated),
 *     title: string,
 *     behaviorBefore: string,
 *     finding: string,
 *     consequence: string,
 *     scopeImpact: 'none' | 'clarification' | 'new-capability-deferred',
 *     scopeExplanation: string (optional; shown for consequential decisions),
 *     evidence: [{
 *       repositoryId,
 *       commitSha,
 *       commitDate,
 *       commitMessage,
 *       implementationArea,
 *       verification
 *     }]
 *   }]
 * }
 *
 * marker controls visual semantics only. The visible milestone title must
 * describe the actual product event rather than repeat the generic marker.
 * Legacy discoveryTrace and evidence fields remain during migration.
 */

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
    readinessStage: 'USER_READY',
    committedScope: 'A recommended portfolio system with understandable sleeve roles and reasoning.',
    currentBehavior: 'Recommended portfolio system available',
    currentQuestion: 'What is the minimum recommendation structure and explanation that creates confidence?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Portfolio Builder / Recommended System committed',
        behaviorBefore: 'The MVP committed to giving users an understandable recommended investing structure.',
        finding: 'No dated product-decision record has been curated for the original commitment.',
        consequence: 'The feature remains part of the committed NOW portfolio.',
        scopeImpact: 'none',
        evidence: []
      },
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'behavior',
        title: 'Recommended portfolio system available',
        behaviorBefore: 'Profile inputs produce a recommended portfolio system with sleeve roles and reasoning.',
        finding: 'The existing tracker records that the recommendation and explanation behavior has been exercised, but does not establish an objective product-event date.',
        consequence: 'Users can receive the portfolio structure that contextualizes the other NOW features.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    committedScope: 'Curated candidate discovery and contextual Assess Fit decision support inside the recommended portfolio system.',
    howItWorks: {
      steps: [
        { id: 'recommended-system', label: 'Recommended portfolio system' },
        { id: 'sleeve', label: 'Sleeve' },
        { id: 'sleeve-job', label: 'Sleeve job' },
        { id: 'eligible-securities', label: 'Curated eligible securities' },
        { id: 'candidate-selection', label: 'User selects candidate' },
        { id: 'assess-fit', label: 'Assess Fit' },
        { id: 'decision-support', label: 'Portfolio change / contribution / overlap / tradeoffs / choices' }
      ],
      explanation: 'The product does not expose the entire market. Securities are curated into a bounded catalogue and mapped to portfolio contexts where they can reasonably belong. Assess Fit evaluates the selected candidate relative to the sleeve\'s current hypothetical holdings.'
    },
    currentBehavior: 'Portfolio-change decision support',
    currentQuestion: 'Can candidate discovery surface meaningful choices without requiring users to assess many near-equivalent securities?',
    minimumBehavior: 'Contextual candidate discovery → portfolio delta → overlap/contribution → tradeoffs → valid choices → preferred default.',
    discoveryQuestion: 'What must “fit” minimally tell the user so the decision is useful rather than merely classified?',
    exitCriterion: 'Users can discover a purposeful candidate and understand what it changes, its overlap and tradeoffs, and the reasonable choices.',
    nonScope: ['Best-investment ranking', 'Return forecasting', 'Automated optimization', 'Trade execution'],
    stage: 5,
    readinessStage: 'BEHAVIOR_REFINING',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Asset Selection + Assess Fit committed',
        behaviorBefore: 'The MVP commitment was to help a user choose a curated security and understand whether it belonged in a recommended portfolio sleeve.',
        finding: 'The commitment bounded the experience to contextual candidate selection and fit assessment rather than open-market search or investment ranking.',
        consequence: 'The first product behavior focused on curated securities and four explicit fit outcomes.',
        scopeImpact: 'new-capability-deferred',
        scopeExplanation: 'Open-market search, security ranking and automated optimization remain outside the committed MVP.',
        evidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '9090a057b623f35f097815c16a6715cc4c514fd1',
            commitDate: '2026-08-28',
            commitMessage: 'adding docs',
            implementationArea: 'Phase-1 security-selection product specification',
            verification: 'Committed scope and four-outcome behavior documented'
          }
        ]
      },
      {
        date: '2026-08-29',
        marker: 'behavior',
        showInHorizonTimeline: true,
        title: 'Curated securities + four fit outcomes available',
        behaviorBefore: 'Users could browse securities curated for a sleeve, select one, and receive Add, Replace, Redundant or Do not add.',
        finding: 'This created the first working, user-visible behavior that could be exercised against hypothetical sleeve holdings.',
        consequence: 'Catalogue use could now reveal whether the four outcomes gave users enough help to make a decision.',
        scopeImpact: 'none',
        evidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'ec5b3ac8c801e2b52c9c325e156eaf458e175ce9',
            commitDate: '2026-08-28',
            commitMessage: 'phase-1 - part1',
            implementationArea: 'Security fit assessment behavior',
            verification: 'Fit behavior and eligibility coverage'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '25311f966111e7226988dba0db09f6d042539173',
            commitDate: '2026-08-29',
            commitMessage: 'feat(portfolio-map): add interactive sleeve curation lab',
            implementationArea: 'Portfolio Map candidate-selection experience',
            verification: 'Curation interaction and session tests'
          }
        ]
      },
      {
        date: '2026-09-03',
        marker: 'finding',
        showInHorizonTimeline: true,
        title: 'Valid alternatives often looked redundant',
        behaviorBefore: 'Once a reasonable holding existed, another eligible candidate in the same category was often reduced to the Redundant outcome.',
        finding: 'The catalogue-wide audit later measured 18,548 Redundant results across 20,218 Phase-2 scenarios, including candidates that still changed portfolio exposure.',
        consequence: 'The assessment was technically consistent but provided weak decision support for legitimate alternatives.',
        scopeImpact: 'none',
        evidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '48ee1858e6f16fe7c29d8f8e0a247f7b077cbdea',
            commitDate: '2026-09-03',
            commitMessage: 'Task 13 — Catalogue-wide behavior audit',
            implementationArea: 'Catalogue-wide Assess Fit behavior',
            verification: '20,218-scenario Phase-3 behavior audit'
          }
        ]
      },
      {
        date: '2026-09-03',
        marker: 'finding',
        showInHorizonTimeline: true,
        title: 'Fit alone isn\'t enough',
        behaviorBefore: 'Assess Fit answered which structural label applied to a candidate.',
        finding: 'A user also needed to understand what would change, what would overlap, which tradeoffs followed and which reasonable choices remained.',
        consequence: 'The product decision changed Assess Fit from a terminal classification into portfolio-change decision support.',
        scopeImpact: 'none',
        scopeExplanation: 'Same Asset Selection + Assess Fit user job. The minimum behavior required to fulfill it changed.',
        evidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c7d2e492e92399592155277ae65b827a7fcdc115',
            commitDate: '2026-09-03',
            commitMessage: 'Task 1 — Freeze and document the product-semantics change',
            implementationArea: 'Assess Fit product behavior contract',
            verification: 'Product-semantics decision documented before behavior changed'
          }
        ]
      },
      {
        date: '2026-09-03',
        marker: 'behavior',
        showInHorizonTimeline: true,
        title: 'Portfolio-change explanation added',
        behaviorBefore: 'The product primarily assigned a fit label to the selected security.',
        finding: 'Overlap could be meaningful evidence without being a complete verdict, and more than one action could remain reasonable.',
        consequence: 'Assess Fit now explains incremental contribution, overlap, tradeoffs, available choices and a preferred default in the current sleeve context.',
        scopeImpact: 'none',
        evidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c54e08f03ee5399894096b6f5e18dc2ee2e65dbc',
            commitDate: '2026-09-03',
            commitMessage: 'Task 3 — Build incremental-contribution analysis',
            implementationArea: 'Incremental contribution explanation',
            verification: 'Incremental-contribution behavior tests'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '69a742da5a17713a57d2dd33fa536ba765273572',
            commitDate: '2026-09-03',
            commitMessage: 'Task 4 — Interpret overlap as a tradeoff, not a verdict',
            implementationArea: 'Overlap interpretation',
            verification: 'Overlap-interpretation behavior tests'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c7bb1b819a56e35753add85f7277f702b8ee7d10',
            commitDate: '2026-09-03',
            commitMessage: 'Task 5 — Build tradeoff resolver',
            implementationArea: 'Tradeoff explanation',
            verification: 'Tradeoff behavior tests'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '051dc0a93357dfec8ea85bb8f6245d096649669d',
            commitDate: '2026-09-03',
            commitMessage: 'Task 6 — Build available-actions resolver',
            implementationArea: 'Reasonable available choices',
            verification: 'Available-choice behavior tests'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '267f1d4d4a31893562390b889f6a349240067f88',
            commitDate: '2026-09-03',
            commitMessage: 'Task 7 — Build preferred-action resolver',
            implementationArea: 'Preferred default choice',
            verification: 'Preferred-action behavior tests'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '5fb4d34365bdb799444941980f66581da29c8fce',
            commitDate: '2026-09-03',
            commitMessage: 'Task 10 — Route Portfolio Map through the Phase-3 resolver',
            implementationArea: 'Portfolio Map decision-support presentation',
            verification: 'Interaction, presentation and compliance tests'
          }
        ]
      },
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'finding',
        title: 'Flat security browsing still creates unnecessary decisions',
        behaviorBefore: 'Users browse a flat list of eligible securities before selecting a candidate to assess.',
        finding: 'The supplied product direction says this still asks users to evaluate too many interchangeable choices before Assess Fit can help.',
        consequence: 'Candidate discovery needs to reduce the decision burden before assessment begins.',
        scopeImpact: 'none',
        evidence: []
      },
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'finding',
        title: 'Organize candidates by useful contribution',
        behaviorBefore: 'Eligible candidates are presented primarily as a flat catalogue.',
        finding: 'Users should begin with the contribution they want the sleeve to make rather than compare a long list of similar securities.',
        consequence: 'The next product behavior is contribution-oriented candidate organization; its decision date and implementation evidence remain unresolved.',
        scopeImpact: 'clarification',
        scopeExplanation: 'Candidate organization clarifies how the committed Asset Selection experience should reduce unnecessary choices; it does not add a new user job.',
        evidence: []
      }
    ],
    discoveryTrace: [
      {
        type: 'DECIDE',
        stageDate: null,
        dateStatus: 'needs-product-owner-confirmation',
        title: 'Original Assess Fit thesis documented',
        plainEnglish: 'Assess a verified candidate in a specific sleeve and return one deterministic result: Add, Replace, Redundant, or Do not add.',
        significance: 'Established the first bounded MVP definition for security fit before user-facing integration.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '9090a057b623f35f097815c16a6715cc4c514fd1',
            commitDate: '2026-08-28',
            commitMessage: 'adding docs'
          }
        ]
      },
      {
        type: 'IMPLEMENT',
        stageDate: '2026-08-29',
        title: 'First working security-fit behavior',
        plainEnglish: 'Users could inspect sleeve candidates and run the initial fit assessment inside the Portfolio Map curation flow.',
        significance: 'Made the original four-outcome Assess Fit hypothesis executable and visible in the product.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'ec5b3ac8c801e2b52c9c325e156eaf458e175ce9',
            commitDate: '2026-08-28',
            commitMessage: 'phase-1 - part1'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '25311f966111e7226988dba0db09f6d042539173',
            commitDate: '2026-08-29',
            commitMessage: 'feat(portfolio-map): add interactive sleeve curation lab'
          }
        ]
      },
      {
        type: 'LEARN',
        stageDate: '2026-09-01',
        title: 'Catalogue and readiness audit exposed blocked assessments',
        plainEnglish: 'The repository audit found that exact eligibility and incomplete decision facts made much of the browsable catalogue unavailable for assessment.',
        significance: 'Separated a genuinely negative fit result from an assessment that could not yet be completed.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '3d737d5ab09701e74d4787448c70cefe7875553b',
            commitDate: '2026-09-01',
            commitMessage: 'Audit and freeze the decision contract'
          }
        ]
      },
      {
        type: 'VALIDATE',
        stageDate: '2026-09-02',
        title: 'Assessment availability corrected and verified',
        plainEnglish: 'Readiness became field-aware and exact sleeve permissions were completed so eligible catalogue candidates could be assessed instead of appearing unavailable.',
        significance: 'The post-change scenario report recorded that all 4,309 exact-eligibility-driven unavailable assessments disappeared.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '505739193c2a412c0954f51f23d83b945696370a',
            commitDate: '2026-09-02',
            commitMessage: 'Task 4 — Upgrade assessment readiness'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'b55114cb1c9db8d872dff1418476b33c823ba54e',
            commitDate: '2026-09-02',
            commitMessage: 'The post-change report says all 4,309 exact-eligibility-driven unavailable assessments disappeared,'
          }
        ]
      },
      {
        type: 'LEARN',
        stageDate: '2026-09-03',
        title: 'Four-outcome classification over-produced Redundant',
        plainEnglish: 'The Phase-3 product contract recorded that the four-outcome model collapsed materially overlapping candidates into Redundant even when they changed portfolio exposure.',
        significance: 'Established that structural classification was useful evidence but too coarse to be the final user decision; the later catalogue-wide audit quantified the effect.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c7d2e492e92399592155277ae65b827a7fcdc115',
            commitDate: '2026-09-03',
            commitMessage: 'Task 1 — Freeze and document the product-semantics change'
          }
        ]
      },
      {
        type: 'DECIDE',
        stageDate: '2026-09-03',
        title: 'Move from classification to portfolio-delta decision support',
        plainEnglish: 'Assess Fit would explain what changes, interpret overlap as a tradeoff, preserve valid choices, and identify the best default action.',
        significance: 'Changed the product question from “Which fit label applies?” to “What changes, what are the tradeoffs, and what should I do by default?”',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c7d2e492e92399592155277ae65b827a7fcdc115',
            commitDate: '2026-09-03',
            commitMessage: 'Task 1 — Freeze and document the product-semantics change'
          }
        ]
      },
      {
        type: 'IMPLEMENT',
        stageDate: '2026-09-03',
        title: 'Portfolio-delta decision support implemented',
        plainEnglish: 'The product now resolves incremental contribution, overlap, tradeoffs, available choices, and a preferred default, then presents them in Portfolio Map.',
        significance: 'Turned Assess Fit into contextual decision support rather than a terminal security label.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c54e08f03ee5399894096b6f5e18dc2ee2e65dbc',
            commitDate: '2026-09-03',
            commitMessage: 'Task 3 — Build incremental-contribution analysis'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '69a742da5a17713a57d2dd33fa536ba765273572',
            commitDate: '2026-09-03',
            commitMessage: 'Task 4 — Interpret overlap as a tradeoff, not a verdict'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: 'c7bb1b819a56e35753add85f7277f702b8ee7d10',
            commitDate: '2026-09-03',
            commitMessage: 'Task 5 — Build tradeoff resolver'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '051dc0a93357dfec8ea85bb8f6245d096649669d',
            commitDate: '2026-09-03',
            commitMessage: 'Task 6 — Build available-actions resolver'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '267f1d4d4a31893562390b889f6a349240067f88',
            commitDate: '2026-09-03',
            commitMessage: 'Task 7 — Build preferred-action resolver'
          },
          {
            repositoryId: 'onboarding-v3',
            commitSha: '5fb4d34365bdb799444941980f66581da29c8fce',
            commitDate: '2026-09-03',
            commitMessage: 'Task 10 — Route Portfolio Map through the Phase-3 resolver'
          }
        ]
      },
      {
        type: 'VALIDATE',
        stageDate: '2026-09-03',
        title: 'Catalogue-wide Phase-3 audit',
        plainEnglish: 'The new behavior completed all 20,218 audited scenarios and recovered meaningful additive choices from cases the old model called Redundant.',
        significance: 'Validated that Phase 3 materially changed decision usefulness while identifying remaining metadata-granularity gaps.',
        scopeImpact: 'none',
        githubEvidence: [
          {
            repositoryId: 'onboarding-v3',
            commitSha: '48ee1858e6f16fe7c29d8f8e0a247f7b077cbdea',
            commitDate: '2026-09-03',
            commitMessage: 'Task 13 — Catalogue-wide behavior audit'
          }
        ]
      },
      {
        type: 'LEARN',
        stageDate: null,
        dateStatus: 'needs-product-owner-confirmation',
        title: 'Flat candidate lists still make discovery inefficient',
        plainEnglish: 'The supplied product direction says that a flat catalogue still asks users to search through too many interchangeable candidates.',
        significance: 'Points to contribution-oriented discovery as the next refinement, but the date and supporting Git commit are not present in Onboarding-V3 main.',
        scopeImpact: 'none',
        githubEvidence: []
      },
      {
        type: 'DECIDE',
        stageDate: null,
        dateStatus: 'needs-product-owner-confirmation',
        title: 'Organize candidates around contribution purposes',
        plainEnglish: 'The supplied product direction is to group candidates by the portfolio contribution a user is trying to make.',
        significance: 'Defines the intended next step, but no dated decision record or contribution-catalogue implementation commit exists in Onboarding-V3 main yet.',
        scopeImpact: 'none',
        githubEvidence: []
      }
    ],
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
    stage: 1,
    readinessStage: 'WORKING',
    committedScope: 'A before-and-after comparison that explains the material consequence of a contemplated portfolio change.',
    currentBehavior: 'No standalone What-If behavior is evidenced yet; shared decision-support foundations exist.',
    currentQuestion: 'Which consequences must be visible for the simulation to change a user decision?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'What-If comparison committed',
        behaviorBefore: 'The MVP committed to helping users understand a contemplated portfolio change before acting.',
        finding: 'The tracker records shared decision-support foundations, not a dated standalone What-If behavior.',
        consequence: 'The next product milestone must demonstrate the minimum understandable before-and-after comparison.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    readinessStage: 'WORKING',
    committedScope: 'Explain portfolio structure, concentration, duplication and missing exposure in language the user can act on.',
    currentBehavior: 'No dated Portfolio Analyzer behavior has been curated yet.',
    currentQuestion: 'What analysis is minimally useful rather than merely descriptive?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Portfolio Analyzer committed',
        behaviorBefore: 'The MVP committed to helping users understand what their portfolio actually contains and why it matters.',
        finding: 'No dated product behavior or implementation evidence has been curated for this feature.',
        consequence: 'The committed user job remains visible without implying implementation progress.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    readinessStage: 'WORKING',
    committedScope: 'Explain meaningful portfolio vulnerabilities and whether they warrant review.',
    currentBehavior: 'No dated Risk & Diversification behavior has been curated yet.',
    currentQuestion: 'Which signals are credible and actionable enough to warrant attention?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Risk & Diversification insights committed',
        behaviorBefore: 'The MVP committed to showing users where their portfolio may be vulnerable and whether it deserves attention.',
        finding: 'No dated product behavior or implementation evidence has been curated for this feature.',
        consequence: 'The committed user job remains visible without implying implementation progress.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    stage: 0,
    readinessStage: 'THESIS',
    committedScope: 'Connect a relevant market change to the part of the user\'s portfolio it affects and whether review is warranted.',
    currentBehavior: 'Not started',
    currentQuestion: 'How much personalization turns generic market news into useful portfolio intelligence?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Market Context committed',
        behaviorBefore: 'The MVP committed to connecting relevant market changes to the user\'s portfolio context.',
        finding: 'No product behavior or implementation evidence exists in the tracker yet.',
        consequence: 'The feature remains at thesis stage.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    readinessStage: 'WORKING',
    committedScope: 'Explain how much monitoring attention a strategy deserves, when to review it and why.',
    currentBehavior: 'No dated Effort / Review Cadence behavior has been curated yet.',
    currentQuestion: 'What representation makes “effort” useful rather than abstract metadata?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Effort / Review Cadence committed',
        behaviorBefore: 'The delivery roadmap committed to explaining the attention and review cadence a strategy deserves.',
        finding: 'No dated product behavior or implementation evidence has been curated for this feature.',
        consequence: 'The committed user job remains visible without implying implementation progress.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    stage: 0,
    readinessStage: 'THESIS',
    committedScope: 'Alert users only when a clear condition deserves review, with the reason and affected portfolio area.',
    currentBehavior: 'Not started',
    currentQuestion: 'What conditions genuinely deserve interruption?',
    completion: {
      date: null,
      status: 'not-yet-frozen',
      evidence: []
    },
    productEvolution: [
      {
        date: null,
        dateStatus: 'needs-product-owner-confirmation',
        marker: 'commitment',
        title: 'Review Alerts committed',
        behaviorBefore: 'The MVP committed to telling users when a portfolio condition genuinely deserves attention.',
        finding: 'No product behavior or implementation evidence exists in the tracker yet.',
        consequence: 'The feature remains at thesis stage.',
        scopeImpact: 'none',
        evidence: []
      }
    ],
    discoveryTrace: [],
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
    readinessStage: 'WORKING',
    discoveryTrace: [],
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
    readinessStage: 'THESIS',
    discoveryTrace: [],
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
    readinessStage: 'THESIS',
    discoveryTrace: [],
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
    readinessStage: 'THESIS',
    discoveryTrace: [],
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
    readinessStage: 'THESIS',
    discoveryTrace: [],
    scopeImpact: 'Deferred by latest roadmap to V3 onward.',
    evidence: []
  }
];

export const TRACKER_DATA = {
  productEvolutionMarkers,
  sourceRepositories,
  roadmapRollup,
  scopeHealth,
  timelineCalendar,
  features
};
