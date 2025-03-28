$(document).ready(function () {
    $.ajax({
        url: 'src/data/data.json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log("Données chargées :", data);

            const recettesParPage = 9;
            let recettes = data.recettes;
            let totalPages = Math.ceil(recettes.length / recettesParPage);

            function afficherRecettes(page) {
                let debut = (page - 1) * recettesParPage;
                let fin = debut + recettesParPage;
                let recettesPage = recettes.slice(debut, fin);
                let containerId = `#recettes-container-${page}`;

                $(containerId).empty();

                recettesPage.forEach(recette => {
                    let recetteHTML = `
                        <div class="col-md-4">
                            <div class="card bg-secondary">
                                <img src="${recette.img}" class="card-img-top" alt="${recette.nom}">
                                <div class="card-body text-center">
                                    <h2 class="card-title fs-5">${recette.nom}</h2>
                                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#detailsRecette-${recette.id}">Détails</button>
                                    <button class="favorite-btn" data-id="${recette.id}" data-nom="${recette.nom}" data-img="${recette.img}">⭐</button>
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

                // Ajout au favoris
                $(".favorite-btn").off("click").on("click", function () {
                    let id = $(this).data("id");
                    let nom = $(this).data("nom");
                    let img = $(this).data("img");

                    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

                    // Vérifier si la recette est déjà en favoris
                    let existe = favoris.some(recette => recette.id === id);

                    if (!existe) {
                        favoris.push({ id, nom, img });
                        localStorage.setItem("favoris", JSON.stringify(favoris));
                        alert("Ajouté aux favoris !");
                    } else {
                        alert("Cette recette est déjà dans vos favoris.");
                    }
                });
            }

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
