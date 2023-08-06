const btn = document.querySelector('button');
const tbl = document.getElementById('table-block');
const tbdy = document.querySelector('tbody');
const closeIcons = document.querySelectorAll('.close-icon');
const items = document.querySelectorAll('.item');

// 新しい行を作成し、作成した行を返す関数
function createNewTr() {
    const newTr = document.createElement('tr');

    const newTd1 = document.createElement('td');

    const newdiv1 = document.createElement('div');
    newdiv1.classList.add('Form-Item');

    const newp1 = document.createElement('p');
    newp1.classList.add('Form-Item-Label');
    newp1.textContent = '借用物：';

    const newspan1 = document.createElement('span');
    newspan1.classList.add('Form-Item-Label-Required2');
    newspan1.textContent = '任意';

    const newinput1 = document.createElement('input');
    newinput1.type = 'text';
    newinput1.classList.add('Form-Item-Input');

    const newTd2 = document.createElement('td');

    const newdiv2 = document.createElement('div');
    newdiv2.classList.add('Form-Item');

    const newp2 = document.createElement('p');
    newp2.classList.add('Form-Item-Label');
    newp2.textContent = '個数：';

    const newspan2 = document.createElement('span');
    newspan2.classList.add('Form-Item-Label-Required2');
    newspan2.textContent = '任意';

    const newinput2 = document.createElement('input');
    newinput2.type = 'number';
    newinput2.classList.add('Form-Item-Input');

    const newTdClose = document.createElement('td');
    newTdClose.classList.add('close-icon','clear-column');
    newTdClose.textContent = '✖';

    newTr.appendChild(newTd1);
    newTd1.appendChild(newdiv1);
    newdiv1.appendChild(newp1);
    newp1.appendChild(newspan1);
    newdiv1.appendChild(newinput1);

    newTr.appendChild(newTd2);
    newTd2.appendChild(newdiv2);
    newdiv2.appendChild(newp2);
    newp2.appendChild(newspan2);
    newdiv2.appendChild(newinput2);

    newTr.appendChild(newTdClose);
    

  // 「✖」をクリックしたときの処理を追加
    newTdClose.addEventListener('click', () => {
        newTr.remove();
    });

    return newTr;
}

// 「✖」をクリックしたときの処理
for (let j = 0; j < closeIcons.length; j++) {
    closeIcons[j].addEventListener('click', () => {
        items[j].remove();
    });
}

// ボタンをクリックしたときの処理
btn.addEventListener('click', () => {
    tbdy.appendChild(createNewTr());
});

