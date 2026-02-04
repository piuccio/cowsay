const path = require("path");
const fs = require("fs");
const replacer = require("./replacer");

const renderCache = Object.create(null);
const cowsPath = path.join(__dirname, "../cows");

const COW_EXT = ".cow";

function cowNamesFromFiles (files) {
	const names = [];
	for (let i = 0, len = files.length; i < len; i += 1) {
		if (files[i].endsWith(COW_EXT)) {
			names.push(path.basename(files[i], COW_EXT));
		}
	}
	return names;
}

exports.get = function get (cow) {
	let render = renderCache[cow];

	if (!render) {
		let filePath;

		if (cow.includes("/") || cow.includes("\\")) {
			filePath = cow;
		} else {
			filePath = path.join(cowsPath, cow + ".cow");
		}
		const text = fs.readFileSync(filePath, "utf-8");
		render = function (options) {
			return replacer(text, options);
		};
		renderCache[cow] = render;
	}

	return render;
};

exports.list = function list (callback) {
	return new Promise((resolve, reject) => {
		fs.readdir(cowsPath, (err, files) => {
			if (err) {
				reject(err);
				if (callback) callback(err);
			} else {
				const names = cowNamesFromFiles(files);
				resolve(names);
				if (callback) callback(null, names);
			}
		});
	});
};

exports.listSync = function listSync () {
	return cowNamesFromFiles(fs.readdirSync(cowsPath));
};
