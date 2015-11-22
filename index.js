'use strict';

const _ = require('lodash');

function sortWithLocaleCompare(a, b) {
  return a.localeCompare(b);
}

module.exports = {
  sortBy: function sortBy(haystack, needle) {
    const needleLower = needle.toLowerCase();
    const lazyHaystack = _([...haystack]);
    let sortedPart = [];
    let rest;

    const exactMatch = lazyHaystack.filter(function getExactMatch(item) {
      return item.toLowerCase().localeCompare(needleLower) === 0;
    }).value();
    sortedPart = sortedPart.concat(exactMatch);
    rest = lazyHaystack.remove(sortedPart);

    const startsWithMatch = rest.filter(function getPartialMatch(item) {
      return item.toLowerCase().startsWith(needleLower);
    }).sort(sortWithLocaleCompare).value();
    sortedPart = sortedPart.concat(startsWithMatch);
    rest = lazyHaystack.remove(sortedPart);

    rest = rest.sort(sortWithLocaleCompare);

    return sortedPart.concat(rest.value());
  },
};
