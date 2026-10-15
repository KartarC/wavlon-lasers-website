/* Optional installation context stays in the existing CRM message, never analytics. */
(function () {
  'use strict';
  const country = document.getElementById('cq_country');
  const locationField = document.getElementById('cq_location');
  const labels = new Map([['ca', 'Canada'], ['us', 'United States'], ['other', 'Other country']]);
  const requested = new URLSearchParams(location.search).get('country');
  if (country && !country.value && (requested === 'ca' || requested === 'us')) country.value = requested;
  window.WavlonQuoteContext = {
    message: function (text) {
      const context = [];
      const label = country && labels.get(country.value);
      const city = locationField ? locationField.value.trim().replace(/[\r\n]+/g, ' ').slice(0, 120) : '';
      if (label) context.push('Installation country: ' + label);
      if (city) context.push('Installation city / province / state: ' + city);
      return context.length ? context.join('\n') + (text ? '\n\n' + text : '') : text;
    }
  };
}());
