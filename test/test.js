/* eslint func-names: 0 */
'use strict';

const _ = require('lodash');
const assert = require('assert');
const sortedSearch = require('../index.js');

let states = [
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
  beforeEach(function shuffleStates() {
    states = _.shuffle(states);
  });

  it('should put exact match at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'california');

    assert.strictEqual(_.first(sorted), 'California');

    assert.strictEqual(isAlphabeticallySorted(_.rest(sorted)), true);
  });

  it('should put starts with match at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'californi');

    assert.strictEqual(_.first(sorted), 'California');

    assert.strictEqual(isAlphabeticallySorted(_.rest(sorted)), true);
  });

  it('should put starts with matches (sorted alphabetically) at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'new');

    assert.deepEqual(_.take(sorted, 4), [
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
    ]);

    assert.strictEqual(isAlphabeticallySorted(_.drop(sorted, 4)), true);
  });

  it('should put partial matches (sorted alphabetically) at the top, all others in alphabetical order', function() {
    const sorted = sortedSearch.sortBy(states, 'outh');
    let i = 0;

    assert.strictEqual(sorted[i++], 'South Carolina');
    assert.strictEqual(sorted[i++], 'South Dakota');

    assert.strictEqual(isAlphabeticallySorted(_.drop(sorted, i)), true);
  });

  it('should partition by exact match, starts with, partial match, and others, all alphabetically sorted', function() {
    states.push('ne');
    const sorted = sortedSearch.sortBy(states, 'ne');
    let i = 0;

    assert.strictEqual(sorted[i++], 'ne');
    assert.strictEqual(sorted[i++], 'Nebraska');
    assert.strictEqual(sorted[i++], 'Nevada');
    assert.strictEqual(sorted[i++], 'New Hampshire');
    assert.strictEqual(sorted[i++], 'New Jersey');
    assert.strictEqual(sorted[i++], 'New Mexico');
    assert.strictEqual(sorted[i++], 'New York');
    assert.strictEqual(sorted[i++], 'Connecticut');
    assert.strictEqual(sorted[i++], 'Federated States Of Micronesia');
    assert.strictEqual(sorted[i++], 'Maine');
    assert.strictEqual(sorted[i++], 'Minnesota');
    assert.strictEqual(sorted[i++], 'Tennessee');

    assert.strictEqual(isAlphabeticallySorted(_.drop(sorted, i)), true);
  });
});
