# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #0: The Game

## Overview

Let's start out with something fun - **a game!**

### **We'll be making Tic Tac Toe**, a game that takes seconds to learn but minutes to master! ###


![](https://media2.giphy.com/media/maSr1dPOf7Qac/giphy.gif?cid=6104955ec0532e7827fb4a0f260ad021953608ab9f4c1452&rid=giphy.gif)

Everyone will get a chance to **be creative**, and work through some really **tough programming challenges** to get your feet wet in the world of web development. 

**You will be working individually for this project**, but we'll be guiding you along the process and helping as you go. Show us what you've got!

---

### What You'll Learn

By the time you submit this project, you will have covered new ground in many of the big themes of the course:

- **Command Line**: Practice interacting with the computer and navigating the filesystem from the command line.
- **Source Control**: Manage and interact with a git repository to store changes to code.
- **Programming Fundamentals**: Work with variables, functions, loops, arrays, objects, DOM access, event handlers & callbacks, while learning how to strategically solve problems and resolve errors.
- **Web Fundamentals**:  Learn how communication happens over the internet, and how to structure, style, and animate documents within a browser. Also learn how to respond to actions taken by your users and the data they input into the browser.
- **Browser Applications**:  Dive into CSS and learn how to use libraries and frameworks to get lots of style for free.
- **Deployment**: Host a static web site in a managed hosting environment.
- **Products and Teams**: Document your code and your code repository so others understand what you've built.


---

### Big Goals

* **Build a web application from scratch**, without a starter codebase
* Use your programming skills to **map out the game logic for a simple game like Tic Tac Toe**
* **Separate HTML, CSS, and JavaScript files** in your application
* Build an application **to a spec that someone else gives you**
* **Build a dynamic game that allows two players to compete**
* **Write a ``README.md`` file that explains your app** to the world

---

### Technical Requirements

Your app must:

* **Render a game board in the browser**
* **Switch turns** between X and O (or whichever markers you select); your game should prevent users from playing a turn into a square that is already occupied
* **Visually display which side won** if a player gets three in a row; or show a draw/"cat’s game" if neither wins
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** with **jQuery** (or vanilla DOM methods if you really prefer) for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---

### Bonus

These are for extra credit! Don't focus on these until you've hit the core requirements.

* Keep track of **multiple game rounds** with a win counter
* Allow players to **customize their tokens** (X, O, name, picture, etc)
* **Get inventive with your styling**, e.g. use hover effects or animations to spiff things up
* **Make your game layout responsive** so it works on differently-sized screens by exploring [CSS Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries), CSS variables, and CSS layout mechanisms like [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) or [Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)

* **Use LocalStorage** to persist data locally to allow games to continue after page refresh or loss of internet connectivity
* **Support custom board sizes**: default is 3x3 but you could allow users to choose a larger board
* **Create an AI opponent**: teach Javascript to play an unbeatable game against you
   * Start by implementing a few simple rules which can be easily checked and are always good moves, such as *"always take the center square if it's available"* - you can google these rules for yourself
   * You can build in as many AI player rules as you like but you'll quickly end up with a longwinded list of if-else-if statements. To make a truly unbeatable AI opponent you'll need to look into implementing a recursive full-game-tree algorithm like [MiniMax](https://en.wikipedia.org/wiki/Minimax) - **for advanced/bold students only**!
 * **Start again by implementing a totally different game**: Try Checkers, or Battleships.... or Chess (if you're feeling very brave)
 <!--
 * **Make a [Vue.js](https://vuejs.org/v2/guide/) version of your game**, instead of jQuery, and compare the two...
 -->
 * **Support networked multiplayer**: https://www.firebase.com/ has a nice quickstart guide
---

### Necessary Deliverables

* A **working game, built by you**, hosted on GitHub Pages
* A **git repository hosted on Github**, with a link to your hosted game, and frequent commits dating back to the very beginning of the project
* **A ``README.md`` file** in your repo with  a link to the live game, a list of features, explanations of the technologies used, the approach taken, known bugs, etc. Also, a screenshot or two is nice to have.
* On Friday of project week **everyone individually presents** their project to the class, with an overview of the app and a brief code tour of the highlights (15 min total, maximum).

# <em>EVERYONE</em> PRESENTS ON FRIDAY

---

### A note on the dangers of copy-paste

You might be tempted to get some "help" or "inspiration" for the solution to this project by doing some research online. Developers often rely on copying small snippets of code from other people, but **avoid the temptation to copy anything more than a single line of code at a time from elsewhere**. 

Aside from GA's strict rules about plagiarism, you will not learn anything by just copy-pasting code you don't understand! The goal here is to do your own original work to puzzle out a solution, __every step of which makes sense to you!__ If you must copy a line of code, make yourself a rule that you have to write a long comment explaining exactly what the code does. You may be called upon to explain any line of code in your solution - _if you can't explain it, it's a giveaway that you "borrowed" it_ ...

---

### Suggested Ways to Get Started

* **Break the project down into different components** (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!
* **Use your Development Tools** (console.log, inspector, alert statements, etc) to debug and solve problems
* Work through the stages in class, **ask questions and come to office hours** when you need to. Think about adding relevant code to your Tic Tac Toe game each night, instead of, you know... _procrastinating_.
* **USE GIT: Commit early, commit often.** Don’t be afraid to break something because you can always go back in time to a previous version.
* **Check out Tutorial and Documentation resources** (jQuery tutorial) at home to better understand what you’ll be getting into.
* **Don’t be afraid to write code that you know you will have to remove later.** Create temporary elements (buttons, links, etc) that trigger events if real data is not available. For example, if you’re trying to figure out how to change some text when the game is over but you haven’t solved the win/lose game logic, you can create a button to simulate that until then.
* **Why not make friends with the Debugger this week?** See if you can use it to save you a bunch of `console.log()` statements, or to find out why lines of your code are or aren't running. Any time sent getting better at using debugging tools now will pay out huge dividends for the rest of your coding life!
---

### Useful Resources

* **[MDN Javascript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** _(a great reference for all things Vanilla Javascript)_
* **[jQuery Docs](http://api.jquery.com)**
* **[Github Pages](https://pages.github.com)** _(for hosting your game)_

---


# Review Checklist

This project is designed to be a review of everything we've covered in the first two weeks of the course.

If you need to do any review of the following, you can treat the start of this project week as a chance to catch up.

Here's a reminder of the core topics - **consider printing out this list and highlighting the topics that you have noticed you need to review the most**:

### Javascript / Coding Fundamentals:
- __Primitive data types__: numbers, strings, boolean, undefined/null/NaN
  - how to declare variables using `const` and `let`, the difference between these two declarations, and how the two are different from `var` ([explanation](https://levelup.gitconnected.com/const-vs-let-vs-var-in-javascript-which-one-should-you-use-c56cf9b9e2a3))
  - variable scope: the difference between local and global variables, and the special scoping rules for `let` and `const` ([explanation](https://wesbos.com/javascript-scoping))
  - built-in functions and methods for working with: 
    - numbers: `parseInt()`, `Math.floor()`, `Math.random()`, etc...
    - strings: `.split()`, `.toUpperCase()`, etc ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))
    - arrays:  `.push()`, `.pop()`, `.indexOf()`, `includes()`, `.join()`, `.slice()`, etc ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))
  - the difference between *expressions* and *statements* in Javascript ([explanation](https://medium.com/launch-school/javascript-expressions-and-statements-4d32ac9c0e74)|[explanation](https://en.hexlet.io/courses/intro_to_programming/lessons/expressions/theory_unit) )
- __Composite data types__ (collections):
  - __arrays__:
    - creating arrays
    - accessing array elements by index
    - changing array elements individually
    - looping over every element in an array with a `for` loop
  - __objects__:
    - creating objects
    - accessing the values of keys in objects, and when to use "dot notation" vs "bracket notation" for access
    - nested objects and how to deal with nested data; how to loop over every key defined in an object with a `for...in` loop, and use the key in the loop to get the value
    - built-in functions for working with objects (`Object.keys()`, `Object.values()`)
    - the `in` operator for checking if a key exists in an object (`'age' in studentRecord`)
  - the differences between objects and arrays, and when to use each
  - understanding that equality testing with `===` doesn't work with objects or arrays, except in a couple of special cases
- __Functions__:
  - how to define a function (syntax), and how to call the function you have defined
  - using the "[function expression](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function)" style of defining a function (the style that makes it look like a variable), which we prefer in this course
  - how to pass data in to a function by defining arguments (a.k.a. parameters) that a function accepts, and how to call a function with specific arguments
  - how to return data from a function using the `return` statement; how returning data from a function is different to logging out data from inside a function; how to capture the data returned by a function to use in later code; understanding how the `return` statement can cause a function to exit "early"
- __Conditionals ( `if` / `else` )__:
  - correct syntax of if/else statements, including clear indentation
  - conditional tests:
    - the comparison operators (`<`, `>`, `<=`, `>=` )
    - equality operators: `==`, `===`, (understanding the difference between these two), `!==`
    - logical operators for combining individual conditions into more complex tests: `&&`, `||`, `!`
  - ["truthiness" & "falsiness"](https://www.sitepoint.com/javascript-truthy-falsy/): which values are interpreted as true in the context of conditional test in JS, and which are interpreted as false
  - using `if`-`else if` chains to test for multiple *mutually exclusive* conditions
  - understanding control flow in your program in relation to `if`-`else if`-`else` conditions, including nested conditional statements
- __Loops (iteration)__:
  - know the syntax of the `while` and `for` loops; in particular [the three parts of a `for` loop header](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), and when each of the three parts is evaluated
  - know how to define a standard "counting" loop, how to set the start and end values for the counting; in particular, how to use such a loop to access every element in an array
  - know how to use the `break` statement to terminate a loop early in certain conditions

### HTML & CSS
- know the most common [HTML tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) and how to use them
- understand what tag attributes are for, and which are appropriate to specific tags
- understand the parts of a CSS rule (selector, property name, value)
- understand how to target elements on a page to apply CSS rules by using the main CSS selectors (tag name, ID, class, ancestor/descendent)
- begin to understand how the browser's rendering engine lays out elements on a page, and how you can change the default behaviour using CSS properties:
  - `display`: understand the differences between `inline`, `block` and `inline-block` layout, including the default behaviours of the main container tags (`div`, `span`, `nav`, `section` etc)
  - `position`: understand the difference between `static`, `relative`, `absolute`, and `fixed` positioning, how these interact with the default flow of a page, and how to use `top`, `left`, `bottom`, and `right` offsets with them
  - understand the different measurement units in CSS: `px`, `pt`, `%`, `vh` `vw`, `em`, `rem` and when to use each
  - understand the different ways to define [colours in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value): named colours, hex values, `rgb()`, `hsl()` etc
  - understand how to plan page layout using wireframing, and implement the plan by divinding page layout into nested container elements, controlling the size and positioning CSS

### The DOM and Javascript
- understand what the [DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) is and why it is necessary
- understand why accessing page elements via the DOM in JS code requires your `<script>` tag to appear at the end of the page
- know the "vanilla" JS DOM access methods, when to use each, and the different kinds of data they return (single DOM node objects vs arrays of DOM node objects)
- know how to read data from a DOM node object, using attributes such as `.innerHTML`, `.src` and `.href` (and which kind of tags these apply to); know how to access CSS style values such as `.style.backgroundColor`, `.style.left`, etc
- know how to change the above DOM node values
- know how to create new DOM nodes using `document.createElement()`, and how to add a newly created node to the page using `.appendChild()`
- know how to attach an event handler to a DOM node using `.addEventListener()`
- have a sense of the different kinds of events (mouse, keyboard, browser, window)
  - understand what an event handler is, i.e. what "callback" functions are, and the two ways to pass a function as an argument to another function: 1) using a pre-existing named function, and 2) using an anonymous function
- understand the event object passed as an argument to event handlers by the browser, how to use expect and use such an argument, and the kind of event information it contains
- 💗 __jQuery__ 💗:
  - know how to link to the jQuery JS library in your HTML file, and in which order to link to jQuery vs your own code files
  - know the jQuery equivalents for the vanilla DOM access methods
  - know the jQuery way to get & set attributes using `.attr()`, get & set element contents using `.html()` and `.text()`, and get & set style properties using `.css()`
  - understand the concept of "implicit iteration" in jQuery
  - understand the difference between vanilla DOM node objects and jQuery result collections, and how to convert between both
  - understand when you might need the `.each()` method, and how the special variable `this` is used in this context
  - know how to attach event handlers to DOM elements the jQuery way, using `.on()`, and how `this` behaves inside an jQuery event handler
  - know the basics of jQuery animations using `.animate()`
  - know how to use `$(document).ready()` to wrap your code for DOM readiness






