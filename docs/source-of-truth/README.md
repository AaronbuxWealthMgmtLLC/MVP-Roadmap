# Source of truth

This tracker is intentionally static in v0.1. Product scope and horizon placement are derived from the product-context documents in this folder.

## Included source documents

- `april-mvp1.pdf` — April MVP1 concept for a $4.99 insights/planning product. Defines Portfolio Builder, What-If, Portfolio Analyzer, Risk & Diversification, Market Context, Learning, Decision Journal, Smart Nudges, and Basic Goal Setting; explicitly excludes execution and brokerage connection.
- `april-mvp2.pdf` — April MVP2 execution + premium intelligence concept. Defines account/KYC, Plaid funding, Alpaca trading, real holdings, transactions/history, and premium intelligence.
- `april-mvp-roadmap-vf2.pdf` — earlier staged roadmap from educational beta through personalization, execution, premium AI, and later asset classes.
- `april-mvp1-prd.docx` — April MVP1 product requirements context.
- `divya-roadmap-mvp1-mvp2-delivery.docx` — latest delivery sequencing: monetizable intelligence behaviors targeted first, payment/KYC/account creation by September-end, launch/customer outreach/refinement in Oct–Dec, remaining MVP1/MVP2 after that, brokerage integration from V3 onward.

## Tracker policy

The feature list is fixed to committed MVP capabilities. The tracker separates implementation from solution discovery:

1. Thesis
2. Working behavior
3. Exercised
4. Product learning
5. Behavioral decision
6. Refined implementation
7. User-ready
8. Commercial-ready

A feature may move backward or remain in a discovery stage without implying new MVP scope. New capabilities should be placed in backlog rather than silently added to an existing feature.

## Future GitHub integration

The static `evidence` arrays in `data/product-context.js` are the intended integration seam. A future adapter can map commits, PRs, issues, or project updates into the same evidence model without changing the UI.
