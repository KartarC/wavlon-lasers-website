(function () {
  'use strict';
  const subject = document.getElementById('cq_subject');
  if (!subject || subject.value) return;
  const options = new Map([
    ['procut', 'Quote Request — ProCut Series (3–12kW)'],
    ['powercut', 'Quote Request — PowerCut Series (3–12kW)'],
    ['ultracut', 'Quote Request — UltraCut Series (3–20kW+)'],
    ['double-chuck', 'Quote Request — TubeCut Double Chuck'],
    ['triple-chuck', 'Quote Request — TubeCut Triple Chuck'],
    ['tower', 'Quote Request — Tower Automation']
  ]);
  const params = new URLSearchParams(location.search);
  if (params.has('machine') || location.hash === '#quote') {
    subject.value = options.get(params.get('machine')) || 'Quote Request — Help me choose';
  }
}());
