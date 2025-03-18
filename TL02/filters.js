//JSON Objekte von URL ziehen
async function fetchJsonData(url = "http://217.160.241.48:3000/goto-mars/launches") {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // JSON object in in einer Variable speichern & auf Konsole ausgeben
        return data;
        // Fehlerbehandlung
    } catch (error) {
        console.log("There has been an Error: ", error);
    }
}

//
const putInDiv = (entry) => {

    //API Daten in Variablen abspeichern
    const launchSite = entry.launchSite;
    const launchTime = entry.launchTime;
    const location = entry.location;
    const seats = entry.seats;
    const availableSeats = entry.availableSeats;
    const costs = entry.costs;
    const image = entry.image;

    //Einhängepunkt in Variable
    const $jsonDiv = document.querySelector('#jsondata');

    //Neues Div für das entry Objekt kreieren & Klassenamen hinzufügen
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("jsondatadiv");

    //Elemente für alle Attribute des Objekts kreieren
    const $hForLaunchSite = document.createElement("h3");
    const $pForlaunchTime = document.createElement("p");
    const $pForLocation = document.createElement("p");
    const $pForSeats = document.createElement("p");
    const $pForAvailableSeats = document.createElement("p");
    const $pForCosts = document.createElement("p");
    const $imgForimage = document.createElement("img");

    //Elemente betexten
    $hForLaunchSite.textContent = launchSite;
    $pForlaunchTime.textContent = "Launch on: " + new Date(launchTime).toLocaleDateString("de-DE");
    $pForLocation.textContent = "Location: " + location;
    $pForSeats.textContent = "Seats: " + seats;
    $pForAvailableSeats.textContent = "Available Seats: " + availableSeats;
    $pForCosts.textContent = "Costs: " + costs + " €";
    $imgForimage.src = "http://217.160.241.48:3000" + image;
    $imgForimage.alt = "Picture of launch terminal";
    $imgForimage.className = "terminal";

    //Elemente am Einhängepunkt einhängen
    entryDiv.appendChild($hForLaunchSite);
    entryDiv.appendChild($pForlaunchTime);
    entryDiv.appendChild($pForLocation);
    entryDiv.appendChild($pForSeats);
    entryDiv.appendChild($pForAvailableSeats);
    entryDiv.appendChild($pForCosts);
    entryDiv.appendChild($imgForimage);

    //
    $jsonDiv.appendChild(entryDiv);
}

//Überprüfen, welche Sortier-Option gerade ausgewählt ist, und dementsprechend sortieren
const checkSorting = (response, sortingOperator) => {
    if (sortingOperator.text === "Date") {
        for (let i = 0; i < response.data.length; i++) {
            response.data[i].launchTime = new Date(response.data[i].launchTime).getTime();
        }
        response.data.sort((a, b) => a.launchTime - b.launchTime);
    }
    else if (sortingOperator.text === "Price") {
        response.data.sort((a, b) => a.costs - b.costs);
    }
    return response;
}

//EventListener für alle Filterbuttons & entsprechende Darstellung
const $filterButtons = document.querySelectorAll(".filterButton");

$filterButtons.forEach(($filterButton) => {
    $filterButton.addEventListener("click", (event) => {
        const filterOperator = event.target.id;
        //Anzeige der letzten Anfrage leeren
        const $jsonDiv = document.querySelector('#jsondata');
        $jsonDiv.innerHTML = '';

        const dropdown = document.getElementById("sort");
        const selectedIndex = dropdown.selectedIndex;
        const selectedOption = dropdown.options[selectedIndex];

        if (filterOperator === "noSites") {
            fetchJsonData().then((response) => {
                response = checkSorting(response, selectedOption);
                for (let i = 0; i < response.data.length; i++) {
                    putInDiv(response.data[i]);
                }
            });
        }
        else if (filterOperator === "aurora") {
            fetchJsonData().then((response) => {
                response = checkSorting(response, selectedOption);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === "Aurora Spaceport") {
                        putInDiv(response.data[i]);
                    }
                }
            });
        }
        else if (filterOperator === "aurora") {
            fetchJsonData().then((response) => {
                response = checkSorting(response, selectedOption);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === "Eternis Terminal") {
                        putInDiv(response.data[i]);
                    }
                }
            });

        }
        else if (filterOperator === "eternis") {
            fetchJsonData().then((response) => {
                response = checkSorting(response, selectedOption);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === "Olympus Spaceport") {
                        putInDiv(response.data[i]);

                    }
                }
            });

        }
        else if (filterOperator === "olympus") {
            fetchJsonData().then((response) => {
                response = checkSorting(response, selectedOption);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === "Outlander Spaceport") {
                        putInDiv(response.data[i]);
                    }
                }
            });
        }
        else if (filterOperator === "noPriceDate") {
            fetchJsonData().then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    putInDiv(response.data[i]);
                }
            });

        })

})

const $sortButtons = document.querySelectorAll(".sortButton");

//Event-Listener für alle Sortierbuttons und demensprechende Darstellung
$sortButtons.forEach(($sortButton) => {
    $sortButton.addEventListener("click", (event) => {
        const sortOperator = event.target.id;
        //Anzeige der letzten Anfrage leeren
        const $jsonDiv = document.querySelector('#jsondata');
        $jsonDiv.innerHTML = '';

        const dropdown = document.getElementById("launches");
        const selectedIndex = dropdown.selectedIndex;
        const selectedOption = dropdown.options[selectedIndex];

        //Überprüfen, welche Option gerade beim Filter-Button ausgewählt ist

        if (sortOperator === "noPriceDate") {
            fetchJsonData().then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === selectedOption.text || selectedOption.text === "None") {
                        putInDiv(response.data[i]);
                    }
                }
            });
        }
        if (sortOperator === "date") {
            fetchJsonData().then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    response.data[i].launchTime = new Date(response.data[i].launchTime).getTime();
                }
                response.data.sort((a, b) => a.launchTime - b.launchTime);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === selectedOption.text || selectedOption.text === "None") {
                        putInDiv(response.data[i]);
                    }
                }
            });
        }
        if (sortOperator === "price") {
            fetchJsonData().then((response) => {
                response.data.sort((a, b) => a.costs - b.costs);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].launchSite === selectedOption.text || selectedOption.text === "None") {
                        putInDiv(response.data[i]);
                    }
                }
            });

        }
    })
})





