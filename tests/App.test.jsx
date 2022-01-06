const fetchItemData = require('../frontend/src/components/App.jsx');
const App = require('../frontend/src/components/App.jsx');

describe("fetchItemData tests", () => {

  test('Fetch function should exist', () => {
  expect(fetchItemData).not.toBe(null);
});

  test('fetch function should return an object', () => {
    expect(fetchItemData).toContain();
  })
});