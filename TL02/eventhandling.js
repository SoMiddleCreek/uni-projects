
const loader = document.querySelector("#loading");

// showing loading animation
function displayLoading() {
  loader.classList.add("display");


}

// hiding loading animation
function hideLoading() {
  loader.classList.remove("display");
}

displayLoading();

const fetchApi = async () => {

  try {

    const response = await fetch("http://217.160.241.48:3000/goto-mars/launches");

    const input = await response.json();


    const selector = document.getElementById("jsondata");


    for (let i = 0; i < input.data.length; i++) {
      // Create a container element for each data object
      const container = document.createElement('div');
      container.classList.add('jsondatadiv');

      // Create paragraphs for each property
      const name = document.createElement('h3');
      name.textContent = input.data[i].launchSite;

      const launchTime = document.createElement('p');
      launchTime.textContent = "Launch on: " + new Date(input.data[i].launchTime).toLocaleDateString("de-DE");

      const location = document.createElement('p');
      location.textContent = "Location: " + input.data[i].location;

      const seats = document.createElement('p');
      seats.textContent = "Seats: " + input.data[i].seats;

      const availableSeats = document.createElement('p');
      availableSeats.textContent = "Available Seats: " + input.data[i].availableSeats;

      const costs = document.createElement('p');
      costs.textContent = "Costs: " + input.data[i].costs + " €";

      const image = document.createElement('img');
      image.src = "http://217.160.241.48:3000" + input.data[i].image;
      image.alt = "Picture of launch terminal";
      image.className = "terminal";

      // Append paragraphs to the container
      container.appendChild(name);
      container.appendChild(launchTime);
      container.appendChild(location);
      container.appendChild(seats);
      container.appendChild(availableSeats);
      container.appendChild(costs);
      container.appendChild(image);

      // Append the container to the selector element in the HTML
      selector.appendChild(container);

    }

    hideLoading();

  }

  catch (error) {
    const selector = document.getElementById("errormessage");
    const errormessage = ("We are sorry! There was a problem with retrieving the data! " + error);
    selector.innerHTML = errormessage;
  }


};

fetchApi();







