
let turnFirst = true;

const fisrt = document.querySelector('.first'),
      second = document.querySelector('.second'),
      squares = [...document.querySelectorAll('.square')],
      resetBtn = document.querySelector('.btn-reset');

const line1 = [squares[0],squares[1],squares[2]],
      line2 = [squares[3],squares[4],squares[5]],
      line3 = [squares[6],squares[7],squares[8]],
      line4 = [squares[0],squares[3],squares[6]],
      line5 = [squares[1],squares[4],squares[7]],
      line6 = [squares[2],squares[5],squares[8]],
      line7 = [squares[0],squares[4],squares[8]],
      line8 = [squares[2],squares[4],squares[6]],
      lines = [line1, line2, line3, line4, line5, line6, line7, line8];

function judgeWinner() {

  line1.every(function(square) {
    if(square.classList.contains('circle')) {
      console.log(true);
    };
  });
}

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

    turnFirst = !turnFirst;


  });
});


//  リセット
resetBtn.addEventListener('click', e => {
  window.location.reload();
})