const btn = document.getElementById("aaaa");
const ulbody = document.getElementById('list');
const closeIcons = document.querySelectorAll('.close-icon');
const items = document.querySelectorAll('.item');

function createNewLi(){
    const newLi = document.createElement('li');
    newLi.classList.add('item');

    const newA = document.createElement('a');

    const newP1 = document.createElement('p');
    newP1.classList.add('date');
    newP1.textContent = '2020/4/15 13:28';
    
    const newP2 = document.createElement('p');
    newP2.classList.add('name');
    newP2.textContent = '八巻　顕伍';

    const newP3 = document.createElement('p');
    newP3.classList.add('id');
    newP3.textContent = '1318809';

    const newP4 = document.createElement('p');
    newP4.classList.add('things');
    newP4.textContent = 'ほうき';

    const newP5 = document.createElement('p');
    newP5.classList.add('num');
    newP5.textContent = '20';

    const newP6 = document.createElement('p');
    newP6.classList.add('user');
    newP6.textContent = '長澤まさみ';

    const newButton = document.createElement('button');
    newButton.classList.add('category');

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

// ボタンをクリックしたときの処理
btn.addEventListener('click', () => {
    ulbody.appendChild(createNewLi());
});

function Delete(){
    if(confirm("返却確認画面")){
        closeIcons[j].addEventListener('click', () => {
            items[j].remove();
        });
    }
    else{
        alert("作業が取り消されました。");
    }
} 
