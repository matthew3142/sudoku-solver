# sudoku-solver
A webpage with functionality capable of solving a user-input sudoku puzzle.

### Algorithm: How does it work?
1. Collect data from the screen into the code.
2. Verify your input
   1. Go through each square in the board.
   2. If, at any time, one of the three rules is broken, throw an error:
      - Numbers can't appear twice in the same row
      - or column
      - or box
   3. Otherwise, if the code makes it through, begin solving.
3. Collect all empty squares (which are the ones the code can change).
4. Solve
   1. For each empty square, try the lowest possible next number, and move on to the next.
   2. If there is no possible next number, there must have been a wrong choice before, so go back to the previous changeable square with a next possible number, and increment it.
   3. Until we've got back to a blank we can increment, reset everything on the way.
5. Display
   1. As the program is running and going through squares.
   2. ...send their last value to their appropriate cell on the screen.

Hope you like it!
