let studentname = "未登録";
let studentnum = "未登録";
let stuffname = "未登録";
let stuffspece = document.getElementById("StaffName");
let now = new Date();

//スタッフデータの受け渡し
document.addEventListener("DOMContentLoaded", function() {
    currentstuff = localStorage.getItem('stuffdata');
    if (currentstuff != null){

        stuffname = currentstuff;
        localStorage.clear();
    }
    stuffspece.textContent = stuffname;
  });

//日付の取得
function LoadDate() {
    var target;

    var Year = now.getFullYear();
    var Month = now.getMonth()+1;
    var Date = now.getDate();
    var Hour = now.getHours();
    var Min = now.getMinutes();

    target = Year + "年" + Month + "月" + Date + "日" + Hour + ":" + Min;
    return target;
}




//貸出し希望の学生を登録
async function GetStudent(){
    let namespece = document.getElementById("StudentName");
    let numspece = document.getElementById("StudentNum");
    //var popup = document.getElementsByClassName("popup-content");
    //var overlys = document.getElementsByClassName("overlay");

    //学生証の読み込み
    let StudentNum = await eel.ConnectCard()();

    //sqlから名前の取得
    var StudentName = await eel.Getstudentstatus(StudentNum)();


    
    //置き換える要素の作成
    let name_element = document.createElement('h2');
    let num_element = document.createElement('h2');
    name_element.textContent = StudentName[1];
    num_element.textContent = StudentName[0];

    namespece.replaceWith(name_element);
    numspece.replaceWith(num_element);
    


    studentname = StudentName[1];
    studentnum = StudentName[0];
    /*for (const pop of popup) {
        pop.style.visibility = 'hidden';
      }
    for (const overlay of overlys) {
        overlay.style.visibility = 'hidden';
      }*/

}

//学ステメンバーの登録
async function GetMember(){
    
    //学生証の読み込み
    var StuffNum = await eel.ConnectCard()();
    //sqlの呼び出し
    var StuffName = await eel.Getmemberstatus(StuffNum)();

    //置き換え要素の作成
    let name_element = document.createElement('p');
    name_element.textContent = StuffName;
    stuffspece.replaceWith(name_element);
    stuffname = StuffName[0];
    localStorage.setItem('stuffdata', stuffname);

}


//現在の貸し出し状況を取得して表示
async function GetRentStates(){
    var states = await eel.Rentstates()();
    for(let i = 0; i < states.length ;i++){
        createNewLi(states[i]);
    }
    
}

//貸し出し登録
function RendItem(name, num, index, stuffname){
    var Item = document.getElementById("Item"+index+"").value;
    var qty = document.getElementById("qty"+index+"").value;
    var time =  LoadDate();

    //sqlの呼び出し
    if(Item !== "鍵"){
        eel.RentItem(name, num, Item, qty, stuffname, time);
    }
    else{
        eel.Rentkey(name, num, qty, stuffname, time);
    }
    
}

//返却処理
function ReturnItem(list){

    var returntime = LoadDate();

    //鍵を返却
    if(list[2].indexOf("鍵") !== -1){
        eel.ReturnKey(list[0],list[1],list[2],
        list[4],list[5],stuffname,returntime)
    }
    //アイテムの返却
    else{
        //sql呼び出し
    eel.ReturnItem(list[0],list[1],list[2],list[3],
        list[4],list[5],stuffname,returntime);
    }
    

}


//ドロップダウンの連携こんなもんやろ
async function GetItemqty(obj,index){
    qty = document.getElementById("qty"+index+"");
    qty.options.length = 0;
    var SelectItem = obj.value;
    if (SelectItem !== "鍵"){
        var inventry = await eel.Getitemsinventory(SelectItem)();
        for (let i = 1; i <= inventry[0]; i++){
            var op = document.createElement("option");
            value = i;
            op.value = value;
            op.label = value;
            qty.appendChild(op);
        }
    } 
    else if (SelectItem === ""){
        var op = document.createElement("option");
        op.value = "0";
        op.label = "未選択";
        qty.appendChild(op);
    }
    else{
        var inventry = new Array();
        inventry = await eel.Getitemkeyinventory()();
        for (let i = 0; i < inventry.length; i++ ){
            var op = document.createElement("option");
            value = inventry[i][0];
            op.value = value;
            op.label = value;
            qty.appendChild(op);
        }
    }
}




