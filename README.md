# AaronBux MVP Readiness Tracker

Static, AWS Amplify-hostable product tracker for communicating MVP progress as **feature readiness + solution-discovery closure**, rather than raw engineering completion.

## Run locally

Any static server works:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Validate and build

```bash
npm run check
npm run build
```

AWS Amplify uses `amplify.yml` and publishes `dist/`.

## Architecture

- `data/product-context.js` — static source-of-truth projection used by the UI.
- `docs/source-of-truth/` — product context documents used to seed the tracker.
- `assets/app.js` — rendering, filters, feature expansion, evidence trace.
- `assets/app.css` — responsive UI.

## Future repo integration

Replace or enrich the static `evidence` items with a GitHub adapter. Keep the core progress unit feature-centric:

`IMPLEMENT → LEARN → DECIDE → VALIDATE`

Commits are evidence under a product decision, not the milestone itself.
