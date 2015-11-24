'use strict';

const _ = require('lodash');

function sortWithLocaleCompare(a, b) {
  return a.localeCompare(b);
}

module.exports = {
  sortBy: function sortBy(haystack, needle) {
    const needleLower = needle.toLocaleLowerCase();
    const needleCharacters = needle.toLocaleLowerCase().split('');
    const lazyHaystack = _([...haystack]);
    let sortedPart = [];
    let rest;

    const exactMatch = lazyHaystack.filter(function getExactMatch(item) {
      return item.toLocaleLowerCase().localeCompare(needleLower) === 0;
    }).value();
    sortedPart = sortedPart.concat(exactMatch);
    rest = lazyHaystack.without(...exactMatch);

    const startsWithMatch = rest.filter(function getStartsWithMatch(item) {
      return item.toLocaleLowerCase().startsWith(needleLower);
    }).sort(sortWithLocaleCompare).value();
    sortedPart = sortedPart.concat(startsWithMatch);
    rest = rest.without(...sortedPart);

    const partialMatch = rest.filter(function getPartialMatch(item) {
      return item.toLocaleLowerCase().includes(needleLower);
    }).sort(sortWithLocaleCompare).value();
    sortedPart = sortedPart.concat(partialMatch);
    rest = rest.without(...sortedPart);

    const charactersInSequenceMatch = rest.filter(function getCharactersInSequenceMatch(item) {
      let i = 0;
      const needleCharactersClone = _.clone(needleCharacters);

      const itemCharacters = item.toLocaleLowerCase().split('');

      return itemCharacters.some(function (itemCharacter) {
        if (_.first(needleCharactersClone) === itemCharacter) {
          needleCharactersClone.shift();
        }
        return needleCharactersClone.length === 0;
      });
    }).sort(sortWithLocaleCompare).value();
    sortedPart = sortedPart.concat(charactersInSequenceMatch);
    rest = rest.without(...sortedPart);

    rest = rest.sort(sortWithLocaleCompare);

    return sortedPart.concat(rest.value());
  },
};
