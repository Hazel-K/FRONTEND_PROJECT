function paintMyName() {
    let list__2 = document.querySelector('.list__2');
    let myName = localStorage.getItem('Name');
    let section = document.querySelector('.section');
    if(myName != null) {
        document.querySelector('#name').style.display = "none";
        document.querySelector('.insName').style.display = "none";
        let makeSpan = document.createElement('span');
        makeSpan.innerText = `${myName}님, 환영합니다.`;
        list__2.append(makeSpan);
        section.classList.add("SHOW_ON");
    } else {
        section.classList.remove("SHOW_ON");
    }
}

function saveName(iptVal) {
    const ipt = document.querySelector('#name');
    let myName;
    if (iptVal != "") {
        myName = {
            id: 'Name',
            value: iptVal
        };
    } else {
        alert('이름을 비워둘 수 없습니다.');
        ipt.value = "";
        ipt.focus();
        return;
    }
    localStorage.setItem(myName.id, myName.value);
    paintMyName();
}

function init() {
    const ipt = document.querySelector('#name');
    const iptBtn = document.querySelector('.insName');
    iptBtn.addEventListener("click", function() {
        saveName(ipt.value);
    });
    paintMyName();
}

init();