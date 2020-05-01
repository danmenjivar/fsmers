let selectObject;
var zoom = 1;
var zMin = 0.01;
var zMax = 9.0;
var sensitivity = 0.0005;
let canZoom = true;
let drawer = new DFADrawer(sysDFA); // which at the start is the initialDFA defined in DFA
let img;

function preload() {
  img = loadImage("assets/tcan2.jpg");
}
let canvas;
function setup() {
  canvas = createCanvas(2000, 900);
  canvas.parent("parent");
  graphicsItem.item.push(drawer);

  const cnv = document.querySelector('#parent'); // Making sure double click only on canvas
  cnv.addEventListener('dblclick', function (e) {
    if (!e.ctrlKey){ // don't do anything if holding control key
      if(!drawer.doubleClickedState(mouseX, mouseY)){
        drawNewStateBox(mouseX, mouseY);
      }
    }
  });

  let txt = createDiv(
    `<b>Instructions</b><br>
    To add a state to your diagram, double click anywhere.<br>
    To set a state as an accept state, double click it.<br>
    To set the starting state, Cntrl+Click it.`
  );
  txt.id("curStr");
  txt.position(50, 500);
  noLoop();
}
// end of setup

function draw() {
  // put drawing code here
  background(255);
  scale(zoom);
  graphicsItem.draw();
}

function drawNewStateBox(x, y) {
  let stateCircleToAdd = new StateCircle(`q${drawer.states.length}`, x, y);
  drawer.addStateCircle(stateCircleToAdd);
  redraw();
}

// Dan: this function is really only useful for debugging, it can't do much else.
//Only uncomment this function and the console.log marked useful to print out
// when a click is first registered, left the code in case it does something else, but doubt it
function touchStarted(event) {
  // if (touches.length) { //Dan: this if will never be true, so not sure why this is even here
  //   console.log(touches);
  //   touchCache.push({
  //     x: touches[touches.length - 1].x,
  //     y: touches[touches.length - 1].y
  //   });
  //   console.log(touchCache);
  // }
  if (event.ctrlKey){
    drawer.cntrClickedState(mouseX, mouseY);
  }
  if (event.shiftKey){
    drawer.shiftClickedState(mouseX, mouseY);
  }
  // console.log(mouseX + " " + mouseY); // USEFUL to see where a touch is first initiated
  // console.log(mouseX * zoom + " " + mouseY * zoom); // not really useful, but tells you the coordinates if they zoomed in
  // console.log(mouseX / zoom + " " + mouseY / zoom); // not really useful, tells you coordinates if they zoomed out, zooming doesn't involve this func at all
  // redraw(); //Dan: this redraw is pretty much pointless, it redraws everytime a click is registered
}

function touchMoved(e) {
  // if (touchCache.length === 2) {
  //   console.log('SDSDS');
  //   let d1 = dist(touchCache[0].x, touchCache[0].y, touchCache[1].x, touchCache[1].y);
  //   let d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
  //   console.log(d1 + " " + d2);
  //   //console.log(d1 + " " + d2);
  //   if (d1 > d2 && Math.abs(d1 - d2) > 5) {
  //     zoom -= 0.1;
  //     //console.log("HEREWEW");
  //   } else if (d1 < d2 && Math.abs(d1 - d2) > 5) {
  //     zoom += 0.1;
  //   }
  //   zoom = constrain(zoom, zMin, zMax);
  //   canZoom = false;

  //   //mouseReleased();
  //   touchCache = [];
  //   redraw();
  //   return false;
  // }
  //console.log('touch');

  if (!selectObject) {
    // if there is no object selected yet, but we've registered a drag
    selectObject = graphicsItem.handleDrag(mouseX / zoom, mouseY / zoom); // try to select an object
  } else {
    selectObject.setPos(mouseX / zoom, mouseY / zoom); // else we've selected an object & we're dragging so move it along the canvas
    redraw(); // redraw the canvas to show it has moved
  }
  // if (selectObject) // wtf, I don't think this does anything
  //   return false;
}

// // shift click stuff
//  var shift = false;

//  document.onkeydown = function(e) {
//   var key = crossBrowserKey(e);
//   if (key == 16){
//     shift = true;
//     console.log(shift);
//   }
// }
// document.onkeyup = function(e){
//   // var key = crossBrowserKey(e);

//   if(key == 16){
//     shift = false;
//     console.log(shift);
//   }
// }

// function crossBrowserKey(e){
//   e = e || window.event;
//   // console.log(e.keyCode);
//   return e.which || e.keyCode;
// }

function touchEnded() {
  // User let's go of let mouse button
  // console.log('release'); // for debugging
  touchCache.pop();
  if (mouseX < 75 && mouseY < 85) {
    drawer.deleteStateCircle(selectObject);
  }
  if (selectObject) selectObject = undefined;
  canZoom = true;
  
  redraw(); // where the magic happens, on the release the new position of the state is drawn


}

// Zoom Function, Initiates when the mouse wheel is spun
function mouseWheel(event) {
  if (event.ctrlKey) {
    // but must also hold down control to zoom, else you just scroll the canvas/page
    zoom += sensitivity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    //console.log(zoom); // for debugging
    redraw();
    return false; // without this return false, it will zoom in/out and scroll the canvas
  }
}

// Graphics Holder
let touchCache = [];
let graphicsItem = {
  item: [],
  draw: function () {
    image(img, 0, 0); // the trashcan
    this.item.forEach((my) => {
      if (my.children) my.children.forEach((item) => item.draw());
      my.draw();
    });
  },

  handleDrag: function (mouseX, mouseY) {
    let allModalsAreClosed = !$("#inputModal").is(":visible") &&
      !$("#settingsButtonModal").is(":visible");

    if (!allModalsAreClosed) {//disable dragging elements on the canvas if a dialog box (modal) is open
      return false;
    }

    let index, index2;
    this.item.every((item, ind) => {
      if (item.children) {
        if (
          !item.children.every((item, ind1) => {
            if (item.handleDrag(mouseX, mouseY)) {
              ////console.log("children");
              index2 = ind1;
              index = ind;
              return false;
            } else return true;
          })
        ) {
          return false;
        } else {
          ////console.log("how");
        }
      }

      if (item.handleDrag && item.handleDrag(mouseX, mouseY)) {
        index = ind;
        return false;
      } else return true;

      return true;
    });

    ////console.log(index2);
    if (index2 !== undefined) return this.item[index].children[index2];
    else if (index) return this.item[index];
  },
};