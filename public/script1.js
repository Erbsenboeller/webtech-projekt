// Liste für die Kurse 
let alleKurse = [];

/**
 * Ruft die Kurse ab
 * Gobt bei einem Fehler eine Leere Liste zurück
 * @returns 
 */
async function getKurse() {
    try {
        const response = await fetch('/api/kurse');
        if (!response.ok) {
            return [];
        }
        const kurse = await response.json();
        return kurse;
    } catch (error) {
        console.error("Fehler beim Laden, ", error);
        return [];
    }
}

/**
 * Lässt die Daten aufrufen, wenn die HTML webseite vollständig geladen hat
 */
document.addEventListener("DOMContentLoaded", async () => {
    alleKurse = await getKurse();

    const container = document.getElementById("kurscontainer");
    
    alleKurse.forEach(kurs => {
        const kursListe = document.createElement('button');
        kursListe.textContent = kurs.name;
        container.appendChild(kursListe);
    });
});