const test = require('tape');
const balloon = require('../lib/balloon');

test('single line - nowrap', (t) => {
	t.plan(2);

	t.equal(' _____\n< Hi! >\n -----', balloon.say('Hi!'));
	t.equal(' _____\n( Hi! )\n -----', balloon.think('Hi!'));
});

test('single line - wrap', (t) => {
	t.plan(2);

	t.equal(' _____\n< Yes >\n -----', balloon.say('Yes', 10));
	t.equal(' _____\n( Yes )\n -----', balloon.think('Yes', 10));
});

test('two lines - nowrap', (t) => {
	t.plan(2);
	t.equal([
		' _____',
		'/ AB  \\',
		'\\ CDE /',
		' -----',
	].join('\n'), balloon.say('AB\nCDE'));
	t.equal([
		' _____',
		'( AB  )',
		'( CDE )',
		' -----',
	].join('\n'), balloon.think('AB\nCDE'));
});

test('multiple lines - nowrap', (t) => {
	t.plan(2);

	t.equal([
		' _________',
		'/ AB      \\',
		'| CDE     |',
		'\\ QWE RTY /',
		' ---------',
	].join('\n'), balloon.say('AB\nCDE\nQWE RTY'));
	t.equal([
		' _________',
		'( AB      )',
		'( CDE     )',
		'( QWE RTY )',
		' ---------',
	].join('\n'), balloon.think('AB\nCDE\nQWE RTY'));
});

test('multiple lines - wrap to max lenght', (t) => {
	t.plan(2);

	t.equal([
		' ______',
		'/ ONE  \\',
		'| TWO  |',
		'| THRE |',
		'\\ E    /',
		' ------',
	].join('\n'), balloon.say('ONE\nTWO THREE', 4));
	t.equal([
		' ______',
		'( ONE  )',
		'( TWO  )',
		'( THRE )',
		'( E    )',
		' ------',
	].join('\n'), balloon.think('ONE\nTWO THREE', 4));
});
