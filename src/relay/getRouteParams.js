function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// eslint-disable-next-line no-underscore-dangle
function _compilePattern(pattern) {
  let regexpSource = '';
  const paramNames = [];
  const tokens = [];

  let match;
  let lastIndex = 0;
  const matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)|\\\(|\\\)/g;
  // eslint-disable-next-line no-cond-assign
  while ((match = matcher.exec(pattern))) {
    if (match.index !== lastIndex) {
      tokens.push(pattern.slice(lastIndex, match.index));
      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
    }

    if (match[1]) {
      regexpSource += '([^/]+)';
      paramNames.push(match[1]);
    } else if (match[0] === '**') {
      regexpSource += '(.*)';
      paramNames.push('splat');
    } else if (match[0] === '*') {
      regexpSource += '(.*?)';
      paramNames.push('splat');
    } else if (match[0] === '(') {
      regexpSource += '(?:';
    } else if (match[0] === ')') {
      regexpSource += ')?';
    } else if (match[0] === '\\(') {
      regexpSource += '\\(';
    } else if (match[0] === '\\)') {
      regexpSource += '\\)';
    }

    tokens.push(match[0]);

    lastIndex = matcher.lastIndex;
  }

  if (lastIndex !== pattern.length) {
    tokens.push(pattern.slice(lastIndex, pattern.length));
    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
  }

  return {
    pattern,
    regexpSource,
    paramNames,
    tokens,
  };
}

const CompiledPatternsCache = Object.create(null);

function compilePattern(pattern) {
  if (!CompiledPatternsCache[pattern]) {
    CompiledPatternsCache[pattern] = _compilePattern(pattern);
  }
  return CompiledPatternsCache[pattern];
}

function getParamNames(pattern) {
  return compilePattern(pattern).paramNames;
}

/**
 * Extracts an object of params the given route cares about from
 * the given params object.
 */
export default function getRouteParams(route, params) {
  const routeParams = {};

  if (!route.path) {
    return routeParams;
  }

  getParamNames(route.path).forEach((p) => {
    if (Object.prototype.hasOwnProperty.call(params, p)) {
      routeParams[p] = params[p];
    }
  });

  return routeParams;
}
