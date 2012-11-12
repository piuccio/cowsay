module.exports = function (cow, variables) {
	if (cow.indexOf("$the_cow") !== -1) {
		cow = extractTheCow(cow);
	}

	return cow
		.replace(/\$thoughts/g, variables.thoughts)
		.replace(/\$eyes/g, variables.eyes)
		.replace(/\$tongue/g, variables.tongue)
		.replace(/\$\{eyes\}/g, variables.eyes)
		.replace(/\$\{tongue\}/g, variables.tongue)
	;
}

function extractTheCow (cow) {
	cow = cow.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, '');
	var match = /\$the_cow\s*=\s*<<"*EOC"*;*\n([\s\S]+)\nEOC\n/.exec(cow);

	if (!match) {
		console.error("Cannot parse cow file\n", cow);
		return cow;
	} else {
		return match[1].replace(/\\{2}/g, "\\").replace(/\\@/g, "@").replace(/\\\$/g, "$");
	}
}