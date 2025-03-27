$(document).ready(function () {
    $.ajax({
        url: 'src/data/data.json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log("Données chargées :", data);

            // Diviser les recettes en pages (9 recettes par page)
            const recettesParPage = 9;
            let recettes = data.recettes;
            let totalPages = Math.ceil(recettes.length / recettesParPage);

            // Fonction pour afficher les recettes sur un onglet donné
            function afficherRecettes(page) {
                let debut = (page - 1) * recettesParPage;
                let fin = debut + recettesParPage;
                let recettesPage = recettes.slice(debut, fin);
                let containerId = `#recettes-container-${page}`;

                $(containerId).empty(); // Vider le conteneur avant d'ajouter de nouvelles recettes

                recettesPage.forEach(recette => {
                    let recetteHTML = `
                        <div class="col-md-4">
                            <div class="card bg-secondary">
                                <img src="${recette.img}" class="card-img-top" alt="${recette.nom}">
                                <div class="card-body text-center">
                                    <h2 class="card-title fs-5">${recette.nom}</h2>
                                    <button class="btn btn-dark">Détails</button>
                                    <button class="favorite-btn">⭐</button>
                                </div>
                            </div>
                        </div>
                    `;
                    $(containerId).append(recetteHTML);
                });
            }

            // Charger les recettes sur chaque onglet
            for (let i = 1; i <= totalPages; i++) {
                afficherRecettes(i);
            }
        },
        error: () => {
            console.error('Une erreur est survenue lors de la récupération des recettes.');
            $('#recettes-container-1').html('<p>Impossible de charger les recettes.</p>');
        }
    });
});
