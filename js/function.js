
// 状態管理
let turnFirst = true;
let endGame = false;

const fisrt = document.querySelector('.first'),
      second = document.querySelector('.second'),
      squares = [...document.querySelectorAll('.square')],
      resetBtn = document.querySelector('.btn-reset'),
      statusEndGame = document.querySelector('.status-endgame');

const line1 = [squares[0],squares[1],squares[2]],
      line2 = [squares[3],squares[4],squares[5]],
      line3 = [squares[6],squares[7],squares[8]],
      line4 = [squares[0],squares[3],squares[6]],
      line5 = [squares[1],squares[4],squares[7]],
      line6 = [squares[2],squares[5],squares[8]],
      line7 = [squares[0],squares[4],squares[8]],
      line8 = [squares[2],squares[4],squares[6]],
      lines = [line1, line2, line3, line4, line5, line6, line7, line8];


// 1行・1列でも全て○がつけばtrueを返す
function judgeWinner() {
  const judgeAllLines = lines.some(function(line) {
    const judgeLine = line.every(function(square) {
      return square.classList.contains('circle');
    });
    judgeLine ? endGame = true : endGame = false;
  });
  return judgeAllLines;
}

// 勝ちが出たらすべてのマスをクリック不可にする
function judgeEndGame() {
  if (endGame === true) {
    squares.forEach(square => {
      square.classList.add('is-clicked');
    });
    statusEndGame.textContent = 'ゲーム終了です';
  }
}

// クリックの度に○または×をマスに追加し、勝敗を判定
squares.forEach(square => {
  square.addEventListener('click', e => {
    if (turnFirst == true) {
      square.classList.add('circle');
      square.classList.add('is-clicked');
    } else if (turnFirst == false) {
      square.classList.add('cross');
      square.classList.add('is-clicked');
    }
    judgeWinner();
    judgeEndGame();
    turnFirst = !turnFirst;
  });
});


//  リセット
resetBtn.addEventListener('click', e => {
  window.location.reload();
})