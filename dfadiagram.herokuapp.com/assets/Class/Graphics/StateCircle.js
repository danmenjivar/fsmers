

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
    if(this.center.x < 300 && this.center.y < 150){
      this.deleteState();
      // this.center.x = 575;
      // this.center.y = 75;
    }
  }

  deleteState() {
    // for(var i = 0; i < subesh.state.length; i++){
    //   if (DFATuples.state[i] == this.stateName)
    //   {
    //     DFATuples.state[i] == null;
    //     subesh.state[i] == null;
    //   }
    // }
    


    drawer.clearCanvas();
    redraw();
    DFATuples.state = [];
    subesh.state = [];
    DFATuples.initial = [];
    subesh.initial = [];
    DFATuples.alphabet = [];
    subesh.alphabet = [];
    DFATuples.final = [];
    subesh.final = [];
    DFATuples.transition = {};
    subesh.transition = {};
    // this.stateName = "q100";

  }

  setFinal() {
    this.isFinal = true;
  }
  setStart() {
    this.isStart = true;
  }

}
