
function handleIntersect(entries) {
    entries.forEach((entry) => {

        //wenn Elemente im Bild sind, wird Klasse show (Opacity 1 zugeordnet)
        entry.target.classList.toggle("show", entry.isIntersecting);

        

    });
}


//definiere den Intersection Observer: checkt, ob Elmente im Viewport zu sehen
let options = {
    root: null,
    threshold: 0.5,
}


const observer = new IntersectionObserver(handleIntersect, options);

//Übergeben der Text-Elemente an den Observer
const textSections = document.querySelectorAll(".text_item");
const vizSections = document.querySelectorAll(".viz_item");

textSections.forEach((section) => {
    observer.observe(section);
});

vizSections.forEach((section) => {
    observer.observe(section)});