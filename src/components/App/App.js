import { getX , setX , setO } from '../Symbol/Symbol';

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
let activeCells = [0,0,0,0,0,0,0,0,0];

const toggleFlag = () => {
    flag = (flag === 0) ? 1 : 0;
}

const showTurn = () => {
    const turnX = document.querySelector(".turn__x");
    const turnO = document.querySelector(".turn__o");
    const gameOver = document.querySelector(".game-over");

    if(flag === 1) {
        turnX.style.display = "flex";
        turnO.style.display = "none";
        gameOver.style.display = "none";
    }
    else if(flag === 0) {
        turnX.style.display = "none";
        turnO.style.display = "flex";
        gameOver.style.display = "none";
    }
    else if(flag === -1) {
        turnX.style.display = "none";
        turnO.style.display = "none";
        gameOver.style.display = "flex";
    }
}



const winCheck = () => {
    const cells = document.querySelectorAll("td");
    const win = document.querySelector(".win");
    
    combs.forEach(comb => {
        if(cells[comb[0]].innerHTML == cells[comb[1]].innerHTML && 
            cells[comb[1]].innerHTML == cells[comb[2]].innerHTML && 
            cells[comb[0]].innerHTML != '') {
            if(cells[comb[0]].innerHTML == getX) {
                win.innerHTML = 'X winner!';
                cross(comb);
                flag = -1;
            }
            else {
                win.innerHTML = 'O winner!';
                cross(comb);
                flag = -1;
            }
        }
    });
}

const cross = (arr) => {
    const line = document.querySelector(".line");
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

const restartGame = () => {
    const cells = document.querySelectorAll("td");
    const line = document.querySelector(".line");
    const win = document.querySelector(".win");

    cells.forEach(cell => cell.innerHTML = '');
    activeCells = [0,0,0,0,0,0,0,0,0];
    flag = 1;
    line.className = 'line';
    win.innerHTML = '';
    showTurn();
}

const onSet = (e , i) => {
    if(activeCells[i] === 0) {
        if(flag === 1) {
            setX(e.target);
            toggleFlag();
        }
        else if(flag === 0) {
            setO(e.target);
            toggleFlag();
        }
        winCheck();
        showTurn();
        activeCells[i] = 1;
    }
}

    return (
        <div className="app">
            <h1 className="app__title">Tic Tac Toe</h1>
            <div className="turn">
                <div className="turn__container turn__x">
                    <div className="turn__icon">
                        <svg viewBox="0 0 128 128">
                            <path d="M16,16L112,112"></path>
                            <path d="M112,16L16,112"></path>
                        </svg>
                    </div>
                    <div className="turn__text">Turn</div>
                </div>
                <div className="turn__container turn__o">
                    <div className="turn__icon">
                        <svg viewBox="0 0 128 128">
                            <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path>
                        </svg>
                    </div>
                    <div className="turn__text">Turn</div>
                </div>
                <div className="game-over">
                    <div className="turn__text">Game over</div>
                </div>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td onClick={(e) => onSet(e , 0)} ></td>
                        <td onClick={(e) => onSet(e , 1)} ></td>
                        <td onClick={(e) => onSet(e , 2)} ></td>
                    </tr>
                    <tr>
                        <td onClick={(e) => onSet(e , 3)} ></td>
                        <td onClick={(e) => onSet(e , 4)} ></td>
                        <td onClick={(e) => onSet(e , 5)} ></td>
                    </tr>
                    <tr>
                        <td onClick={(e) => onSet(e , 6)} ></td>
                        <td onClick={(e) => onSet(e , 7)} ></td>
                        <td onClick={(e) => onSet(e , 8)} ></td>
                    </tr>
                </tbody>
                    <div className="line"></div>
            </table>
            <div className="restart" onClick={restartGame}>Restart game</div>
            <div className="win"></div>
        </div>
    );
};

export default App;