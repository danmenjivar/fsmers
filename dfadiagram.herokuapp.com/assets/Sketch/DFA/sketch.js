let selectObject;
var zoom = 1;
var zMin = 0.01;
var zMax = 9.00;
var sensitivity = 0.00005;
let canZoom = true;
let drawer = new DFADrawer(subesh);
let img;

function preload() {
  img = loadImage('assets/tcan2.jpg');
}


function setup() {
  let canvas = createCanvas(2000, 900);
  canvas.parent('parent');
  graphicsItem.item.push(drawer);
  let txt = createDiv('To test your diagram, scroll to the <b>DFA Testing Environment</b>');
  txt.id("curStr");
  txt.position(50, 500);
  noLoop();
}

function draw() {
  // put drawing code here
  background(255);
  //rect(0,0,300,150); //the top left rectangle x=300,y=150
  //rect(500,0,150,150); //the "trash box"
  drawNewStateBox();
  scale(zoom);
  graphicsItem.draw();
}

function drawNewStateBox() {
  let nextQ = "q" + subesh.state.length;
  stroke(0, 0, 0);
  textAlign(CENTER, CENTER);
  strokeWeight(1.5);
  rect(305, 5, 100, 100); //draw container
  ellipse(355, 55, 70); // draw state to be added
  text(nextQ, 355, 55);
}



function touchStarted() {
  if (touches.length) {
    // console.log(touches);
    touchCache.push({
      x: touches[touches.length - 1].x,
      y: touches[touches.length - 1].y
    });
    // console.log(touchCache);
  }
  // console.log(mouseX + " " + mouseY);
  // console.log(mouseX * zoom + " " + mouseY * zoom);
  // console.log(mouseX / zoom + " " + mouseY / zoom);
  redraw();
}


function touchMoved(e) {
  if (touchCache.length === 2) {
    //console.log('SDSDS');
    let d1 = dist(touchCache[0].x, touchCache[0].y, touchCache[1].x, touchCache[1].y);
    let d2 = dist(touches[0].x, touches[0].y, touches[1].x, touches[1].y)
    console.log(d1 + " " + d2);
    //console.log(d1 + " " + d2);
    if (d1 > d2 && Math.abs(d1 - d2) > 5) {
      zoom -= 0.1;
      //console.log("HEREWEW");
    } else if (d1 < d2 && Math.abs(d1 - d2) > 5) {
      zoom += 0.1;
    }
    zoom = constrain(zoom, zMin, zMax);
    canZoom = false;

    //mouseReleased();
    touchCache = [];
    redraw();
    return false;
  }
  // //console.log('touch');
  if (!selectObject) {
    selectObject = graphicsItem.handleDrag(mouseX / zoom, mouseY / zoom);

  } else {
    ////console.log('here');
    selectObject.setPos(mouseX / zoom, mouseY / zoom);

  }
  // if(mouseX < 75 && mouseY < 85 ){ //if the mouse
  //   console.log(graphicsItem);
  //   this.deleteState();
  // }
  redraw();
  if (selectObject) {
    return false;
  }
}

 var shift = false;

 document.onkeydown = function(e) {
  var key = crossBrowserKey(e);
  if (key == 16){
    shift = true;
    console.log(shift);
  }
}
document.onkeyup = function(e){
  var key = crossBrowserKey(e);

  if(key == 16){
    shift = false;
    console.log(shift);
  }
}

function crossBrowserKey(e){
  e = e || window.event;
  console.log(e.keyCode);
  return e.which || e.keyCode;
}
// function deleteState() {
//   for(let i = 0; i < DFATuples.state.length; i++){
//     if (DFATuples.state[i] == this.stateName)
//     {    //targets the right state
//       if (DFATuples.state[i] == DFATuples.initial[0]) //checks if initial
//       {
//         graphicsItem.item[0].dfa.state.shift(); //removes the initial

//         //console.table(DFATuples.state);
//         console.table(DFATuples);
//         DFATuples.transition = {}; //removes all transitions
//         subesh.transition = {}; //need fix where it's only attaching transitions 
//         console.table(DFATuples)
//         DFATuples.initial[0] = DFATuples.state[i]; //makes new initial array
//         //this.nameChange();
//         break;
//       }
//       else if (DFATuples.state[i] == DFATuples.final[0]) //checks if final
//       {
//         DFATuples.state.pop();
//         DFATuples.transition = {}; //removes all transitions
//         subesh.transition = {}; //need fix where it's only attaching transitions 

//         DFATuples.final[0] = DFATuples.state[i-1];
//         //this.nameChange()
//         break;
//       }
//       else{ //if some middle state
//         console.table(DFATuples)
//         DFATuples.state.splice(DFATuples.state.indexOf(DFATuples.state[i]),1);
//         //transition[state] = {};
//         DFATuples.transition[DFATuples.state[i]] = {}; //removes all transitions
//         subesh.transition[DFATuples.state[i]] = {}; //need fix where it's only attaching transitions 
//         console.table(DFATuples)
        
//         //this.nameChange()
//         break;
//       }
//     }
//   }

//   subesh.map(DFATuples);
//   drawer.createDiagram();
//   redraw();

// }

function touchEnded() {
  //console.log('release');
  touchCache.pop();
  if (selectObject)
    selectObject = undefined;
  canZoom = true;
  redraw();
}

function mouseWheel(event) {
  if (event.ctrlKey) {
    zoom += sensitivity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    //console.log(zoom);
    redraw(); //uncomment to block page scrolling
    return false;
  }
}



//Graphics Holder

let touchCache = [];
let graphicsItem = {
  item: [],
  draw: function() {
    image(img, 0, 0); //the trashcan 
    this.item.forEach((my) => {
      if (my.children)
        my.children.forEach(item => item.draw());
      my.draw();
    });
  },



  handleDrag: function (mouseX, mouseY) {

    let areAllModalsClosed = !$('#inputModal').is(':visible') && !$('#settingsButtonModal').is(':visible');

    if (!areAllModalsClosed) {
      return false;
    }

    let index, index2;
    this.item.every((item, ind) => {
      if (item.children) {

        if (!item.children.every((item, ind1) => {

            if (item.handleDrag(mouseX, mouseY)) {
              ////console.log("children");
              index2 = ind1;
              index = ind
              return false;

            } else
              return true;

          })) {

          return false;
        } else {
          ////console.log("how");
        }

      }

      if (item.handleDrag && item.handleDrag(mouseX, mouseY)) {
        index = ind;
        return false;

      } else
        return true;


      return true;

    });

    ////console.log(index2);
    if (index2 !== undefined)
      return this.item[index].children[index2];
    else if (index)
      return this.item[index];

  }



};