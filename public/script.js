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
 * Lässt die Daten aufrufen, wenn die HTML Webseite vollständig geladen hat
 */
document.addEventListener("DOMContentLoaded", async () => {
    console.log("hi");
    alleKurse = await getKurse();
    
    const container = document.getElementById("kurscontainer");
    const form = document.createElement('form');
    
    //Alle Kurse durchgehen und zur Auswahl auflisten mit ihren Vorlesungen, Übungen und Turorien
    alleKurse.forEach(kurs => {
        //Formular zur Auswahl der Kurse erstellen
        const fieldset = document.createElement('fieldset');
        fieldset.setAttribute('name', `${kurs.id}`);
        fieldset.setAttribute('disabled', `disabled`);
        const legend = document.createElement('legend');
        
        const kursinput = document.createElement('input');
        kursinput.setAttribute('type', 'checkbox');        
        
        kursinput.setAttribute('id', `${kurs.id}`);
        kursinput.setAttribute('value', `${kurs.name}`);
        kursinput.setAttribute('name', `kurs`);
        const kurslabel = document.createElement('label');
        kurslabel.setAttribute('for', `${kurs.id}`);
        kurslabel.textContent = kurs.name;

        legend.appendChild(kursinput);
        legend.appendChild(kurslabel);
        fieldset.appendChild(legend);
        form.appendChild(fieldset);

        kursinput.addEventListener('click', function() {
            fieldset.disabled = !fieldset.disabled;
        });


        //In dem Formular für jeden Kurs die Übungen zur Auswahl erstellen
        kurs.termine.forEach(termin => {
            if (termin.typ == "Übung") {
                const terminInput = document.createElement('input');
                if (termin.id == "UE1") {
                    terminInput.setAttribute('checked', `checked`);
                }
                terminInput.setAttribute('name', `${kurs.id}`);
                terminInput.setAttribute('id', `${termin.id}`);
                terminInput.setAttribute('type', 'radio');
                // terminInput.setAttribute('type', 'hidden');
                terminInput.setAttribute('value', `${termin.id}`);
                fieldset.appendChild(terminInput);
            }
            const terminlabel = document.createElement('label');
            terminlabel.setAttribute('id', `${termin.id}`);
            terminlabel.setAttribute('for', `${termin.id}`);
            terminlabel.textContent = termin.typ + ": " + termin.tag + "s " + termin.block + ". Block";
            const br = document.createElement('br');
            
            fieldset.appendChild(terminlabel);
            fieldset.appendChild(br);
        })

        
    });
    //Button zum Bestätigen hinzufügen
    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Auswahl bestätigen');
    form.appendChild(button);
    
    container.appendChild(form);


    //Den Stundenplan erstellen, indem eine leeres Stundenplangerüst erstellt wird und dann die Daten nach dem Knopfdruck einfügen
    const stundenplan = document.getElementById("stundenplan");

    //Einen leeren Stundenplan erstellen
    const bloecke = [];
    const table = document.createElement('table');

    //Zeile mit Wochentagen
    const wochenzeile = document.createElement('tr');
    wochenzeile.innerHTML = `<th></th><td><strong>Montag</strong></td><td><strong>Dienstag</strong></td><td><strong>Mittwoch</strong></td><td><strong>Donnerstag</strong></td><td><strong>Freitag</strong></td>`;
    table.appendChild(wochenzeile);

    //Restliche Zeilen erstellen
    const zeiten = ['8.15<br> - <br>9.45', '10.15<br> - <br>11.45', '12.30<br> - <br>14.00', '14.15<br> - <br>15.45', '16.00<br> - <br>17.30', '17.30<br> - <br>19.00'];
    for (let i = 0; i < 6 ; i++) {
        const block = document.createElement('tr');
        const zeit1 = document.createElement('th');
        zeit1.innerHTML = zeiten[i];
        block.appendChild(zeit1);
        const tage = [];
        for (let i = 0; i < 5; i++) {
            const feld = document.createElement('td');
            block.appendChild(feld);
            tage.push(feld);
        }
        table.appendChild(block);
        bloecke.push(tage);
    }
    stundenplan.appendChild(table);


    //Wenn der Bestätigungsbutton gedrückt wurde, werden die Daten in den Stundenplan eingefügt
    button.addEventListener("click", async () => {
        console.log("Auf Button geklickt");

        //Die Daten aus dem Formular holen
        const kurse = document.querySelectorAll('input[name="kurs"]:checked');

        kurse.forEach(kurs => {
            const id = kurs.getAttribute('id');
            
            const uebung = document.querySelectorAll(`input[name="${id}"]:checked`)
            
            
        });



        //bloecke sind die Zeilen, also die bloecke 1 bis 6


        


        
        





        
    });

    // kursinput.setAttribute('type', 'hidden');

});