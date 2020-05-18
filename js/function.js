"use strict";

// 状態管理
let turnFirst = true,
    endGame = false,
    isDraw = false,
    times = 0;

const fisrt = document.querySelector('.turn-first'),
      second = document.querySelector('.turn-second'),
      squares = [...document.querySelectorAll('.square')],
      resetBtn = document.querySelector('.btn-reset'),
      statusEndGame = document.querySelector('.status-endgame'),
      statusWinner = document.querySelector('.status-winner');

const lines = [
  [squares[0],squares[1],squares[2]],
  [squares[3],squares[4],squares[5]],
  [squares[6],squares[7],squares[8]],
  [squares[0],squares[3],squares[6]],
  [squares[1],squares[4],squares[7]],
  [squares[2],squares[5],squares[8]],
  [squares[0],squares[4],squares[8]],
  [squares[2],squares[4],squares[6]]
];

// 手番を表示する
function toggleTurnIndicator() {
  if (turnFirst) {
    fisrt.classList.add('is-active');
    second.classList.remove('is-active');
  } else {
    fisrt.classList.remove('is-active');
    second.classList.add('is-active');
  }
}

// 1行・1列でも全て○がつけばtrueを返す
function judgeWinner(className) {
  const judgeAllLines = lines.some(function(line) {
    const judgeLine = line.every(function(square) {
      return square.classList.contains(className);
    });
    judgeLine ? endGame = true : endGame = false;
    endGame ? stopGame() : "";
    return judgeLine;
  });
  return judgeAllLines;
}

// 勝ちが出たら勝者を表示し、すべてのマスをクリック不可にする
function stopGame() {
  squares.forEach(square => {
    square.classList.add('is-clicked');
  });
  statusWinner.textContent = `${turnFirst ? "○" : "×"}`;
}

// 引き分けを判定する（9手目時のみ実行）
function judgeDraw() {
  lines.every(function(line) {
    const judgeLine = line.every(function(square) {
      return square.classList.contains('circle') || square.classList.contains('cross');
    });
    judgeLine ? isDraw = true : isDraw = false;
    return judgeLine;
  });
  if (isDraw) {
    statusWinner.textContent = 'Draw';
  }
  return judgeDraw;
}

// クリックの度に○または×をマスに追加する
squares.forEach(square => {
  square.addEventListener('click', e => {
    const hand = turnFirst ? 'circle' : 'cross'
    square.classList.add(hand);
    square.classList.add('is-clicked');
    times = times + 1;
    console.log(times);
    times === 9 ? judgeDraw() : "";
    judgeWinner(hand);
    turnFirst = !turnFirst;
    toggleTurnIndicator();
  });
});

//  リセット
resetBtn.addEventListener('click', e => {
  window.location.reload();
});