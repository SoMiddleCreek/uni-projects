"use strict";

//Datum in gewünschtes Format konvertieren
const convertDateToNumber = (inputDate) => {
    const date = new Date(inputDate).getTime();
    return date;
}

//Abstand zwischen 2 Daten ermitteln
const calculateDistance = (date) => {
    const now = new Date().getTime();
    return date - now; 
}

//nähestes Launch-Datum ermitteln
const nearestLaunch = (input) => {
    let closestLaunch = calculateDistance(convertDateToNumber(input.data[0].launchTime));
    let launchInfo = input.data[0];
    for (let i = 1; i < input.data.length; i++) {
        let distance = calculateDistance(convertDateToNumber(input.data[i].launchTime));
        if(closestLaunch > distance || closestLaunch < 0){
            closestLaunch = distance;
            launchInfo = input.data[i];
        }
    }
    return launchInfo;
}

//Launch Site ausgeben
const writeAnnouncement = (stationName) => {
    const $site = document.createElement("span");
    $site.textContent = stationName;
    $site.setAttribute("id","site");

    const $announcement = document.createElement("span");
    $announcement.textContent = "Next launch at: "
    $announcement.setAttribute("id", "announcement");

    const $location = document.getElementById("location");
    $location.appendChild($announcement);
    $location.appendChild($site);
}

let jsonData = null;

const fetchApiForCountDown =  () => {
    return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch('http://217.160.241.48:3000/goto-mars/launches');
          const input = await response.json();
          jsonData = input;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
}

fetchApiForCountDown()  
    .then(() => {
        //Namen der ermittelten Space Station speichern und ausgeben.
        const stationName = nearestLaunch(jsonData).launchSite;
        writeAnnouncement(stationName);
        
        //Countdown jede Sekunde updaten
        const x = setInterval(function() {

            // Differenz zwischen jetzt & Countdown-Datum ermitteln
            let distance = calculateDistance(convertDateToNumber(nearestLaunch(jsonData).launchTime));
        
            // Countdown beenden, wenn keine Countdowns mehr vorliegen
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "No Launches available";
            }
        
            // Berechnung der verbleibenden Tage, Stunden, Minuten und Tage
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
        
    
        }, 1000);

  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });




