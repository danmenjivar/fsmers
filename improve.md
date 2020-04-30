# Current State & Future Improvements

Hi there dolphin, if you're looking to expand this project, this guide details how this project currently works and suggestions for future improvements.

## Built With
* html, CSS, & Javascript
* [Bootstrap 4](https://getbootstrap.com) - *Web Framework*
* [JQuery](https://jquery.com) - *js library for html editing*  
* [p5.js](https://p5js.org) - *js library for drawing*

We came into this project without much web development experience. So fret not, if you want to improve those skills this is a great way to start. html, css, and Javascript are the basic building blocks of web development. If you know Java, you should be fine adapting to Javascript. HTML provides the basic structure of the only webpage this project uses, and CSS styles that page. Bootstrap is a library that allows us custom dialog-boxes and buttons. Overall, it improves the appearance of the page. JQuery is library that serves as a shorthand for accessing elements in our project. We didn't always use it, but we inherited the project with many uses of it. p5.js is what powers the drawing part. There are a ton of resources describing everything you can do with it. It's flexible and easy enough for anyone to pick up.


## How to Set Your Development Environment
Keep in mind these suggestions were written April 2020, so better solutions may be available.
We recommend you use [Visual Studio Code](https://code.visualstudio.com/) for these reasons:
- Lightweight and works on Mac and Windows, plus it's free
- Built-in Git Support makes it super easy to commit & push frequently
- With the built-in Javascript linter (or if you'd prefer download a different one from the marketplace) you can save a lot of time catching errors in your code before running it
- Get the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    - With this, you just hit a button and it instantly starts hosting the webapp, any code changes reflect in real-time

## How does all this code work?
This project can be broken up into 2 major parts: the drawer & the simulator, although some overlap between the two do occur.
1. The Drawing Part
    - sketch.js: is how the html and the canvas are linked, all event handlers run here
    - DFADrawer: this is what actually happens on screen. It is made up of StateCircle & StateArc objects
        - StateCircle: defines a state and how it connects to another state. In it are the coordinates for drawing this state
        - StateArc: defines the transitions from what state you start and to what state you end at
        - Both of these break down further, but we'd recommend not changing anything further down since that's just declaring how these objects should be drawn by p5.js
    - DFA: an instance of DFA called sysDFA is updated every time the user clicks on settings with what they've drawn
    - SettingsHandler: this creates the dialog box for settings where you can edit the alphabet and transitions
        - Upon creation of the dialog box, the handler asks DFADrawer for what changes have occurred and updates the dialog box
        - Upon submission of the dialog, Handler informs DFADrawer of any transitions that have changed and updates the sysDFA alphabet
2. Simulating Aspect
    - BatchTestingHandler
3. Everything Else
    - Addons: these are the dependencies of the libraries that make the application run
    - Backend: These classes are the event handlers for the dialog boxes (or modals as bootstrap calls them)
        - BatchTestingHandler: connects to the *Build Test* button
            - creates the Checker to run the simulation based on Drawer (i.e. the user's design)
            - displays the results of the test in a table
            - animates the sliders in the testing modal
            - validates that the string(s) entered are part of the alphabet
        - ClearAllHandler: connects to the *Clear All* button
            - Clears the canvas by calling a method in Drawer
        - DFASettingsHandler: connects the *DFA Settings* button
            - builds the dialog box using drawer to reflect current changes
            - on save, updates drawer
            - When changing the alphabet there is a listener that fires once the user clicks away from the input box that updates the transition table below it
        - Class/DFA: the middleman holding sysDFA
            - there is a constant need for cross class communication, sysDFA is an instance of DFA that serves this purpose
            - also defines the initial DFA that loads up when you start the app
            - This would be the basis for export/import to JSON
        - Graphics/StateArc and StateCircle
            - Define the State Drawing objects in p5.js and their accompanying StateArcs
            - We kept these mostly untouched, you should really only edit up to the Drawer layer of abstraction since these 2 objects are what Drawer would hold and simply define how the objects look and interact on the canvas for dragging, all other interactions are handled in Drawer
        - HTML & CSS: define the web page look & structure
        - tcan jpegs
            - These images are the hitbox for deleting states

## TODO
The following is a list of features we didn't have the time for but would further improve this project
- [ ] Export your drawing to jpeg or png 
    - Relatively easy since p5.js supports this
- [ ] Export your FSM design to JSON 
    - the code in drawer already packs the drawing into a Javascript object
- [ ] Import JSON FSM design to App 
    - unpacking and parsing the JSON is supported, this is how we load the - example FSM at the beginning
- [ ] NFA's 
    - we don't support the whole set of NFA's because javascript is single threaded, to do simultaneous multi-threaded simulations, you'd need to handle the testing server-side
- [ ] Undo/Redo 
    - we discussed  this, it's not too hard, you'd pack into a JSON the state of drawer during every change and push it on the stack, undo pops from the stack, any change after an undo clears the stack, biggest problem was limited time for us
- [ ] Save progress on to your computer
    - right now: when you move away from the page everything loads back as it was at the very beginning
