const grilleSudoku = [[3,8,0,0,7,0,0,1,4], [0,0,0,1,3,8,0,0,0],[7,0,0,9,5,0,2,8,3],[0,0,0,1,7,9,4,6,0],[5,7,0,0,0,0,0,4,9],[0,0,0,6,3,2,5,1,0],[2,0,0,7,9,0,3,4,1],[0,0,0,2,5,7,0,0,0],[9,5,0,0,1,0,0,2,7]];
console.log(grilleSudoku)

let afficherGrille = document.getElementById("sudoku-grid")

//style de la grille
afficherGrille.innerHTML = '';
afficherGrille.style.display = 'grid';
afficherGrille.style.gridTemplateColumns = 'repeat(9, 39px)';
afficherGrille.style.gridAutoRows = '36px';
afficherGrille.style.gap = '5px';


for (let i = 0; i < grilleSudoku.length; i++) {     //naviguer dans la grille colonnes et lignes
	for (let j = 0; j < grilleSudoku[i].length; j++) {
		const input = document.createElement("input");
        input.type = 'text'

        // bordure rouge des cases externes de la grille
        if (j % 3 === 0 && j !== 0)  input.style.borderLeft = '3px solid purple';
        if (j % 3 === 2 && j !== 8)  input.style.borderRight = '3px solid purple';
        if (i % 3 === 0 && i !== 0)  input.style.borderTop = '3px solid purple';
        if (i % 3 === 2 && i !== 8)  input.style.borderBottom = '3px solid purple';

        // affichage des chiffres déjà donnés 
        const chiffresDonnes = grilleSudoku[i][j]
        if (Number.isInteger(chiffresDonnes) && chiffresDonnes !== 0) {
            input.readOnly = true ;
            input.value = chiffresDonnes
            input.style.cssText += 'font-weight:bold;color:blue;'
            input.style.backgroundColor = 'mediumpurple'
        }
       
        // recup de la grille avec les reponses

        let recupererGrilleJoueur = 





        afficherGrille.appendChild(input);
	}
}

