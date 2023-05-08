import { getX , setX , setO } from '../Symbol/Symbol';

import './app.scss';

const App = () => {

    // === Variables declaration ===
    // Winner combinations
    const combs = [
            [0,1,2], //  ‾‾‾
            [3,4,5], //  ———
            [6,7,8], //  ___
            [0,3,6], //  |
            [1,4,7], //   |
            [2,5,8], //    |
            [0,4,8], //   \
            [2,4,6]  //   /
        ];

    // Game status flag:
    // -3 : Draw
    // -2 : Start game
    // -1 : Game over
    //  0 : Turn O
    //  1 : Turn X
    let statusFlag = -2;

    // cellsFlags:
    //  0 : Empty cell
    //  1 : Setted cell
    let cellsFlags = [0,0,0,0,0,0,0,0,0];
    // === / Variables declaration ===

    // === Status toggle ===
    const toggleStatusFlag = () => {
        statusFlag = (statusFlag === 0) ? 1 : 0;
    }
    // === / Status toggle ===

    // === Winner check ===
    const winCheck = () => {
        const cells = document.querySelectorAll("td");
        
        combs.forEach(comb => {
            if(cells[comb[0]].innerHTML === cells[comb[1]].innerHTML && 
                cells[comb[1]].innerHTML === cells[comb[2]].innerHTML && 
                cells[comb[0]].innerHTML !== '') {
                if(cells[comb[0]].innerHTML === getX) {
                    showWinX();
                }
                else {
                    showWinO();
                }
                cross(comb);
                statusFlag = -1;
            }
        });
    }

    const showWinX = () => {
        const win = document.querySelector(".win");
        const winX = document.querySelector(".win__icon_x");
        const winO = document.querySelector(".win__icon_o");

        setTimeout(() => {
            win.style.opacity = "1";
            win.style.visibility = "visible";

            winX.style.display = "block";
            winX.style.opacity = "1";
            winX.style.visibility = "visible";

            winO.style.display = "none";
            winO.style.opacity = "0";
            winO.style.visibility = "hidden";
        } , 300);
    };

    const showWinO = () => {
        const win = document.querySelector(".win");
        const winX = document.querySelector(".win__icon_x");
        const winO = document.querySelector(".win__icon_o");

        setTimeout(() => {
            win.style.opacity = "1";
            win.style.visibility = "visible";
        
            winX.style.display = "none";
            winX.style.opacity = "0";
            winX.style.visibility = "hidden";
        
            winO.style.display = "block";
            winO.style.opacity = "1";
            winO.style.visibility = "visible";
        } , 300);
    };

    const cross = (comb) => {
        const line = document.querySelector(".line");

        switch(comb) {
            case combs[0]:
            case combs[1]:
            case combs[2]:
                line.classList.add("hor");
                if(comb[0] === 0) { line.style.top = "46px"; }
                else if(comb[0] === 3) { line.style.top = "155px"; }
                else if(comb[0] === 6) { line.style.top = "264px"; }
                break;
            case combs[3]:
            case combs[4]:
            case combs[5]:
                line.classList.add("vert");
                if(comb[0] === 0) { line.style.left = "46px"; }
                else if(comb[0] === 1) { line.style.left = "155px"; }
                else if(comb[0] === 2) { line.style.left = "264px"; }
                break;
            case combs[6]:
            case combs[7]:
                line.classList.add("diag");
                if(comb[0] === 0) { line.style.transform = "rotate(45deg)"; }
                else if(comb[0] === 2) { line.style.transform = "rotate(-45deg)"; }
                break;
        }
    }
    // === / Winner check ===
    
    // === Turn show ===
    const showTurn = () => {
        const turnX = document.querySelector(".turn__x");
        const turnO = document.querySelector(".turn__o");
        const message = document.querySelector(".message");

        const switchX = document.querySelector(".switch__x");
        const switchO = document.querySelector(".switch__o");
        
        switch (statusFlag) {
            case 1:
                turnX.style.display = "flex";
                turnO.style.display = "none";
                message.style.display = "none";

                switchX.classList.add('switch__active');
                switchO.classList.remove('switch__active');
                break;
            case 0:
                turnX.style.display = "none";
                turnO.style.display = "flex";
                message.style.display = "none";

                switchX.classList.remove('switch__active');
                switchO.classList.add('switch__active');
                break;
            case -1:
                turnX.style.display = "none";
                turnO.style.display = "none";
                message.style.display = "flex";
                message.textContent = "Game over";

                switchX.classList.remove('switch__active');
                switchO.classList.remove('switch__active');
                break;
            case -2:
                turnX.style.display = "none";
                turnO.style.display = "none";
                message.style.display = "flex";
                message.textContent = "Start game";

                switchX.classList.remove('switch__active');
                switchO.classList.remove('switch__active');
                break;
            case -3:
                turnX.style.display = "none";
                turnO.style.display = "none";
                message.style.display = "flex";
                message.textContent = "Draw";

                switchX.classList.remove('switch__active');
                switchO.classList.remove('switch__active');
                break;
        }
    }
    // === / Turn show ===

    // === Restart button ===
    const restartGame = () => {
        const cells = document.querySelectorAll("td");
        const line = document.querySelector(".line");
        
        cells.forEach(cell => cell.innerHTML = '');
        cellsFlags = [0,0,0,0,0,0,0,0,0];
        statusFlag = -2;
        line.className = 'line';
        line.style = "";
        showTurn();
        hideWinScreen();
    }

    const hideWinScreen = () => {
        const win = document.querySelector(".win");
        const winX = document.querySelector(".win__icon_x");
        const winO = document.querySelector(".win__icon_o");

        win.style.opacity = "0";
        win.style.visibility = "hidden";

        winX.style.display = "none";
        winX.style.opacity = "0";
        winX.style.visibility = "hidden";

        winO.style.display = "none";
        winO.style.opacity = "0";
        winO.style.visibility = "hidden";
    };
    // === / Restart button ===

    // === Main function ===
    const onSet = (e , i) => {
        if(cellsFlags[i] === 0) {
            switch (statusFlag) {
                case -2:
                case 1:
                    setX(e.target);
                    break;
                case 0:
                    setO(e.target);
                    break;
            }
            cellsFlags[i] = 1;
            toggleStatusFlag();
        }
        if(cellsFlags.reduce((acc , num) => acc + num , 0) === 9) {
            statusFlag = -3;
        }
        winCheck();
        showTurn();
    }
    // === / Main function ===


    return (
        <div className="app">
            <h1 className="app__title">Tic Tac Toe</h1>
            <div className="switch">
                <div className="switch__x">
                    <div className="switch__x_icon">
                        <svg viewBox="0 0 128 128">
                            <path d="M16,16L112,112"></path>
                            <path d="M112,16L16,112"></path>
                        </svg>
                    </div>
                </div>
                <div className="switch__o">
                    <div className="switch__o_icon">
                        <svg viewBox="0 0 128 128">
                            <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path>
                        </svg>
                    </div>
                </div>
            </div>
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
                <div className="message">
                    <div className="turn__text">Start game</div>
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
                    <div className="win">
                        <div className="win__icon">
                            <svg className="win__icon_x" viewBox="0 0 128 128">
                                <path d="M16,16L112,112"></path>
                                <path d="M112,16L16,112"></path>
                            </svg>
                            <svg className="win__icon_o" viewBox="0 0 128 128">
                                <path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path>
                            </svg>
                        </div>
                        <div className="win__text">WINNER!</div>
                    </div>
            </table>
            <div className="restart" onClick={restartGame}>Restart game</div>
        </div>
    );
};

export default App;