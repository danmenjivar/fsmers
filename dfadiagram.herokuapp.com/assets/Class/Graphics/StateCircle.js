

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
<<<<<<< HEAD
    
    // If a state is in this area... delete
    // if(this.center.x < 75 && this.center.y < 85){
    //   this.deleteState();
    // }
    //this.nameChange();
  }

  // deleteState() {
  //   //console.log(DFATuples);
  //   for(let i = 0; i < DFATuples.state.length; i++){
  //     if (DFATuples.state[i] == this.stateName)
  //     {    //targets the right state
  //       if (DFATuples.state[i] == DFATuples.initial[0]) //checks if initial
  //       {
  //         DFATuples.state.shift(); //removes the initial

  //         //console.table(DFATuples.state);
  //         console.table(DFATuples)
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
        
      
  //       //subesh.state[i] = subesh.state[i+1];
  //       // console.table(DFATuples.initial);
  //       // console.table(DFATuples.state);
  //       // console.table(DFATuples.transition);

  //       //console.log("The state in question: " + DFATuples.state[i]);
  //       //console.log("The final: " + DFATuples.final[0]);
  //       //console.log(subesh.state);
  //     }
  //   }

  //   subesh.map(DFATuples);
  //   drawer.createDiagram();
  //   redraw();

  // }

  nameChange(){
    length = DFATuples.state.length;
    for(let j = 0; j < length; j++) //changes the names of the states to q0
    {
      if (DFATuples.state[j] != `q${j}`){
        //console.log(DFATUPLES.state[j]);
        DFATuples.state[j] = `q${j}`;
      }
      
    }
    DFATuples.final[0] = DFATuples.state[DFATuples.state.length - 1];
=======
>>>>>>> Dan
  }

  setFinal() {
    this.isFinal = true;
  }
  setStart() {
    this.isStart = true;
  }

}
