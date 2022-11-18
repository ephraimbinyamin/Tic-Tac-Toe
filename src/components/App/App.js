import { getX , setX , getO , setO } from '../Symbol/Symbol';

import './app.scss';

const App = () => {

const combs = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
let flag = 1;

const toggleFlag = () => {
    flag = (flag === 0) ? 1 : 0;
}

const showTurn = (flag) => {

    let turnX = document.querySelector(".turn-x");
    let turnO = document.querySelector(".turn-o");

    if(flag == 1) {
        turnX.style.color = "green";
        turnO.style.color = "red";
    }
    else if(flag == 0) {
        turnX.style.color = "red";
        turnO.style.color = "green";
    }
}



const winCheck = () => {
    const cells = document.querySelectorAll("td");
    const win = document.querySelector(".win");

    console.log(win);
    
    combs.forEach(comb => {
        if(cells[comb[0]].innerHTML == cells[comb[1]].innerHTML && 
            cells[comb[1]].innerHTML == cells[comb[2]].innerHTML && 
            cells[comb[0]].innerHTML != '') {
            if(cells[comb[0]].innerHTML == getX) {
                win.innerHTML = 'X winner!';
                // deactivateCells();
                cross(comb);
                flag = -1;
            }
            else {
                win.innerHTML = 'O winner!';
                // deactivateCells();
                cross(comb);
                flag = -1;
            }
        }
    });
}

const cross = (arr) => {
    let line = document.querySelector(".line");
    switch(arr) {
        case combs[0]:
        case combs[1]:
        case combs[2]:
            line.classList.add("hor");
            if(arr[0] == 0) { line.style.top = "51px"; }
            else if(arr[0] == 3) { line.style.top = "153px"; }
            else if(arr[0] == 6) { line.style.top = "255px"; }
            break;
        case combs[3]:
        case combs[4]:
        case combs[5]:
            line.classList.add("vert");
            if(arr[0] == 0) { line.style.left = "51px"; }
            else if(arr[0] == 1) { line.style.left = "153px"; }
            else if(arr[0] == 2) { line.style.left = "255px"; }
            break;
        case combs[6]:
        case combs[7]:
            line.classList.add("diag");
            if(arr[0] == 0) { line.style.transform = "rotate(45deg)"; }
            else if(arr[0] == 2) { line.style.transform = "rotate(-45deg)"; }
            break;
    }
}

// const deactivateCells = () => {
//     activeCell = activeCell.map(num => num = 1);
// }

const onSet = (cell , i) => {
    if(cell.innerHTML === '') {
        if(flag === 1) {
            setX(cell);
            toggleFlag();
        }
        else if(flag === 0) {
            setO(cell);
            toggleFlag();
        }
        winCheck();
        showTurn(flag);
    }
}

    return (
        <div className="app">
            <h1 className="app__title">Tic Tac Toe</h1>
            <div className="turn">
                <div className="turn-x">X turn</div>
                <div className="turn-o">O turn</div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td onClick={(e) => onSet(e.target , 0)} ></td>
                        <td onClick={(e) => onSet(e.target , 1)} ></td>
                        <td onClick={(e) => onSet(e.target , 2)} ></td>
                    </tr>
                    <tr>
                        <td onClick={(e) => onSet(e.target , 3)} ></td>
                        <td onClick={(e) => onSet(e.target , 4)} ></td>
                        <td onClick={(e) => onSet(e.target , 5)} ></td>
                    </tr>
                    <tr>
                        <td onClick={(e) => onSet(e.target , 6)} ></td>
                        <td onClick={(e) => onSet(e.target , 7)} ></td>
                        <td onClick={(e) => onSet(e.target , 8)} ></td>
                    </tr>
                </tbody>
                    <div className="line"></div>
            </table>
            <div className="win"></div>
        </div>
    );
};

export default App;