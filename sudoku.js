const grilleSudoku = [
    [3,8,0,0,7,0,0,1,4], 
    [0,0,0,1,3,8,0,0,0],
    [7,0,0,9,5,0,2,8,3],
    [0,0,0,1,7,9,4,6,0],
    [5,7,0,0,0,0,0,4,9],
    [0,0,0,6,3,2,5,1,0],
    [2,0,0,7,9,0,3,4,1],
    [0,0,0,2,5,7,0,0,0],
    [9,5,0,0,1,0,0,2,7]
];
console.log("Voici la grille donnée au début : ", grilleSudoku); // pour afficher table dans la console

const grilleCorrection = [
  [3,8,9,2,5,6,7,1,4],
  [1,4,6,3,8,7,5,9,2],
  [7,2,5,9,1,4,8,6,3],
  [5,7,3,6,2,1,9,4,8],
  [4,9,1,8,7,3,6,2,5],
  [6,1,8,5,9,2,3,7,4],
  [2,3,7,4,6,8,1,5,9],
  [9,5,4,7,3,9,2,8,6],
  [8,6,2,1,4,9,5,3,7]
];

let afficherGrille = document.getElementById("sudoku-grid");

//style de la grille
afficherGrille.innerHTML = '';
afficherGrille.style.display = 'grid';
afficherGrille.style.gridTemplateColumns = 'repeat(9, 39px)';
afficherGrille.style.gridAutoRows = '36px';
afficherGrille.style.gap = '5px';


for (let i = 0; i < grilleSudoku.length; i++) {     //naviguer dans la grille colonnes et lignes
	for (let j = 0; j < grilleSudoku[i].length; j++) {
		const input = document.createElement("input");
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        
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

        // bordure rouge des cases externes de la grille
        if (j % 3 === 0 && j !== 0)  input.style.borderLeft = '3px solid purple';
        if (j % 3 === 2 && j !== 8)  input.style.borderRight = '3px solid purple';
        if (i % 3 === 0 && i !== 0)  input.style.borderTop = '3px solid purple';
        if (i % 3 === 2 && i !== 8)  input.style.borderBottom = '3px solid purple';

        // affichage des chiffres déjà donnés 
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

// recup de la grille avec les reponses
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

//button pour faire apparaitre la grille pleine dans la console
const buttonRecup = document.querySelector('#verif')
buttonRecup.addEventListener('click', () => {
    const recuperation = recupererGrilleJoueur()
    console.log("Voici ma grille de sudoku remplie : ", recuperation)
    const corrigeLigne = verifierLigne()
    console.log(corrigeLigne)
});


function verifierLigne() {
    const grilleExercice = recupererGrilleJoueur()
    for (let i = 0; i < grilleSudoku.length; i++){
        if (grillePleine[i] !== grilleCorrection[i]){
            console.log("La ligne est fausse")
        } else {
            console.log("Bravo, tu as réussi")
        }
    }
}



/* function verifierColonne(){

}

function verifierRegion (){

} */
