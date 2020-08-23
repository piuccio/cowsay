const test = require('tape');
const replacer = require('../lib/replacer');

const cowFormat = `#Comment 
# just some other comment, it's going to be ignored anyway ...
$the_cow = <<EOC;\n
 $thoughts
   $thoughts
chars($eyes)
$tongue
EOC

`;

// They are the same...
const plainText = `
 $thoughts
   $thoughts
chars($eyes)
$tongue`;

const expected = `
 ||
   ||
chars(oo)
U `;

test('original cow file format', (t) => {
  t.plan(1);

  const cow = replacer(cowFormat, {
    thoughts: '||',
    eyes: 'oo',
    tongue: 'U ',
  });
  t.equal(cow, expected);
});

test('plain text file', (t) => {
  t.plan(1);

  const cow = replacer(plainText, {
    thoughts: '||',
    eyes: 'oo',
    tongue: 'U ',
  });
  t.equal(cow, expected);
});
