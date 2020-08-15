const UL = document.querySelector('.book__list');
const BOOKSTORAGE = "Books";
const PRIMARYKEY = "PK";
let bookList = [];
let pkCnt = 0;

function priceFormat(number) {
    return number.valueOf().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function savePK() {
    localStorage.setItem(PRIMARYKEY, pkCnt);
}

function loadPK() {
    const PKValue = localStorage.getItem(PRIMARYKEY);
    const parsedItem = JSON.parse(PKValue);
    return Number(parsedItem);
}

function saveList() {
    localStorage.setItem(BOOKSTORAGE, JSON.stringify(bookList));
}

function showInfo(obj) {
    alert(`제목 : ${obj.title}\n저자 : ${obj.author}\n페이지 : ${obj.volume}p\n가격 : ${priceFormat(obj.price)}원\n`);
}

function delBook() {
    const LI = event.target.parentNode.parentNode;
    const tempArr = bookList.filter(function(item) {
        return item.id != LI.id;
    });
    bookList = tempArr;
    saveList();
    UL.removeChild(LI);
}

function bookValueCheck() {
    let tempArr = [];
    for(let i = 1; i <= 4; i++) {
        let ipt = document.querySelector(`#ipt${i}`);
        if(ipt.value == "") {
            alert(`${ipt.placeholder}을(를) 입력해주세요.`);
            ipt.focus();
            return;
        }
        if(i > 2) {
            let tempNumber = Number(ipt.value);
            if (tempNumber < 0 || isNaN(tempNumber) || tempNumber % 1 != 0) {
                alert(`올바른 숫자를 입력해주세요.`);
                ipt.focus();
                return;
            }
        }
        tempArr.push(ipt.value);
    }
    for(let i = 1; i <= 4; i++) {
        let ipt = document.querySelector(`#ipt${i}`);
        ipt.value = "";
    }
    return tempArr;
}

function insertBook() {
    pkCnt++;
    const newID = `${pkCnt}`;
    const tempArr = bookValueCheck();
    const tempObj = {
        id : newID,
        title : tempArr[0],
        author : tempArr[1],
        volume : tempArr[2],
        price : tempArr[3]
    }
    bookList.push(tempObj);
    savePK();
    saveList();
    paintList(tempObj);
}

function paintList(obj) {
    const li1 = document.createElement(`li`);
    li1.id = obj.id;
    li1.className = "items";
    const span1 = document.createElement(`span`);
    span1.innerText = obj.title;
    span1.className = "ctnt1";
    const span2 = document.createElement(`span`);
    span2.className = "ctnt2";
    const span2_1 = document.createElement(`span`);
    span2_1.innerText = "정보보기";
    span2_1.className = "hover ctnts";
    span2_1.addEventListener('click', ()=>{showInfo(obj);});
    const span2_2 = document.createElement(`span`);
    span2_2.innerText = "삭제하기";
    span2_2.className = "hover ctnts";
    span2_2.addEventListener('click', ()=>{delBook();});
    
    span2.append(span2_1);
    span2.append(span2_2);
    li1.append(span1);
    li1.append(span2);
    UL.append(li1);
}

function loadBookList() {
    const tempArr = localStorage.getItem(BOOKSTORAGE);
    const tempPK = loadPK();
    if (tempArr != null) {
        const parsedItem = JSON.parse(tempArr);
        parsedItem.forEach(function(item) {
            paintList(item);
        });
        bookList = parsedItem;
    }
    if (tempPK != null) {
        pkCnt = tempPK;
    }
}

function init() {
    const BUTTON = document.querySelector('.insBookInfo');
    BUTTON.addEventListener('click', ()=>{insertBook();});
    loadBookList();
}

init();
