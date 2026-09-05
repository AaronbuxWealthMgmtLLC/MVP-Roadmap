import {
  features,
  horizons,
  readinessStages,
  roadmapRollup,
  scopeHealth,
  sourceDocs,
  sourceRepositories,
  timelineCalendar
} from '../data/product-context.js';

const tabs = document.querySelector('#horizonTabs');
const description = document.querySelector('#horizonDescription');
const list = document.querySelector('#featureList');
const dialog = document.querySelector('#sourcesDialog');
const sourceList = document.querySelector('#sourceList');
const sourceButton = document.querySelector('#sourcesButton');
const roadmapRollupElement = document.querySelector('#roadmapRollup');
const scopeHealthElement = document.querySelector('#scopeHealth');
const horizonTimelineElement = document.querySelector('#horizonTimeline');
const milestoneDialog = document.querySelector('#milestoneDialog');
const milestoneTitle = document.querySelector('#milestoneTitle');
const milestoneBody = document.querySelector('#milestoneBody');
let activeHorizon = 'now';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[c]));
}

function stageName(stage) {
  return readinessStages[Math.max(0, Math.min(stage, readinessStages.length - 1))];
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
  const currentMilestone = feature.productEvolution?.at(-1);
  return {
    label: overrides.label ?? feature.title,
    currentFocus: currentMilestone?.title ?? feature.currentQuestion ?? (feature.readinessStage === 'THESIS' && !feature.discoveryTrace.length
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

function implementationEvidenceMarkup(items = []) {
  const rows = items.map(item => {
    const repository = sourceRepositories[item.repositoryId];
    const url = commitUrl(item);
    const shortSha = item.commitSha.slice(0, 7);
    const shaMarkup = url
      ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="View commit ${escapeHtml(shortSha)} in ${escapeHtml(repository.label)}">${escapeHtml(shortSha)}</a>`
      : `<span>${escapeHtml(shortSha)}</span>`;

    return `<article class="implementation-evidence-row">
      <div class="implementation-evidence-meta">
        <strong class="implementation-repository">${escapeHtml(repository?.repo ?? item.repositoryId)}</strong>
        <time datetime="${escapeHtml(item.commitDate)}">${escapeHtml(formatMonthDay(item.commitDate))}</time>
        <div class="implementation-evidence-sha">${shaMarkup}</div>
      </div>
      <div class="implementation-evidence-message">${escapeHtml(item.commitMessage)}</div>
      ${item.implementationArea ? `<div class="implementation-evidence-detail"><span>Relevant implementation area</span><p>${escapeHtml(item.implementationArea)}</p></div>` : ''}
      ${item.verification ? `<div class="implementation-evidence-detail"><span>Tests / audits</span><p>${escapeHtml(item.verification)}</p></div>` : ''}
    </article>`;
  }).join('');

  const body = items.length
    ? rows
    : '<p class="implementation-evidence-empty">No implementation evidence recorded.</p>';

  return `<details class="implementation-evidence">
    <summary><span>Implementation evidence</span><span class="evidence-chevron" aria-hidden="true">⌄</span></summary>
    <div class="implementation-evidence-panel">
      <div class="implementation-evidence-heading">Implementation evidence</div>
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
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.plainEnglish)}</p>
          <p class="timeline-significance">Why it matters: ${escapeHtml(item.significance)}</p>
          <div class="timeline-scope-impact">
            <span>Scope impact</span>
            <strong>${escapeHtml(item.scopeImpact === 'none' ? 'NO CHANGE TO MVP SCOPE' : item.scopeImpact.toUpperCase())}</strong>
          </div>
          ${implementationEvidenceMarkup(item.githubEvidence)}
        </div>
      </article>`;
  }).join('')}</div>`;
}

const productEvolutionGlyphs = {
  commitment: '○',
  behavior: '×',
  finding: '◆',
  completion: '│'
};

const today = new Date();
const todayDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0')
].join('-');

function productTimelineEvents(feature) {
  return (feature.productEvolution ?? []).map((event, eventIndex) => ({
    ...event,
    eventIndex,
    featureId: feature.id,
    featureTitle: feature.title
  }));
}

function sharedTimelineAxis() {
  const futureCommitments = features
    .flatMap(productTimelineEvents)
    .filter(event => event.date && event.date > todayDate && event.marker === 'commitment')
    .map(event => event.date);

  return {
    startDate: timelineCalendar.startDate,
    endDate: [todayDate, ...futureCommitments].sort().at(-1),
    todayDate
  };
}

function timelinePosition(date, axis) {
  const start = calendarDayValue(axis.startDate);
  const end = calendarDayValue(axis.endDate);
  return ((calendarDayValue(date) - start) / (end - start)) * 100;
}

function plottableTimelineEvents(events, axis) {
  return events
    .filter(event => event.date)
    .filter(event => event.date >= axis.startDate)
    .filter(event => event.date <= axis.todayDate || event.marker === 'commitment')
    .filter(event => event.date <= axis.endDate)
    .sort((a, b) => a.date.localeCompare(b.date) || a.eventIndex - b.eventIndex);
}

function calendarTimelineMarkup(events, { variant = 'feature', includeFeatureName = false } = {}) {
  const axis = sharedTimelineAxis();
  const plottable = plottableTimelineEvents(events, axis);
  if (!plottable.length) return '';

  const lanesByDate = new Map();
  const positioned = plottable.map(event => {
    const lane = lanesByDate.get(event.date) ?? 0;
    lanesByDate.set(event.date, lane + 1);
    return { ...event, lane, position: timelinePosition(event.date, axis) };
  });
  const laneCount = Math.max(...positioned.map(event => event.lane)) + 1;
  const todayPosition = timelinePosition(axis.todayDate, axis);

  return `<div class="calendar-timeline calendar-timeline-${escapeHtml(variant)}" style="--timeline-lanes:${laneCount}">
    <div class="calendar-axis-labels">
      <time datetime="${escapeHtml(axis.startDate)}">${escapeHtml(displayStageDate(axis.startDate))}</time>
      <time datetime="${escapeHtml(axis.endDate)}">${escapeHtml(displayStageDate(axis.endDate))}</time>
    </div>
    <div class="calendar-track">
      <div class="calendar-axis-line" aria-hidden="true"></div>
      <div class="calendar-today" style="left:${todayPosition.toFixed(4)}%"><span>TODAY</span></div>
      ${positioned.map(event => {
        const alignment = event.position > 72 ? 'align-right' : event.position < 20 ? 'align-left' : 'align-center';
        const title = includeFeatureName ? `${event.featureTitle}: ${event.title}` : event.title;
        return `<div class="calendar-event ${alignment}" style="left:${event.position.toFixed(4)}%;--event-lane:${event.lane}">
          <button class="calendar-marker-button" type="button" data-feature-id="${escapeHtml(event.featureId)}" data-event-index="${event.eventIndex}" aria-label="Open ${escapeHtml(event.title)} milestone">${escapeHtml(productEvolutionGlyphs[event.marker])}</button>
          <div class="calendar-event-label"><time datetime="${escapeHtml(event.date)}">${escapeHtml(formatMonthDay(event.date))}</time><span>${escapeHtml(title)}</span></div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

const scopeImpactPresentation = {
  none: {
    label: 'NO SCOPE CHANGE',
    fallback: 'The committed feature scope did not change.'
  },
  clarification: {
    label: 'SCOPE CLARIFICATION',
    fallback: 'The minimum behavior was clarified within the committed user job.'
  },
  'new-capability-deferred': {
    label: 'NEW CAPABILITY — DEFERRED',
    fallback: 'The additional capability remains outside the committed MVP.'
  }
};

function scopeImpactMarkup(event, { compact = false } = {}) {
  const presentation = scopeImpactPresentation[event.scopeImpact];
  if (!presentation) return '';
  const explanation = event.scopeExplanation ?? presentation.fallback;

  return `<div class="scope-impact-callout${compact ? ' scope-impact-compact' : ''}" data-scope-impact="${escapeHtml(event.scopeImpact)}">
    <strong>${escapeHtml(presentation.label)}</strong>
    ${compact ? '' : `<p>${escapeHtml(explanation)}</p>`}
  </div>`;
}

function productTraceMarkup(items) {
  return `<div class="product-trace">${items.map(item => `
    <article class="product-trace-row" data-marker="${escapeHtml(item.marker)}">
      <time ${item.date ? `datetime="${escapeHtml(item.date)}"` : ''}>${escapeHtml(displayStageDate(item.date))}</time>
      <span class="product-trace-marker" aria-hidden="true">${escapeHtml(productEvolutionGlyphs[item.marker])}</span>
      <div class="product-trace-event">
        <button type="button" class="trace-milestone-button" data-feature-id="${escapeHtml(item.featureId)}" data-event-index="${item.eventIndex}">${escapeHtml(item.title)}</button>
        ${item.scopeExplanation ? scopeImpactMarkup(item, { compact: true }) : ''}
      </div>
    </article>`).join('')}</div>`;
}

function productEvolutionViewsMarkup(feature) {
  const events = productTimelineEvents(feature);
  const viewId = `evolution-${feature.id}`;
  return `<div class="evolution-views" data-feature-id="${escapeHtml(feature.id)}">
    <div class="evolution-view-switch" role="tablist" aria-label="Product evolution view">
      <button type="button" class="evolution-view-tab" role="tab" aria-selected="true" aria-controls="${escapeHtml(viewId)}-timeline" data-view="timeline">Timeline</button>
      <button type="button" class="evolution-view-tab" role="tab" aria-selected="false" aria-controls="${escapeHtml(viewId)}-trace" data-view="trace">Trace</button>
    </div>
    <div class="evolution-view-panel" id="${escapeHtml(viewId)}-timeline" role="tabpanel" data-view-panel="timeline">
      ${calendarTimelineMarkup(events, { variant: 'expanded' })}
    </div>
    <div class="evolution-view-panel" id="${escapeHtml(viewId)}-trace" role="tabpanel" data-view-panel="trace" hidden>
      ${productTraceMarkup(events)}
    </div>
  </div>`;
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
  if (feature.productEvolution?.length) return productEvolutionViewsMarkup(feature);
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

function currentStateMarkup(feature) {
  const currentQuestion = feature.currentQuestion ?? feature.discoveryQuestion;
  if (!feature.currentBehavior && !currentQuestion && !feature.exitCriterion) return '';
  const completionStatus = feature.completion?.status?.replaceAll('-', ' ') ?? 'not yet frozen';

  return `<section class="current-state-panel" aria-label="Current feature state">
    ${feature.currentBehavior ? `<div><h3>Current behavior</h3><p>${escapeHtml(feature.currentBehavior)}</p></div>` : ''}
    ${currentQuestion ? `<div><h3>Current product question</h3><p>${escapeHtml(currentQuestion)}</p></div>` : ''}
    ${feature.exitCriterion ? `<div><h3>Exit criterion</h3><p>${escapeHtml(feature.exitCriterion)}</p></div>` : ''}
    ${feature.completion ? `<div class="completion-state"><h3>Completion</h3><strong>${escapeHtml(completionStatus.toUpperCase())}</strong>${feature.completion.date ? `<time datetime="${escapeHtml(feature.completion.date)}">${escapeHtml(formatMonthDay(feature.completion.date))}</time>` : ''}</div>` : ''}
  </section>`;
}

function featureMarkup(feature) {
  const summary = summaryContent(feature);
  const featureTimeline = calendarTimelineMarkup(productTimelineEvents(feature));
  const detailId = `feature-${feature.id}-detail`;
  return `<article class="feature-card" data-feature-id="${escapeHtml(feature.id)}">
    <div class="feature-summary">
      <div class="feature-card-heading">
        <div class="feature-title">${escapeHtml(summary.label).toUpperCase()}</div>
        <strong class="readiness-state">${escapeHtml(readinessLabel(feature))}</strong>
      </div>
      <p class="feature-job">${escapeHtml(feature.userJob)}</p>
      ${featureTimeline}
      <div class="feature-summary-footer">
        <div class="feature-current"><span>Current:</span><strong>${escapeHtml(summary.currentFocus)}</strong></div>
        <button class="feature-toggle" type="button" aria-expanded="false" aria-controls="${escapeHtml(detailId)}">View feature <span class="expand-arrow" aria-hidden="true">↓</span></button>
      </div>
    </div>
    <div class="feature-detail" id="${escapeHtml(detailId)}">
      ${currentStateMarkup(feature)}
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

function horizonTimelineMarkup(horizonId) {
  if (horizonId !== 'now') return '';

  const events = features
    .filter(feature => feature.horizon === horizonId)
    .flatMap(productTimelineEvents)
    .filter(event => event.showInHorizonTimeline);

  return `<div class="horizon-timeline-heading">Major product milestones</div>
    ${calendarTimelineMarkup(events, { variant: 'horizon', includeFeatureName: true })}`;
}

function openMilestone(featureId, eventIndex) {
  const feature = features.find(item => item.id === featureId);
  const event = feature?.productEvolution?.[eventIndex];
  if (!event) return;

  milestoneTitle.textContent = event.title;
  milestoneBody.innerHTML = `
    <div class="milestone-dialog-date">${escapeHtml(displayStageDate(event.date))}</div>
    <section><h3>Product behavior at the time</h3><p>${escapeHtml(event.behaviorBefore)}</p></section>
    <section><h3>What exercising it revealed</h3><p>${escapeHtml(event.finding)}</p></section>
    <section><h3>Why it matters</h3><p>${escapeHtml(event.consequence)}</p></section>
    ${scopeImpactMarkup(event)}
    ${implementationEvidenceMarkup(event.evidence)}`;
  milestoneDialog.showModal();
}

function bindTimelineMarkers(root) {
  root.querySelectorAll('.calendar-marker-button, .trace-milestone-button').forEach(button => button.addEventListener('click', () => {
    openMilestone(button.dataset.featureId, Number(button.dataset.eventIndex));
  }));
}

function bindEvolutionViewSwitches(root) {
  root.querySelectorAll('.evolution-view-tab').forEach(button => button.addEventListener('click', () => {
    const views = button.closest('.evolution-views');
    views.querySelectorAll('.evolution-view-tab').forEach(tab => {
      tab.setAttribute('aria-selected', String(tab === button));
    });
    views.querySelectorAll('.evolution-view-panel').forEach(panel => {
      panel.hidden = panel.dataset.viewPanel !== button.dataset.view;
    });
  }));
}

function render() {
  const horizon = horizons.find(item => item.id === activeHorizon);
  description.textContent = `${horizon.subtitle} — ${horizon.description}`;
  tabs.innerHTML = horizons.map(item => `<button type="button" class="tab" role="tab" data-horizon="${item.id}" aria-selected="${item.id === activeHorizon}">${item.label}</button>`).join('');
  horizonTimelineElement.innerHTML = horizonTimelineMarkup(activeHorizon);
  horizonTimelineElement.hidden = activeHorizon !== 'now';
  list.innerHTML = features.filter(feature => feature.horizon === activeHorizon).map(featureMarkup).join('');
  tabs.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => { activeHorizon = button.dataset.horizon; render(); }));
  list.querySelectorAll('.feature-toggle').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.feature-card');
    const open = card.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  }));
  bindTimelineMarkers(horizonTimelineElement);
  bindTimelineMarkers(list);
  bindEvolutionViewSwitches(list);
}

sourceList.innerHTML = sourceDocs.map(doc => `<article class="source-item"><a href="${encodeURI(doc.path)}" target="_blank" rel="noopener">${escapeHtml(doc.label)}</a><p>${escapeHtml(doc.note)}</p></article>`).join('');
roadmapRollupElement.innerHTML = readinessRollupMarkup(roadmapRollup);
scopeHealthElement.innerHTML = scopeHealthMarkup(scopeHealth);
sourceButton.addEventListener('click', () => dialog.showModal());
render();
