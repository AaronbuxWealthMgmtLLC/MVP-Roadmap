import { features, horizons, readinessStages, sourceDocs, sourceRepositories } from '../data/product-context.js';

const tabs = document.querySelector('#horizonTabs');
const description = document.querySelector('#horizonDescription');
const list = document.querySelector('#featureList');
const dialog = document.querySelector('#sourcesDialog');
const sourceList = document.querySelector('#sourceList');
const sourceButton = document.querySelector('#sourcesButton');
let activeHorizon = 'now';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[c]));
}

function stageName(stage) {
  return readinessStages[Math.max(0, Math.min(stage, readinessStages.length - 1))];
}

function progressMarkup(stage) {
  return readinessStages.map((_, i) => `<span class="progress-segment ${i < stage ? 'done' : i === stage ? 'current' : ''}"></span>`).join('');
}

function legacyEvidenceMarkup(items) {
  if (!items.length) return '<p>No static project evidence added yet. This is where GitHub commits / PRs / project updates will later appear.</p>';
  return `<div class="evidence-list">${items.map(item => `
    <article class="evidence-item">
      <div class="evidence-type ${escapeHtml(item.type)}">${escapeHtml(item.type)}</div>
      <div>
        <div class="evidence-title">${escapeHtml(item.title)}</div>
        <div class="evidence-detail">${escapeHtml(item.detail)}</div>
        <div class="evidence-source">Evidence: ${escapeHtml(item.source)}</div>
      </div>
  </article>`).join('')}</div>`;
}

function commitUrl(evidence) {
  const repository = sourceRepositories[evidence.repositoryId];
  if (!repository) return null;
  return `${repository.baseUrl}/commit/${encodeURIComponent(evidence.commitSha)}`;
}

function githubEvidenceMarkup(items) {
  if (!items.length) return '<div class="evidence-source">Git evidence: awaiting confirmation</div>';

  return items.map(item => {
    const repository = sourceRepositories[item.repositoryId];
    const url = commitUrl(item);
    const label = `${repository?.label ?? item.repositoryId} · ${item.commitSha.slice(0, 7)} · ${item.commitDate} · ${item.commitMessage}`;

    return url
      ? `<div class="evidence-source"><a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a></div>`
      : `<div class="evidence-source">${escapeHtml(label)} (unknown repository)</div>`;
  }).join('');
}

function discoveryTraceMarkup(items) {
  return `<div class="evidence-list">${items.map(item => {
    const dateLabel = item.stageDate ?? 'Date needs product-owner confirmation';
    return `
      <article class="evidence-item">
        <div class="evidence-type ${escapeHtml(item.type)}">${escapeHtml(item.type)}<div class="evidence-source">${escapeHtml(dateLabel)}</div></div>
        <div>
          <div class="evidence-title">${escapeHtml(item.title)}</div>
          <div class="evidence-detail">${escapeHtml(item.plainEnglish)}</div>
          <div class="evidence-detail">Why it matters: ${escapeHtml(item.significance)}</div>
          ${githubEvidenceMarkup(item.githubEvidence)}
        </div>
      </article>`;
  }).join('')}</div>`;
}

function featureEvidenceMarkup(feature) {
  return feature.discoveryTrace?.length
    ? discoveryTraceMarkup(feature.discoveryTrace)
    : legacyEvidenceMarkup(feature.evidence);
}

function featureMarkup(feature) {
  return `<article class="feature-card" data-feature-id="${escapeHtml(feature.id)}">
    <button class="feature-summary" type="button" aria-expanded="false">
      <div class="feature-topline">
        <div>
          <div class="feature-title">${escapeHtml(feature.title)}</div>
          <div class="feature-job">${escapeHtml(feature.userJob)}</div>
        </div>
        <span class="stage-pill">${escapeHtml(stageName(feature.stage))}</span>
      </div>
      <div class="progress-track" aria-hidden="true">${progressMarkup(feature.stage)}</div>
      <div class="stage-caption">${feature.stage + 1} / ${readinessStages.length} · ${escapeHtml(stageName(feature.stage))}</div>
    </button>
    <div class="feature-detail">
      <div class="detail-grid">
        <section class="detail-block"><h3>Minimum viable behavior</h3><p>${escapeHtml(feature.minimumBehavior)}</p></section>
        <section class="detail-block"><h3>Solution-discovery question</h3><p>${escapeHtml(feature.discoveryQuestion)}</p></section>
        <section class="detail-block"><h3>Exit criterion</h3><p>${escapeHtml(feature.exitCriterion)}</p></section>
        <section class="detail-block scope-note"><h3>Scope impact</h3><p>${escapeHtml(feature.scopeImpact)}</p></section>
      </div>
      <section class="detail-block" style="margin-top:14px"><h3>Hard non-scope</h3><div class="chips">${feature.nonScope.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div></section>
      <section class="evidence-section"><h3>Solution-discovery trace</h3>${featureEvidenceMarkup(feature)}</section>
    </div>
  </article>`;
}

function render() {
  const horizon = horizons.find(item => item.id === activeHorizon);
  description.textContent = `${horizon.subtitle} — ${horizon.description}`;
  tabs.innerHTML = horizons.map(item => `<button type="button" class="tab" role="tab" data-horizon="${item.id}" aria-selected="${item.id === activeHorizon}">${item.label}</button>`).join('');
  list.innerHTML = features.filter(feature => feature.horizon === activeHorizon).map(featureMarkup).join('');
  tabs.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => { activeHorizon = button.dataset.horizon; render(); }));
  list.querySelectorAll('.feature-summary').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.feature-card');
    const open = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));
}

sourceList.innerHTML = sourceDocs.map(doc => `<article class="source-item"><a href="${encodeURI(doc.path)}" target="_blank" rel="noopener">${escapeHtml(doc.label)}</a><p>${escapeHtml(doc.note)}</p></article>`).join('');
sourceButton.addEventListener('click', () => dialog.showModal());
render();
