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

let renderPNJsForQuestion = function(question) {
    let PNJsForQuestion = createPNJsForQuestion(question);
    let aScene = document.querySelector("a-scene");
    let distance = 4; // Distance between the boxes

    // Calculate the center position based on the number of PNJs
    let centerPosition = -(PNJsForQuestion.length - 1) * distance / 2;

    for (let i = 0; i < PNJsForQuestion.length; i++) {
        let PNJ = PNJsForQuestion[i];

        // Calculate the position of each PNJ relative to the center
        let position = centerPosition + (i * distance);

        // Create the a-box element for each PNJ (the PNJ box itself)
        let aBox = document.createElement("a-box");
        aBox.setAttribute("id", `pnj-${PNJ.id}`);
        aBox.setAttribute("data-id", PNJ.id);
        aBox.setAttribute("position", `${position} 0 -6`);
        aBox.setAttribute("rotation", "0 45 0");
        aBox.setAttribute("color", "#4CC3D9");

        // Create the a-text element for displaying the PNJ response (the text)
        let aText = document.createElement("a-text");
        aText.setAttribute("value", PNJ.reponse.texte);
        aText.setAttribute("position", `${position} -1.5 -6`);
        aText.setAttribute("color", "black");
        aText.setAttribute("width", "6");
        aText.setAttribute("align", "center");

        // Append the created elements to the a-scene
        aScene.appendChild(aBox);
        aScene.appendChild(aText);

        // Optionally store the PNJ in the data.pnjs array for future use
        data.pnjs.push(PNJ);

        // Add event listeners for the PNJ boxes if needed (e.g., for animations or clicks)
        aBox.addEventListener("click", function (event) {
            console.log(`PNJ box ${PNJ.id} clicked!`);
            
            // Example animation when the box is clicked
            let currentPosition = aBox.getAttribute('position');
            aBox.setAttribute('animation', {
                property: 'position',
                to: `${currentPosition.x} ${window.innerWidth/2} ${currentPosition.z}`,
                dur: 10000,
                easing: 'easeInSine'
            });

            // Optionally remove the PNJ after some time
            setTimeout(() => {
                console.log(`Removing PNJ box ${PNJ.id}`);
                removePNJ(PNJ.id);
            }, 2000);
        });
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

    /*
   // Event listener for clicking anywhere in the scene
    if (scene) {
        scene.addEventListener("click", function () {
            console.log("Scene clicked!");
        });
    }*/

    // Event listener for clicking directly on the cube
    if (PNJs) {
        for (let PNJ of PNJs) {
            PNJ.addEventListener("click", function (event) {
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