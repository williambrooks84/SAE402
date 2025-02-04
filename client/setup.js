/* SETUP.JS

Se charge de créer les questions, les PNJs, etc. pour le jeu.

*/

import { createQuestion } from "./index.js";
import { createReponse } from "./index.js";

let data = {
    questions: [],
    pnjs: [],
}

/* Rappels :

question:{
    id: int,
    texte: string,
    reponses: array de Reponse,
    niveau: int [1, 2, 3]
}

reponse:{
    texte: string,
    correct: boolean
}

*/

async function loadData() {
    const response = await fetch("./data/data-questions.json");

    const jsonData = await response.json();

    jsonData.questions.forEach(q => {
        let reponses = q.reponses.map(r => createReponse(r.texte, r.correct)); //Créer les réponses
        reponses = reponses.sort(() => Math.random() - 0.5); // Mélanger les réponses
        data.questions.push(createQuestion(q.id, q.texte, reponses, q.niveau)); //Créer la question
    });

    data.pnjs = jsonData.pnjs; //Affecter une réponse à chaque PNJ
}

await loadData();

export { data };