const App = require('../frontend/src/components/App.jsx');

test('Should correctly fetch item data', () => {
  expect(fetchItemData(44388)).toHaveBeenCalled();
});