
import {startGame} from './script.js';
import {startmenu} from './start.js';



export function endgame(scoregames,questioncounter,totalscore) {
    let timerDisplay = document.querySelector("#timerDisplay");
    if (timerDisplay) {
        timerDisplay.parentNode.removeChild(timerDisplay);
    }
  
    let scoreDisplay = document.querySelector("#scoreDisplay");
    if (scoreDisplay) {
        scoreDisplay.parentNode.removeChild(scoreDisplay);
    }

    let aScene = document.querySelector("a-scene");
    let aText = document.createElement("a-text");
    aText.setAttribute("text", "value: Well done, you win the game!; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    aText.setAttribute("position", "0 9 -8");
    aText.setAttribute("width", "48");
    aText.setAttribute("align", "center");
    aScene.appendChild(aText);

    let ascore = document.createElement("a-text");
    ascore.setAttribute("text", "value: Questions: " + scoregames+"/"+questioncounter+" questions; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    ascore.setAttribute("position", "0 6 -8");
    ascore.setAttribute("width", "48");
    ascore.setAttribute("align", "center");
    aScene.appendChild(ascore);

    let atotalscore = document.createElement("a-text");
    atotalscore.setAttribute("text", "value: Total Score: " + totalscore+" points; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    atotalscore.setAttribute("position", "0 3 -8");
    atotalscore.setAttribute("width", "48");
    atotalscore.setAttribute("align", "center");
    aScene.appendChild(atotalscore);
    

    let menuButton = document.createElement("a-entity");
    
    
    menuButton.setAttribute("geometry", "primitive: plane; width: 3.6; height: 0.8;");
    
    menuButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    menuButton.setAttribute("text", "value: Return to Menu; align: center; width: 10; font: asset/Michroma-Regular-msdf.json; negate: false; opacity: 1; alphaTest: 0.5");
    menuButton.setAttribute("position", "-2 0.5 -3");
    menuButton.setAttribute("class", "clickable");
    menuButton.addEventListener("click", async function () {
        aText.parentNode.removeChild(aText);
        ascore.parentNode.removeChild(ascore);
        atotalscore.parentNode.removeChild(atotalscore);
        menuButton.parentNode.removeChild(menuButton);
        startButton.parentNode.removeChild(startButton);
        let ambientSound = document.querySelector("#ambient");
        if (ambientSound) {
            ambientSound.pause();
            ambientSound.currentTime = 0;
        }
        
        startmenu();
        setTimeout(resetRaycaster, 500);

    });
    aScene.appendChild(menuButton);

    let startButton = document.createElement("a-entity");
    
    
    startButton.setAttribute("geometry", "primitive: plane; width: 2.4; height: 0.8;");
    
    startButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    startButton.setAttribute("text", "value: RESTART; align: center; width: 10; font: asset/Michroma-Regular-msdf.json; negate: false; opacity: 1; alphaTest: 0.5");
    startButton.setAttribute("position", "2 0.5 -3");
    startButton.setAttribute("class", "clickable");
    startButton.addEventListener("click", async function () {
        aText.parentNode.removeChild(aText);
        ascore.parentNode.removeChild(ascore);
        atotalscore.parentNode.removeChild(atotalscore);
        menuButton.parentNode.removeChild(menuButton);
        startButton.parentNode.removeChild(startButton);
        
        startGame();
        
    });
    aScene.appendChild(startButton);
    
}



function resetRaycaster() {
    let rightController = document.querySelector("#rightController");
    let leftController = document.querySelector("#leftController");

    if (rightController && rightController.components.raycaster) {
        rightController.components.raycaster.refreshObjects();
    }
    if (leftController && leftController.components.raycaster) {
        leftController.components.raycaster.refreshObjects();
    }
}