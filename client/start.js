

let startmenu = function() {
    let aScene = document.querySelector("a-scene");

    let paragraph = document.createElement("a-text");
    paragraph.setAttribute("value", "This is a long paragraph of text that provides information about the game. Please read it carefully before starting.");
    paragraph.setAttribute("position", `0 4 -5`);
    paragraph.setAttribute("color", "white");
    paragraph.setAttribute("width", "6");
    paragraph.setAttribute("align", "center");

    aScene.appendChild(paragraph);

    let startButton = document.createElement("a-entity");
    startButton.setAttribute("geometry", "primitive: plane; width: 0.6; height: 0.4; radius: 0.2; segmentsHeight: 1; segmentsWidth: 1");
    startButton.setAttribute("material", "color: #ffffff; opacity: 0.8");
    startButton.setAttribute("text", "value: Start; align: center; width: 2; color: #ffffff");
    startButton.setAttribute("position", "0 1 1");
    startButton.setAttribute("class", "clickable");
    startButton.addEventListener("click", async function () {
        paragraph.parentNode.removeChild(paragraph);
        startButton.parentNode.removeChild(startButton);
        await import("./script.js"); // Charge et exécute script.js au clic
    });
    aScene.appendChild(startButton);
}

startmenu();