# Current State & Future Improvements

Hi there dolphin, if you're looking to expand this project, this guide details how this project currently works and suggestions for future improvements.

## Built With
* html, CSS, & javascript
* [Bootstrap 4](https://getbootstrap.com) - *Web Framework*
* [JQuery](https://jquery.com) - *js library for html editing*  
* [p5.js](https://p5js.org) - *js library for drawing*

We came into this project without much web development experience. So fret not, if you want to improve those skills this is the best way to start. html, css, and javascript are the basic building blocks of web development. If you know Java, you should be fine adapting to javascript. Html provides the basic structure of the only webpage this project uses, and CSS styles the page. Bootstrap is a library that allows us custom dialog-boxes and buttons. Overall, it improves the appearance of the page. JQuery is a shorthand for accessing elements in our project. We didn't always use it, but we inherited the project with many uses. p5.js is what powers the drawing aspect of our project. There are a ton of resources describing everything you can do with it. It's flexible and easy enough for anyone to pick up.

Okay, our project can be largely broken up into 2 parts:
1. Drawing aspect (Canvas)
    - sketch.js: is how the html and the canvas are linked, all handlers run here
    - DFADrawer: this is what actually happens on screen. It is made up of StateCircle & StateArc objects
        - StateCircle: defines a state and how it connects to another state. In it are the coordinates for drawing this state
        - StateArc: defines the transitions from what state you start and to what state you end at
        - Both of these break down further, but we'd recommend not changing anything further down since that's just declaring how these objects should be drawn by p5.js
    - DFA: an instance of DFA called sysDFA is updated every time the user clicks on settings with what they've drawn
    - SettingsHandler: this creates the dialog box for settings where you can edit the alphabet and transitions
        - Upon creation of the dialog box, the handler asks DFADrawer for what changes have occurred and updates the dialog box
        - Upon submission of the dialog, Handler informs DFADrawer of any transitions that have changed and updates the sysDFA alphabet
2. Simulating Aspect
    -BatchTestingHandler