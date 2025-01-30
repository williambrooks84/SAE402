/* SCRIPT.JS

Script principal de l'application. Il gère le fonctionnement constant du jeu
(un peu comme un loop() sur p5, three.js, etc.)

*/

import { data } from "./setup.js";
import { createPNJsForQuestion } from "./index.js";

// test
let questionEnCours = data.questions[Math.floor(Math.random() * data.questions.length)];

/* renderPNJsForQuestion

Prend une question comme argument.
Crée un PNJ pour chaque réponse de la question, l'ajoute au tableau des PNJs puis l'affiche.
Ne retourne ne rien.
Notes : Pour l'instant, affiche des cubes. Affiche les PNJs de droite à gauche.

*/

let renderPNJsForQuestion = function(question){ 
    let PNJsForQuestion = createPNJsForQuestion(question);
    let aScene = document.querySelector("a-scene");
    let offset = (PNJsForQuestion.length - 1);
    for (let i = 0; i < PNJsForQuestion.length; i++) {
        let PNJ = PNJsForQuestion[i];
        let position = offset - (i*2);
        aScene.innerHTML +=
            "<a-box id='pnj' data-id='" + PNJ.id + "' position='" + position + " 0 -6' rotation='0 45 0' color='#4CC3D9' opacity='1' transparent='true'></a-box>"
        ;
        data.pnjs.push(PNJ);
    }
}

// test
renderPNJsForQuestion(questionEnCours);

/* removeAllPNJs

Ne prend aucun argument.
Retire tous les PNJs de la scène.
Ne retourne rien.
Vide aussi le tableau des PNJs.

*/

let removeAllPNJs = function(){
    let aScene = document.querySelector("a-scene");
    let PNJs = document.querySelectorAll("#pnj");
    for (let PNJ of PNJs){
        aScene.removeChild(PNJ);
    }
    data.pnjs = [];
}

/* removePNJ

Prend une ID de PNJ comme argument.
Retire ce PNJ spécifique de la scène.
Ne retourne rien.
Retire aussi le PNJ du tableau des PNJs.

*/

let removePNJ = function(id){
    let aScene = document.querySelector("a-scene");
    let PNJs = document.querySelectorAll("#pnj");
    for (let PNJ of PNJs){
        if (PNJ.dataset.id == id){
            aScene.removeChild(PNJ);
            data.pnjs = data.pnjs.filter(pnj => pnj.id != id);
            break;
        }
    }
}

/* getPNJByID

Prend une ID de PNJ comme argument.
Retourne le PNJ correspondant.

*/

let getPNJByID = function(id){
    id = parseInt(id);
    return data.pnjs.find(pnj => pnj.id === id);
}

/* createUFO

Prend une position X comme argument.
Crée un objet UFO avec un vaisseau et un rayon de lumière.
Ne retourne rien.

*/

let createUFO = function(posX){
    let spaceship = "<a-cylinder id='ufo' position='" + posX +  " 26 -6' rotation='0 0 0' radius='2' height='0.5' color='#4CC3D9'></a-cylinder>";
    let beam = "<a-cylinder id='beam' position='" + posX +  " 13 -6' rotation='0 0 0' radius='0.5' height='26' color='#4CC3D9' transparent='true' opacity='0.5'></a-cylinder>";
    console.log(spaceship, beam);
    let aScene = document.querySelector("a-scene");
    aScene.innerHTML += spaceship;
    aScene.innerHTML += beam;
}

/* removeUFO

Ne prend aucun argument.
Retire l'objet UFO de la scène.
Ne retourne rien.

*/

let removeUFO = function(){
    let aScene = document.querySelector("a-scene");
    let UFO = document.querySelector("#ufo");
    let beam = document.querySelector("#beam");
    aScene.removeChild(UFO);
    aScene.removeChild(beam);
}

//Dynamic text
document.addEventListener("DOMContentLoaded", function () {
    let textEntity = document.getElementById("dynamicText");

    textEntity.setAttribute("text", {
        value: "Texte Dynamique!",
        align: "center",
        color: "blue",
        width: 4
    });
});

//Clickable box
document.addEventListener("DOMContentLoaded", function () {
    let scene = document.querySelector("#scene");
    let PNJs = document.querySelectorAll("#pnj");

    // Event listener for clicking anywhere in the scene
    if (scene) {
        scene.addEventListener("click", function () {
            console.log("Scene clicked!");
        });
    }

    // Event listener for clicking directly on the cube
    if (PNJs) {
        for (let PNJ of PNJs) {
            PNJ.addEventListener("click", function (event) {
    
                if (!PNJ.clicked) {

                    if (getPNJByID(PNJ.dataset.id).reponse.correct) {
                        PNJ.setAttribute('animation', {
                            property: 'opacity',
                            to: 0,
                            dur: 1000,
                            easing: 'easeInSine',
                            loop: false
                        });

                        setTimeout(() => {
                            removePNJ(PNJ.dataset.id);
                        }, 2000);
                    }
                    else {
                        //The pnj goes in the air when clicked
                        let currentPosition = PNJ.getAttribute('position');
            
                        PNJ.setAttribute('animation', {
                            property: 'position', 
                            to: `${currentPosition.x} ${currentPosition.y + window.innerWidth/2} ${currentPosition.z}`, 
                            dur: 10000, 
                            easing: 'easeInSine',
                            loop: false
                        });

                        setTimeout(() => {
                            removePNJ(PNJ.dataset.id);
                        }, 2000);
                    }
                }
    
                PNJ.clicked = true;

                event.stopPropagation(); // Prevent the event from propagating to the scene
            });
        }
    }
});

/*
let aScene = document.querySelector("a-scene");
let test = "<a-box position='0 0 -6' color='#4CC3D9'></a-box>"
aScene.innerHTML += test;
*/

// components:raycaster:warn [raycaster] 
// For performance, please define raycaster.objects when using raycaster or cursor components to whitelist which entities to intersect with. e.g., 
// raycaster="objects: [data-raycastable]".