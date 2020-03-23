let isCircle = true;
let counter = 0;
let circleObj = document.getElementById("circle");
let crossObj = document.getElementById("cross");
let progStarting = document.getElementById("progress-starting");
let progWinCircle = document.getElementById("progress-win-circle");
let progWinCross = document.getElementById("progress-win-cross");
let progDraw = document.getElementById("progress-draw");
let resetButton = document.getElementById("reset-button");
let cells = document.getElementsByClassName("cell");
const cellsArray = [].slice.call(cells);
let result = false;
 
let ids = [
  "cell1",
  "cell2",
  "cell3",
  "cell4",
  "cell5",
  "cell6",
  "cell7",
  "cell8",
  "cell9"
];

let win1 = { cell1: null, cell2: null, cell3: null };
let win2 = { cell4: null, cell5: null, cell6: null };
let win3 = { cell7: null, cell8: null, cell9: null };
let win4 = { cell1: null, cell4: null, cell7: null };
let win5 = { cell2: null, cell5: null, cell8: null };
let win6 = { cell3: null, cell6: null, cell9: null };
let win7 = { cell1: null, cell5: null, cell9: null };
let win8 = { cell3: null, cell5: null, cell7: null };

let conditionWin = [win1, win2, win3, win4, win5, win6, win7, win8];

//fill the conditionWin
let checkTheState = function(cellId) {
  conditionWin.map(item => {
    if (cellId in item) {
      item[cellId] = isCircle;
    }
  });
};

// fill the cell by O or X
let clickToFill = function(cellId) {
  let target = document.getElementById(cellId);
  let addLetter = function() {
    if (isCircle == true) {
      target.textContent = "◯";
    } else {
      target.textContent = "×";
    }
    counter++;
    if (counter < 9) {
    changeTurn();
    }
    target.classList.add("cell-filled");
    checkTheState(cellId);
    showResult(checkResult());
  };
  target.addEventListener("click", addLetter, false);
};

// change the turn
let changeTurn = function() {
    if (isCircle) {
      circleObj.classList.remove("choice-active");
      crossObj.classList.add("choice-active");
    } else {
      crossObj.classList.remove("choice-active");
      circleObj.classList.add("choice-active");
    }
    isCircle = !isCircle;
};

// show the progress or result
let showResult = function(result) {
  if (result != false) {
    cellsArray.forEach(cell => {
      if (!cell.classList.contains("cell-filled")) {
        cell.classList.add("cell-filled");
      }
    });
    progStarting.classList.add("hidden");
    if (result == "draw") {
      progDraw.classList.remove("hidden");
    } else if (result == "circleWin") {
      progWinCircle.classList.remove("hidden");
    } else if (result == "crossWin") {
      progWinCross.classList.remove("hidden");
    }
  }
};

// check the result
let checkBingo = function(item, which) {
  return Object.values(item).every(cell => cell == which);
};
let checkResult = function() {
  if (conditionWin.some(item => checkBingo(item, true))) {
    result = "crossWin";
  } else if (conditionWin.some(item => checkBingo(item, false))) {
    result = "circleWin";
  } else if (counter == 9) {
    result = "draw";
  }
  return result;
};

// for remove
let remove = function(result) {
  if (result != false) {
    progStarting.classList.remove("hidden");
    if (result == "draw") {
      progDraw.classList.add("hidden");
    } else if (result == "circleWin") {
      progWinCircle.classList.add("hidden");
    } else if (result == "crossWin") {
      progWinCross.classList.add("hidden");
    }
  }
};
// reset
let reset = function() {
  counter = 0;
  isCircle = true;
  remove(result);
  result = false;
  conditionWin.forEach(item => {
    ids.forEach(id => {
      if (item[id] != null) {
        item[id] = null;
      }
    })
  });
  crossObj.classList.remove("choice-active");
  circleObj.classList.add("choice-active");
  cellsArray.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("cell-filled");
  });
};

clickToFill("cell1");
clickToFill("cell2");
clickToFill("cell3");

clickToFill("cell4");
clickToFill("cell5");
clickToFill("cell6");

clickToFill("cell7");
clickToFill("cell8");
clickToFill("cell9");

resetButton.addEventListener("click", reset, false);
