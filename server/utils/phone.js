function normalizePhone(raw) {
  if (!raw) return raw;
  let p = String(raw).trim().replace(/[\s()-]/g, '');
  if (/^0\d{9}$/.test(p)) {
    p = '+38' + p;
  } else if (/^380\d{9}$/.test(p)) {
    p = '+' + p;
  }
  return p;
}

module.exports = { normalizePhone };