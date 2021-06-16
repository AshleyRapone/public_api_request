/******************************************
Treehouse FSJS Techdegree:
project 5 - Public API Request
******************************************/

// This function makes an API call to the url and returns the data
async function fetchEmployees(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/* This function takes the API response and loops through each employee information and displays a card with the 
employee's image, first and last name, email, and city and state or country */
function displayEmployeeGallery(employeeInfo) {
  const gallery = document.getElementById('gallery');
  // Loop through the employee info data
  employeeInfo.then(data => {
    for (let i = 0; i < data.results.length; i++) {
      const profileImage = data.results[i].picture.medium;
      const name = data.results[i].name;
      const email = data.results[i].email;
      const location = data.results[i].location;
      // Add HTML to the gallery so that each of the employees information is displayed
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

// This function will return the state if the country is United States otherwise it will return the name of the country 
function countryOrState(location) {
  return location.country === 'United States' ? location.state : location.country;
}

// This function will format the birthday MM/DD/YYYY
function formatBirthday(dob) {
  const dobRegex = /\d{4}-\d{2}-\d{2}/gm
  dob = dob.match(dobRegex)
  const year = dob[0].split('-')[0]
  const month = dob[0].split('-')[1]
  const day = dob[0].split('-')[2]
  return `${ month }/${ day }/${ year }`
}

// This function will format the phone number (XXX) XXX-XXXX
function formatPhoneNumber(phoneNumber) {
  const phoneRegEx1 = /(\d{3})/gm
  const phoneRegEx2 = /(\d{4})/gm
  const firstHalfPhoneNumber = phoneNumber.match(phoneRegEx1)
  const secondHalfPhoneNumber = phoneNumber.match(phoneRegEx2)
  return `(${ firstHalfPhoneNumber[0]}) ${ firstHalfPhoneNumber[1] }-${ secondHalfPhoneNumber[0] }`
}

// API for returning the information of 12 random users that live in either United States or Canada
url = 'https://randomuser.me/api/?results=12&nat=us,ca'
const employeeInfo = fetchEmployees(url);
displayEmployeeGallery(employeeInfo)

// Listen for a click on an employees card
$('.gallery').on('click', '.card', function(event) {
  employeeNumber = parseInt(event.currentTarget.getAttribute('id') - 1);
  const modalGallery = document.getElementById('gallery');
  // Get the correct employee by the employee number via the id
  employeeInfo.then(data => {
    const employee = data.results[employeeNumber]
    // Employee information that will display in the modal view
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

// Listen for a click on the button to close the modal window
$('.gallery').on('click', '#modal-close-btn', function(event) {
  const modalContainer = document.querySelector('.modal-container')
  modalContainer.remove();
})