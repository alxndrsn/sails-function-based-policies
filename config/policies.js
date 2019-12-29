module.exports.policies = {
  a: (req, res, next) =>     requireHeader(req, res, next, 'X-A'),
  b: (req, res, next) =>     requireHeader(req, res, next, 'X-B'),
  c: (req, res, next) =>  requireAnyHeader(req, res, next, 'X-A', 'X-B'),
  d: (req, res, next) => requireAllHeaders(req, res, next, 'X-A', 'X-B'),
};

const has = (req, header) => !!req.headers[header.toLowerCase()];
const requireHeader     = (req, res, next, h)          =>                    has(req, h)  && next() || res.forbidden();
const requireAnyHeader  = (req, res, next, ...headers) => headers.some (h => has(req, h)) && next() || res.forbidden();
const requireAllHeaders = (req, res, next, ...headers) => headers.every(h => has(req, h)) && next() || res.forbidden();
