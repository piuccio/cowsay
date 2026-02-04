const stringWidth = require("string-width");

const SAY_DELIMITERS = Object.freeze({
	first : ["/", "\\"],
	middle : ["|", "|"],
	last : ["\\", "/"],
	only : ["<", ">"]
});

const THINK_DELIMITERS = Object.freeze({
	first : ["(", ")"],
	middle : ["(", ")"],
	last : ["(", ")"],
	only : ["(", ")"]
});

// Text normalization constants
const NORMALIZE_RE = /\r\n?|[\n\u2028\u2029]/g;
const BOM_RE = /^\uFEFF/;
const TAB_RE = /\t/g;
const TAB_SPACES = "        ";

exports.say = function say (text, wrap) {
	return format(text, wrap, SAY_DELIMITERS);
};

exports.think = function think (text, wrap) {
	return format(text, wrap, THINK_DELIMITERS);
};

function format (text, wrap, delimiters) {
	const lines = split(text, wrap);
	const maxLength = maxWidth(lines);

	let balloon;
	if (lines.length === 1) {
		balloon = [
			" " + top(maxLength),
			delimiters.only[0] + " " + lines[0] + " " + delimiters.only[1],
			" " + bottom(maxLength)
		];
	} else {
		balloon = [" " + top(maxLength)];

		for (let i = 0, len = lines.length; i < len; i += 1) {
			let delimiter;

			if (i === 0) {
				delimiter = delimiters.first;
			} else if (i === len - 1) {
				delimiter = delimiters.last;
			} else {
				delimiter = delimiters.middle;
			}

			balloon.push(delimiter[0] + " " + pad(lines[i], maxLength) + " " + delimiter[1]);
		}

		balloon.push(" " + bottom(maxLength));
	}

	return balloon.join("\n");
}

function split (text, wrap) {
	text = text.replace(NORMALIZE_RE, "\n").replace(BOM_RE, '').replace(TAB_RE, TAB_SPACES);

	if (!wrap) {
		return text.split("\n");
	}

	const lines = [];
	let start = 0;
	while (start < text.length) {
		const nextNewLine = text.indexOf("\n", start);

		const wrapAt = Math.min(start + wrap, nextNewLine === -1 ? text.length : nextNewLine);

		lines.push(text.substring(start, wrapAt));
		start = wrapAt;

		// Ignore next new line
		if (text.charAt(start) === "\n") {
			start += 1;
		}
	}

	return lines;
}

function maxWidth (lines) {
	let result = 0;
	for (let i = 0, len = lines.length; i < len; i += 1) {
		const width = stringWidth(lines[i]);
		if (width > result) {
			result = width;
		}
	}

	return result;
}

function pad (text, length) {
	return text + " ".repeat(length - stringWidth(text));
}

function top (length) {
	return "_".repeat(length + 2);
}

function bottom (length) {
	return "-".repeat(length + 2);
}
