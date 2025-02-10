/* SCRIPT.JS

Script principal de l'application. Il gère le fonctionnement constant du jeu
(un peu comme un loop() sur p5, three.js, etc.)

*/

import { data } from "./setup.js";
import { createPNJsForQuestion } from "./index.js";
import { endgame } from "./endgame.js";

let scoregame = 0;





// Fait toute la longueur du document
export function startGame(muted){

   
    //Liste des questions déjà utilisées
    let questionsUtilisees = [];


    /* ambientSound

    Ne prend aucun argument, ne retourne rien.
    Mettre un son d'ambiance au lancement du jeu.

    */
    async function ambientSound() {
        let ambientSound = document.querySelector("#ambient");
        ambientSound.play();
    }

    if (!muted) {
        ambientSound();
    }

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
        let checkclick = false;

        // Calculate the center position based on the number of PNJs
        let centerPosition = -(PNJsForQuestion.length - 1) * distance / 2;

        for (let i = 0; i < PNJsForQuestion.length; i++) {
            let PNJ = PNJsForQuestion[i];

            // Calculate the position of each PNJ relative to the center
            let position = centerPosition + (i * distance);

            // Create the a-box element for each PNJ (the PNJ box itself)
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
            aBox.setAttribute("class", "clickable");
            aBox.setAttribute("cursor","fuse: false; rayOrigin: mouse")
            aBox.addEventListener("model-loaded", (event) => {
                // Attendre un peu avant d'ajouter l'animation-mixer
                setTimeout(() => {
                    aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
                }, 1000);
            });

            // Create the a-text element for displaying the PNJ response (the text)
            let aText = document.createElement("a-text");
            aText.setAttribute("text", "value: " + PNJ.reponse.texte_reponse + "; font: asset/Michroma-Regular-msdf.json; negate: false; opacity: 1; alphaTest: 0.5");
            aText.setAttribute("position", `${position} 3 -8`);
            aText.setAttribute("color", "white");
            aText.setAttribute("width", "6");
            aText.setAttribute("align", "center");

            // Append the created elements to the a-scene
            aScene.appendChild(aBox);
            aScene.appendChild(aText);

            // Optionally store the PNJ in the data.pnjs array for future use
            data.pnjs.push(PNJ);

            if (PNJ.reponse.est_correcte) {

               
                // Add event listeners for the PNJ boxes if needed (e.g., for animations or clicks)
                aBox.addEventListener("click", function (event) {
                    let randomposition = Math.random() < 0.5 ? -20 : 20;
                    let rotationposition;
                    if (randomposition == -20) {
                        rotationposition = -45;
                    } else {
                        rotationposition = 45;
                    }

                    if (!aBox.clicked && !checkclick) {
                        checkclick = true;

                        if (!muted) {
                            let successAudio = document.querySelector("#success");
                            successAudio.play();
                        }

                        aBox.clicked = true;
                        revealAliens(1);
                    
                        setTimeout(() => {
                            aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Wave; loop: repeat; timeScale: 1");
                        }, 1000);
                    
                        aBox.setAttribute("animation-mixer", "clip: CharacterArmature|Yes; loop: repeat; timeScale: 1");

                        
                        scoregame++;

                        
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
                                resetUFO();
                                renderNextQuestion();
                                checkclick = false;
                            }, 2000);
                        }, 2500);
                    }
                });
            } else {
                // Add event listeners for the PNJ boxes if needed (e.g., for animations or clicks)

                aBox.addEventListener("click", function (event) {

                    if (!aBox.clicked && !checkclick) {
                        checkclick = true;
                        aBox.clicked = true;
                        // Example animation when the box is clicked

                        if (!muted) {
                            let failAudio = document.querySelector("#fail");
                            failAudio.play();
                        }
                    

                        moveUFO(aBox.getAttribute('position').x);

                        revealAliens(2);
                        
                        setTimeout(() => {
                            let currentPosition = aBox.getAttribute('position');
                            let drone = document.querySelector("#drone");
                            let dronePosition = drone.getAttribute('position');
                            aBox.setAttribute('animation', {
                                property: 'position',
                                to: dronePosition,
                                dur: 1000,
                                easing: 'easeInSine'
                            });

                            // Optionally remove the PNJ after some time
                            setTimeout(() => {
                                removePNJ(PNJ.id);
                                resetUFO();
                                renderNextQuestion();
                                checkclick = false;
                            }, 2000);
                        }, 2000);
                    }
                });
            }
        }
    }

    renderPNJsForQuestion(questionEnCours);

    /* renderQuestion

    Prend une question comme argument.
    Affiche la question en haut de la page.

    */

    let renderQuestion = function(question) {
        let aScene = document.querySelector("a-scene");
        let questionEntity = document.createElement("a-entity");
        let position = '0 5 -6';
        questionEntity.setAttribute("text", {
            value: question.texte_question,
            align: "center",
            color: "white",
            width: 32,
            font: "asset/Audiowide-Regular-msdf.json",
            color: "#FFFFFF", 
            negate: false,
            opacity: 1,
            alphaTest: 0.5
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

    let removePNJ = function(id) {
        let aScene = document.querySelector("a-scene");
        let PNJs = document.querySelectorAll("#pnj");
        for (let PNJ of PNJs) {
            if (PNJ.dataset.id == id) {
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

    let getPNJByID = function(id) {
        id = parseInt(id);
        return data.pnjs.find(pnj => pnj.id === id);
    }

    /* createUFO

    Prend une position X comme argument.
    Crée un objet UFO avec un vaisseau et un rayon de lumière.
    Ne retourne rien.

    */

    let moveUFO = function(posX) {

        let drone = document.querySelector("#drone");
        let beam = document.createElement("a-entity");
        beam.setAttribute("id", "beam");
        beam.setAttribute("geometry", {
            primitive: "cylinder",
            radius: 2,
            height: 50,
        });
        beam.setAttribute("rotation", "-5 0 0");
        beam.setAttribute("material", {
            color: "#00FFFF",
            transparent: true,
            opacity: 0
        });
        beam.setAttribute("position", `${posX} -1 -8`);
        setTimeout(() => {
            beam.setAttribute("animation", {
                property: 'material.opacity',
                to: 0.2,
                dur: 500,
                easing: 'easeInSine',
            });
        }, 1000);
        setTimeout(() => {
            beam.setAttribute("animation", {
                property: 'material.opacity',
                to: 0.5,
                dur: 500,
                easing: 'easeInSine',
                loop: true,
                dir: 'alternate'
            })
        }, 1500);

        let aScene = document.querySelector("a-scene");
        aScene.appendChild(beam);

        
        drone = document.querySelector("#drone");

        drone.setAttribute('animation', {
            property: 'position',
            to: `${posX} 25 -10`,
            dur: 1000,
            easing: 'easeInSine'
        });

        let lights1 = document.querySelectorAll("#light-left");
        lights1.forEach(light => {
            light.setAttribute('animation', {
                property: 'position',
                to: `${posX - 2} 21 -10`,
                dur: 1000,
                easing: 'easeInSine'
            });
        });

        let lights2 = document.querySelectorAll("#light-right");
        lights2.forEach(light => {
            light.setAttribute('animation', {
                property: 'position',
                to: `${posX + 2} 21 -10`,
                dur: 1000,
                easing: 'easeInSine'
            });
        });

        let lights = document.querySelectorAll("#drone-light");
        for (let light of lights) {
            let adjustedPosition = posX;
            if (light.getAttribute('rotation').x != 0) {
                adjustedPosition = -posX;
            }
            light.setAttribute('animation', {
                property: 'position',
                to: `${adjustedPosition} 22 -10`,
                dur: 1000,
                easing: 'easeInSine'
            });
        }
    }

    /* resetUFO

    Ne prend aucun argument.
    Retire l'objet UFO de la scène.
    Ne retourne rien.

    */

    let resetUFO = function() {
        let aScene = document.querySelector("a-scene");
        let drone = document.querySelector("#drone");
        let lights = document.querySelectorAll("#drone-light");
        let beam = document.querySelector("#beam");

        // Check if the UFO and beam exist before removing/resetting them
        if (drone) {
            let posX = 0;
            drone.setAttribute('animation', {
                property: 'position',
                to: `${posX} 25 -10`,
                dur: 1000,
                easing: 'easeInSine'
            });
    
            let lights1 = document.querySelectorAll("#light-left");
            lights1.forEach(light => {
                light.setAttribute('animation', {
                    property: 'position',
                    to: `${posX - 2} 21 -10`,
                    dur: 1000,
                    easing: 'easeInSine'
                });
            });
    
            let lights2 = document.querySelectorAll("#light-right");
            lights2.forEach(light => {
                light.setAttribute('animation', {
                    property: 'position',
                    to: `${posX + 2} 21 -10`,
                    dur: 1000,
                    easing: 'easeInSine'
                });
            });
    
            let lights = document.querySelectorAll("#drone-light");
            for (let light of lights) {
                let adjustedPosition = posX;
                if (light.getAttribute('rotation').x != 0) {
                    adjustedPosition = -posX;
                }
                light.setAttribute('animation', {
                    property: 'position',
                    to: `${adjustedPosition} 22 -10`,
                    dur: 1000,
                    easing: 'easeInSine'
                });
            }
        }
        if (beam) {
            beam.parentNode.removeChild(beam);
        }
    }


    let maxquestions = 1;
    let questioncounter = 0;

    let timer = 0;
    let timermax = 0.01;

    let timerInterval = setInterval(() => {
        timer++;
    }, 1000);


    let renderNextQuestion = function() {
        // Clear everything before rendering the new question
        removeAllPNJs();

        // Remove the previous question from the scene (if needed)
        let aScene = document.querySelector("a-scene");
        let previousQuestion = document.querySelector("[text]"); // The text element displaying the question
        if (previousQuestion) {
            aScene.removeChild(previousQuestion);
        }

        // Optionally, reset the drone's position or any other objects
        resetUFO();

        // After half a second
        setTimeout(() => {
            let aScene = document.querySelector("a-scene");
            let text = document.createElement("a-text");
            text.setAttribute("text", "value: Next question...; font: asset/Audiowide-Regular-msdf.json; negate: false; opacity: 1; alphaTest: 0.5");
            questioncounter++;
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
        setTimeout(async () => {
            // Filter unused questions
            let unusedQuestions = data.questions.filter(q => !questionsUtilisees.includes(q));

            // If there are no more unused questions, you can either:
            // 1. Reset the questionsUtilisees list (optional)
            // 2. Display a message that the game is over (recommended)
            if (questioncounter >= maxquestions || timer >= timermax*60) {
                
            clearInterval(timerInterval);
            timer = 0;
                    
                    endgame(scoregame, questioncounter);
                    scoregame = 0;
                    questioncounter = 0;            
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

    /* revealAliens

    Ne prend aucun argument.
    Fait apparaître les aliens PNJs.
    Ne retourne rien.

    */

    let revealAliens = function( chiffre) {
        let PNJs = document.querySelectorAll("#pnj");
        for (let PNJ of PNJs) {
        

            
            let pnjData = data.pnjs.find(p => p.id == PNJ.dataset.id);
            if (pnjData) {
                if (!pnjData.reponse.est_correcte) {
                    PNJ.setAttribute("gltf-model", "#alien");
                    PNJ.removeAttribute("animation-mixer"); // Réinitialiser avant d'ajouter

                    if(chiffre == 1){
                        
                    PNJ.addEventListener("model-loaded", function () {
                        PNJ.setAttribute("animation-mixer", "clip: CharacterArmature|Duck; loop: repeat; timeScale: 1");
                        setTimeout(() => {
                            PNJ.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
                        }, 1500);
                    
                    }, { once: true });
                }else if(chiffre == 2){
                    PNJ.addEventListener("model-loaded", function () {
                        PNJ.setAttribute("animation-mixer", "clip: CharacterArmature|Wave; loop: repeat; timeScale: 1");
                        setTimeout(() => {
                            PNJ.setAttribute("animation-mixer", "clip: CharacterArmature|Idle; loop: repeat; timeScale: 1");
                        }, 1500);
                    
                    }, { once: true });

                }
                    
                }
            }
        }
    }

}
