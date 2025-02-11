
import { startGame } from "./script.js";


export function startmenu() {

    let aScene = document.querySelector("a-scene");

    let title = document.createElement("a-text");
    title.setAttribute("text", "value: Welcome to TellApart!; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    title.setAttribute("position", `0 5 -5`);
    title.setAttribute("width", "36");
    title.setAttribute("align", "center");
    aScene.append(title);

    let plane = document.createElement("a-plane");
    plane.setAttribute("material", "shader: flat; side: double; color: #000000; opacity: 0.4");
    plane.setAttribute("geometry", "primitive: plane; width: 14; height: 3");
    plane.setAttribute("position", `0 2.2 -5.2`);
    aScene.appendChild(plane);

    let paragraph = document.createElement("a-text");
    
    paragraph.setAttribute("value", "Find the real astronaut! A question appears - spot the correct answer and click before time runs out. Stay quick and precise to win! ");
    paragraph.setAttribute("position", `0 2.2 -5`);
    paragraph.setAttribute("text", "align: center; width: 13; font: asset/Michroma-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");

    aScene.appendChild(paragraph);

    let startButton = document.createElement("a-entity");
    
    

    startButton.setAttribute("geometry", "primitive: plane; width: 1.5; height: 0.9;");
    
    startButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");

    startButton.setAttribute("text", "value: START; align: center; width: 10; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    startButton.setAttribute("position", "-1.2 0.5 -3");
    startButton.setAttribute("class", "clickable");

    startButton.addEventListener("click", async function () {
        title.parentNode.removeChild(title);
        plane.parentNode.removeChild(plane);
        
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        soundButton.parentNode.removeChild(soundButton);
        startGame(false);
    });
    aScene.appendChild(startButton);

    let soundButton = document.createElement("a-entity");
    soundButton.setAttribute("geometry", "primitive: plane; width: 3; height: 0.9;");
    soundButton.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");
    soundButton.setAttribute("text", "value: START MUTED; align: center; width: 10; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    soundButton.setAttribute("position", "1.2 0.5 -3");
    soundButton.setAttribute("class", "clickable");
    soundButton.addEventListener("click", async function () {
        title.parentNode.removeChild(title);
        paragraph.parentNode.removeChild(paragraph);
        plane.parentNode.removeChild(plane);
        soundButton.parentNode.removeChild(soundButton);
        startButton.parentNode.removeChild(startButton);
        startGame(true);
    });
    aScene.appendChild(soundButton);
}


    startmenu();

