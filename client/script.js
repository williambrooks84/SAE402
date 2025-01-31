/* SCRIPT.JS

Script principal de l'application. Il gère le fonctionnement constant du jeu
(un peu comme un loop() sur p5, three.js, etc.)

*/

import { data } from "./setup.js";
import { createPNJsForQuestion } from "./index.js";

// test
let questionEnCours = data.questions[Math.floor(Math.random() * data.questions.length)];
console.log(questionEnCours);

/* renderPNJsForQuestion

Prend une question comme argument.
Crée un PNJ pour chaque réponse de la question, l'ajoute au tableau des PNJs puis l'affiche.
Ne retourne ne rien.
Notes : Pour l'instant, affiche des cubes. Affiche les PNJs de droite à gauche.

*/

let renderPNJsForQuestion = function(question){ 
    let PNJsForQuestion = createPNJsForQuestion(question);
    let aScene = document.querySelector("a-scene");
    let distance = 4; // Distance between the boxes

    // Calculate the center position based on the number of PNJs
    let centerPosition = -(PNJsForQuestion.length - 1) * distance / 2;

    for (let i = 0; i < PNJsForQuestion.length; i++) {
        let PNJ = PNJsForQuestion[i];

        // Calculate the position of each PNJ relative to the center
        let position = centerPosition + (i * distance);

        // Add the a-box and a-text elements for each PNJ to the scene
        aScene.innerHTML += 
            `<a-box id='pnj' data-id='${PNJ.id}' position='${position} 0 -6' rotation='0 45 0' color='#4CC3D9'></a-box>
            <a-text value='${PNJ.reponse.texte}' position='${position} -1.5 -6' color='black' width='6' align='center'></a-text>`;

        // Optionally store the PNJ in the data.pnjs array
        data.pnjs.push(PNJ);
    }
}

// test
renderPNJsForQuestion(questionEnCours);

/* renderQuestion

Prend une question comme argument.
Affiche la question en haut de la page.

*/

let renderQuestion = function(question){
    let aScene = document.querySelector("a-scene");
    let questionEntity = document.createElement("a-entity");
    let position = '0 5 -6';
    questionEntity.setAttribute("text", {
        value: question.texte,
        align: "center",
        color: "black",
        width: 32 // Change the text size here
    });
    questionEntity.setAttribute("position", position);
    aScene.appendChild(questionEntity);
}

renderQuestion(questionEnCours);

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
        //console.log(PNJ);
        if (PNJ.dataset.id == id){
            aScene.removeChild(PNJ);
            let index = data.pnjs.findIndex(pnj => pnj.id === id);
            data.pnjs.splice(index, 1);
            break;
        }
    }
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
    let scene = document.querySelector("a-scene");
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
                console.log("Cube clicked!");
                if (!PNJ.clicked) {


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
                        console.log(PNJ.getAttribute('position').y);
                        removePNJ(PNJ.dataset.id);
                    }, 2000);
                }
    
                PNJ.clicked = true;

                event.stopPropagation(); // Prevent the event from propagating to the scene
            });
        }
    }
});

// components:raycaster:warn [raycaster] 
// For performance, please define raycaster.objects when using raycaster or cursor components to whitelist which entities to intersect with. e.g., 
// raycaster="objects: [data-raycastable]". 