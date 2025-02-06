/* SETUP.JS

Se charge de créer les questions, les PNJs, etc. pour le jeu.

*/

import { createQuestion } from "./index.js";
import { createReponse } from "./index.js";
import { QuestionData } from "./data/data.js";

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
    data.questions = await QuestionData.fetchAll();

    data.pnjs = [];

}

await loadData();


export { data };