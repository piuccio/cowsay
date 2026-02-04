const test = require('tape');
const path = require('path');
const cows = require('../lib/cows');

test('get returns a function for the default cow', (t) => {
	t.plan(2);

	const render = cows.get('default');
	t.equal(typeof render, 'function');

	const result = render({ eyes: 'oo', tongue: '  ', thoughts: '\\' });
	t.ok(result.includes('\\'));
});

test('get caches render functions by reference', (t) => {
	t.plan(2);

	const render1 = cows.get('default');
	const render2 = cows.get('default');
	t.equal(render1, render2, 'same function reference returned');
	const face = { eyes: 'oo', tongue: '  ', thoughts: '\\' };
	t.equal(render1(face), render2(face));
});

test('listSync returns an array of cow names', (t) => {
	t.plan(3);

	const names = cows.listSync();
	t.ok(Array.isArray(names));
	t.ok(names.length > 0);
	t.ok(names.includes('default'));
});

test('list returns a promise of cow names', (t) => {
	t.plan(3);

	cows.list().then((names) => {
		t.ok(Array.isArray(names));
		t.ok(names.length > 0);
		t.ok(names.includes('default'));
	});
});

test('cow names do not include .cow extension', (t) => {
	t.plan(1);

	const names = cows.listSync();
	const hasExtension = names.some((name) => name.endsWith('.cow'));
	t.notOk(hasExtension);
});

test('cow names contain only valid names (no path artifacts)', (t) => {
	t.plan(1);

	const names = cows.listSync();
	const allValid = names.every((name) => name.length > 0 && !name.includes('/') && !name.includes('\\'));
	t.ok(allValid, 'all cow names are clean basenames');
});

test('get accepts an absolute file path', (t) => {
	t.plan(1);

	const cowPath = path.join(__dirname, '..', 'cows', 'tux.cow');
	const render = cows.get(cowPath);
	const result = render({ eyes: 'oo', tongue: '  ', thoughts: '\\' });
	t.ok(typeof result === 'string');
});

test('get returns different renders for different cows', (t) => {
	t.plan(1);

	const face = { eyes: 'oo', tongue: '  ', thoughts: '\\' };
	const defaultCow = cows.get('default')(face);
	const tuxCow = cows.get('tux')(face);
	t.notEqual(defaultCow, tuxCow);
});
