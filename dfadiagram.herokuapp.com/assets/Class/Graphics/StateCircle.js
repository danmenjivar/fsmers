

class StateCircle {
  constructor(stateName,x,y) {
    this.stateName = stateName;
    this.center = {
      x:x,
      y:y
    }
    this.diameter = 80;
    this.isStart = false;
    this.isFinal = false;
    this.link = {to:[],from:[]};
    this.color = {r:0,g:0,b:0};
    this.fill = {r:255,g:255,b:255};
  }
  addLinkTo(link) {
    this.link.to.push(link);
  }
  addLinkFrom(link) {
    this.link.from.push(link);
  }

  hasLinkFrom(state) {
    let link  = this.link.from;

    let has = link.find(item => {
      return item.state == state;
    });

    if(has)
      return has;
    else
      return false;
  }

  hasLinkTo(state) {
    let link  = this.link.to;

    let has = link.find(item => {
      return item.state == state;
    });

    if(has)
      return has;
    else
      return false;
  }

  draw() {
    push();
    stroke(this.color.r,this.color.g,this.color.b);
    strokeWeight(1.5);
    fill(this.fill.r,this.fill.g,this.fill.b);
    ellipseMode(CENTER);
    ellipse(this.center.x,this.center.y,this.diameter);
    pop();
    if(this.isFinal) {
      this.drawFinal();
    }
    if(this.isStart) {
      this.drawStart();
    }
    this.drawText();
  }

  drawStart() { //draws starting state
    push();
    stroke(this.color.r,this.color.g,this.color.b);
    fill(100);

    let p = {x : this.center.x - this.diameter/2,y: this.center.y};
    triangle(p.x,p.y,p.x-8,p.y-8,p.x-8,p.y+8);
    stroke(100);
    strokeWeight(1.5);
    line(p.x-8,p.y,p.x-50,p.y);
    pop();
  }

  drawFinal() { //draws the final state
    push();
    stroke(this.color.r,this.color.g,this.color.b);
    strokeWeight(1.5);
    fill(this.fill.r,this.fill.g,this.fill.b);
    ellipseMode(CENTER);
    ellipse(this.center.x,this.center.y,this.diameter-10);
    pop();
  }
  drawText() {
    push();
    stroke(this.color.r,this.color.g,this.color.b);
    text(this.stateName,this.center.x - this.stateName.length,this.center.y +  this.stateName.length);
    pop();
  }
  handleDrag(mouseX,mouseY) {
    if(dist(mouseX,mouseY,this.center.x,this.center.y) < this.diameter/2) {
      this.dragedPoint = {x:this.center.x - mouseX,y: this.center.y - mouseY};
      this.center.x = mouseX + this.dragedPoint.x;
      this.center.y = mouseY+ this.dragedPoint.y;
      return true;
    }
    else{
      return false;
    } 
  }
  setPos(x,y) {
    this.center.x = x + this.dragedPoint.x;
    this.center.y = y + this.dragedPoint.y;
    //this is what will probably help deleting the state
    if(this.center.x < 75 && this.center.y < 85){
      this.deleteState();
      // this.center.x = 575;
      // this.center.y = 75;
    }
  }

  deleteState() {
    //console.log(DFATuples);
    for(let i = 0; i < DFATuples.state.length; i++){
      if (DFATuples.state[i] == this.stateName)
      {    //targets the right state
        //console.log(5+2);
        if (DFATuples.state[i] == DFATuples.initial[0]) //checks if initial
        {
          DFATuples.state.shift(); //removes the initial

         // console.table(subesh.state);
          DFATuples.transition = {}; //removes all transitions
          subesh.transition = {}; //need fix where it's only attaching transitions 
          DFATuples.initial[0] = DFATuples.state[i]; //makes new initial array
          break;
          /*
          list of things that i used before
          //console.log("The thingy: " + DFATuples.state[1]);
          //delete DFATuples.transition[DFATuples.initial[0]];
          //delete DFADrawer.state[i];
          //DFATuples.state[0] = DFATuples.initial[0]; 
          delete DFATuples.state[i]; //dfasettingshandler 
          delete subesh.state[i];
          */
        }
        else if (DFATuples.state[i] == DFATuples.final[0]) //checks if final
        {
          DFATuples.state.pop();
          DFATuples.transition = {}; //removes all transitions
          subesh.transition = {}; //need fix where it's only attaching transitions 

          DFATuples.final[0] = DFATuples.state[i-1];
          break;
        }
        else{ //if some middle state
                   
          DFATuples.state.splice(DFATuples.state.indexOf(DFATuples.state[i]),1);
          DFATuples.transition = {}; //removes all transitions
          subesh.transition = {}; //need fix where it's only attaching transitions 
          break;
         // DFATuples.state[i] = DFATuples.state[i+1];
        }
        
        
        for(let j = 0; j < DFATuples.state.length; j++) //changes the names of the states to q0
        {
          DFATuples.state[j] = `q${j}`;
        }
        //DFATuples.initial[0] = DFATuples.state[0];
        DFATuples.final[0] = DFATuples.state[DFATuples.state.length - 1];

        //subesh.state[i] = subesh.state[i+1];
        // console.table(DFATuples.initial);
        // console.table(DFATuples.state);
        // console.table(DFATuples.transition);

        //console.log("The state in question: " + DFATuples.state[i]);
        //console.log("The final: " + DFATuples.final[0]);
        //console.log(subesh.state);
      }
    }

    subesh.map(DFATuples);
    drawer.createDiagram();
    redraw();

  }

  setFinal() {
    this.isFinal = true;
  }
  setStart() {
    this.isStart = true;
  }

}
