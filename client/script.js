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
Notes : Pour l'instant, affiche des cubes.

*/

let renderPNJsForQuestion = function(question){ 
    let PNJsForQuestion = createPNJsForQuestion(question);
    let aScene = document.querySelector("a-scene");
    let offset = (PNJsForQuestion.length - 1);
    for (let i = 0; i < PNJsForQuestion.length; i++) {
        let PNJ = PNJsForQuestion[i];
        let position = offset - (i*2);
        aScene.innerHTML +=
            "<a-box id='pnj-" + PNJ.id + "' position='" + position + " 0 -6' rotation='0 45 0' color='#4CC3D9'></a-box>"
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
    for (let PNJ of data.pnjs){
        let pnjModel = document.getElementById("pnj-" + PNJ.id);
        aScene.removeChild(pnjModel);
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
    let pnjModel = document.getElementById("pnj-" + id);
    aScene.removeChild(pnjModel);
    let index = data.pnjs.findIndex(pnj => pnj.id === id);
    data.pnjs.splice(index, 1);
}