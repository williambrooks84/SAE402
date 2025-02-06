
import { startGame } from "./script.js";

let version = "click";

export function startmenu() {

    document.querySelector("a-scene").addEventListener("enter-vr", () => {
        version= "triggerdown";
    });


    let aScene = document.querySelector("a-scene");

    let plane = document.createElement("a-plane");
    plane.setAttribute("material", "shader: flat; side: double; color: #000000; opacity: 0.4");
    plane.setAttribute("geometry", "primitive: plane; width: 14; height: 6");
    plane.setAttribute("position", `0 4 -5.2`);
    aScene.appendChild(plane);

    let paragraph = document.createElement("a-text");
    
    paragraph.setAttribute("value", "The game consists of finding out who the real astronaut is. A question in English will be asked, and you must identify the one who gives the correct answer.But be careful—you have limited time! To play, it's simple: carefully observe the astronauts' answers, target the real astronaut, and click on them before time runs out. Be quick and precise to win the game! ");
    paragraph.setAttribute("position", `0 4 -5`);
    paragraph.setAttribute("color", "white");
    paragraph.setAttribute("width", "12");
    paragraph.setAttribute("align", "center");

    aScene.appendChild(paragraph);

    let startButton = document.createElement("a-entity");
    
    
    startButton.setAttribute("geometry", "primitive: plane; width: 1.5; height: 0.8;");
    
    startButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    startButton.setAttribute("text", "value: START; align: center; width: 10; color: #ffffff");
    startButton.setAttribute("position", "0 0.5 -3");
    startButton.setAttribute("class", "clickable");
    startButton.addEventListener(version, async function () {
        plane.parentNode.removeChild(plane);
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        startGame();
    });
    aScene.appendChild(startButton);
}


    startmenu();

