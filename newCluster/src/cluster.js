function fetchData() {
  return new Promise(function (resolve, reject) {
    d3.json("myData.json")
      .then(function (data) {
        resolve(data);
      })
  });
}

// Function to create the path for a hexagon
function createHexagonPath() {
  return "m5,35q-1.5,-2.598,0,-5.196l12,-20.785q1.5,-2.598,4.5,-2.598l24,0q3,0,4.5,2.598l12,20.785q1.5,2.598,0,5.196l-12,20.785q-1.5,2.598,-4.5,2.598l-24,0q-3,0,-4.5,-2.598z";
}

//"Malfunktion", clusterelement mit jeweiliger Farbe vom Button einfärben
function switchNodeColoring() {
  // Define the default style
  let defaultStyle = "hexagon";

  // Farben (der Ellipsen) auf HexagonStyles mappen
  const colorStyles = {
    "#69f9bf": "hexagon25",
    "#bf69f9": "hexagon65",
    "#f9bf69": "hexagonOver65",
    "#ffec61": "hexagonDE",
    "#61c3ff": "hexagonAusland",
    "#ff6174": "hexagonAnker",
  
  };

  // Check if  currentColor has a corresponding style
  if (colorStyles.hasOwnProperty(currentColor)) {
    // Get the corresponding style
    var currentStyle = colorStyles[currentColor];
  } else {
    // Use the default style
    var currentStyle = defaultStyle;
  }

  // Apply the new style
  d3.select(this).attr("class", currentStyle);
}

//sound functionalities
const sampler = new Tone.Sampler(
  {
    A1: "./persönlicheMelodien/Startmelodie.wav",
    A2: "./persönlicheMelodien/Gender.wav",
    A3: "./persönlicheMelodien/Age.wav",
    A4: "./persönlicheMelodien/Origin.wav"
  },
  {
    onload: () => {
      console.log("loaded");
    }
  }
).toDestination();

document.querySelector("#startmelodie").addEventListener("click", () => {
  sampler.triggerAttackRelease("A1");
});
document.querySelector("#genderSound").addEventListener("click", () => {
  sampler.triggerAttackRelease("A2");
});

document.querySelector("#ageSound").addEventListener("click", () => {
  sampler.triggerAttackRelease("A3");
});

document.querySelector("#originSound").addEventListener("click", () => {
  sampler.triggerAttackRelease("A4");
});

const synth = new Tone.MonoSynth().toDestination();

// Function to play a note depending on node's data
function playSoundDatadriven(d) {
  // pitch and duration based on node data
  const pitch = d.sound;
  const duration = "4n";

  let notenSynth = new Tone.Synth().toDestination();

  console.log("Sound was played:" + d.sound);
  // Trigger the synth or any other instrument with the specific parameters
  notenSynth.triggerAttackRelease(pitch, duration);
}

// Set up the SVG dimensions
const width = 1000;
const height = 500;

// Calculate the center of the SVG container
const centerX = 40;
const centerY = 100;


//color definitions
let currentColor = "undefined";
//cluster for gender - first without colors
fetchData().then(function (data) {

  let svgGenderCluster = d3
    .select("#genderCluster")
    .attr("width", width)
    .attr("height", height)

  let hexagonGroupGender = svgGenderCluster
    .selectAll("g")
    .data(data.dataGender)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);

  hexagonGroupGender
    .append("path")
    //.attr("class", "hexagon")
    .attr("d", (d) => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`);

  const $genderColorButton = d3.select("#gender_showColors");
  $genderColorButton
    .on("click", function () {
      hexagonGroupGender

        .classed("hexagonFemale", function (d, i) {
          return d.gender == "female";
        })
        .classed("hexagonMale", function (d, i) {
          return d.gender == "male";
        })

    })
});

fetchData().then(function (data) {
  let svgInitialCluster = d3
    .select("#initialCluster")
    .attr("width", width)
    .attr("height", height);

  // Create the second group for each hexagon
  let hexagonsInitialCluster = svgInitialCluster
    .selectAll("g")
    .data(data.data2021)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);

  // Draw the hexagons
  hexagonsInitialCluster
    .append("path")
    .attr("d", (d) => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`);

  //notenvisualisierung für gender cluster
  const genderNoteLines = d3.select("#genderNoten")

  genderNoteLines
    .append("g")
    .attr("transform", "translate(830,0)");
    
    // Create the ageNoteLines
  genderNoteLines
    .selectAll("line")
    .data([40, 80, 120, 160, 200])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", (d) => d)
    .attr("x2", 170)
    .attr("y2", (d) => d)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Create the ellipse group
  const genderHeads = genderNoteLines.append("g").attr("id", "noten");
  
  // Create the ellipses
  genderHeads
    .selectAll("ellipse")
    .data([
      { id: "genderEllipse1", sound: "F2", cx: 100, cy: 180, fill: "rgb(244, 86, 191)", category: "weiblich" },
      { id: "genderEllipse2", sound: "C3", cx: 100, cy: 100, fill: "orange", category: "männlich"},
    ])
    .enter()
    .append("ellipse")
    .attr("id", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return d.cx;
    })
    .attr("cy", function (d) {
      return d.cy;
    })
    .attr("rx", 30)
    .attr("ry", 16)
    .attr("fill", function (d) {
      return d.fill;
    })
    .attr("transform", "rotate(-10,100,100)")
    
    .on("click", function (event, d) {
      playSoundDatadriven(d); 
     
    })
    .append("title")
    .text(function (d) {
      return d.category;
    });

  // SVG Element fürs Malen (Alter)
  let svgForAgeColoring = d3
    .select("#ageClusterColoring")
    .attr("width", width)
    .attr("height", height);

  //Cluster-Elemente fürs Malen definieren (Alter)
  let hexagonGroupAgeColoring = svgForAgeColoring
    .selectAll("g")
    .data(data.dataAltersgruppen)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`)


  // Cluster-Elemente fürs Malen erstellen (Alter)
  hexagonGroupAgeColoring
    .append("path")
    .attr("d", () => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`)
    .on("mouseover", switchNodeColoring);


  //bereits gefärbter Cluster für Info -- Alter
  // SVG Element (Alter)
  let svgForAgeInfo = d3
    .select("#ageClusterInfo")
    .attr("width", width)
    .attr("height", height);

  let hexagonGroupAgeInfo = svgForAgeInfo
    .selectAll("g")
    .data(data.dataAltersgruppen)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`)

  hexagonGroupAgeInfo
    .append("path")
    .attr("d", () => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`)
    .classed("hexagon25", function (d, i) {

      return d.altersgruppen == "<25";
    })
    .classed("hexagon65", function (d, i) {

      return d.altersgruppen == ">25";
    })
    .classed("hexagonOver65", function (d, i) {

      return d.altersgruppen == ">65";
    });
 

     // SVG Element fürs Malen (Herkunft)
  let svgForOriginColoring = d3
  .select("#originClusterColoring")
  .attr("width", width)
  .attr("height", height);


  //Cluster-Elemente fürs Malen definieren (Herkunft)
  let hexagonGroupOriginColoring = svgForOriginColoring
    .selectAll("g")
    .data(data.dataBevölkerungsgruppe)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);

  //Cluster-Elemente fürs Malen erstellen (Herkunft)
  hexagonGroupOriginColoring
    .append("path")
    .attr("d", () => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`)
    .on("mouseover", switchNodeColoring);


  //Cluster für Origin Info
  let svgForOriginInfo = d3
  .select("#originClusterInfo")
  .attr("width", width)
  .attr("height", height);


  let hexagonGroupOriginInfo = svgForOriginInfo
    .selectAll("g")
    .data(data.dataBevölkerungsgruppe)
    .enter()
    .append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);

  hexagonGroupOriginInfo
    .append("path")
    .attr("d", () => createHexagonPath())
    .attr("transform", (d, i) => `translate(${(d.x + 1) * 10}, ${d.y})`)
    .classed("hexagonDE", function (d, i) {
      return d.bevölkerungsgruppe == "Deutschland";
    })
    .classed("hexagonAusland", function (d, i) {
      return d.bevölkerungsgruppe == "Ausland";
    })
    .classed("hexagonAnker", function (d, i) {
      return d.bevölkerungsgruppe == "Ausland (Status: Flüchtlinge/Asyl)";
    });

    

  //notenvisualisierung für age cluster
  //Malen
  const ageNoteLines = d3.select("#ageNoten")

  ageNoteLines
    .append("g")
    .attr("transform", "translate(830,50)")
    .attr("width", "500")
    .attr("height", "500");

  // Create the ageNoteLines
  ageNoteLines
    .selectAll("line")
    .data([40, 80, 120, 160, 200])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", (d) => d)
    .attr("x2", 170)
    .attr("y2", (d) => d)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  // Create the ellipse group
  const ageHeads = ageNoteLines.append("g").attr("id", "noten");

  // Create the ellipses
  ageHeads
    .selectAll("ellipse")
    .data([
      { id: "ellipse1", sound: "F3", cx: 100, cy: 180, fill: "#69f9bf", category: "Alter: 0-25 Jahre" },
      { id: "ellipse2", sound: "A3", cx: 100, cy: 140, fill: "#bf69f9", category: "Alter: 25-65 Jahre" },
      { id: "ellipse3", sound: "C4", cx: 100, cy: 100, fill: "#f9bf69", category: "Alter: 65 Jahre und älter" },
    ])
    .enter()
    .append("ellipse")
    .attr("id", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return d.cx;
    })
    .attr("cy", function (d) {
      return d.cy;
    })
    .attr("rx", 30)
    .attr("ry", 16)
    .attr("fill", function (d) {
      return d.fill;
    })
    .attr("transform", "rotate(-10,100,100)")

    .on("click", function (event, d) {
      playSoundDatadriven(d);
      currentColor = d.fill;
      console.log(currentColor);
      console.log(d.fill);

    })
    .append("title")
    .text(function (d) {
      return d.category;
    });
  
  //Info
  const ageNoteLinesInfo = d3.select("#ageNotenBalken")

  ageNoteLinesInfo
    .append("g")
    .attr("transform", "translate(830,50)")
    .attr("width", "500")
    .attr("height", "500");

  // Create the ageNoteLines
  ageNoteLinesInfo
    .selectAll("line")
    .data([40, 80, 120, 160, 200])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", (d) => d)
    .attr("x2", 200)
    .attr("y2", (d) => d)
    .attr("stroke", "black")
    .attr("stroke-width", 2);


//Origin Noten 
//Malen
  const originNoteLines = d3.select("#originNoten")
  originNoteLines
    .append("g")
    .attr("transform", "translate(830,0)");

  // Create the originNoteLines
  originNoteLines
    .selectAll("line")
    .data([40, 80, 120, 160, 200])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", (d) => d)
    .attr("x2", 170)
    .attr("y2", (d) => d)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  

  //Info
  const originNoteLinesInfo = d3.select("#originNotenBalken")
  originNoteLinesInfo
    .append("g")
    .attr("transform", "translate(830,0)");

  // Create the originNoteLines
  originNoteLinesInfo
    .selectAll("line")
    .data([40, 80, 120, 160, 200])
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("y1", (d) => d)
    .attr("x2", 170)
    .attr("y2", (d) => d)
    .attr("stroke", "black")
    .attr("stroke-width", 2);


    //Funktionen für Barchart/Noten

  let currentAgeState = "ellipse"; 

const buildAgeBarChart = function () {
  const chart = d3.select("#ageNotenBalken");

  const ageRectGroup = chart.append("g")
    .attr("id", "rectGroup")
    .attr("visibility", currentAgeState === "rect" ? "visible" : "hidden"); 

  const ageEllipseGroup = chart.append("g")
    .attr("id", "ellipseGroup")
    .attr("visibility", currentAgeState === "ellipse" ? "visible" : "hidden"); 

 
  ageRectGroup.selectAll("rect")
    .data(data.dataAgeChart)
    .enter()
    .append("rect")
    .attr("x", 60)
    .attr("y", (d, i) => i * 40 + 82)
    .attr("width", (d) => d.number * 2)
    .attr("height", 35)
    .attr("fill", (d) => d.color)
    .attr("transform", "translate(30,0)")
    .append("title")
    .text(function (d) {
      return d.categoryInfo;
    });

  
  ageEllipseGroup.selectAll("ellipse")
    .data([
      { id: "ellipse1", sound: "F3", cx: 100, cy: 180, fill: "#69f9bf", category: "Alter: 0-25 Jahre" },
      { id: "ellipse2", sound: "A3", cx: 100, cy: 140, fill: "#bf69f9", category: "Alter: 25-65 Jahre" },
      { id: "ellipse3", sound: "C4", cx: 100, cy: 100, fill: "#f9bf69", category: "Alter: 65 Jahre und älter" },
    ])
    .enter()
    .append("ellipse")
    .attr("id", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return d.cx;
    })
    .attr("cy", function (d) {
      return d.cy;
    })
    .attr("rx", 30)
    .attr("ry", 16)
    .attr("fill", function (d) {
      return d.fill;
    })
    .attr("transform", "rotate(-10,100,100)")
    .on("click", function (event, d) {
      playSoundDatadriven(d); 
     
    })
    .append("title")
    .text(function (d) {
      return d.category;
    });
};

// Initial function call to build the age chart
buildAgeBarChart();

// Ergebnis-Button für Alter
const $ageColorButton = d3.select("#age_showColors");
$ageColorButton.on("click", function () {
  const ageRectGroup = d3.select("#rectGroup");
  const ageEllipseGroup = d3.select("#ellipseGroup");

  if (currentAgeState === "rect") {
    ageRectGroup.attr("visibility", "hidden");
    ageEllipseGroup.attr("visibility", "visible");
    currentAgeState = "ellipse"; 
  } else {
    ageRectGroup.attr("visibility", "visible");
    ageEllipseGroup.attr("visibility", "hidden");
    currentAgeState = "rect"; 
  }
});


let currentOriginState = "ellipse"; 

const buildOriginBarChart = function () {
  const chart = d3.select("#originNotenBalken");

  const originRectGroup = chart.append("g")
    .attr("id", "originRectGroup")
    .attr("visibility", currentOriginState === "rect" ? "visible" : "hidden"); 

  const originEllipseGroup = chart.append("g")
    .attr("id", "originEllipseGroup")
    .attr("visibility", currentOriginState === "ellipse" ? "visible" : "hidden"); 


  originRectGroup.selectAll("rect")
    .data(data.dataOriginChart)
    .enter()
    .append("rect")
    .attr("x", 40)
    .attr("y", (d, i) => i * 40 + 82)
    .attr("width", (d) => d.number * 2)
    .attr("height", 35)
    .attr("fill", (d) => d.color)
    .attr("transform", "translate(30,0)")
    .append("title")
    .text(function (d) {
      return d.categoryInfo;
    });


  originEllipseGroup.selectAll("ellipse")
    .data([
      { id: "ellipse1", sound: "F4", cx: 100, cy: 180, fill: "#ffec61", category: "Herkunft: Deutschland" },
      { id: "ellipse2", sound: "A4", cx: 100, cy: 140, fill: "#61c3ff", category: "Herkunft: Ausland" },
      { id: "ellipse3", sound: "C5", cx: 100, cy: 100, fill: "#ff6174", category: "Herkunft: Ausland, Aufenthalt im Anker-Zentrum" },
    ])
    .enter()
    .append("ellipse")
    .attr("id", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return d.cx;
    })
    .attr("cy", function (d) {
      return d.cy;
    })
    .attr("rx", 30)
    .attr("ry", 16)
    .attr("fill", function (d) {
      return d.fill;
    })
    .attr("transform", "rotate(-10,100,100)")
    .on("click", function (event, d) {
      playSoundDatadriven(d); 
     
    })
    .append("title")
    .text(function (d) {
      return d.category;
    });
    
};

// Initial function call to build the origin chart
buildOriginBarChart();

// Ergebnis-Button für Herkunft
const $originColorButton = d3.select("#origin_showColors");
$originColorButton.on("click", function () {
  const originRectGroup = d3.select("#originRectGroup");
  const originEllipseGroup = d3.select("#originEllipseGroup");

  if (currentOriginState === "rect") {
    originRectGroup.attr("visibility", "hidden");
    originEllipseGroup.attr("visibility", "visible");
    currentOriginState = "ellipse"; // Update current state
  } else {
    originRectGroup.attr("visibility", "visible");
    originEllipseGroup.attr("visibility", "hidden");
    currentOriginState = "rect"; // Update current state
  }
});

  
  // Create the ellipse group
  const originHeads = originNoteLines.append("g").attr("id", "noten");

  // Create the ellipses
  originHeads
    .selectAll("ellipse")
    .data([
      { id: "ellipse1", sound: "C5", cx: 100, cy: 100, fill: "#ff6174", category: "Herkunft: Ausland, Aufenthalt im Anker-Zentrum" },
      { id: "ellipse2", sound: "A4", cx: 100, cy: 140, fill: "#61c3ff", category: "Herkunft: Ausland" },
      { id: "ellipse3", sound: "F4", cx: 100, cy: 180, fill: "#ffec61", category: "Herkunft: Deutschland" }
      
    ])
    .enter()
    .append("ellipse")
    .attr("id", function (d) {
      return d.id;
    })
    .attr("cx", function (d) {
      return d.cx;
    })
    .attr("cy", function (d) {
      return d.cy;
    })
    .attr("rx", 30)
    .attr("ry", 16)
    .attr("fill", function (d) {
      return d.fill;
    })
    .attr("transform", "rotate(-10,100,100)")
    .on("click", function (event, d) {
      playSoundDatadriven(d);
      console.log(d.sound);
      currentColor = d.fill;
      console.log(currentColor);
    })
    .append("title")
    .text(function (d) {
      return d.category
    });
});

