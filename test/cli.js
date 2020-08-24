const test = require('tape');
const execa = require('execa');

test('say something', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', ['say']);
  t.match(stdout, /< say >/);
});

test('think something', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', ['--think', 'something']);
  t.match(stdout, /( something )/);
});

test('from stdin', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', { input: 'echo' });
  t.match(stdout, /< echo >/);
});
