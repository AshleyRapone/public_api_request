/******************************************
Treehouse FSJS Techdegree:
project 5 - Public API Request
******************************************/

async function fetchEmployees(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayEmployeeGallery(employeeInfo) {
  const gallery = document.getElementById('gallery');
  employeeInfo.then(data => {
    for (let i = 0; i < data.results.length; i++) {
      const profileImage = data.results[i].picture.medium;
      const name = data.results[i].name;
      const email = data.results[i].email;
      const location = data.results[i].location;
      console.log(location)
    
      const html = `
      <div class="card" id="employee${i + 1}">
      <div class="card-img-container">
          <img class="card-img" src="${profileImage}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${location.city}, ${countryOrState(location)}</p>
      </div>
      </div>`
      gallery.insertAdjacentHTML('beforeend', html);
    }
  })
}

function countryOrState(location) {
  return location.country === 'United States' ? location.state : location.country;
}



url = 'https://randomuser.me/api/?results=12'
const employeeInfo = fetchEmployees(url);
displayEmployeeGallery(employeeInfo)

