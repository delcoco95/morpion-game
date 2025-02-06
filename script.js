
console.time("Durée du jeu");

const cellules = document.querySelectorAll(".cell");
let compteur = 0;
const tourPlayer = document.getElementById("current-player");
const recommencer = document.getElementById("restart");
let partieTerminee = false;

// ---------------------------
for (let cellule of cellules) {
    cellule.addEventListener("click", () => {
        if (partieTerminee || cellule.innerHTML !== "") {
            return; // Bloquer les clics après la fin de la partie ou si la case est déjà prise
        }

        if (compteur === 0) {
            console.time("Temps de jeu");
        }

        // Jouer X ou O
        if (compteur % 2 === 0) {
            cellule.innerHTML = "X";
            tourPlayer.innerHTML = "O";
        } else {
            cellule.innerHTML = "O";
            tourPlayer.innerHTML = "X";
        }
        compteur++;

        // Vérifier victoire ou match nul
        const gagnant = vainqueur();
        if (gagnant) {
            partieTerminee = true;
            console.timeEnd("Temps de jeu");

            // Colorer en vert les cases gagnantes
            gagnant.forEach(index => {
                cellules[index].classList.add("winner");
            });
            setTimeout(() => {
                console.log(`Le joueur ${cellule.innerHTML} a gagné !`);
            }, 100);
        } else if (compteur === 9) {
            partieTerminee = true;
            console.timeEnd("Temps de jeu");
            setTimeout(() => {
                console.log("Match nul !");
            }, 100);
        }
    });
}

// Fonction de vérification de victoire
function vainqueur() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cellules[a].innerHTML !== "" && 
            cellules[a].innerHTML === cellules[b].innerHTML && 
            cellules[a].innerHTML === cellules[c].innerHTML) {
            
            // Ajoute la classe "winner" aux cases gagnantes
            cellules[a].classList.add("winner");
            cellules[b].classList.add("winner");
            cellules[c].classList.add("winner");

            return true;
        }
    }
    return false;
}

// Gérer le bouton "Recommencer"
recommencer.addEventListener("click", () => {
    for (let cellule of cellules) {
        cellule.innerHTML = "";
        cellule.classList.remove("winner");
    }
    console.timeLog("Durée du jeu"); // Relance le chrono
    compteur = 0;
    tourPlayer.innerHTML = "X";
    partieTerminee = false;
    console.log("Nouvelle partie !");
});
