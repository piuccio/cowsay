const test = require('tape');
const balloon = require('../lib/balloon');

test('single line - nowrap', (t) => {
	t.plan(2);

	t.equal(balloon.say('Hi!'), ' _____\n< Hi! >\n -----');
	t.equal(balloon.think('Hi!'), ' _____\n( Hi! )\n -----');
});

test('single line - wrap', (t) => {
	t.plan(2);

	t.equal(balloon.say('Yes', 10), ' _____\n< Yes >\n -----');
	t.equal(balloon.think('Yes', 10), ' _____\n( Yes )\n -----');
});

test('two lines - nowrap', (t) => {
	t.plan(2);
	t.equal(balloon.say('AB\nCDE'), [
		' _____',
		'/ AB  \\',
		'\\ CDE /',
		' -----',
	].join('\n'));
	t.equal(balloon.think('AB\nCDE'), [
		' _____',
		'( AB  )',
		'( CDE )',
		' -----',
	].join('\n'));
});

test('multiple lines - nowrap', (t) => {
	t.plan(2);

	t.equal(balloon.say('AB\nCDE\nQWE RTY'), [
		' _________',
		'/ AB      \\',
		'| CDE     |',
		'\\ QWE RTY /',
		' ---------',
	].join('\n'));
	t.equal(balloon.think('AB\nCDE\nQWE RTY'), [
		' _________',
		'( AB      )',
		'( CDE     )',
		'( QWE RTY )',
		' ---------',
	].join('\n'));
});

test('multiple lines - wrap to max length', (t) => {
	t.plan(2);

	t.equal(balloon.say('ONE\nTWO THREE', 4), [
		' ______',
		'/ ONE  \\',
		'| TWO  |',
		'| THRE |',
		'\\ E    /',
		' ------',
	].join('\n'));
	t.equal(balloon.think('ONE\nTWO THREE', 4), [
		' ______',
		'( ONE  )',
		'( TWO  )',
		'( THRE )',
		'( E    )',
		' ------',
	].join('\n'));
});

test('tab expansion', (t) => {
	t.plan(1);

	const result = balloon.say('A\tB');
	t.ok(result.includes('A        B'));
});

test('empty string', (t) => {
	t.plan(1);

	const result = balloon.say('');
	t.equal(typeof result, 'string');
});

test('Windows line endings (CRLF) are normalized', (t) => {
	t.plan(1);

	const result = balloon.say('AB\r\nCDE');
	t.equal(result, [
		' _____',
		'/ AB  \\',
		'\\ CDE /',
		' -----',
	].join('\n'));
});

test('old Mac line endings (CR) are normalized', (t) => {
	t.plan(1);

	const result = balloon.say('AB\rCDE');
	t.equal(result, [
		' _____',
		'/ AB  \\',
		'\\ CDE /',
		' -----',
	].join('\n'));
});

test('BOM is stripped from input', (t) => {
	t.plan(1);

	const result = balloon.say('\uFEFFHi!');
	t.equal(result, ' _____\n< Hi! >\n -----');
});

test('Unicode line separators are normalized', (t) => {
	t.plan(1);

	const result = balloon.say('AB\u2028CDE');
	t.equal(result, [
		' _____',
		'/ AB  \\',
		'\\ CDE /',
		' -----',
	].join('\n'));
});
