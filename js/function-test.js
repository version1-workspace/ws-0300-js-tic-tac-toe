// 状態 //
const context = {
  handCount: 0,
  isCircleTurn: true,
  progress: true,
  cells: new Array(9),
  cellElements: document.querySelectorAll(".js-cell"),
  circleElement: document.querySelector(".js-circle"),
  crossElement: document.querySelector(".js-cross"),
  stateMessageElement: document.querySelector(".js-state-message"),
  restartButtonElement: document.querySelector(".js-button"),
};

const STATUSES = {
  stating: "starting...",
  win: "%name% win!!",
  draw: "draw",
};

const ACTIVE_CLASSNAME = "active";
const CHARACTERS = {
  circle: "○",
  cross: "×",
};

// 振る舞い //

//リスタート
context.restartButtonElement.addEventListener("click", () => {
  location.reload();
});

//セルクリック
context.cellElements.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    const { cells, progress, isCircleTurn, stateMessageElement } = context;
    const index = Number(e.target.getAttribute("id")) - 1;
    if (cells[index] || !progress) {
      return;
    }

    const value = isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross;
    e.target.innerHTML = value;
    cells[index] = value;

    if (checkWinner(context, value)) {
      context.progress = false;
      const message = isCircleTurn
        ? STATUSES.win.replace("%name%", CHARACTERS.circle)
        : STATUSES.win.replace("%name%", CHARACTERS.cross);
      stateMessageElement.innerHTML = message;
    } else {
      toggleTurn(context);
      context.isCircleTurn = !context.isCircleTurn;
    }

    context.handCount++;
    if (context.handCount == 9) {
      context.progress = false;
      stateMessageElement.innerHTML = STATUSES.draw;
    }
  });
});

//勝利判定
function checkWinner({ cells }, value) {
  if (
    [0, 1, 2].every((item) => cells[item] === value) ||
    [3, 4, 5].every((item) => cells[item] === value) ||
    [6, 7, 8].every((item) => cells[item] === value) ||
    [0, 3, 6].every((item) => cells[item] === value) ||
    [1, 4, 7].every((item) => cells[item] === value) ||
    [2, 5, 8].every((item) => cells[item] === value) ||
    [0, 4, 8].every((item) => cells[item] === value) ||
    [2, 4, 6].every((item) => cells[item] === value)
  ) {
    return true;
  } else {
    return false;
  }
}

//トグルターン
function toggleTurn({ isCircleTurn, circleElement, crossElement }) {
  if (isCircleTurn) {
    circleElement.classList.remove(ACTIVE_CLASSNAME);
    crossElement.classList.add(ACTIVE_CLASSNAME);
  } else {
    circleElement.classList.add(ACTIVE_CLASSNAME);
    crossElement.classList.remove(ACTIVE_CLASSNAME);
  }
}
