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

const featureSummaryOverrides = {
  'asset-selection-fit': {
    label: 'Assess Fit',
    currentFocus: 'Organizing candidate choices around meaningful contributions to the sleeve.',
    userReadyExit: 'User can discover a meaningful candidate, understand what changes and make an informed choice.'
  }
};

function readinessLabel(feature) {
  return feature.readinessStage?.replaceAll('_', ' ') ?? stageName(feature.stage).toUpperCase();
}

function summaryContent(feature) {
  return featureSummaryOverrides[feature.id] ?? {
    label: feature.title,
    currentFocus: feature.discoveryQuestion,
    userReadyExit: feature.exitCriterion
  };
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
  const rows = items.map(item => {
    const repository = sourceRepositories[item.repositoryId];
    const url = commitUrl(item);
    const shortSha = item.commitSha.slice(0, 7);
    const shaMarkup = url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="View commit ${escapeHtml(shortSha)} in ${escapeHtml(repository.label)}">${escapeHtml(shortSha)}</a>`
      : `<span>${escapeHtml(shortSha)}</span>`;

    return `<div class="github-evidence-row">
      <time datetime="${escapeHtml(item.commitDate)}">${escapeHtml(formatMonthDay(item.commitDate))}</time>
      <div class="github-evidence-sha">${shaMarkup}</div>
      <div class="github-evidence-message">${escapeHtml(item.commitMessage)}</div>
    </div>`;
  }).join('');

  const body = items.length
    ? rows
    : '<p class="github-evidence-empty">No supporting commit recorded; the product date still needs confirmation.</p>';

  return `<details class="timeline-evidence">
    <summary><span>GitHub evidence</span><span class="evidence-chevron" aria-hidden="true">⌄</span></summary>
    <div class="github-evidence-panel">
      <div class="github-evidence-heading">GitHub evidence</div>
      ${body}
    </div>
  </details>`;
}

function calendarDayValue(date) {
  if (!date) return null;
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

function elapsedLabel(previousDate, currentDate) {
  const previousDay = calendarDayValue(previousDate);
  const currentDay = calendarDayValue(currentDate);
  if (previousDay === null || currentDay === null) return null;

  const days = Math.round((currentDay - previousDay) / 86400000);
  if (days === 0) return 'same day';
  return `${days} ${days === 1 ? 'day' : 'days'} later`;
}

function formatMonthDay(date) {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function displayStageDate(stageDate) {
  return stageDate ? formatMonthDay(stageDate).toUpperCase() : 'DATE PENDING';
}

function discoveryTraceMarkup(items) {
  return `<div class="discovery-timeline">${items.map((item, index) => {
    const elapsed = index > 0 ? elapsedLabel(items[index - 1].stageDate, item.stageDate) : null;
    return `
      ${elapsed ? `<div class="timeline-elapsed"><span aria-hidden="true">↓</span> ${escapeHtml(elapsed)}</div>` : ''}
      <article class="timeline-entry">
        <time class="timeline-date" ${item.stageDate ? `datetime="${escapeHtml(item.stageDate)}"` : ''}>${escapeHtml(displayStageDate(item.stageDate))}</time>
        <div class="timeline-rail" aria-hidden="true"><span class="timeline-dot"></span></div>
        <div class="timeline-content">
          <div class="timeline-type ${escapeHtml(item.type)}">${escapeHtml(item.type)}</div>
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.plainEnglish)}</p>
          <p class="timeline-significance">Why it matters: ${escapeHtml(item.significance)}</p>
          <div class="timeline-scope-impact">
            <span>Scope impact</span>
            <strong>${escapeHtml(item.scopeImpact === 'none' ? 'NO CHANGE TO MVP SCOPE' : item.scopeImpact.toUpperCase())}</strong>
          </div>
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
  const summary = summaryContent(feature);
  return `<article class="feature-card" data-feature-id="${escapeHtml(feature.id)}">
    <button class="feature-summary" type="button" aria-expanded="false">
      <div class="feature-title">${escapeHtml(summary.label).toUpperCase()}</div>
      <div class="feature-summary-grid">
        <div class="feature-summary-field">
          <span>Current status</span>
          <strong class="readiness-state">${escapeHtml(readinessLabel(feature))}</strong>
        </div>
        <div class="feature-summary-field">
          <span>Current focus</span>
          <strong>${escapeHtml(summary.currentFocus)}</strong>
        </div>
        <div class="feature-summary-field">
          <span>Exit to User Ready</span>
          <strong>${escapeHtml(summary.userReadyExit)}</strong>
        </div>
      </div>
      <div class="progress-track" aria-hidden="true">${progressMarkup(feature.stage)}</div>
      <div class="feature-expand-label"><span>See how we got here</span><span class="expand-arrow" aria-hidden="true">↓</span></div>
    </button>
    <div class="feature-detail">
      <section class="evidence-section"><h3>How ${escapeHtml(summary.label)} evolved</h3>${featureEvidenceMarkup(feature)}</section>
      <div class="detail-grid">
        <section class="detail-block"><h3>Minimum viable behavior</h3><p>${escapeHtml(feature.minimumBehavior)}</p></section>
        <section class="detail-block"><h3>Solution-discovery question</h3><p>${escapeHtml(feature.discoveryQuestion)}</p></section>
        <section class="detail-block"><h3>Exit criterion</h3><p>${escapeHtml(feature.exitCriterion)}</p></section>
        <section class="detail-block scope-note"><h3>Scope impact</h3><p>${escapeHtml(feature.scopeImpact)}</p></section>
      </div>
      <section class="detail-block" style="margin-top:14px"><h3>Hard non-scope</h3><div class="chips">${feature.nonScope.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div></section>
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
