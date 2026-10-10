/* Public configuration only. Never place credentials or secrets in a static site. */
window.NOX_CONFIG = Object.freeze({
  whatsapp: Object.freeze({
    enabled: false,
    // Set only after the owner explicitly authorizes this destination.
    // International digits, e.g. country code + area code + owned number; no '+'.
    number: ''
  })
});
