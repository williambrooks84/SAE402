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

/* questions de test */

let reponses = [];
reponses.push(createReponse("Yes, it is", true));
reponses.push(createReponse("No, it isn't", false));
reponses = reponses.sort(() => Math.random() - 0.5); // mélange les réponses
let question = createQuestion(1, "Is the sky blue ?", reponses, 1);
data.questions.push(question);

reponses = [];
reponses.push(createReponse("The sky is blue", true));
reponses.push(createReponse("It is red", false));
reponses.push(createReponse("It's green", false));
reponses = reponses.sort(() => Math.random() - 0.5); // mélange les réponses
question = createQuestion(2, "What color is the sky ?", reponses, 2);
data.questions.push(question);

reponses = [];
reponses.push(createReponse("It is a vehicle with four wheels", true));
reponses.push(createReponse("It is a vehicle with two wheels", false));
reponses.push(createReponse("It is a vehicle with three wheels", false));
reponses.push(createReponse("It is a vehicle with sixteen wheels", false));
reponses = reponses.sort(() => Math.random() - 0.5); // mélange les réponses
question = createQuestion(3, "What is a car ?", reponses, 3);
data.questions.push(question);

export { data };