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
        this.table.addEventListener('mouseover', this.addRemoveBtn);
        this.remRowBtn.addEventListener('click', this.remRow);
        this.remColBtn.addEventListener('click', this.remCol);
        this.wrapper.children[0].addEventListener('mouseout', this.hidRemoveBtn);
    };

    addCol = () => {
        const rows = Array.from(this.table.getElementsByTagName('tr'));
        rows.forEach(row => {
            const cell = document.createElement('td');
            row.appendChild(cell)
        });
        this.table.removeEventListener('mouseover', this.addRemoveBtn);
        setTimeout(() => {this.table.addEventListener('mouseover', this.addRemoveBtn)}, 500);///Для видаленя ефекту входження при додаванні нових елементів

    };

    addRow = () => {
        let newRow = document.createElement('tr');
        let tr = this.table.querySelector('TR');
        let tdSum = tr.getElementsByTagName('td');
        this.table.appendChild(newRow);
        for(let i = 0;i < tdSum.length;i++) {
            let newTd = document.createElement('td');
            newRow.appendChild(newTd);
        }
        this.table.removeEventListener('mouseover', this.addRemoveBtn);
        setTimeout(() => {this.table.addEventListener('mouseover', this.addRemoveBtn)}, 500);///Для видаленя ефекту входження при додаванні нових елементів
    };

    addRemoveBtn = () => {
        let target = event.target;
        let coords = target.getBoundingClientRect();
        while (target !== this.table) {
            if (target.tagName === 'TD') {
                this.remColBtn.classList.add('visible');
                this.remColBtn.style.left = coords.left - 10  + 'px';
                this.remRowBtn.classList.add('visible');
                this.remRowBtn.style.top = coords.top - 10 + 'px';
                return;
            }
            target = target.parentNode;
        }
        let trArr = this.table.getElementsByTagName('tr');
        if(trArr.length <= 1) {
            this.remRowBtn.hidden = true;
        } else {this.remRowBtn.hidden = false;}
        let tr = this.table.querySelector('tr');
        if(tr.children.length <= 1) {
            this.remColBtn.hidden = true;
        } else {this.remColBtn.hidden = false;}
    };

    hidRemoveBtn = () => {
        let target = event.relatedTarget;
        if(target !== this.table && target !== this.remRowBtn && target !== this.remColBtn) {
            this.remRowBtn.classList.remove('visible');
            this.remColBtn.classList.remove('visible');
        }
    };

    remRow = () => {
        let target = event.target;
        let targetCoords = target.getBoundingClientRect();
        let elem = document.elementFromPoint(targetCoords.right + target.offsetWidth/2, targetCoords.top);
        let trArr = this.table.getElementsByTagName('tr');
        let tr = elem.parentElement;
        if (elem.tagName === 'TD' && trArr.length > 1) tr.parentElement.removeChild(tr);
    };

    remCol = () => {
        let target = event.target;
        let targetCoords = target.getBoundingClientRect();
        let tr = this.table.querySelector('tr');
        let trArr = this.table.getElementsByTagName('tr');
        let children = tr.querySelectorAll('td');
        for(let i = 0; i < trArr.length; i++) {
            for(let j = 0; j < children.length; j++){
                let tdArr = trArr[i].getElementsByTagName('td');
                let tdCoords = tdArr[j].getBoundingClientRect();
                if(tdCoords.left === targetCoords.left && children.length > 1) {
                    tdArr[j].parentNode.removeChild(tdArr[j]);
                    break;
                }
            }
        }
    };
}
let artur = document.getElementsByClassName('wrapper')[0];
new Box(artur);














