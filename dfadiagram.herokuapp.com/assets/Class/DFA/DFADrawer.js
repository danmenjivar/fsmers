/**
 * @class - DFADrawer
 * makes a DFA Diagram using the
 * DFA Class combining its tuples with @class StateArc and @class StateCircle.
 * @constructor - Takes one param
 * @param {DFA} dfa Must be of the @class DFA
 * @member this.dfa - The DFA
 * @member this.states - Array of StateCircle
 * @member this.links - Array of StateArcs
 * @member this.children - childrens
 * @author sysDFA Bhandari
 * @version 0.1
 */
let shiftFrom, shiftTo;
class DFADrawer {

  /**
   * constructor - Takes one param
   *
   * @param {DFA} dfa Must be of the @class DFA
   *
   */
  constructor(dfa) {
    this.dfa = dfa;
    this.states = [];
    this.links = [];
    this.children = [];
    //catches error if dfa not defined
    try {
      this.createDiagram();
    } catch (e) {
      //console.log("Unexpected error\n Dfa not defined " + e);
    }
  }

  updateSysDFA(){
    //take the drawer and make a dfa object
    // update the states & transitions that have been added/removed
    let states = [];
    let transitions = {};
    for(let state of this.states){
      states.push(state.stateName);
      transitions[state.stateName] = {}; 
    }
    //for each transition
    this.children.forEach((element) => {
      if (element instanceof StateArc){
        for(let i = 0; i < element.text.length; i++){
          transitions[element.start.stateName][element.text[i]] = [element.end.stateName][0];
        }
      }
    });
    sysDFA.state = states;
    this.fixTransitions(transitions);
    sysDFA.transition = transitions;
  }

  fixTransitions(transition_dict){
    for(let transition in transition_dict){
      if(Object.keys(transition_dict[transition]).length == 0){
        // we must pad it with empty
        for(let alpha in sysDFA.alphabet){
          transition_dict[transition][alpha] = "";
        }
      }
    }
  }

  //takes the current sysDFA transitions and edits the current ones
  updateDrawing(){
   let backup = [this.states.map((x) => x), this.children.map((x) => x)];
   let dfabackup = {};
   Object.assign(this.dfa, dfabackup);

    for(let i = 0; i < this.states.length; i++){ // for every state
      // remove it's linked transitions
      this.states[i].link.to = [];
      this.states[i].link.from = [];
    }

    // remove all state arcs
    let element;
    for (var i = this.children.length - 1; i >= 0; i--){
      element = this.children[i];
      if (element instanceof StateArc){
          this.children.splice(this.children.indexOf(element), 1);
      }
    }

    // make new links
    this.dfa = sysDFA;
    let crashed = this.createLink();
    if (crashed){
      this.states = backup[0].map((x)=>x);
      this.children = backup[1].map((x)=>x);
      Object.assign(dfabackup, this.dfa);
      alert('Error: there seems to be missing data, please check your settings.');
      return true;
    }

    redraw();
    return false;
  }


  /**
   * createDiagram - make a diagramatic view of the DFA tuples
   * @param {none} NONE no param
   * @return {null} no return
   */
  createDiagram() {
    this.states = [];
    this.links = [];
    this.children = [];
    //console.log(DFATuples);
    //Check if dfa defined or not
    if (this.dfa) {

      //First - Make StateCircle
      this.createStateCircle();

      //Second identify start and final state
      this.createStart();
      this.createFinal();

      //Third - createLink (transitions)
      this.createLink();
    } else {
      throw ("sysDFA");
    }
  }
    //TODO: inputting stuff in transition
  addTransition(fromState, toState, symbol){ 
    let states = this.states;
    let from, to;
    let sameFlag = false;
    if (fromState === toState){
      sameFlag = true;
    }
    for (let curState of states){ //Getting the right states
      if (curState.stateName === fromState){
        from = curState;
        if (sameFlag){ //if it's a transition on itself, to and from are the same.
          to = curState;
          sameFlag = false;
          break;
        }
      }
      else if(curState.stateName === toState){
        to = curState;
      }
    }
    this.dfa.transition[from.stateName][symbol] = to.stateName;
    this.updateDrawing();
  }

  clearCanvas() {
    this.states = [];
    this.links = [];
    this.children = [];
    sysDFA.state = [];
    sysDFA.initial = [];
    sysDFA.final = [];
    sysDFA.transition = {};
  }

  /**
   * createStateCircle - Make StateCircles of the Dfa states.
   *
   * @return {null}  No return
   */
  createStateCircle() {
    //state points to dfa.state (for convenience)
    let states = this.dfa.state;

    //Initial state position
    let posX = 100;
    let posY = 300;

    //looping through each state
    states.forEach((state) => {
      //A new State Circle
      let stateCircle = new StateCircle(state, posX, posY);

      //Appending to states
      this.states.push(stateCircle);

      //Appending children so that they can be drawn
      this.children.push(stateCircle);

      //Incrementing the posX  by 300 so that they are 300 pixel away
      posX += 300;
    });
  }

  deleteStateCircle(state_circle_obj){
    this.states.splice(this.states.indexOf(state_circle_obj), 1);
    this.children.splice(this.children.indexOf(state_circle_obj), 1);
    this.amendDiagramTransitions(state_circle_obj);
    this.amendDiagramNames(state_circle_obj);
  }

  amendDiagramTransitions(state_circle_obj) {
    let element;
    for (var i = this.children.length - 1; i >= 0; i--){
      element = this.children[i];
      if (element instanceof StateArc){
        if (element["start"] == state_circle_obj || element["end"] == state_circle_obj){
          this.children.splice(this.children.indexOf(element), 1);
        }
      }
    }
  }

  amendDiagramNames(state_circle_obj){
    // console.log(state_circle_obj);
    // console.log(this.children);
    if (state_circle_obj.isFinal){ // if you delete the last state, you're good
      // TODO maybe notify the user they've deleted their final state, should add a new state as final to test
      return;
    } else if (state_circle_obj.isStart){ // if you delete the first state, just decrement every other state by 1
      //notify user they need to redeclare a new start state
      this.children.forEach((element) => {
        if (element instanceof StateCircle){
          element.stateName = element.stateName.replace(/\d+/g, function(match) {
            return parseInt(match) - 1;});
        }
      });
    } else { // if you delete a middle state, all the states following it get decremented
      var delStateNum = state_circle_obj.stateName.match(/\d+/);
      this.children.forEach((element) => {
        if (element instanceof StateCircle){
          if (element.stateName.match(/\d+/) > delStateNum){
            element.stateName = element.stateName.replace(/\d+/g, function(match) {
              return parseInt(match) - 1;});
          }
        }
      });


    }
    // console.log(this.children);

  }


  addStateCircle(state_circle_obj) {
    let nameAdded = state_circle_obj.stateName;
    this.states.push(state_circle_obj);
    this.children.push(state_circle_obj);
    sysDFA.state.push(nameAdded);
  }

  doubleClickedState(mouseX, mouseY){
    let doubleClicked = false;
    for (let i = 0; i < this.states.length && !doubleClicked; i++){
      if (dist(mouseX, mouseY, this.states[i].center.x, this.states[i].center.y) < this.states[i].diameter){
        this.states[i].toggleFinal();
        doubleClicked = true;
      }
    }
    redraw();
    return doubleClicked;
  }

  cntrClickedState(mouseX, mouseY){
    let cntrClicked = false;
    for (let i = 0; i < this.states.length && !cntrClicked; i++){
      if (dist(mouseX, mouseY, this.states[i].center.x, this.states[i].center.y) < this.states[i].diameter){
        if (!this.states[i].isStart){
          // Make the current start no longer the start, and make this state the start
          this.amendStartState();
          this.states[i].setStart();
        }
      }
    }
    redraw();
  }

  shiftClickedState(mouseX, mouseY){
    let shiftClicked = false;
    
    
    for (let i = 0; i < this.states.length && !shiftClicked; i++){
      if (dist(mouseX, mouseY, this.states[i].center.x, this.states[i].center.y) < this.states[i].diameter){
        //open dialog box
        if (shiftFrom == undefined){
          shiftFrom = this.states[i].stateName;
        }
        else{
          shiftTo = this.states[i].stateName;
          
          //$("#addTransModal").modal('show');
          this.addTransition(shiftFrom, shiftTo, 0);
          shiftFrom = undefined; //resets states
          shiftTo = undefined;
        }
      }
    }
  }

  amendStartState(){
    let ogStart = this.states.find(function(state) {
      return state.isStart;
    });
    if (ogStart){
      ogStart.isStart = false;
    }
  }


  /**
   * createStart - Set the initial state with and arrow
   *
   * @return {undefined}
   */
  createStart() {
    //initial state (initial array length only 1)
    let initial = this.dfa.initial[0];
    // console.log("createStart() " + this.dfa.initial);
    //list of StateCircles
    let states = this.states;

    /**finding the initial State and applying isStart = true (done by @function StateCircle.setStart())
     * can only be one
     */
    states.find((state) => {
      return state.stateName === initial;
    }).setStart();

  }


  /**
   * createFinal - Creates the final States (double circle)
   *
   * @return {undefined}
   */
  createFinal() {
    //list of Final
    let final = this.dfa.final;

    //list of StateCircle
    let states = this.states;

    //Making final States

    //Looping through States
    states.forEach((state) => {
      //checking if the state is final or not
      final.every((final) => {

        if (final == state.stateName) {
          state.setFinal();
          return false;
        }
        return true;
      });
    });

  }

  /**
   * createLink - Creates a link among the StateCircle with the help of DFA.transition (this.dfa.transition)
   *
   * @return {undefined}
   */
  createLink() {
    try {
      let states = this.states;

      let transition = this.dfa.transition;

      for (let stateName in transition) {
        for (let input in transition[stateName]) {

          let to = states.find((state) => {
            return state.stateName === transition[stateName][input];
          });

          let from = states.find((state) => {
            return state.stateName === stateName;
          });

          let reflect = undefined;
          let link;
          let linkFrom = from.hasLinkFrom(to);
          let linkTo = from.hasLinkTo(to);
          if (linkFrom) {
            reflect = 1;
            //console.log(linkFrom);
          }

          if (linkTo) {
            //console.log("It has");
            linkTo.input.push(input);
            linkTo.link.text.push(input);
          } else {
            link = new StateArc(from, to, input, reflect);
            from.addLinkTo({
              state: to,
              link: link,
              input: [input]
            });
            to.addLinkFrom({
              state: from,
              link: link,
              input: [input]
            });
            this.children.unshift(link);
          }
          // console.log(`${from.stateName} -- ${input} -- > ${to.stateName}`);
        }
      }
      return false;
    } catch (e) {
      return true;
    }
  }
  draw() {}
}