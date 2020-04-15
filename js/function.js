  let BoxElements = document.querySelectorAll('.js-box');
  const Boxes = Object.keys(BoxElements);
  //console.log(Boxes);

  const Marks = {
    maru: '◯',
    Batsu: '×'
  }
//console.log(Marks.maru);

function putMark(index) {
  Boxes[index].innerHTML = Marks.Batsu;
}

for (let i=0; i < Boxes.length; i++) {
  Boxes[i].addEventListener('click', function() {
    console.log('途中');
    putMark(index);
  }, false);
}

