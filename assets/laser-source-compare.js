(async function () {
  const root = document.querySelector('[data-laser-source-compare]');
  if (!root) return;

  const picker = root.querySelector('[data-picker-options]');
  const search = root.querySelector('[data-picker-search]');
  const status = root.querySelector('[data-picker-status]');
  const tableHost = root.querySelector('[data-compare-table]');
  const differences = root.querySelector('[data-differences-only]');
  const clear = root.querySelector('[data-clear-compare]');
  const maxModels = 4;
  let catalog;

  try {
    const response = await fetch('/assets/data/laser-sources.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
    catalog = await response.json();
  } catch (error) {
    tableHost.innerHTML = '<div class="source-empty">The comparison catalog could not be loaded. Please refresh or contact Wavlon for a configured recommendation.</div>';
    return;
  }

  const byId = new Map(catalog.models.map((model) => [model.id, model]));
  const requested = new URLSearchParams(window.location.search).get('models');
  const defaults = ['max-elite-mfsc-6000-cabinet', 'ipg-yls-u-eco-6000'];
  let selected = (requested ? requested.split(',') : defaults).filter((id) => byId.has(id)).slice(0, maxModels);

  const fields = [
    ['Brand', (m) => m.brand],
    ['Series', (m) => m.series],
    ['Nominal power', (m) => m.nominalPowerLabel],
    ['Product type', (m) => m.productType],
    ['Module / housing', (m) => [m.moduleType, m.housingForm].filter(Boolean).join(' · ')],
    ['Cooling', (m) => m.cooling],
    ['Efficiency', (m) => m.efficiency],
    ['Power stability', (m) => m.powerStability],
    ['Power redundancy', (m) => m.powerRedundancy],
    ['Wavelength', (m) => m.wavelength],
    ['Power tunability', (m) => m.powerTunability],
    ['Modulation', (m) => m.modulationFrequency],
    ['Beam quality', (m) => m.beamQuality],
    ['Fiber / connector', (m) => m.fiberConnectors],
    ['Controls / interface', (m) => m.interface],
    ['Certifications / safety', (m) => m.certifications],
    ['Warranty', (m) => m.warranty],
    ['Applications', (m) => (m.applications || []).join(', ')],
    ['Wavlon range screening', (m) => m.compatibilityNote],
  ];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    if (selected.length) url.searchParams.set('models', selected.join(','));
    else url.searchParams.delete('models');
    window.history.replaceState({}, '', url);
  }

  function renderPicker() {
    const query = search.value.trim().toLowerCase();
    const groups = catalog.brands.map((brand) => ({
      brand,
      models: catalog.models.filter((model) => model.brandId === brand.id && `${model.displayName} ${model.series} ${model.nominalPowerLabel}`.toLowerCase().includes(query)),
    })).filter((group) => group.models.length);

    picker.innerHTML = groups.map(({ brand, models }) => `
      <div class="source-picker-group">${escapeHtml(brand.name)}</div>
      ${models.map((model) => `
        <label class="source-picker-option">
          <input type="checkbox" value="${escapeHtml(model.id)}" ${selected.includes(model.id) ? 'checked' : ''} ${!selected.includes(model.id) && selected.length >= maxModels ? 'disabled' : ''}>
          <strong>${escapeHtml(model.displayName)}</strong>
          <span>${escapeHtml(model.series)}</span>
        </label>`).join('')}
    `).join('') || '<p>No models match this search.</p>';

    picker.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked && !selected.includes(input.value)) selected.push(input.value);
        if (!input.checked) selected = selected.filter((id) => id !== input.value);
        selected = selected.slice(0, maxModels);
        syncUrl();
        render();
      });
    });
  }

  function renderTable() {
    const models = selected.map((id) => byId.get(id)).filter(Boolean);
    status.textContent = `${models.length} of ${maxModels} selected`;
    if (!models.length) {
      tableHost.innerHTML = '<div class="source-empty"><strong>Select up to four sources.</strong><br>Choose models from the list to build a side-by-side comparison.</div>';
      return;
    }

    const body = fields.map(([label, getter]) => {
      const values = models.map((model) => getter(model) || 'Not published');
      const same = new Set(values.map((value) => String(value).trim().toLowerCase())).size === 1;
      return `<tr data-same="${same}" class="${same && differences.checked ? 'is-hidden' : ''}"><th scope="row">${escapeHtml(label)}</th>${values.map((value) => `<td>${escapeHtml(value)}</td>`).join('')}</tr>`;
    }).join('');

    tableHost.innerHTML = `<div class="source-table-wrap"><table class="source-compare-table"><thead><tr><th scope="col">Specification</th>${models.map((model) => `<th scope="col">${escapeHtml(model.displayName)}<br><span style="font-size:10px;color:#9eb7d0;font-weight:500">${escapeHtml(model.brand)}</span></th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  function render() {
    renderPicker();
    renderTable();
  }

  search.addEventListener('input', renderPicker);
  differences.addEventListener('change', renderTable);
  clear.addEventListener('click', () => {
    selected = [];
    syncUrl();
    render();
  });
  render();
})();
