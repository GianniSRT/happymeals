$(document).ready(function() {
    $.ajax({
        url: 'src/data/data.json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log(data);
            
            // Mélanger les recettes et sélectionner 3 aléatoirement
            let recettesAleatoires = data.recettes.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            recettesAleatoires.forEach(function(recette) {
                let recetteHTML = `
                <div class="recipe-card w-25 m-2">
                    <h2>${recette.nom}</h2>
                    <img src="assets/recette2.jpg" alt="${recette.nom}" class="img-fluid rounded">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
                </div>
                `;

                $('#recettes-container').append(recetteHTML);
            });
        },
        error: () => {
            console.error('Une erreur est survenue lors de la récupération des recettes.');
            $('#recettes-container').html('<p>Une erreur est survenue lors de la récupération des recettes.</p>');
        }
    });
});
