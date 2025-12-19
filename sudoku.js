const grilleSudoku = [ 
    [5,0,4,0,7,8,9,1,2],
    [6,0,2,1,9,0,3,4,0],
    [1,0,8,3,4,2,5,0,0],
    [8,5,0,7,6,1,0,2,3],
    [0,0,6,0,5,3,0,9,1],
    [7,1,3,9,0,4,8,5,0],
    [0,6,0,5,3,0,2,8,4],
    [2,8,0,4,1,0,6,3,5],
    [3,4,5,0,8,6,0,7,0]
];
console.log("Voici la grille donnée au début : ", grilleSudoku); // pour afficher table dans la console

const grilleCorrection = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
]; // grille pleine de correction

let afficherGrille = document.getElementById("sudoku-grid");

//style de la grille
afficherGrille.innerHTML = '';
afficherGrille.style.display = 'grid';
afficherGrille.style.gridTemplateColumns = 'repeat(9, 39px)';
afficherGrille.style.gridAutoRows = '37px';
afficherGrille.style.gap = '5px';


for (let i = 0; i < grilleSudoku.length; i++) {     //naviguer dans la grille colonnes et lignes
	for (let j = 0; j < grilleSudoku[i].length; j++) {
		const input = document.createElement("input");
        //permet de pouvoir ecrire un seul chiffre, et pas de lettres

        input.addEventListener('input', function() {
            let val = input.value;
            if (val.length > 1) val = val.slice(0,1);
            if (val !== '' && (isNaN(val) || val < 1 || val > 9)) {
                input.value = '';
            } else {
                input.value = val;
            }
        });

        // bordure violette des cases externes de la grille
        if (j % 3 === 0 && j !== 0)  input.style.borderLeft = '3px solid purple';
        if (j % 3 === 2 && j !== 8)  input.style.borderRight = '3px solid purple';
        if (i % 3 === 0 && i !== 0)  input.style.borderTop = '3px solid purple';
        if (i % 3 === 2 && i !== 8)  input.style.borderBottom = '3px solid purple';

        // affichage et style des chiffres déjà donnés 
        const chiffresDonnes = grilleSudoku[i][j];
        if (Number.isInteger(chiffresDonnes) && chiffresDonnes !== 0) {
            input.disabled = true ;
            input.value = chiffresDonnes;
            input.style.cssText += 'font-weight:bold;color:blue;';
            input.style.backgroundColor = 'mediumpurple';
        }
        afficherGrille.appendChild(input);
	}
}

// recup de la grille du joueur avec les reponses
function recupererGrilleJoueur() {
    const reponses = document.querySelectorAll('#sudoku-grid input');
    const grillePleine = [];
    
    for (let i = 0; i < grilleSudoku.length; i++) {
        grillePleine[i] = [];
        for (let j = 0; j < grilleSudoku[i].length; j++) {
            const input = reponses[i * 9 + j];
            const valeur = input && input.value ? parseInt(input.value, 10) : 0;
            grillePleine[i][j] = valeur;
        }
    }
    return grillePleine;
}
// stringify pour pouvoir faire === SUR TOUTES LES LIGNES / COLONNES 
function verifierLigne(grille, indexLigne) {
    const grilleExercice = grille || recupererGrilleJoueur();

    if (typeof indexLigne === 'undefined') {
        return grilleExercice.map((ligne, i) => JSON.stringify(ligne) === JSON.stringify(grilleCorrection[i]));
    }

    if (!Array.isArray(grilleExercice[indexLigne])) return false;
    return JSON.stringify(grilleExercice[indexLigne]) === JSON.stringify(grilleCorrection[indexLigne]);
    

// verifierColonne: même principe que verifierLigne mais pour les colonnes

}
//verif colonne
function verifierColonne(grille, indexColonne) {
    const grilleExercice = grille || recupererGrilleJoueur();

    // helper pour extraire une colonne en tableau
    const getCol = (g, colIndex) => g.map(row => (Array.isArray(row) ? row[colIndex] : undefined));

    if (typeof indexColonne === 'undefined') {
        // retourner tableau de booléens pour chaque colonne
        return Array.from({ length: 9 }, (_, j) => {
            const col = getCol(grilleExercice, j);
            const corrCol = getCol(grilleCorrection, j);
            return JSON.stringify(col) === JSON.stringify(corrCol);
        });
    }

    const col = getCol(grilleExercice, indexColonne);
    const corrCol = getCol(grilleCorrection, indexColonne);
    if (!Array.isArray(col)) return false;
    return JSON.stringify(col) === JSON.stringify(corrCol);
}
//verifie 1 region
function verifier1Region(grille, startLigne, startColonne) {
    const chiffresVus = [];

    // boucle avec +3 pour passer de regions en regions et pas de ligne en ligne
    for (let i = startLigne; i < startLigne + 3; i++) {
    // boucle avec +3 pour passer de regions en regions et pas de colonne en colonne
        for (let j = startColonne; j < startColonne + 3; j++) {
            const valeur = grille[i][j];
            //si chiffre deja vu 
            if (chiffresVus.includes(valeur)) {
                return false;
            }
            chiffresVus.push(valeur);
        }
    }
    return true;
}
//verfie toutes regions
function verifierRegions(grille) {
    const resultats = [];

    for (let ligne = 0; ligne < 9; ligne += 3) {
        for (let colonne = 0; colonne < 9; colonne += 3) {
            resultats.push(
                verifier1Region(grille, ligne, colonne)
            );
        }
    }
    return resultats;
}

//button de correction 
const buttonRecup = document.querySelector('#verif')
buttonRecup.addEventListener('click', () => {
    //recup ma grille jouée
    const recuperation = recupererGrilleJoueur()
    console.log("Voici ma grille de sudoku remplie : ", recuperation)
    // affiche booleen resultat lignes
    const resultLignes = verifierLigne(recuperation);
    console.log("Resultat des lignes", resultLignes)
    // affiche booleen resultat colonnes
    const resultColonnes = verifierColonne(recuperation);
    console.log("Resultat des colonnes", resultColonnes)
    // affiche booleen resultat regions
    //function des regions pas utile dans le brief de l'exo donc je laisse en commentaire
    /* const resultRegions = verifierRegions(recuperation)
    console.log("Resultat des regions", resultRegions) */

    //affichage des resultats
    const messageResult = document.querySelector("#message")
    if (!resultLignes.includes(false) && !resultColonnes.includes(false)){
        messageResult.textContent = "Le sudoku est correct"
    } else {
        messageResult.textContent = "Il y a une erreur quelque part"
    }
});

//permet juste de refresh la page pour une """nouvellegrille"""
const buttonNewGrille = document.querySelector("#newGrille")
buttonNewGrille.addEventListener('click', () => {
    location.reload()
})
