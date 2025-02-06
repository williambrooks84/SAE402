
import {startGame} from './script.js';
import {startmenu} from './start.js';

let version = "click";

export function endgame(scoregames,questioncounter) {

    document.querySelector("a-scene").addEventListener("enter-vr", () => {
        version= "triggerdown";
    });


   
    let aScene = document.querySelector("a-scene");
    let aText = document.createElement("a-text");
    aText.setAttribute("value", "Well done, you win the game!");
    aText.setAttribute("position", "0 6 -8");
    aText.setAttribute("color", "white");
    aText.setAttribute("width", "48");
    aText.setAttribute("align", "center");
    aScene.appendChild(aText);

    let ascore = document.createElement("a-text");
    ascore.setAttribute("value", "Score: " + scoregames+"/"+questioncounter+" questions");
    ascore.setAttribute("position", "0 2 -8");
    ascore.setAttribute("color", "white");
    ascore.setAttribute("width", "48");
    ascore.setAttribute("align", "center");
    aScene.appendChild(ascore);

    let menuButton = document.createElement("a-entity");
    
    
    menuButton.setAttribute("geometry", "primitive: plane; width: 3.6; height: 0.8;");
    
    menuButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    menuButton.setAttribute("text", "value: Retrun to Menu; align: center; width: 10; color: #ffffff");
    menuButton.setAttribute("position", "-2 0.5 -3");
    menuButton.setAttribute("class", "clickable");
    menuButton.addEventListener(version, async function () {
        aText.parentNode.removeChild(aText);
        ascore.parentNode.removeChild(ascore);
        menuButton.parentNode.removeChild(menuButton);
        startButton.parentNode.removeChild(startButton);
        
        startmenu();

    });
    aScene.appendChild(menuButton);

    let startButton = document.createElement("a-entity");
    
    
    startButton.setAttribute("geometry", "primitive: plane; width: 2.4; height: 0.8;");
    
    startButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    startButton.setAttribute("text", "value: RESTART; align: center; width: 10; color: #ffffff");
    startButton.setAttribute("position", "2 0.5 -3");
    startButton.setAttribute("class", "clickable");
    startButton.addEventListener(version, async function () {
        aText.parentNode.removeChild(aText);
        ascore.parentNode.removeChild(ascore);
        menuButton.parentNode.removeChild(menuButton);
        startButton.parentNode.removeChild(startButton);
        
        startGame();
    });
    aScene.appendChild(startButton);
    
}

