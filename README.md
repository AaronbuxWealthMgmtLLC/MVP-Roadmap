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

## Hosting under `/mvp`

The production build defaults to `/mvp` and writes the deployable tracker to
`dist/mvp/`. Asset and source-document references are relative to that folder.
The generated base URL keeps those references under `/mvp/`, including when a
future client-side route is served through an index rewrite. The canonical
production address is `https://www.aaronbux.com/mvp`.

The defaults live in `package.json`. A deployment can override them with the
`TRACKER_BASE_PATH` and `TRACKER_CANONICAL_URL` environment variables.

The HTML normalizes `/mvp` to `/mvp/` when the host serves the index without
performing its own directory redirect. If client-side feature routes are added
later, configure the host to rewrite `/mvp/*` to `/mvp/index.html` with a 200
response; the app does not currently introduce client-side routes.

## Architecture

- `data/product-context.js` — static source-of-truth projection used by the UI.
- `docs/source-of-truth/` — product context documents used to seed the tracker.
- `assets/app.js` — rendering, filters, feature expansion, evidence trace.
- `assets/app.css` — responsive UI.

## Future repo integration

Replace or enrich the static `evidence` items with a GitHub adapter. Keep the core progress unit feature-centric:

`IMPLEMENT → LEARN → DECIDE → VALIDATE`

Commits are evidence under a product decision, not the milestone itself.
