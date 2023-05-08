import './symbol.scss';

const getX = (    
    `<div class="X">
        <span></span>
        <span></span>
    </div>`
);


const getO = (    
    `<div class="O">
        <span></span>
    </div>`
);

const setX = (cell) => {
    cell.innerHTML = getX;
}


const setO = (cell) => {
    cell.innerHTML = getO;
}

export { getX , setX , setO};