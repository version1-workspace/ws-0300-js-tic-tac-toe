let isCircle = true;
let circleObj = document.getElementById("circle");
let crossObj = document.getElementById("cross");
let progStarting = document.getElementById("progress-starting");
let progWinCircle = document.getElementById("progress-win-circle");
let progWinCross = document.getElementById("progress-win-cross");
let progDraw = document.getElementById("progress-draw");
let resetButton = document.getElementById("reset-button");
let cells = document.getElementsByClassName("cell");
const cellsArray = [].slice.call(cells);

const CLASSES = {
  choiceActive: "choice-active",
  hidden: "hidden",
  cellFilled: "cell-filled"
}

const RESULT = {
  draw: "draw",
  circleWin: "circleWin",
  crossWin: "crossWin"
}


const IDS = [
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
let changeTheState = function(cellId) {
  conditionWin.map(item => {
    if (cellId in item) {
      item[cellId] = isCircle;
    }
  });
};

// change the turn
let changeTurn = function() {
    if (isCircle) {
      circleObj.classList.remove(CLASSES.choiceActive);
      crossObj.classList.add(CLASSES.choiceActive);
    } else {
      crossObj.classList.remove(CLASSES.choiceActive);
      circleObj.classList.add(CLASSES.choiceActive);
    }
    isCircle = !isCircle;
    console.log(isCircle)
};

// show the progress or result
let showResult = function(result) {
  if (result != false) {
    cellsArray.forEach(cell => {
      if (!cell.classList.contains(CLASSES.cellFilled)) {
        cell.classList.add(CLASSES.cellFilled);
      }
    });
    progStarting.classList.add(CLASSES.hidden);
    if (result == RESULT.draw) {
      progDraw.classList.remove(CLASSES.hidden);
    } else if (result == RESULT.circleWin) {
      progWinCircle.classList.remove(CLASSES.hidden);
    } else if (result == RESULT.crossWin) {
      progWinCross.classList.remove(CLASSES.hidden);
    }
  }
};

// check the result
let checkBingo = function(item, which) {
  return Object.values(item).every(cell => cell == which);
};

let checkDraw = function(item) {
  return Object.values(item).every(cell => cell != null);
}

let checkResult = function() {
  let result = false;
  if (conditionWin.some(item => checkBingo(item, true))) {
    result = RESULT.circleWin;
  } else if (conditionWin.some(item => checkBingo(item, false))) {
    result = RESULT.crossWin;
  } else if (conditionWin.every(item => checkDraw(item))) {
    result = RESULT.draw;
  }
  return result;
};

// for remove
let remove = function(result) {
    progStarting.classList.remove(CLASSES.hidden);
    if (result == RESULT.draw) {
      progDraw.classList.add(CLASSES.hidden);
    } else if (result == RESULT.circleWin) {
      progWinCircle.classList.add(CLASSES.hidden);
    } else if (result == RESULT.crossWin) {
      progWinCross.classList.add(CLASSES.hidden);
    }
};

// reset
let reset = function() {
  counter = 0;
  isCircle = true;
  remove(checkResult());
  conditionWin.map(item => {
    IDS.forEach(id => {
      if (item[id] != null) {
        item[id] = null;
      }
    })
  });
  crossObj.classList.remove(CLASSES.choiceActive);
  circleObj.classList.add(CLASSES.choiceActive);
  cellsArray.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove(CLASSES.cellFilled);
  });
};

resetButton.addEventListener("click", reset, false);


// fill the cell by O or X
let clickToFill = function(cellId) {
  let target = document.getElementById(cellId);
  let addLetter = function() {
    if (isCircle == true) {
      target.textContent = "◯";
    } else {
      target.textContent = "×";
    }
    target.classList.add(CLASSES.cellFilled);
    changeTheState(cellId);
    showResult(checkResult());
    if (checkResult() == false) {
      changeTurn();
    }
  };
  target.addEventListener("click", addLetter, false);
};


// setup
IDS.forEach(cellId => clickToFill(cellId));
