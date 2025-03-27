$(document).ready(function() {
    $.ajax({
        url: 'src/data/data.json',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log(data);
            data.recettes.forEach(function(recette) {
                let recetteHTML = `
                <ul class="list-group" id="recipe-list">
                    <li class="list-group-item bg-light text-dark d-flex justify-content-between">
                    <p>${recette.nom}<p> <button class="btn btn-dark btn-sm" onclick="addToPlanning('Pâtes Bolognaises')">+</button>
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

function addToPlanning(recipe) {
    let mealTime = prompt("Ajouter pour : (ex: lundi-midi, lundi-soir)").toLowerCase();
    let cell = document.getElementById(mealTime);

    if (cell) {
        cell.textContent = recipe;
    } else {
        alert("Jour invalide, essayez : lundi-midi, mardi-soir...");
    }
}



function savePlanning() {
    let planning = {};

    document.querySelectorAll("#planning-table td").forEach(td => {
        if (td.id) {
            planning[td.id] = td.textContent;
        }
    });

    localStorage.setItem("planning", JSON.stringify(planning));
    alert("Planning sauvegardé !");
    
    // Générer et télécharger le fichier texte
    downloadPlanning(planning);
}

function loadPlanning() {
    let savedPlanning = JSON.parse(localStorage.getItem("planning"));

    if (savedPlanning) {
        for (let key in savedPlanning) {
            let cell = document.getElementById(key);
            if (cell) {
                cell.textContent = savedPlanning[key];
            }
        }
    }
}

function downloadPlanning(planning) {
    let textContent = "📅 Planning de la Semaine 📅\n\n";
    
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

    jours.forEach(jour => {
        let midi = planning[`${jour}-midi`] || "-";
        let soir = planning[`${jour}-soir`] || "-";
        textContent += `🗓 ${jour.charAt(0).toUpperCase() + jour.slice(1)}\n   - Midi : ${midi}\n   - Soir : ${soir}\n\n`;
    });

    let blob = new Blob([textContent], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "planning.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
