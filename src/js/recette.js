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
                    console.log(recette);
                    
                    let recetteHTML = `
                        <div class="col-md-4">
                            <div class="card bg-secondary">
                                <img src="${recette.img}" class="card-img-top" alt="${recette.nom}">
                                <div class="card-body text-center">
                                    <h2 class="card-title fs-5">${recette.nom}</h2>
                                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#detailsRecette-${recette.id}">Détails</button>
                                    <button class="favorite-btn">⭐</button>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="detailsRecette-${recette.id}" tabindex="-1" aria-labelledby="detailsRecetteLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5 text-dark" id="detailsRecetteLabel">${recette.nom}</h1>
                                        <p class="fs-6 text-muted">${recette.categorie}</p>
                                    </div>
                                    <div class="modal-body">
                                        <h2 class="fs-6 text-dark">Liste d'ingrédients</h2>
                                            <ul class="fs-6 text-dark">${recette.ingredients.map(ingredient => `
                                                <li class="ingredient-item"><span>${ingredient.nom}</span><button type="button" class="btn btn-primary">+</button>
                                                </li>`).join('')}
                                            </ul>

                                        <h3 class="fs-6 text-dark">${recette.etapes}</h3>
                                        <p class="fs-6 text-dark">Durée :${recette.temps_preparation}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                                    </div>
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
