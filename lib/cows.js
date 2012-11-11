var path = require("path");
var fs = require("fs");
var replacer = require("./replacer");

exports.get = function (cow) {
	var filePath;
	if (cow.indexOf("/") === -1) {
		filePath = path.join(__dirname, "/../cows", cow) + ".cow";
	} else {
		filePath = path.relative(process.cwd(), cow);
	}

	var text = fs.readFileSync(filePath, "utf-8");

	return function (options) {
		return replacer(text, options);
	};
}

exports.list = function () {
	fs.readdir(path.join(__dirname, "../cows"), function (err, files) {
		if (err) {
			throw new Error(err);
		} else {
			var cows = files.map(function (cow) {
				return path.basename(cow, ".cow");
			});

			console.log(cows.join("  "));
		}
	});
}