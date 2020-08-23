const test = require('tape');
const getFace = require('../lib/faces');

test('no mode', (t) => {
  t.plan(2);

  const face = getFace({
    e: 'oo',
    T: '  ',
  });
  t.equal(face.eyes, 'oo');
  t.equal(face.tongue, '  ');
});

test('mode overrides provided values', (t) => {
  t.plan(2);

  const face = getFace({
    g: true,
    e: 'oo',
    T: 'O ',
  });
  t.equal(face.eyes, '$$');
  t.equal(face.tongue, '  ');
});
