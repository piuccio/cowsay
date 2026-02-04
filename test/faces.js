const test = require('tape');
const getFace = require('../lib/faces');

test('no mode uses provided eyes and tongue', (t) => {
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

test('defaults to oo eyes and blank tongue when not provided', (t) => {
	t.plan(2);

	const face = getFace({});
	t.equal(face.eyes, 'oo');
	t.equal(face.tongue, '  ');
});

test('borg mode', (t) => {
	t.plan(2);

	const face = getFace({ b: true });
	t.equal(face.eyes, '==');
	t.equal(face.tongue, '  ');
});

test('dead mode', (t) => {
	t.plan(2);

	const face = getFace({ d: true });
	t.equal(face.eyes, 'xx');
	t.equal(face.tongue, 'U ');
});

test('stoned mode', (t) => {
	t.plan(2);

	const face = getFace({ s: true });
	t.equal(face.eyes, '**');
	t.equal(face.tongue, 'U ');
});

test('tired mode', (t) => {
	t.plan(2);

	const face = getFace({ t: true });
	t.equal(face.eyes, '--');
	t.equal(face.tongue, '  ');
});

test('wired mode', (t) => {
	t.plan(2);

	const face = getFace({ w: true });
	t.equal(face.eyes, 'OO');
	t.equal(face.tongue, '  ');
});

test('youthful mode', (t) => {
	t.plan(2);

	const face = getFace({ y: true });
	t.equal(face.eyes, '..');
	t.equal(face.tongue, '  ');
});

test('paranoia mode', (t) => {
	t.plan(2);

	const face = getFace({ p: true });
	t.equal(face.eyes, '@@');
	t.equal(face.tongue, '  ');
});

test('mode faces are mutable (callers can add thoughts)', (t) => {
	t.plan(1);

	const face = getFace({ b: true });
	face.thoughts = '\\';
	t.equal(face.thoughts, '\\');
});
