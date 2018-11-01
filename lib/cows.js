var path = require("path");
var fs = require("fs");
var util = require('util');
var readdir = util.promisify(fs.readdir);
var replacer = require("./replacer");

var textCache = {};
var cowsPath = path.join(__dirname, "../cows");

function cowNamesFromFiles (files) {
	return files.map(function (cow) {
		return path.basename(cow, ".cow");
	});
}

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

exports.list = async function (callback) {
    return await readdir(cowsPath).then(async files => {
        if (typeof callback !== 'undefined') return callback(null, cowNamesFromFiles(files));
        return cowNamesFromFiles(files);
    }).catch(async err => {
        if (err) {
            if (typeof callback !== 'undefined') return callback(err);
            throw err;
        }
    });
}

exports.listSync = function () {
	return cowNamesFromFiles(fs.readdirSync(cowsPath))
}
