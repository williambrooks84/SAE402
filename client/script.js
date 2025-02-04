/* SCRIPT.JS

Script principal de l'application. Il gère le fonctionnement constant du jeu
(un peu comme un loop() sur p5, three.js, etc.)

*/

import { data } from "./setup.js";
import { createPNJsForQuestion } from "./index.js";


//Liste des questions déjà utilisées
let questionsUtilisees = [];

// test
let questionEnCours = data.questions[Math.floor(Math.random() * data.questions.length)];
questionsUtilisees.push(questionEnCours); //Ajouter la question à la liste des questions utilisées

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
        /*let aBox = document.createElement("a-box");
        aBox.setAttribute("id", `pnj-${PNJ.id}`);
        aBox.setAttribute("data-id", PNJ.id);
        aBox.setAttribute("position", `${position} 0 -6`);
        aBox.setAttribute("rotation", "0 45 0");
        aBox.setAttribute("color", "#4CC3D9");
        aBox.setAttribute("transparent", "true");
        aBox.setAttribute("opacity", "1");*/
        let models = ["#astro", "#astro1", "#astro2"];
        let randomModel = models[Math.floor(Math.random() * models.length)];

        let aBox = document.createElement("a-entity");
        aBox.setAttribute("id", `pnj`);
        aBox.setAttribute("data-id", PNJ.id);
        aBox.setAttribute("gltf-model", randomModel);
        aBox.setAttribute("position", `${position} -1 -8`);
        aBox.setAttribute("transparent", "true");
        aBox.setAttribute("visible", "true");
        aBox.setAttribute("scale", "1.3 1.3 1.3");
        
        aBox.addEventListener("model-loaded", (event) => {
            console.log("Modèle chargé !");
            
            // Attendre un peu avant d'ajouter l'animation-mixer
            setTimeout(() => {
                aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
                console.log("Animation appliquée :", aBox.getAttribute("animation-mixer"));
            }, 1000);
        });
        
        
        
        
        
        // Create the a-text element for displaying the PNJ response (the text)
        let aText = document.createElement("a-text");
        aText.setAttribute("value", PNJ.reponse.texte);
        aText.setAttribute("position", `${position} 1 -4`);
        aText.setAttribute("color", "white");
        aText.setAttribute("width", "6");
        aText.setAttribute("align", "center");

        // Append the created elements to the a-scene
        aScene.appendChild(aBox);
        aScene.appendChild(aText);

        // Optionally store the PNJ in the data.pnjs array for future use
        data.pnjs.push(PNJ);

        if (PNJ.reponse.correct){
            // Add event listeners for the PNJ boxes if needed (e.g., for animations or clicks)
            aBox.addEventListener("click", function (event) {
                let randomposition= Math.random() < 0.5 ? -20 : 20;
                let rotationposition;
                if(randomposition == -20){
                    rotationposition = -45;
                }else{
                    rotationposition = 45;
                }

                console.log(randomposition);
                if (!aBox.clicked) {
                    aBox.clicked = true;
                    setTimeout(() => {
                    aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Wave; loop: repeat; timeScale: 1");
                }, 1000);
                aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Yes; loop: repeat; timeScale: 1");

                    setTimeout(() => {
                        aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Walk; loop: repeat; timeScale: 1");
                    aBox.setAttribute('animation__position', {
                        property: 'position',
                        to: `${randomposition} -1 -1.5`,
                        dur: 2000,
                        easing: 'easeInSine'
                    });
                    aBox.setAttribute('animation__rotation', {
                        property: 'rotation',
                        to: `0 ${rotationposition} 0`,
                        dur: 200,
                        easing: 'easeInSine'
                    });

                    setTimeout(() => {
                        removePNJ(PNJ.id);
                        renderNextQuestion();
                    }, 2000);
                }, 2500);
                }
            });
        }
        else {
            // Add event listeners for the PNJ boxes if needed (e.g., for animations or clicks)
            aBox.addEventListener("click", function (event) {
                
                if (!aBox.clicked) {
                    aBox.clicked = true;
                    // Example animation when the box is clicked
                    aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Duck; loop: repeat; timeScale: 1");
                    setTimeout(() => {
                        
                    let currentPosition = aBox.getAttribute('position');
                    aBox.setAttribute('animation', {
                        property: 'position',
                        to: `0 25 -10`,
                        dur: 1000,
                        easing: 'easeInSine'
                    });

                    // Optionally remove the PNJ after some time
                    setTimeout(() => {
                        removePNJ(PNJ.id);
                    }, 2000);
                }, 2000);
            
                }
            });                
        }
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
        color: "white",
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

let removeAllPNJs = function() {
    let aScene = document.querySelector("a-scene");

    // Remove all PNJ elements (boxes)
    let PNJs = document.querySelectorAll("#pnj");
    PNJs.forEach(PNJ => aScene.removeChild(PNJ));

    // Remove all PNJ texts
    let PNJTexts = document.querySelectorAll("a-text");
    PNJTexts.forEach(PNJText => aScene.removeChild(PNJText));

    // Optionally, also remove the dynamic text
    let dynamicText = document.querySelector("#dynamicText");
    if (dynamicText) {
        aScene.removeChild(dynamicText);
    }

    // Clear the array of PNJs
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
    
    let aScene = document.querySelector("a-scene");
    aScene.innerHTML += spaceship;
    aScene.innerHTML += beam;
}

/* removeUFO

Ne prend aucun argument.
Retire l'objet UFO de la scène.
Ne retourne rien.

*/

let removeUFO = function() {
    let aScene = document.querySelector("a-scene");
    let UFO = document.querySelector("#ufo");
    let beam = document.querySelector("#beam");

    // Check if the UFO and beam exist before removing them
    if (UFO) {
        aScene.removeChild(UFO);
    }
    if (beam) {
        aScene.removeChild(beam);
    }
}


let renderNextQuestion = function() {
    // Clear everything before rendering the new question
    removeAllPNJs();

    // Remove the previous question from the scene (if needed)
    let aScene = document.querySelector("a-scene");
    let previousQuestion = document.querySelector("[text]"); // The text element displaying the question
    if (previousQuestion) {
        aScene.removeChild(previousQuestion);
    }

    // Optionally, remove the UFO or any other objects
    removeUFO();

    // After half a second
    setTimeout(() =>  {
        console.log("AHHHHH");
        let aScene = document.querySelector("a-scene");
        let text = document.createElement("a-text");
        text.setAttribute("value", "Next question...");
        text.setAttribute("position", "0 2 -6");
        text.setAttribute("color", "white");
        text.setAttribute("width", "48");
        text.setAttribute("align", "center");
        text.setAttribute("id", "nextQuestionText")
        aScene.appendChild(text);
    }, 500)

    // After 2.5 seconds
    setTimeout(() => {
        let aScene = document.querySelector("a-scene");
        let text = document.querySelector("#nextQuestionText");
        aScene.removeChild(text);
    }, 2500)

    // After 3 seconds
    setTimeout(() => {
        // Filter unused questions
        let unusedQuestions = data.questions.filter(q => !questionsUtilisees.includes(q));

        // If there are no more unused questions, you can either:
        // 1. Reset the questionsUtilisees list (optional)
        // 2. Display a message that the game is over (recommended)
        if (unusedQuestions.length === 0) {
            let aScene = document.querySelector("a-scene");
            let aText = document.createElement("a-text");
            aText.setAttribute("value", "Well done, you win the game!");
            aText.setAttribute("position", "0 2 -6");
            aText.setAttribute("color", "red");
            aText.setAttribute("width", "48");
            aText.setAttribute("align", "center");
            aScene.appendChild(aText);
            return;
        }

        // Select a new random question from unused questions
        let nextQuestion = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
        questionsUtilisees.push(nextQuestion); // Mark it as used

        // Render the new question
        renderQuestion(nextQuestion);
        
        // Render PNJs for the new question
        renderPNJsForQuestion(nextQuestion);
    }, 3000);
};

/*
let aScene = document.querySelector("a-scene");
let test = "<a-box position='0 0 -6' color='#4CC3D9'></a-box>"
aScene.innerHTML += test;
*/

// components:raycaster:warn [raycaster] 
// For performance, please define raycaster.objects when using raycaster or cursor components to whitelist which entities to intersect with. e.g., 
// raycaster="objects: [data-raycastable]".