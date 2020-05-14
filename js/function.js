
let turnFirst = false;

const fisrt = document.querySelector('.first'),
      second = document.querySelector('.second'),
      squares = [...document.querySelectorAll('.square')],
      resetBtn = document.querySelector('.btn-reset');


squares.forEach(square => {
  square.addEventListener('click', e => {

    turnFirst = !turnFirst;
    turnFirst ? square.classList.add('circle') : square.classList.add('cross');
    square.classList.add('is-clicked');

  });
});


//  リセット
resetBtn.addEventListener('click', e => {
  window.location.reload();
})