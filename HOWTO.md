# General Instructions Guide
## Building & Designing DFA instructions
- To **add a state**, double click anywhere on the canvas
- To set a state as an **accept state**, double click it
- To set a state as the **starting state**, control+click it 
- To **add a transition** between states, shift-click from the starting state and drag to the ending state
- To **move a state**, click and drag a state across the canvas
- To **edit the valid alphabet** or **edit a transition** click on DFA Settings on the menu bar
    - *You may need to expand the hamburger menu*
    - Click on the blue **Save Changes** to save your changes or cancel out
        - If you receive an error after you clicked **Save Changes**:
            - ensure there are no empty entries in your transitions, this is a [DFA](https://en.wikipedia.org/wiki/Deterministic_finite_automaton) after all 
        
- To clear your canvas, click **Clear All** on the menu bar
    - *Once more, you may need to expand the hamburger menu*
## Running Your DFA
1. Ensure that you have declared:
    - 1 starting state
    - at least 1 accept state
        - note: the system will allow you to run simulations without declaring any accept states, but your test will reject all your inputted strings
    - all transitions
        - note: DFA's require transitions on all characters in the alphabet set
2. Click the green **Build Test** on the DFA Testing Environment
    - Depending on your window size, this is either:
        - Directly below your canvas
        - Directly yo the right of your canvas
            - Personally, we recommend you resize your window so that it is to your right
3. In the new pop-up window, enter the strings you'd like to test separated by a comma
    - note: you may enter 0 or many strings
4. Select how fast the simulation should run from state to state
    - Lower, faster (left)
    - Higher, slower (right)
4. Click **Begin Test** and watch the magic happen
