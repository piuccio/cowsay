const modes = Object.freeze({
	"b" : Object.freeze({ eyes : "==", tongue : "  " }),
	"d" : Object.freeze({ eyes : "xx", tongue : "U " }),
	"g" : Object.freeze({ eyes : "$$", tongue : "  " }),
	"p" : Object.freeze({ eyes : "@@", tongue : "  " }),
	"s" : Object.freeze({ eyes : "**", tongue : "U " }),
	"t" : Object.freeze({ eyes : "--", tongue : "  " }),
	"w" : Object.freeze({ eyes : "OO", tongue : "  " }),
	"y" : Object.freeze({ eyes : "..", tongue : "  " })
});

const modeKeys = Object.keys(modes);

module.exports = function (options) {
	for (let i = 0; i < modeKeys.length; i++) {
		const key = modeKeys[i];
		if (options[key] === true) {
			// Return a mutable copy; callers need to add .thoughts
			return { eyes: modes[key].eyes, tongue: modes[key].tongue };
		}
	}

	return {
		eyes : options.e || "oo",
		tongue : options.T || "  "
	};
};
