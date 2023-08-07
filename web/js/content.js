const btn = document.getElementById("aaaa");
const ulbody = document.getElementById('list');
const closeIcons = document.querySelectorAll('.close-icon');
const items = document.querySelectorAll('.item');




function createNewLi(list){


    const newLi = document.createElement('li');
    newLi.classList.add('item');

    const newA = document.createElement('b');

    const newP1 = document.createElement('p');
    newP1.classList.add('date');
    newP1.textContent = list[5];
    
    const newP2 = document.createElement('p');
    newP2.classList.add('name');
    newP2.textContent = list[0];

    const newP3 = document.createElement('p');
    newP3.classList.add('id');
    newP3.textContent = list[1];

    const newP4 = document.createElement('p');
    newP4.classList.add('things');
    newP4.textContent = list[2];

    const newP5 = document.createElement('p');
    newP5.classList.add('num');
    newP5.textContent = list[3];

    const newP6 = document.createElement('p');
    newP6.classList.add('user');
    newP6.textContent = list[4];

    const newButton = document.createElement('button');
    newButton.classList.add('category');
    newButton.onclick = function (){ReturnItem(list)}

    const newSpan = document.createElement('span');
    newSpan.textContent = '返却';

    newLi.appendChild(newA);
    newA.appendChild(newP1);
    newA.appendChild(newP2);
    newA.appendChild(newP3);
    newA.appendChild(newP4);
    newA.appendChild(newP5);
    newA.appendChild(newP6);
    newA.appendChild(newButton);
    newButton.appendChild(newSpan);

    ulbody.appendChild(newLi);

    newButton.addEventListener('click', () => {
        newLi.remove();
    });

    return newLi;
}

for (let j = 0; j < closeIcons.length; j++) {
    closeIcons[j].addEventListener('click', () => {
        items[j].remove();
    });
}

//返却ボタンを押したときの処理
function Delete(){
    closeIcons[j].addEventListener('click', () => {
        ReturnItem(Register[j]);
        items[j].remove();
    });
}

