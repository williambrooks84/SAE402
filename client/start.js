
import { startGame } from "./script.js";
import { chooseGame } from "./choosegame.js";


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
    startButton.setAttribute("position", "-2 0.5 -3");
    startButton.setAttribute("class", "clickable");

    let soundtext = document.createElement("a-text"); 
    
    soundtext.setAttribute("value", "Sound Off");
    soundtext.setAttribute("position", `5 0.5 -3.5`);
    soundtext.setAttribute("rotation", "0 -45 0");
    soundtext.setAttribute("text", "align: center; width: 14; font: asset/Michroma-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    aScene.appendChild(soundtext);


    let soundCheckbox = document.createElement("a-entity");
    soundCheckbox.setAttribute("geometry", "primitive: plane; width: 1; height: 1;");
    soundCheckbox.setAttribute("material", "src: url(asset/checkbox-false.svg); transparent: true");
    soundCheckbox.setAttribute("position", "5.5 0.5 -1.7");
    soundCheckbox.setAttribute("rotation", "0 -45 0");
    soundCheckbox.setAttribute("class", "clickable");

    let isMuted = false;

    soundCheckbox.addEventListener("click", function () {
        isMuted = !isMuted;
        soundCheckbox.setAttribute("material", `src: url(asset/checkbox-${isMuted ? 'true' : 'false'}.svg); transparent: true`);
    });

    aScene.appendChild(soundCheckbox);

    startButton.addEventListener("click", async function () {

        title.parentNode.removeChild(title);
        plane.parentNode.removeChild(plane);
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        soundCheckbox.parentNode.removeChild(soundCheckbox);
        soundtext.parentNode.removeChild(soundtext);
        choose.parentNode.removeChild(choose);
        startGame(isMuted, 3, "All");
    });
    aScene.appendChild(startButton);

    let choose = document.createElement("a-entity");

    choose.setAttribute("geometry", "primitive: plane; width: 2.7; height: 0.9;");
    choose.setAttribute("material", "src: url(asset/Rectangle 4.png); transparent: true");
    choose.setAttribute("text", "value: Choose game; align: center; width: 10; font: asset/Audiowide-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    choose.setAttribute("position", "1 0.5 -3");
    choose.setAttribute("class", "clickable");


    choose.addEventListener("click", function () {
        title.parentNode.removeChild(title);
        plane.parentNode.removeChild(plane);
        soundCheckbox.parentNode.removeChild(soundCheckbox);
        soundtext.parentNode.removeChild(soundtext);
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        choose.parentNode.removeChild(choose);
        chooseGame();
    });
    
    aScene.appendChild(choose);



}


    startmenu();

