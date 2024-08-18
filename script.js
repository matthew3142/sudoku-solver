let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let solutions
let square;
let squareX;
let squareY;
let num;
let validfound;
let userinput;

function possible(row, col, number, grid) {

  // check row
  for (var x = 0; x < 9; x++) {
    if ((grid[row][x] == number) && (x != col)) {
      return false
    }
  }

  // checked column
  for (var y = 0; y < 9; y++) {
    if ((grid[y][col] == number) && (y != row)) {
      return false
    }
  }


  // check box
  var x0 = Math.floor(col / 3) * 3;
  var y0 = Math.floor(row / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if ((grid[y0 + i][x0 + j] == number) && (y0 + i != row) && (x0 + j != col)) {

        return false;
      }
    }
  }
  return true
}

function verify(grid) {
  for (var y = 0; y < 9; y++) {
    for (var x = 0; x < 9; x++) {
      place = document.getElementById((9 * y + x).toString()).value;
      if (place != "") {
        if (!(possible(y, x, parseInt(place), grid))) {
          return false
        }
      }
    }
  }
  return true;
}

function timeout(n, callback) {
  setTimeout(callback, n);
}


function lastemptysquare(array, value) {
  let max_num = 0;
  for (let num of array) {
    if (num < value && num > max_num) {
      max_num = num;
    }
  }
  return max_num;
}

let empty = [];

function findsolutions() {
  document.getElementById("status").innerHTML = "Calculating..."
  var grid = [];
  for (var i = 0; i < 9; i++) {
    grid[i] = [];
    for (var j = 0; j < 9; j++) {
      grid[i][j] = 0;
      if (document.getElementById((9 * i + j).toString()).value != "") {
        grid[i][j] = parseInt(document.getElementById((9 * i + j).toString()).value);
      }
    }
  }

  if (verify(grid)) {
    solve(grid);
    document.getElementById("status").innerHTML = "<span class='good'>Complete :)</span>"
  } else {
    document.getElementById("status").innerHTML = "<span class='bad'>Error: invalid starting grid</span>"
  }

}

function solve(grid) {

  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (grid[y][x] == 0) {
        empty.push(9 * y + x);
        document.getElementById((9 * y + x).toString()).style.color = "white";
        document.getElementById((9 * y + x).toString()).style.fontWeight = "bold";
        document.getElementById((9 * y + x).toString()).style.background = "#114";
      }
    }
  }


  square = 0;
  while (square < 81) {
    if (empty.includes(square)) {

      squareX = square % 9;
      squareY = Math.floor(square / 9);
      num = grid[squareY][squareX] + 1;
      validfound = 0;

      while (num <= 9) {


        if (possible(squareY, squareX, num, grid)) {

          grid[squareY][squareX] = num;
          document.getElementById((square).toString()).value = num;
          square += 1;
          validfound = 1;
          break;
        } else {

          num += 1;
        }
      }
      if (validfound == 0) {

        grid[squareY][squareX] = 0;
        if (square == empty[0]) {
            document.getElementById("status").innerHTML = "No solutions found";
          return;
        }
        square = lastemptysquare(empty, square);
        grid[squareY][squareX] = 0;
      }
    } else {
      square = square + 1;
    }
  }

}

// Handle arrow key navigation
document.addEventListener("keydown", function(event) {
  const keyMappings = {
    39: 1,  
    68: 1,  
    37: -1, 
    65: -1, 
    38: -9, 
    87: -9, 
    40: 9,  
    83: 9
  };

  const offset = keyMappings[event.keyCode];

  if (offset !== undefined) {
    const activeElement = document.activeElement;
    const currentBoxId = parseInt(activeElement.id);
    const nextBoxId = currentBoxId + offset;
    const nextBox = document.getElementById(nextBoxId.toString());

    if (nextBox) {
      nextBox.focus();
    }
  }
});

// Handle input in text areas
function handleInput(event) {
  const textarea = event.target;
  const inputValue = textarea.value;
  const lastChar = inputValue.slice(-1);

  if (isNaN(parseInt(lastChar))) {
    textarea.value = inputValue.length > 1 ? inputValue[0] : "";
  } else {
    textarea.value = lastChar;
  }
}