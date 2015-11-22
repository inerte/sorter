/* eslint func-names: 0 */
'use strict';

const _ = require('lodash');
const assert = require('assert');
const sortedSearch = require('../index.js');

var states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyomin',
];

function isAlphabeticallySorted(elements) {
  const elementsCopy = elements.slice(0);

  elementsCopy.sort();

  return _.isMatch(elementsCopy, elements);
}

describe('isAlphabeticallySorted helper test checker', function() {
  it('should check if array is not alphabetically sorted', function() {
    const unsorted = ['Julio', 'Gustavo', 'Felipe'];

    assert.strictEqual(isAlphabeticallySorted(unsorted), false);
  });

  it('should check if array is alphabetically sorted', function() {
    const sorted = ['Felipe', 'Gustavo', 'Julio'];

    assert.strictEqual(isAlphabeticallySorted(sorted), true);
  });
});

describe('sortedSearch', function() {
  beforeEach(function () {
    states = _.shuffle(states);
  });

  it('should put exact match at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'california');

    assert.strictEqual(_.first(sorted), 'California');

    assert.strictEqual(isAlphabeticallySorted(_.rest(sorted)), true);
  });

  it('should put partial match at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'californi');

    assert.strictEqual(_.first(sorted), 'California');

    assert.strictEqual(isAlphabeticallySorted(_.rest(sorted)), true);
  });
});
