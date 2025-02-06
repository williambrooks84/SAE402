
import { startGame } from "./script.js";


export function startmenu() {

    let aScene = document.querySelector("a-scene");

    let paragraph = document.createElement("a-text");
    paragraph.setAttribute("material", "shader: flat; side: double; color: #000000; opacity: 0.4");
    paragraph.setAttribute("geometry", "primitive: plane; width: 12; height: 6; buffer: false; segmentsWidth: 10; segmentsHeight: 10");
    paragraph.setAttribute("value", "The game consists of finding out who the real astronaut is. A question in English will be asked, and you must identify the one who gives the correct answer.But be careful—you have limited time! To play, it's simple: carefully observe the astronauts' answers, target the real astronaut, and click on them before time runs out. Be quick and precise to win the game! ");
    paragraph.setAttribute("position", `0 4 -5`);
    paragraph.setAttribute("color", "white");
    paragraph.setAttribute("width", "12");
    paragraph.setAttribute("align", "center");

    aScene.appendChild(paragraph);

    let startButton = document.createElement("a-entity");
    
    
    startButton.setAttribute("geometry", "primitive: plane; width: 1.2; height: 0.4;");
    
    startButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    startButton.setAttribute("text", "value: START GAME; align: center; width: 4; color: #ffffff");
    startButton.setAttribute("position", "-0.8 1.2 1");
    startButton.setAttribute("class", "clickable");
    startButton.addEventListener("click", async function () {
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        soundButton.parentNode.removeChild(soundButton);
        startGame(false);
    });
    aScene.appendChild(startButton);

    let soundButton = document.createElement("a-entity");
    soundButton.setAttribute("geometry", "primitive: plane; width: 1.2; height: 0.4;");
    soundButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");
    soundButton.setAttribute("text", "value: START MUTED; align: center; width: 4; color: #ffffff");
    soundButton.setAttribute("position", "0.8 1.2 1");
    soundButton.setAttribute("class", "clickable");
    soundButton.addEventListener("click", async function () {
        paragraph.parentNode.removeChild(paragraph);
        soundButton.parentNode.removeChild(soundButton);
        startButton.parentNode.removeChild(startButton);
        startGame(true);
    });
    aScene.appendChild(soundButton);
}

startmenu();