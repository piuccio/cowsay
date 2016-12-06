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
