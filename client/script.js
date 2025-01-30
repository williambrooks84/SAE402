import { createQuestion } from "./index.js";
import { createReponse } from "./index.js";
import { createPNJsForQuestion } from "./index.js";

let reponses = [];
reponses.push(createReponse(1, "Yes, it is", true));
reponses.push(createReponse(1, "No, it isn't", false));

let question = createQuestion(1, "Is the sky blue ?", reponses, 1);
console.log("Question: ", question);


let pnjs = createPNJsForQuestion(question);
console.log("PNJs: ", pnjs);