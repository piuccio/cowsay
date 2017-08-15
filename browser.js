import baloon from "./lib/balloon";
import replacer from "./lib/replacer";
import faces from "./lib/faces";

import DEFAULT_COW from './cows/default.cow';

export { default as BEAVIS_ZEN } from './cows/beavis.zen.cow';
export { default as BONG } from './cows/bong.cow';
export { default as BUD_FROGS } from './cows/bud-frogs.cow';
export { default as BUNNY } from './cows/bunny.cow';
export { default as CHEESE } from './cows/cheese.cow';
export { default as COWER } from './cows/cower.cow';
export { default as DAEMON } from './cows/daemon.cow';
export { default as DEFAULT } from './cows/default.cow';
export { default as DOGE } from './cows/doge.cow';
export { default as DRAGON_AND_COW } from './cows/dragon-and-cow.cow';
export { default as DRAGON } from './cows/dragon.cow';
export { default as ELEPHANT_IN_SNAKE } from './cows/elephant-in-snake.cow';
export { default as ELEPHANT } from './cows/elephant.cow';
export { default as EYES } from './cows/eyes.cow';
export { default as FLAMING_SHEEP } from './cows/flaming-sheep.cow';
export { default as GHOSTBUSTERS } from './cows/ghostbusters.cow';
export { default as GOAT } from './cows/goat.cow';
export { default as HEAD_IN } from './cows/head-in.cow';
export { default as HEDGEHOG } from './cows/hedgehog.cow';
export { default as HELLOKITTY } from './cows/hellokitty.cow';
export { default as KISS } from './cows/kiss.cow';
export { default as KITTY } from './cows/kitty.cow';
export { default as KOALA } from './cows/koala.cow';
export { default as KOSH } from './cows/kosh.cow';
export { default as LUKE_KOALA } from './cows/luke-koala.cow';
export { default as MECH_AND_COW } from './cows/mech-and-cow.cow';
export { default as MEOW } from './cows/meow.cow';
export { default as MILK } from './cows/milk.cow';
export { default as MOOFASA } from './cows/moofasa.cow';
export { default as MOOSE } from './cows/moose.cow';
export { default as MUTILATED } from './cows/mutilated.cow';
export { default as REN } from './cows/ren.cow';
export { default as SATANIC } from './cows/satanic.cow';
export { default as SHEEP } from './cows/sheep.cow';
export { default as SKELETON } from './cows/skeleton.cow';
export { default as SMALL } from './cows/small.cow';
export { default as SODOMIZED } from './cows/sodomized.cow';
export { default as SQUIRREL } from './cows/squirrel.cow';
export { default as STEGOSAURUS } from './cows/stegosaurus.cow';
export { default as STIMPY } from './cows/stimpy.cow';
export { default as SUPERMILKER } from './cows/supermilker.cow';
export { default as SURGERY } from './cows/surgery.cow';
export { default as TELEBEARS } from './cows/telebears.cow';
export { default as TURKEY } from './cows/turkey.cow';
export { default as TURTLE } from './cows/turtle.cow';
export { default as TUX } from './cows/tux.cow';
export { default as VADER_KOALA } from './cows/vader-koala.cow';
export { default as VADER } from './cows/vader.cow';
export { default as WHALE } from './cows/whale.cow';
export { default as WWW } from './cows/www.cow';

function converToCliOptions(browserOptions) {
  const cliOptions = {
    e: browserOptions.eyes || 'oo',
    T: browserOptions.tongue || '  ',
    n: browserOptions.wrap,
    W: browserOptions.wrapLength || 40,
    text: browserOptions.text || '',
    _: browserOptions.text || [],
    f: browserOptions.cow,
  };
  if (browserOptions.mode) {
    // converts mode: 'b' to b: true
    cliOptions[browserOptions.mode] = true;
  }
  return cliOptions;
}

function doIt (options, sayAloud) {
  const cow = options.f || DEFAULT_COW;
	const face = faces(options);
	face.thoughts = sayAloud ? "\\" : "o";

	const action = sayAloud ? "say" : "think";
	return baloon[action](options.text || options._.join(" "), options.n ? null : options.W) + "\n" + replacer(cow, face);
}

export function say(browserOptions) {
  return doIt(converToCliOptions(browserOptions), true);
}

export function think(browserOptions) {
  return doIt(converToCliOptions(browserOptions), false);
}
