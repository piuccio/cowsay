var path = require("path");
var fs = require("fs");
var replacer = require("./replacer");

var textCache = {};

exports.get = function (cow) {
	var text = textCache[cow];

	if (!text) {
		var filePath;

		if (cow.match(/\\/) || cow.match(/\//)) {
			filePath = cow;
		} else {
			filePath = path.join(__dirname, "/../cows", cow) + ".cow";
		}
		text = fs.readFileSync(filePath, "utf-8");
		textCache[cow] = text;
	}

	return function (options) {
		return replacer(text, options);
	};
}

exports.list = function (callback) {
	fs.readdir(path.join(__dirname, "../cows"), function (err, files) {
		if (err) return callback(err);

		var cows = files.map(function (cow) {
			return path.basename(cow, ".cow");
		});

		return callback(null, cows);
	});
}
