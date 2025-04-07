$(document).ready(function () {
    $.ajax({
<<<<<<< HEAD
      url: "src/data/data.json",
      method: "GET",
      dataType: "json",
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
  
              <div class="modal fade" id="detailsRecette-${recette.id}" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content text-dark">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5">${recette.nom}</h1>
                      <p class="fs-6 text-muted">${recette.categorie}</p>
                    </div>
                    <div class="modal-body">
                      <h2 class="fs-6">Liste d'ingrédients</h2>
                      <ul>${recette.ingredients.map(ing => `<li>${ing.nom}</li>`).join("")}</ul>
                      <h3 class="fs-6">${recette.etapes}</h3>
                      <p>Durée : ${recette.temps_preparation}</p>
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
=======
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
                                            <ul class="fs-6 text-dark">
                                                ${recette.ingredients.map(ingredient => `
                                                    <li class="ingredient-item d-flex justify-content-between align-items-center">
                                                        <span>${ingredient.nom}</span>
                                                        <button type="button" class="btn btn-primary btn-ajout-course" data-ingredient="${ingredient.nom}">+</button>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        <h3 class="fs-6 text-dark">${recette.etapes}</h3>
                                        <p class="fs-6 text-dark">Durée : ${recette.temps_preparation}</p>
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

                // Gestion des favoris
                $(".favorite-btn").off("click").on("click", function () {
                    let id = $(this).data("id");
                    let nom = $(this).data("nom");
                    let img = $(this).data("img");

                    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

                    let existe = favoris.some(recette => recette.id === id);

                    if (!existe) {
                        favoris.push({ id, nom, img });
                        localStorage.setItem("favoris", JSON.stringify(favoris));
                        alert("Ajouté aux favoris !");
                    } else {
                        alert("Cette recette est déjà dans vos favoris.");
                    }
                });

                // Gestion du bouton "+" pour ajouter un ingrédient dans localStorage
                $(".btn-ajout-course").off("click").on("click", function () {
                    let ingredient = $(this).data("ingredient");
                    let listeCourses = JSON.parse(localStorage.getItem("courses")) || [];

                    if (!listeCourses.includes(ingredient)) {
                        listeCourses.push(ingredient);
                        localStorage.setItem("courses", JSON.stringify(listeCourses));
                        alert(`Ingrédient ajouté : ${ingredient}`);
                    } else {
                        alert("Ingrédient déjà présent dans la liste.");
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
>>>>>>> 728bd082bfd72317efa45b5db56dbdeb775ce8b3
        }
  
        for (let i = 1; i <= totalPages; i++) {
          afficherRecettes(i);
        }
  
        let suggestions = new Set();
        recettes.forEach(recette => {
          suggestions.add(recette.nom.toLowerCase());
          recette.ingredients.forEach(ingredient => {
            suggestions.add(ingredient.nom.toLowerCase());
          });
        });
  
        $("#search-bar").on("input", function () {
          const query = $(this).val().toLowerCase();
          const results = [...suggestions].filter(item => item.includes(query)).slice(0, 10);
  
          const $autocompleteList = $("#autocomplete-list");
          $autocompleteList.empty();
  
          if (query.length > 1 && results.length > 0) {
            results.forEach(result => {
              $autocompleteList.append(`<li class="list-group-item list-group-item-action">${result}</li>`);
            });
  
            $(".list-group-item").on("click", function () {
              const selected = $(this).text();
              $("#search-bar").val(selected);
              $autocompleteList.empty();
              rechercherRecettes(selected);
            });
          } else {
            $autocompleteList.empty();
          }
  
          rechercherRecettes(query);
        });
  
        function rechercherRecettes(terme) {
          const resultat = recettes.filter(recette =>
            recette.nom.toLowerCase().includes(terme.toLowerCase()) ||
            recette.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(terme.toLowerCase()))
          );
  
          $("#recettes-container-1").empty();
  
          if (resultat.length === 0) {
            $("#recettes-container-1").html("<p>Aucune recette trouvée.</p>");
          } else {
            resultat.forEach(recette => {
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
              `;
              $("#recettes-container-1").append(recetteHTML);
            });
          }
        }
      },
  
      error: (xhr, status, error) => {
        console.error("Erreur lors du chargement du fichier JSON :", error);
      }
    });
  });
  