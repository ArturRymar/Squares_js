'use strict';
class Box {
    constructor(wrapper){
        this.wrapper = wrapper;
        this.table = wrapper.getElementsByClassName('main-table')[0];
        this.addColBtn = wrapper.getElementsByClassName('add-col')[0];
        this.addRowBtn = wrapper.getElementsByClassName('add-row')[0];
        this.remRowBtn = this.wrapper.getElementsByClassName('but-hid2')[0];
        this.remColBtn = this.wrapper.getElementsByClassName('but-hid1')[0];
        this.addColBtn.addEventListener('click', this.addCol);
        this.addRowBtn.addEventListener('click', this.addRow);
        this.table.addEventListener('mouseover', this.showRemoveBtn);
        this.remRowBtn.addEventListener('mouseover', this.remRow);
        this.remColBtn.addEventListener('mouseover', this.remCol);
        this.wrapper.children[0].addEventListener('mouseout', this.hidRemoveBtn);
    };

    addCol = () => {
        const rows = this.table.getElementsByTagName('tr');
        for (let row of rows) {
            row.insertCell(-1);
        }
    };

    addRow = () => {
        const newRow = this.table.insertRow(-1);
        const tr = this.table.querySelector('TR');
        const tdSum = tr.getElementsByTagName('td');
        for (let i = 0; i < tdSum.length; i++) {
            newRow.insertCell(-1);
        }
    };

    showRemoveBtn = ({target}) => {
        const coords = target.getBoundingClientRect();
        const elem = document.elementFromPoint(coords.left, coords.top);
        this.remColBtn.classList.add('visible');
        this.remColBtn.style.left = coords.left + elem.clientWidth/2 - this.remColBtn.clientWidth/2 + pageXOffset  + 'px';
        this.remRowBtn.classList.add('visible');
        this.remRowBtn.style.top = coords.top + elem.clientHeight/2 - this.remRowBtn.clientHeight/2 +pageYOffset + 'px';
        if (target === this.table) {
            this.remRowBtn.classList.remove('visible');
            this.remColBtn.classList.remove('visible');
        }
        const tr = this.table.querySelector('tr');
        if (tr.children.length === 1) this.remColBtn.classList.remove('visible');
        const trArr = this.table.getElementsByTagName('tr');
        if(trArr.length === 1) this.remRowBtn.classList.remove('visible');
    };

    hidRemoveBtn = ({target, relatedTarget}) => {
         if(relatedTarget !== this.remRowBtn && relatedTarget !== this.remColBtn) {
                 this.remRowBtn.classList.remove('visible');
                 this.remColBtn.classList.remove('visible');
         }
    };

    remRow = ({target,relatedTarget}) => {
        const coords = relatedTarget.getBoundingClientRect();
        const elem = document.elementFromPoint(coords.left, coords.top);
        target.onclick = () => {
            elem.parentElement.parentElement.removeChild(elem.parentElement);
            this.remRowBtn.classList.remove('visible');
            this.remColBtn.classList.remove('visible');
        }
    };

    remCol = ({target, relatedTarget}) => {
        const coords = relatedTarget.getBoundingClientRect();
        const trArr = this.table.getElementsByTagName('tr');
        target.onclick = () => {
            for (let i = 0; i < trArr.length; i++) {
                for (let j = 0; j < trArr[i].children.length; j++) {
                    const tdArr = trArr[i].getElementsByTagName('td');
                    const tdCoords = tdArr[j].getBoundingClientRect();
                    if (tdCoords.left === coords.left ) {
                        tdArr[j].parentElement.removeChild(tdArr[j]);
                        break;
                    }
                }
            }
        this.remRowBtn.classList.remove('visible');
        this.remColBtn.classList.remove('visible');
        }
    };

}
new Box(document.getElementsByClassName('wrapper')[0]);












































