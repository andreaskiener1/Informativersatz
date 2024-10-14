let startTime;
let infoIndex = 0;
const infos = [
"Information: Die globale Durchschnittstemperatur ist in den letzten 100 Jahren um etwa 1 Grad Celsius gestiegen.",
    "Information: Künstliche Intelligenz wird die Arbeitswelt verändern.",
    "Information: Ein gesunder Lebensstil verlängert das Leben.",
    "Information: Die Weltbevölkerung wächst stetig.",
    "Information: 5G-Technologie ermöglicht schnelleres Internet.",
	"Information: Der Ertrag erneuerbarer Energie ist vom Klima abhängig",
	"Information: Das Internet wurde 1969 als ARPANET entwickelt und war ursprünglich ein militärisches Netzwerk.",
	"Information: Der menschliche Körper besteht zu etwa 60 % aus Wasser.",
	"Information: Schätzungen zufolge gibt es im Jahr 2024 weltweit etwa 5,3 Milliarden aktive Internetnutzer.",
	"Information: Der Mount Everest ist mit einer Höhe von 8.848 Metern der höchste Berg der Erde.",
	"Information: Das menschliche Auge kann etwa 10 Millionen verschiedene Farben unterscheiden.",
	"Information: Der Mond entfernt sich jedes Jahr etwa 3,8 Zentimeter von der Erde.",
	"Information: Es wird erwartet, dass erneuerbare Energien bis 2040 etwa 50 % der globalen Energieversorgung ausmachen.",
	"Information: Bis 2050 könnte die Hälfte der heutigen Berufe durch Automatisierung und Robotik ersetzt werden.",
	"Information: Experten gehen davon aus, dass die ersten kommerziellen bemannten Missionen zum Mars bis 2035 realisiert werden könnten.",
	"Information: In Frankreich ist es gesetzlich verboten, ein Schwein 'Napoleon' zu nennen.",
	"Information: Kängurus können nicht rückwärts hüpfen.",
	"Information: Der Mensch verbringt etwa 6 Monate seines Lebens damit, auf rote Ampeln zu warten."
];
const results = [];
const t_avg = 500; // Durchschnittliche Reaktionszeit (in ms)

document.getElementById('start-button').addEventListener('click', () => {
    startTest();
});

document.getElementById('submit-rating').addEventListener('click', () => {
    submitRating();
});

function startTest() {
    infoIndex = 0;
    results.length = 0;  // Reset previous results
    document.getElementById('start-button').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    loadNextInfo();
}

function loadNextInfo() {
    if (infoIndex < infos.length) {
        // Zeige neue Information an
        document.getElementById('info-text').textContent = infos[infoIndex];
        document.getElementById('info-container').classList.remove('hidden');
        document.getElementById('rating-section').classList.remove('hidden');
        
        // Setze die Auswahl der Radiobuttons zurück
        document.querySelectorAll('input[name="rating"]').forEach((el) => el.checked = false);

        // Startzeit messen
        startTime = new Date().getTime();
    } else {
        // Alle Infos wurden bewertet
        showResults();
    }
}

function submitRating() {
    // Prüfen, ob eine Bewertung ausgewählt wurde
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        alert("Bitte wählen Sie eine Bewertung aus.");
        return;
    }

    // Berechne die Reaktionszeit
    const endTime = new Date().getTime();
    const reactionTime = endTime - startTime;

    // Berechne den Informationsgehalt in Bit
    const informationContent = calculateInformationContent(reactionTime, t_avg);

    // Sammle die Bewertung und Reaktionszeit
    const rating = selectedRating.value;
    results.push({ info: infos[infoIndex], rating: rating, time: reactionTime, infoBits: informationContent });

    // Nächste Information laden
    infoIndex++;
    loadNextInfo();
}

function calculateInformationContent(t, t_avg) {
    // Berechne den Informationsgehalt I(t) = -log2(t_avg / t)
    return Math.max(0, -Math.log2(t_avg / t));
}

function showResults() {
    document.getElementById('info-container').classList.add('hidden');
    document.getElementById('rating-section').classList.add('hidden');

    // Tabelle leeren
    const resultBody = document.getElementById('result-body');
    resultBody.innerHTML = '';

    // Ergebnisse in die Tabelle einfügen
    results.forEach((result, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.info}</td>
            <td>${result.rating}</td>
            <td>${result.time} ms</td>
            <td>${result.infoBits.toFixed(2)} Bit</td>
        `;
        resultBody.appendChild(row);
    });

    // Zeige die Ergebnistabelle
    document.getElementById('result').classList.remove('hidden');
}
