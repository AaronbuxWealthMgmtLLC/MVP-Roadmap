import {
  features,
  horizons,
  readinessStages,
  roadmapRollup,
  scopeHealth,
  sourceDocs,
  sourceRepositories
} from '../data/product-context.js';

const tabs = document.querySelector('#horizonTabs');
const description = document.querySelector('#horizonDescription');
const list = document.querySelector('#featureList');
const dialog = document.querySelector('#sourcesDialog');
const sourceList = document.querySelector('#sourceList');
const sourceButton = document.querySelector('#sourcesButton');
const roadmapRollupElement = document.querySelector('#roadmapRollup');
const scopeHealthElement = document.querySelector('#scopeHealth');
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
    label: 'Assess Fit'
  }
};

function readinessLabel(feature) {
  return feature.readinessStage?.replaceAll('_', ' ') ?? stageName(feature.stage).toUpperCase();
}

function summaryContent(feature) {
  const overrides = featureSummaryOverrides[feature.id] ?? {};
  return {
    label: overrides.label ?? feature.title,
    currentFocus: feature.currentQuestion ?? (feature.readinessStage === 'THESIS' && !feature.discoveryTrace.length
      ? 'Not started'
      : feature.discoveryQuestion),
    userReadyExit: feature.exitCriterion
  };
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

const productEvolutionGlyphs = {
  commitment: '○',
  behavior: '×',
  finding: '◆',
  completion: '✓'
};

function productEvolutionMarkup(items) {
  return `<div class="product-evolution-timeline">${items.map((item, index) => {
    const elapsed = index > 0 ? elapsedLabel(items[index - 1].date, item.date) : null;
    const scopeImpact = item.scopeImpact === 'none'
      ? 'NO CHANGE TO COMMITTED SCOPE'
      : item.scopeImpact.toUpperCase();

    return `
      ${elapsed ? `<div class="timeline-elapsed"><span aria-hidden="true">↓</span> ${escapeHtml(elapsed)}</div>` : ''}
      <article class="evolution-entry" data-marker="${escapeHtml(item.marker)}">
        <time class="timeline-date" ${item.date ? `datetime="${escapeHtml(item.date)}"` : ''}>${escapeHtml(displayStageDate(item.date))}</time>
        <div class="evolution-marker" aria-label="${escapeHtml(item.marker)} milestone">${escapeHtml(productEvolutionGlyphs[item.marker])}</div>
        <div class="timeline-content evolution-content">
          <h4>${escapeHtml(item.title)}</h4>
          <p class="evolution-consequence">${escapeHtml(item.consequence)}</p>
          <details class="evolution-drilldown">
            <summary>Understand this product change</summary>
            <div class="evolution-detail-grid">
              <section>
                <h5>Product behavior at this point</h5>
                <p>${escapeHtml(item.behaviorBefore)}</p>
              </section>
              <section>
                <h5>What exercising it revealed</h5>
                <p>${escapeHtml(item.finding)}</p>
              </section>
              <section>
                <h5>What resulted</h5>
                <p>${escapeHtml(item.consequence)}</p>
              </section>
            </div>
          </details>
          <div class="timeline-scope-impact">
            <span>Scope impact</span>
            <strong>${escapeHtml(scopeImpact)}</strong>
          </div>
          ${githubEvidenceMarkup(item.evidence)}
        </div>
      </article>`;
  }).join('')}</div>`;
}

function howItWorksMarkup(model) {
  if (!model) return '';

  return `<section class="how-it-works-section">
    <h3>How the product works</h3>
    <div class="product-flow" role="list" aria-label="Product behavior flow">
      ${model.steps.map((step, index) => `
        <div class="product-flow-step" role="listitem">${escapeHtml(step.label)}</div>
        ${index < model.steps.length - 1 ? '<div class="product-flow-arrow" aria-hidden="true">↓</div>' : ''}
      `).join('')}
    </div>
    <p class="product-flow-explanation">${escapeHtml(model.explanation)}</p>
  </section>`;
}

function featureEvidenceMarkup(feature) {
  if (feature.productEvolution?.length) return productEvolutionMarkup(feature.productEvolution);
  if (feature.discoveryTrace?.length) return discoveryTraceMarkup(feature.discoveryTrace);

  const historyStatus = feature.evidence.length
    ? 'No dated discovery trace has been curated yet.'
    : 'No implementation evidence yet.';
  const discoveryStatus = feature.readinessStage === 'THESIS'
    ? 'Not started'
    : 'Current question';

  return `<div class="empty-discovery-state">
    <span>Current discovery</span>
    <strong>${escapeHtml(discoveryStatus)}</strong>
    <p>${escapeHtml(feature.discoveryQuestion)}</p>
    <p class="empty-evidence-note">${escapeHtml(historyStatus)}</p>
  </div>`;
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
      ${howItWorksMarkup(feature.howItWorks)}
      <section class="evidence-section"><h3>How ${escapeHtml(summary.label)} evolved</h3>${featureEvidenceMarkup(feature)}</section>
      <div class="detail-grid">
        <section class="detail-block"><h3>Roadmap horizon</h3><p>${escapeHtml(feature.horizon.toUpperCase())}</p></section>
        <section class="detail-block"><h3>User job</h3><p>${escapeHtml(feature.userJob)}</p></section>
        ${feature.committedScope ? `<section class="detail-block"><h3>Committed scope</h3><p>${escapeHtml(feature.committedScope)}</p></section>` : ''}
        ${feature.currentBehavior ? `<section class="detail-block"><h3>Current behavior</h3><p>${escapeHtml(feature.currentBehavior)}</p></section>` : ''}
        <section class="detail-block"><h3>Minimum viable behavior</h3><p>${escapeHtml(feature.minimumBehavior)}</p></section>
        <section class="detail-block"><h3>Current discovery question</h3><p>${escapeHtml(feature.currentQuestion ?? feature.discoveryQuestion)}</p></section>
        <section class="detail-block"><h3>Exit criterion</h3><p>${escapeHtml(feature.exitCriterion)}</p></section>
        ${feature.completion ? `<section class="detail-block completion-block"><h3>Completion · ${escapeHtml(feature.completion.status.replaceAll('-', ' '))}</h3><p>${escapeHtml(feature.completion.completed)}</p><p class="completion-remaining">Still required: ${escapeHtml(feature.completion.remaining)}</p></section>` : ''}
        <section class="detail-block scope-note"><h3>Scope impact</h3><p>${escapeHtml(feature.scopeImpact)}</p></section>
      </div>
      <section class="detail-block" style="margin-top:14px"><h3>Hard non-scope</h3><div class="chips">${feature.nonScope.map(item => `<span class="chip">${escapeHtml(item)}</span>`).join('')}</div></section>
    </div>
  </article>`;
}

function readinessRollupMarkup(rollup) {
  return `<div class="rollup-heading">${escapeHtml(rollup.label)}</div>
    <div class="readiness-rollup-list">${rollup.items.map(item => `
      <div class="rollup-row">
        <span>${escapeHtml(item.label)}</span>
        <strong class="rollup-readiness">${escapeHtml(item.readinessStage.replaceAll('_', ' '))}</strong>
      </div>`).join('')}
    </div>`;
}

function scopeHealthMarkup(summary) {
  return `<div class="rollup-heading">${escapeHtml(summary.label)}</div>
    <div class="scope-health-list">${summary.items.map(item => `
      <div class="rollup-row">
        <span>${escapeHtml(item.label)}</span>
        <strong class="scope-health-value">${escapeHtml(item.value)}</strong>
      </div>`).join('')}
    </div>
    <p class="rollup-note">Static product update; not inferred from Git activity.</p>`;
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
roadmapRollupElement.innerHTML = readinessRollupMarkup(roadmapRollup);
scopeHealthElement.innerHTML = scopeHealthMarkup(scopeHealth);
sourceButton.addEventListener('click', () => dialog.showModal());
render();
