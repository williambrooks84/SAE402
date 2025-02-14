
import { startGame } from "./script.js";
import { chooseGame } from "./choosegame.js";


export function startmenu() {

    let aScene = document.querySelector("a-scene");

    // Create the a-box element for each PNJ (the PNJ box itself)
    let models = ["#astro", "#astro1", "#astro2"];
    let randomModel = models[Math.floor(Math.random() * models.length)];

    let hintNpc = document.createElement("a-entity");
    hintNpc.setAttribute("id", `pnj-special`);
    hintNpc.setAttribute("gltf-model", randomModel);
    hintNpc.setAttribute("position", `17 -1 3`);
    hintNpc.setAttribute("rotation", "0 -90 0");
    hintNpc.setAttribute("transparent", "true");
    hintNpc.setAttribute("visible", "true");
    hintNpc.setAttribute("scale", "1.3 1.3 1.3");
    hintNpc.setAttribute("class", "clickable");
    hintNpc.addEventListener("model-loaded", (event) => {
        // Attendre un peu avant d'ajouter l'animation-mixer
        setTimeout(() => {
            hintNpc.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
        }, 1000);
    });
    hintNpc.clicked = false
    let handleHintNpcClick = async function () {
        if (!hintNpc.clicked){
            hintNpc.clicked = true;
            hintNpc.setAttribute("animation-mixer", "clip: CharacterArmature|Wave; timeScale: 1")
            setTimeout(() => {
                hintNpc.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
                hintNpc.clicked = false;
            });
        }
    }
    hintNpc.addEventListener("click", handleHintNpcClick);
    aScene.appendChild(hintNpc);

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

    let hideSeekText = document.createElement("a-text");
    hideSeekText.setAttribute("value", "Hide & Seek");
    hideSeekText.setAttribute("position", `-6 0.5 -1`);
    hideSeekText.setAttribute("rotation", "0 45 0");
    hideSeekText.setAttribute("text", "align: center; width: 14; font: asset/Michroma-Regular-msdf.json; color: #FFFFFF; negate: false; opacity: 1; alphaTest: 0.5");
    aScene.appendChild(hideSeekText);

    let hideSeekCheckbox = document.createElement("a-entity");
    hideSeekCheckbox.setAttribute("geometry", "primitive: plane; width: 1; height: 1;");
    hideSeekCheckbox.setAttribute("material", "src: url(asset/checkbox-true.svg); transparent: true");
    hideSeekCheckbox.setAttribute("position", "-4.5 0.5 -2.5");
    hideSeekCheckbox.setAttribute("rotation", "0 45 0");
    hideSeekCheckbox.setAttribute("class", "clickable");

    let isHideSeek = true;

    hideSeekCheckbox.addEventListener("click", function () {
        isHideSeek = !isHideSeek;
        hideSeekCheckbox.setAttribute("material", `src: url(asset/checkbox-${isHideSeek ? 'true' : 'false'}.svg); transparent: true`);
        console.log(isHideSeek);
    });

    aScene.appendChild(hideSeekCheckbox);



    startButton.addEventListener("click", async function () {

        title.parentNode.removeChild(title);
        plane.parentNode.removeChild(plane);
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        soundCheckbox.parentNode.removeChild(soundCheckbox);
        soundtext.parentNode.removeChild(soundtext);
        hideSeekCheckbox.parentNode.removeChild(hideSeekCheckbox);
        hideSeekText.parentNode.removeChild(hideSeekText);
        choose.parentNode.removeChild(choose);
        startGame(isMuted, 3, "All", isHideSeek);
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
        hideSeekCheckbox.parentNode.removeChild(hideSeekCheckbox);
        hideSeekText.parentNode.removeChild(hideSeekText);
        choose.parentNode.removeChild(choose);
        chooseGame();
    });
    
    aScene.appendChild(choose);



}


    startmenu();

