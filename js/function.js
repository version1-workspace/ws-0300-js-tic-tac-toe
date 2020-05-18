"use strict";

// 状態管理
let turnFirst = true;
let endGame = false;
let isDraw = false;

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
  return lines.some(function(line) {
      return line.every(function(square) {
        return square.classList.contains(className);
      });
    });
}

// 勝ちが出たら勝者を表示し、すべてのマスをクリック不可にする
function judgeEndGame() {
  if (endGame) {
    squares.forEach(square => {
      square.classList.add('is-clicked');
    });
    statusWinner.textContent = `${turnFirst ? "○" : "×"}`;
  }

  // 引き分けを判定する
  const judgeAllLines = lines.every(function(line) {
    const judgeLine = line.every(function(square) {
      return square.classList.contains('circle') || square.classList.contains('cross');
    });
    judgeLine ? isDraw = true : isDraw = false;
    return judgeLine;
  });
  if (isDraw) {
    statusWinner.textContent = 'Draw';
  }
  return judgeAllLines;
}

// クリックの度に○または×をマスに追加し、勝敗を判定
squares.forEach(square => {
  square.addEventListener('click', e => {
    const hand = turnFirst ? 'circle' : 'cross'
    square.classList.add(hand);
    square.classList.add('is-clicked');
    judgeWinner(turnFirst);
    judgeEndGame();
    turnFirst = !turnFirst;
    toggleTurnIndicator();
  });
});

//  リセット
resetBtn.addEventListener('click', e => {
  window.location.reload();
});