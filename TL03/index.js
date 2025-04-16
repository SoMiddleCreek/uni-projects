// Bäume berechnen mit übergebenen Daten
const processCo2Data = (jsonData) => {
  let sumCo2 = 0;

  for (let i = 0; i < jsonData.length; i++) {
    sumCo2 += jsonData[i].co2;
  }

  const result = sumCo2 * 80;
  return result;
};

//Berechnete Zahl in´s DOM einbinden
const addResultToDocument = (result) => {
  //Eltern Div im html file bestimmen, eine Variable geben
  const $treeDiv = document.querySelector("#trees");

  //Neues numberDiv für Zahl kreiern und Klasse definieren
  const $numberDiv = document.createElement("div");
  $numberDiv.classList.add("treeNumber");
  $numberDiv.style.backgroundColor = "black";
  $numberDiv.style.borderRadius = "10px";

  //Elemente für numberDiv kreieren (noch nicht angehängt)
  const $h = document.createElement("h2");
  const $pForNumber = document.createElement("p");

  //Elemente befüllen
  $h.textContent = "Für 2023 benötigte Bäume:";
  const formattedResult = result.toLocaleString("de-DE");
  $pForNumber.textContent = formattedResult;

  //befüllte Elemente in numberDiv einhängen
  $numberDiv.appendChild($h);
  $numberDiv.appendChild($pForNumber);

  //neues numberDiv im treeDiv einhängen
  $treeDiv.appendChild($numberDiv);
};

// set the dimensions and margins of the graph
const margin = { top: 10, right: 20, bottom: 60, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// append x axis label
const xAxisText = svg
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", height + 40)
  .attr("text-anchor", "end")
  .attr("fill", "white")
  .text("Kosten pro Rakete in Euro");

//append y axis label
const yAxisText = svg
  .append("text")
  .attr("class", "label")
  .attr("x", 0)
  .attr("y", -40)
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("fill", "white")
  .text("CO2-Emissionen in Tonnen");

//scale for x axis
const x = d3.scaleLinear().domain([100000, 500000]).range([0, width]);

//append x axis
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));

//scale for y axis
const y = d3.scaleLinear().domain([200, 2200]).range([height, 0]);
//append y axis
svg.append("g").call(d3.axisLeft(y));

// Add a scale for bubble size
/*Anmerkung: eigentlich empfiehlt es sich nicht, bei der Größe des Radius auf lineares Wachstum zurückzugreifen, 
da das Flächenwachstum der Kreise dadurch quadratisch ist. Allerdings wurde das sowohl im Template als auch in der Vorlage so umgesetzt, 
also haben wir das so übernommen. */
const z = d3.scaleLinear().domain([210, 1100]).range([5, 30]);

//fetch the data
async function fetchJsonData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
    // Fehlerbehandlung
  } catch (error) {
    console.log("There has been an Error: ", error);
  }
}

// Read the fetched data

fetchJsonData()
  .then((input) => {
    //Compute number of trees and print it
    const result = processCo2Data(input.data);
    addResultToDocument(result);

    // Add dots
    svg
      .selectAll("circle")
      .data(input.data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.cost))
      .attr("cy", (d) => y(d.co2))
      .attr("r", (d) => z(d.seats))
      .style("fill", "orange")
      .style("opacity", "0.7")
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  })
  .catch((error) => {
    const errormessage =
      "We are sorry! There was a problem with retrieving the data! " + error;
    console.log(errormessage);
  });
