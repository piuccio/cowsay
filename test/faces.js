var getFace = require("../lib/faces");

exports.getFace = function (test) {
	test.expect(4);

	// Defaults
	var face = getFace({
		e : "oo",
		T : "  "
	});
	test.equal(face.eyes, "oo");
	test.equal(face.tongue, "  ");

	// One mode
	var face = getFace({
		g : true,
		e : "oo",
		T : "  "
	});
	test.equal(face.eyes, "$$");
	test.equal(face.tongue, "  ");

	// I don't really want to test two modes
	test.done();
}