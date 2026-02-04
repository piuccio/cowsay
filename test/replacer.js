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

test('individual $eye replacements use left and right eye chars', (t) => {
	t.plan(1);

	const template = 'L:$eye R:$eye';
	const result = replacer(template, {
		thoughts: '\\',
		eyes: 'LR',
		tongue: '  ',
	});
	t.equal(result, 'L:L R:R');
});

test('dollar signs in eyes are handled correctly', (t) => {
	t.plan(1);

	const template = 'eyes:$eyes';
	const result = replacer(template, {
		thoughts: '\\',
		eyes: '$$',
		tongue: '  ',
	});
	t.equal(result, 'eyes:$$');
});

test('${eyes} and ${tongue} bracket syntax works', (t) => {
	t.plan(1);

	const template = 'E:${eyes} T:${tongue}';
	const result = replacer(template, {
		thoughts: '\\',
		eyes: 'oo',
		tongue: 'U ',
	});
	t.equal(result, 'E:oo T:U ');
});

test('undefined eyes and tongue default to empty string', (t) => {
	t.plan(1);

	const template = 'E:$eyes T:$tongue';
	const result = replacer(template, {
		thoughts: '\\',
	});
	t.equal(result, 'E: T:');
});

test('extractTheCow handles backslash and at-sign escapes', (t) => {
	t.plan(1);

	const cowFile = '$the_cow = <<EOC;\n\\\\escaped \\@at \\$dollar\nEOC\n';
	const result = replacer(cowFile, {
		thoughts: '\\',
		eyes: 'oo',
		tongue: '  ',
	});
	t.equal(result, '\\escaped @at $dollar');
});

test('extractTheCow normalizes CRLF line endings', (t) => {
	t.plan(1);

	const cowFile = '$the_cow = <<"EOC";\r\n $thoughts\r\nEOC\r\n';
	const result = replacer(cowFile, {
		thoughts: '\\',
		eyes: 'oo',
		tongue: '  ',
	});
	t.equal(result, ' \\');
});

test('cow file with double-quoted EOC delimiter', (t) => {
	t.plan(1);

	const cowFile = '$the_cow = <<"EOC";\n $thoughts\nEOC\n';
	const result = replacer(cowFile, {
		thoughts: '\\',
		eyes: 'oo',
		tongue: '  ',
	});
	t.equal(result, ' \\');
});

test('multiple $thoughts replacements', (t) => {
	t.plan(1);

	const template = '$thoughts $thoughts $thoughts';
	const result = replacer(template, {
		thoughts: '\\',
		eyes: 'oo',
		tongue: '  ',
	});
	t.equal(result, '\\ \\ \\');
});
