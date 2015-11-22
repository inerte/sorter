'use strict';

const _ = require('lodash');

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
    }).value();
    sortedPart = sortedPart.concat(startsWithMatch);

    rest = rest.sort(function sortRest(a, b) {
      return a.localeCompare(b);
    });

    return sortedPart.concat(rest.value());
  },
};
