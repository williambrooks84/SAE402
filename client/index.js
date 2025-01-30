class Question {
    constructor(id, texte, reponses, niveau) {
        this.id = id, // int
        this.texte = texte, // string
        this.reponses = reponses, // array de Reponse
        this.niveau = niveau // int - 1, 2, 3
    }

    get id() {
        return this.id;
    }

    get texte() {
        return this.texte;
    }

    get reponses() {
        return this.reponses;
    }

    get niveau() {
        return this.niveau;
    }
}

let createQuestion = function(id, texte, reponses, niveau) {
    let question = new Question(id, texte, reponses, niveau);
    questions.push(question);
}

let questions = [];

class Reponse {
    constructor(idquestion, texte, correct) {
        this.idquestion = idquestion, // int
        this.texte = texte, // string
        this.correct = correct // boolean
    }

    get id() {
        return this.idquestion;
    }

    get texte() {
        return this.texte;
    }

    get correct() {
        return this.correct;
    }
}

let createReponse = function(idquestion, texte, correct) {
    let reponse = new Reponse(idquestion, texte, correct);
    return reponse;
}

class PNJ {
    constructor(id, reponse) {
        this.id = id, // int
        this.reponse = reponse // objet de classe Reponse
    }
}

let createPNJ = function(id, reponse) {
    let pnj = new PNJ(id, reponse);
    return pnj;
}

let createPNJsForQuestion = function(question) {
    let pnjs = [];
    let reponses = question.getReponses();
    for (let i = 0; i < reponses.length; i++) {
        let pnj = createPNJ(i, reponses[i]);
        pnjs.push(pnj);
    }
    return pnjs;
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
    let cube = document.querySelector("#clickableBox");

    // Event listener for clicking anywhere in the scene
    if (scene) {
        scene.addEventListener("click", function () {
            console.log("Scene clicked!");
        });
    }

    // Event listener for clicking directly on the cube
    if (cube) {
        cube.addEventListener("click", function (event) {
            console.log("Cube clicked!");


            //The cube goes in the air when clicked
            let currentPosition = cube.getAttribute('position');

            cube.setAttribute('animation', {
                property: 'position', 
                to: `${currentPosition.x} ${currentPosition.y + window.innerWidth/2} ${currentPosition.z}`, 
                dur: 10000, 
                easing: 'easeInSine',
                loop: false
            });

            event.stopPropagation(); // Prevent the event from propagating to the scene
        });
    }
});