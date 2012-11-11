var cowFormat = "#Comment \
# just some other comment, it's going to be ignored anyway ...\
$the_cow = <<EOC;\n\
 $thoughts\
   $thoughts\
chars($eyes) \
$tongue\
\nEOC\n\
\
";

// They are the same...
var plainText = "\
 $thoughts\
   $thoughts\
chars($eyes) \
$tongue";

var expected = " ||   ||chars(oo) U ";

var replacer = require("../lib/replacer");
exports.cowFormat = function (test) {
	test.expect(1);

	var cow = replacer(cowFormat, {
		thoughts : "||",
		eyes : "oo",
		tongue : "U "
	});

	test.equal(cow, expected);

	test.done();
};

exports.plainText = function (test) {
	test.expect(1);

	var cow = replacer(plainText, {
		thoughts : "||",
		eyes : "oo",
		tongue : "U "
	});

	test.equal(cow, expected);

	test.done();
};