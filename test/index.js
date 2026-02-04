const test = require('tape');
const cowsay = require('../index');

test('say returns a string with the default cow', (t) => {
	t.plan(2);

	const result = cowsay.say({ text: 'Hello', _: [] });
	t.ok(typeof result === 'string');
	t.ok(result.includes('Hello'));
});

test('think returns a string with thought bubble', (t) => {
	t.plan(2);

	const result = cowsay.think({ text: 'Hello', _: [] });
	t.ok(typeof result === 'string');
	t.ok(result.includes('Hello'));
});

test('say uses text from _ array when text is not provided', (t) => {
	t.plan(1);

	const result = cowsay.say({ _: ['word1', 'word2'] });
	t.ok(result.includes('word1 word2'));
});

test('say with a named cow file', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Moo', f: 'tux', _: [] });
	t.ok(result.includes('Moo'));
});

test('say with a mode', (t) => {
	t.plan(2);

	const result = cowsay.say({ text: 'Greedy', g: true, _: [] });
	t.ok(result.includes('$$'), 'greedy mode eyes present');
	t.ok(!result.includes('undefined'), 'no undefined in output');
});

test('say with nowrap option', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'No wrap', n: true, W: 40, _: [] });
	t.ok(result.includes('No wrap'));
});

test('list returns a promise with cow names', (t) => {
	t.plan(2);

	cowsay.list().then((names) => {
		t.ok(Array.isArray(names));
		t.ok(names.includes('default'));
	});
});

test('list also works with callback', (t) => {
	t.plan(2);

	cowsay.list((err, names) => {
		t.equal(err, null);
		t.ok(names.includes('default'));
	});
});

test('say works without _ property (programmatic API)', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Hello' });
	t.ok(result.includes('Hello'));
});

test('say falls back to empty string when no text or _ provided', (t) => {
	t.plan(1);

	const result = cowsay.say({ _: [] });
	t.equal(typeof result, 'string');
});

test('think uses "o" for thought bubble', (t) => {
	t.plan(1);

	const result = cowsay.think({ text: 'Thinking', _: [] });
	t.ok(result.includes('o'));
});

test('say uses backslash for speech bubble', (t) => {
	t.plan(1);

	const result = cowsay.say({ text: 'Saying', _: [] });
	t.ok(result.includes('\\'));
});

test('listSync returns same names as list', (t) => {
	t.plan(1);

	const syncNames = cowsay.listSync();
	cowsay.list().then((asyncNames) => {
		t.deepEqual(syncNames, asyncNames);
	});
});

test('say with random cow selection', (t) => {
	t.plan(2);

	const result = cowsay.say({ text: 'Random', r: true, _: [] });
	t.equal(typeof result, 'string');
	t.ok(result.includes('Random'));
});

test('think with random cow selection', (t) => {
	t.plan(2);

	const result = cowsay.think({ text: 'Random', r: true, _: [] });
	t.equal(typeof result, 'string');
	t.ok(result.includes('Random'));
});

test('say respects wrap column', (t) => {
	t.plan(1);

	const longText = 'AAAA BBBB CCCC';
	const result = cowsay.say({ text: longText, W: 5, _: [] });
	// With W=5, "AAAA BBBB CCCC" should be wrapped into multiple lines
	// which means the balloon will have multi-line delimiters
	t.ok(result.includes('|'), 'wrapping produces multi-line balloon');
});

test('say with n option disables wrapping', (t) => {
	t.plan(1);

	const longText = 'AAAA BBBB CCCC';
	const result = cowsay.say({ text: longText, n: true, W: 5, _: [] });
	// With n: true, wrapping is disabled even with W=5
	// Single line balloon uses < > delimiters
	t.ok(result.includes('< AAAA BBBB CCCC >'), 'nowrap keeps text on single line');
});

test('all modes render thoughts correctly in say', (t) => {
	const modeFlags = ['b', 'd', 'g', 'p', 's', 't', 'w', 'y'];
	t.plan(modeFlags.length);

	modeFlags.forEach((flag) => {
		const opts = { text: 'Test', _: [] };
		opts[flag] = true;
		const result = cowsay.say(opts);
		t.ok(!result.includes('undefined'), 'mode ' + flag + ' has no undefined');
	});
});

test('all modes render thoughts correctly in think', (t) => {
	const modeFlags = ['b', 'd', 'g', 'p', 's', 't', 'w', 'y'];
	t.plan(modeFlags.length);

	modeFlags.forEach((flag) => {
		const opts = { text: 'Test', _: [] };
		opts[flag] = true;
		const result = cowsay.think(opts);
		t.ok(!result.includes('undefined'), 'mode ' + flag + ' has no undefined');
	});
});
