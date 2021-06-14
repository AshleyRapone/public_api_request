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
    
      const html = `
      <div class="card" id="${i + 1}">
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

function formatBirthday(dob) {
  const dobRegex = /\d{4}-\d{2}-\d{2}/gm
  dob = dob.match(dobRegex)
  const year = dob[0].split('-')[0]
  const month = dob[0].split('-')[1]
  const day = dob[0].split('-')[2]
  return `${ month }/${ day }/${ year }`
}

function formatPhoneNumber(phoneNumber) {
  const phoneRegEx1 = /(\d{3})/gm
  const phoneRegEx2 = /(\d{4})/gm
  const firstHalfPhoneNumber = phoneNumber.match(phoneRegEx1)
  const secondHalfPhoneNumber = phoneNumber.match(phoneRegEx2)
  return `(${ firstHalfPhoneNumber[0]}) ${ firstHalfPhoneNumber[1] }-${ secondHalfPhoneNumber[0] }`
}

url = 'https://randomuser.me/api/?results=12&nat=us,ca'
const employeeInfo = fetchEmployees(url);
displayEmployeeGallery(employeeInfo)


$('.gallery').on('click', '.card', function(event) {
  employeeNumber = parseInt(event.currentTarget.getAttribute('id') - 1);
  const modalGallery = document.getElementById('gallery');
  employeeInfo.then(data => {
    const employee = data.results[employeeNumber]
  
    const modalHtml = `
      <div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${ employee.picture.large } alt="profile picture">
              <h3 id="name" class="modal-name cap">${ employee.name.first } ${ employee.name.last }</h3>
              <p class="modal-text">${ employee.email }</p>
              <p class="modal-text cap">${ employee.location.city }</p>
              <hr>
              <p class="modal-text">${ formatPhoneNumber(employee.cell) }</p>
              <p class="modal-text">${ employee.location.street.number } ${employee.location.street.name}, ${ countryOrState(employee.location) }, ${ employee.location.postcode }</p>
              <p class="modal-text">Birthday: ${ formatBirthday(employee.dob.date) }</p>
          </div>
      </div>`
    modalGallery.insertAdjacentHTML('beforeend', modalHtml);
    })
})

$('.gallery').on('click', '#modal-close-btn', function(event) {
  const modalContainer = document.querySelector('.modal-container')
  modalContainer.remove();
})