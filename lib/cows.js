var path = require("path");
var fs = require("fs");
var request = require('sync-request');
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
		if(cow.startsWith('http:') || cow.startsWith('https:')) {
			var res = request("GET", cow);
			text = res.getBody().toString();
		}
		if (cow.match(/\\/) || cow.match(/\//)) {
			filePath = cow;
		} else {
			filePath = path.join(__dirname, "/../cows", cow) + ".cow";
		}
		if(!text) {
			text = fs.readFileSync(filePath, "utf-8");
		}
		textCache[cow] = text;
	}

	return function (options) {
		return replacer(text, options);
	};
}

exports.list = function (callback) {
	return new Promise(function (resolve, reject) {
		fs.readdir(cowsPath, function (err, files) {
			if (err) {
				reject(err);
				callback(err);
			} else {
				resolve(files);
				callback(null, cowNamesFromFiles(files));
			}
		});
	});
}

exports.listSync = function () {
	return cowNamesFromFiles(fs.readdirSync(cowsPath))
}
