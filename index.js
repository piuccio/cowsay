var baloon = require("./lib/balloon");
var cows = require("./lib/cows");
var faces = require("./lib/faces");

exports.say = function (options) {
	return doIt(options, true);
};

exports.think = function (options) {
	return doIt(options, false);
};

exports.list = cows.list;

function doIt (options, sayAloud) {
	var cow = cows.get(options.f || "default");
	var face = faces(options);
	face.thoughts = sayAloud ? "\\" : "o";

	var action = sayAloud ? "say" : "think";
	return baloon[action](options.text || options._.join(" "), options.n ? null : options.W) + "\n" + cow(face);
}
