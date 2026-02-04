// Template variable replacement regexes
const THOUGHTS_RE = /\$thoughts/g;
const BRACKET_EYES_RE = /\$\{eyes\}/g;
const BRACKET_TONGUE_RE = /\$\{tongue\}/g;
const EYES_RE = /\$eyes/g;
const TONGUE_RE = /\$tongue/g;
const EYE_RE = /\$eye/;
const DOLLAR_RE = /\$/g;

// Cow file extraction regexes
const COW_RE = /\$the_cow\s*=\s*<<"*EOC"*;*\n([\s\S]+)\nEOC\n/;
const NORMALIZE_RE = /\r\n?|[\n\u2028\u2029]/g;
const BOM_RE = /^\uFEFF/;
const PERL_ESCAPE_RE = /\\\\|\\@|\\\$/g;
const PERL_ESCAPES = { "\\\\": "\\", "\\@": "@", "\\$": "$" };

module.exports = function (cow, variables) {
	const eyes = escapeRe(variables.eyes);
	const eyeL = eyes.charAt(0);
	const eyeR = eyes.charAt(1);
	const tongue = escapeRe(variables.tongue);

	if (cow.includes("$the_cow")) {
		cow = extractTheCow(cow);
	}

	// Order matters: $eyes and $tongue must be replaced before $eye,
	// otherwise $eye would match the prefix of $eyes.
	return cow
		.replace(THOUGHTS_RE, variables.thoughts)
		.replace(BRACKET_EYES_RE, eyes)
		.replace(BRACKET_TONGUE_RE, tongue)
		.replace(EYES_RE, eyes)
		.replace(TONGUE_RE, tongue)
		.replace(EYE_RE, eyeL)
		.replace(EYE_RE, eyeR)
	;
};

/*
 * "$" dollar signs must be doubled before being used in a regex replace
 * This can occur in eyes or tongue.
 * For example:
 *
 * cowsay -g Moo!
 *
 * cowsay -e "\$\$" Moo!
 */
function escapeRe (s) {
	if (typeof s !== "string") {
		return "";
	}
	return s.replace(DOLLAR_RE, "$$$$");
}

function extractTheCow (cow) {
	cow = cow.replace(NORMALIZE_RE, "\n").replace(BOM_RE, '');
	const match = COW_RE.exec(cow);

	if (!match) {
		console.error("Cannot parse cow file\n", cow);
		return cow;
	} else {
		return match[1].replace(PERL_ESCAPE_RE, (m) => PERL_ESCAPES[m]);
	}
}
