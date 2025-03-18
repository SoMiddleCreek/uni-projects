const personalGender = d3.select("#personal_gender_viz")
    .append("svg")
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "scale(0.7)")



// Create the personalAge
personalGender
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

// Create the ellipse group
const personalGenderHeads = personalGender.append("g").attr("id", "noten");

// Create the ellipses
personalGenderHeads.selectAll("ellipse")
    .data([
        { id: "genderEllipse1", sound: "F2", cx: 100, cy: 180, fill: "rgb(244, 86, 191)", category: "weiblich" },
        { id: "genderEllipse2", sound: "A2", cx: 100, cy: 140, fill: "#0055ff", category: "divers" },
        { id: "genderEllipse3", sound: "C3", cx: 100, cy: 100, fill: "orange", category: "männlich" },
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


const personalAge = d3.select("#personal_age_viz")
    .append("svg")
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "scale(0.7)")

// Create the personalAge
personalAge
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

// Create the ellipse group
const personalAgeHeads = personalAge.append("g").attr("id", "noten")


// Create the ellipses
personalAgeHeads
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

    })
    .append("title")
    .text(function (d) {
        return d.category;
    });


const personalOrigin = d3.select("#personal_origin_viz")
    .append("svg")
    .attr("height", 200)
    .attr("width", 200)
    .attr("transform", "scale(0.7)")

personalOrigin
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

// Create the ellipse group
const personalOriginHeads = personalOrigin.append("g").attr("id", "noten")


// Create the ellipses
personalOriginHeads
    .selectAll("ellipse")
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