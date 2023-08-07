const btn = document.querySelector('button');
const tbl = document.getElementById('table-block');
const tbdy = document.querySelector('tbody');
const closeIcons = document.querySelectorAll('.close-icon');
const items = document.querySelectorAll('.item');
let index = 0;

// 新しい借りの項目を作成し、作成した行を返す関数
function createNewTr() {
    index = index + 1;
    currentindex = index;
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

    const newselect = document.createElement('select');
    newselect.id = "Item"+currentindex+"";
    newselect.classList.add('Form-Item-Input');
    newselect.onchange = function (){GetItemqty(this,currentindex);};



    //配列使うのが面倒になった人の図
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    const option3 = document.createElement('option');
    const option4 = document.createElement('option');
    const option5 = document.createElement('option');
    const option6 = document.createElement('option');
    const option7 = document.createElement('option');

    option1.value = "";
    option1.textContent = "未選択";

    option2.value = "電源タップ";
    option2.textContent = "電源タップ";

    option3.value = "マイク";
    option3.textContent = "マイク";

    option4.value = "テープ";
    option4.textContent = "テープ";

    option5.value = "プロジェクター";
    option5.textContent = "プロジェクター";

    option6.value = "ホワイトボードマーカー";
    option6.textContent = "ホワイトボードマーカー";

    option7.value = "鍵";
    option7.textContent = "個室の鍵";


    const newTd2 = document.createElement('td');

    const newdiv2 = document.createElement('div');
    newdiv2.classList.add('Form-Item');

    const newp2 = document.createElement('p');
    newp2.classList.add('Form-Item-Label');
    newp2.textContent = '個数：';

    const newspan2 = document.createElement('span');
    newspan2.classList.add('Form-Item-Label-Required2');
    newspan2.textContent = '任意';

    const qtyselect = document.createElement('select');
    qtyselect.name = "qty"+currentindex+"";
    qtyselect.classList.add('Form-Item-Input');
    qtyselect.id = "qty"+currentindex+"";

    const option8 = document.createElement('option');
    option8.value = "";
    option8.textContent = "未選択";


    const newTdClose = document.createElement('td');
    newTdClose.classList.add('close-icon','clear-column');
    newTdClose.textContent = '✖';

    newTr.appendChild(newTd1);
    newTd1.appendChild(newdiv1);
    newdiv1.appendChild(newp1);
    newdiv1.appendChild(newspan1);
    newdiv1.appendChild(newselect);
    newselect.appendChild(option1);
    newselect.appendChild(option2);
    newselect.appendChild(option3);
    newselect.appendChild(option4);
    newselect.appendChild(option5);
    newselect.appendChild(option6);
    newselect.appendChild(option7);

    newTr.appendChild(newTd2);
    newTd2.appendChild(newdiv2);
    newdiv2.appendChild(newp2);
    newp2.appendChild(newspan2);
    newdiv2.appendChild(qtyselect);
    qtyselect.appendChild(option8);

    newTr.appendChild(newTdClose);




    

  // 「✖」をクリックしたときの処理を追加
    newTdClose.addEventListener('click', () => {
        qtyselect.value = null;
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

function Rentsubmit(){

    if (studentname !== null && studentnum !== null && stuffname !== null)
    {
        for (let i = 0; i <= index; i++){
            RendItem(studentname, studentnum, i, stuffname);
        }
    }else{
        alert ("必要な情報が不足しています");
    }
}



