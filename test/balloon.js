var balloon = require("../lib/balloon");

exports.singleLine = {
	nowrap : function (test) {
		test.expect(2);

		var say = balloon.say("Hi!");
		var expected = " _____\n< Hi! >\n -----";
		test.equal(say, expected);

		var think = balloon.think("Hi!");
		expected = " _____\n( Hi! )\n -----";
		test.equal(think, expected);

		test.done();
	},

	wrap : function (test) {
		test.expect(2);

		var say = balloon.say("Yes", 10);
		var expected = " _____\n< Yes >\n -----";
		test.equal(say, expected);

		var think = balloon.think("Yes", 10);
		expected = " _____\n( Yes )\n -----";
		test.equal(think, expected);

		test.done();
	}
};

exports.twoLines = {
	nowrap : function (test) {
		test.expect(2);

		var say = balloon.say("AB\nCDE");
		var expected = " _____\n/ AB  \\\n\\ CDE /\n -----";
		test.equal(say, expected);

		var think = balloon.think("AB\nCDE");
		expected = " _____\n( AB  )\n( CDE )\n -----";
		test.equal(think, expected);

		test.done();
	},

	wrap : function (test) {
		test.expect(2);

		var say = balloon.say("ABCDEF", 4);
		var expected = " ______\n/ ABCD \\\n\\ EF   /\n ------";
		test.equal(say, expected);

		var think = balloon.think("ABCDEF", 4);
		expected = " ______\n( ABCD )\n( EF   )\n ------";
		test.equal(think, expected);

		test.done();
	}
};

exports.multiLine = {
	nowrap : function (test) {
		test.expect(2);

		var say = balloon.say("AB\nCDE\nQWE RTY");
		var expected = " _________\n/ AB      \\\n| CDE     |\n\\ QWE RTY /\n ---------";
		test.equal(say, expected);

		var think = balloon.think("AB\nCDE\nQWE RTY");
		expected = " _________\n( AB      )\n( CDE     )\n( QWE RTY )\n ---------";
		test.equal(think, expected);

		test.done();
	},

	wrap : function (test) {
		test.expect(2);

		var say = balloon.say("ONE\nTWO THREE", 4);
		var expected = " ______\n/ ONE  \\\n| TWO  |\n| THRE |\n\\ E    /\n ------";
		test.equal(say, expected);

		var think = balloon.think("ONE\nTWO THREE", 4);
		expected = " ______\n( ONE  )\n( TWO  )\n( THRE )\n( E    )\n ------";
		test.equal(think, expected);

		test.done();
	},

	equal : function (test) {
		test.expect(2);

		var say = balloon.say("ONE\nTWO\nABC\n", 3);
		var expected = " _____\n/ ONE \\\n| TWO |\n\\ ABC /\n -----";
		test.equal(say, expected);

		var think = balloon.think("ONE\nTWO\nABC\n", 3);
		expected = " _____\n( ONE )\n( TWO )\n( ABC )\n -----";
		test.equal(think, expected);

		test.done();
	}
};