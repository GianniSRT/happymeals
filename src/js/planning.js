$(document).ready(function () {
    $.ajax({
        url: 'src/data/data.json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log(data);
            data.recettes.forEach(function (recette) {
                let recetteHTML = `
                <ul class="list-group" id="recipe-list">
                    <li class="list-group-item bg-light text-dark d-flex justify-content-between">
                        <p>${recette.nom}</p> 
                        <button class="btn btn-dark btn-sm" onclick="addToPlanning('${recette.nom}')">+</button>
                    </li>
                </ul>
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

document.addEventListener("DOMContentLoaded", function () {
    loadPlanning();
});

// Fonction pour ajouter une recette au planning
function addToPlanning(recipe) {
    let mealTime = prompt("Ajouter pour : (ex: lundi-midi, lundi-soir)").toLowerCase();
    let cell = document.getElementById(mealTime);

    if (cell) {
        cell.textContent = recipe;
    } else {
        alert("Jour invalide, essayez : lundi-midi, mardi-soir...");
    }
}

// Fonction pour sauvegarder le planning dans le localStorage
function savePlanning() {
    let planning = {};

    // On parcourt chaque cellule du tableau et on l'ajoute au planning
    document.querySelectorAll("#planning-table td").forEach(td => {
        if (td.id) {
            planning[td.id] = td.textContent;
        }
    });

    // Sauvegarder le planning dans le localStorage
    localStorage.setItem("planning", JSON.stringify(planning));
    alert("Planning sauvegardé !");
    downloadPlanning(planning);  // On appelle la fonction pour télécharger le planning
}

// Fonction pour charger le planning sauvegardé
function loadPlanning() {
    let savedPlanning = JSON.parse(localStorage.getItem("planning"));

    if (savedPlanning) {
        // Si un planning est trouvé dans le localStorage, on l'affiche
        for (let key in savedPlanning) {
            let cell = document.getElementById(key);
            if (cell) {
                cell.textContent = savedPlanning[key];
            }
        }
    }
}

// Fonction pour télécharger le planning au format texte
function downloadPlanning(planning) {
    let textContent = "📅 Planning de la Semaine 📅\n\n";

    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    // Pour chaque jour, ajouter midi et soir au contenu du planning
    jours.forEach(jour => {
        let midi = planning[`${jour}-midi`] || "-";
        let soir = planning[`${jour}-soir`] || "-";
        textContent += `🗓 ${jour.charAt(0).toUpperCase() + jour.slice(1)}\n   - Midi : ${midi}\n   - Soir : ${soir}\n\n`;
    });

    // Créer un fichier texte à partir du contenu du planning
    let blob = new Blob([textContent], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "planning.pdf";  // Télécharger sous le nom de fichier "planning.txt"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
