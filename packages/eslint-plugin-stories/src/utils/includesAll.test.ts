import includesAll from './includesAll';

test('empty list and requireds', () => {
  expect(includesAll([], [])).toEqual(true);
});

test('no requireds', () => {
  expect(includesAll([1, 2, 3], [])).toEqual(true);
});

test('an empty list', () => {
  expect(includesAll([], [4, 5])).toEqual(false);
});

test('all items are present', () => {
  expect(includesAll([1, 2, 3], [1, 3])).toEqual(true);
});

test('not all items are present', () => {
  expect(includesAll([1, 2, 3], [1, 3, 5])).toEqual(false);
});
