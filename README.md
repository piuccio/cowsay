# cowsay

````
 __________________
< srsly dude, why? >
 ------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
````

cowsay is a configurable talking cow, originally written in Perl by [Tony Monroe](https://github.com/tnalpgge/rank-amateur-cowsay)

This project is a translation in JavaScript of the original program and an attempt to bring the same silliness to node.js.

## Install

    npm install -g cowsay

## Usage

    cowsay JavaScript FTW!

or

    cowthink node.js is cool

It acts in the same way as the original cowsay, so consult `cowsay(1)` or run `cowsay -h`

````
 ________
< indeed >
 --------
    \
     \
                                   .::!!!!!!!:.
  .!!!!!:.                        .:!!!!!!!!!!!!
  ~~~~!!!!!!.                 .:!!!!!!!!!UWWW$$$
      :$$NWX!!:           .:!!!!!!XUWW$$$$$$$$$P
      $$$$$##WX!:      .<!!!!UW$$$$"  $$$$$$$$#
      $$$$$  $$$UX   :!!UW$$$$$$$$$   4$$$$$*
      ^$$$B  $$$$\     $$$$$$$$$$$$   d$$R"
        "*$bd$$$$      '*$$$$$$$$$$$o+#"
             """"          """""""
````

## Usage as a module

cowsay can be used as any other npm dependency

    var cowsay = require("cowsay");

    console.log(cowsay.say({
    	text : "I'm a moooodule",
    	e : "oO",
    	T : "U "
    }));

    // or cowsay.think()

````
 _________________
( I'm a moooodule )
 -----------------
        o   ^__^
         o  (oO)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
````

## Pipe from standard input

    echo please repeat | cowsay

## Usage in the browser

cowsay works in your browser too with rollup / webpack / browserify / you name it.

```js
import { say } from 'cowsay';

console.log(say({ text: 'grazing in the browser' }));
```

You can customize the cow by importing the relevant one

```js
import { think, SQUIRREL } from 'cowsay';

console.log(think({
  text: 'grazing in the browser',
  cow: SQUIRREL,
  eyes: 'pp',
  tongue: ';;',
}));
```

All cows are included in the bundle, but you can use rollup / webpack tree-shake feature to reduce the final bundle size.

### Browser options

```js
say({
  text: 'hello',
  cow: '', // Template for a cow, get inspiration from `./cows`
  eyes: 'oo', // Select the appearance of the cow's eyes, equivalent to cowsay -e
  tongue: 'L|', // The tongue is configurable similarly to the eyes through -T and tongue_string, equivalent to cowsay -T
  wrap: false, // If it is specified, the given message will not be word-wrapped. equivalent to cowsay -n
  wrapLength: 40, // Specifies roughly where the message should be wrapped. equivalent to cowsay -W
  mode: 'b', // One of 	"b", "d", "g", "p", "s", "t", "w", "y"
});
```
