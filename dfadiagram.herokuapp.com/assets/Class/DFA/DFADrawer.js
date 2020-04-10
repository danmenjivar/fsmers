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
 * @author Subesh Bhandari
 * @version 0.1
 */
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
      throw ("Subesh");
    }
  }

  clearCanvas() {
    this.states = [];
    this.links = [];
    this.children = [];
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

  //TODO: rename states 
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
    console.log(state_circle_obj);
    console.log(this.children);
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
    console.log(this.children);

  }


  addStateCircle(state_circle_obj) {
    this.states.push(state_circle_obj);
    this.children.push(state_circle_obj);
  }


  /**
   * createStart - Set the initial state with and arrow
   *
   * @return {undefined}
   */
  createStart() {
    //initial state (initial array length only 1)
    let initial = this.dfa.initial[0];
    console.log("createStart() " + this.dfa.initial);
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
    } catch (e) {
      alert('There seems to be an Error in the input.\n Please fill in the inputs properly!');
      // commented these stuff out, not sure why everything gets removed if error
      // this.states = [];
      // this.links = [];
      // this.children = [];
    }
  }
  draw() {}
}