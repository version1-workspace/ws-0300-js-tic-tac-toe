let Boxes = document.querySelectorAll('.js-box');

const PlayerMaru = document.querySelector('.maru');
const PlayerBatsu = document.querySelector('.batsu');
const messages = document.querySelector('.js-message');

let Turn = 0;


const Marks = {
  maru: '◯',
  batsu: '×'
}

/*
const WinningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
*/

function putMark(index) {
  Boxes[index].innerHTML =  Marks.maru;
  Turn++;

  if(Turn % 2 == 0) {
    Boxes[index].innerHTML =  Marks.batsu;
    PlayerMaru.classList.add('active');
    PlayerBatsu.classList.remove('active');

  } else {
    Boxes[index].innerHTML =  Marks.maru;
    PlayerBatsu.classList.add('active');
    PlayerMaru.classList.remove('active');
  }
}

window.onload = function() {

  for (let i = 0; i < Boxes.length; i++) {
    Boxes[i].addEventListener('click', function(e) {
      if(e.target.innerHTML !== ""){
        return
      } 
      putMark(i);
    }, false);
  }
  document.getElementById('js-restart').addEventListener('click', () => location.reload());
}