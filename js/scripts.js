// Gallery mockup

function getEmployee() {
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(
         data => {
            const info = data.results[0]
            formatUser(info.picture.thumbnail, info.email, info.name, info.location)})
}

//function getEmployee() {
//    $.ajax({
//        url: 'https://randomuser.me/api/',
//        dataType: 'json',
//        success: function(data) {
//        const profile_image = data.results[0].picture.thumbnail;
//        const email = data.results[0].email;
//        const name = data.results[0].name;
//        const location = data.results[0].location;
//        formatUser(profile_image, email, name, location)
//        }
//    });
//}


function country_or_state(location) {
    return location.country === 'United States' ? location.state : location.country;
}

function formatUser(profile_image, email, name, location) {
    const gallery = document.getElementById('gallery');
    const html = `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${profile_image}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city}, ${country_or_state(location)}</p>
        </div>
        </div>`
    gallery.insertAdjacentHTML('beforeend', html);
}
/*
function displayEmployeeGallery(numberOfEmployees) {
  counter = 0
  while (counter < numberOfEmployees) {
    getEmployee();
    counter+= 1;
  }

}
*/

//const employeePromise = new Promise((resolve, reject) => {
//    fetch('https://randomuser.me/api/')
//    .then(response => response.json())
//    .then(
//         data => {
//            const info = data.results[0]
//            formatUser(info.picture.thumbnail, info.email, info.name, info.location)})  
//    .then()  
//})

//employeePromise

/*
$('.gallery').on('click', '.card', function(event) {
  const modalImage = event.currentTarget.querySelector('.card-img').src;
  const modalName = event.currentTarget.querySelector('#name').textContent;
  const modalEmail = event.currentTarget.querySelector('.card-text').textContent;
  console.log(modalEmail);
  const html = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${modalImage}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${modalName}</h3>
            <p class="modal-text">${modalEmail}</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>  
`
   const newGallery = document.getElementById('gallery');
   newGallery.insertAdjacentHTML('beforeend', html);
});

*/

//displayEmployeeGallery(12);

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => {displayEmployeeGallery(data.results)})


function displayEmployeeGallery(employeeInfo) {
  for (let i = 0; i < employeeInfo.length; i++) {
    formatUser(employeeInfo[i].picture.thumbnail, employeeInfo[i].email, employeeInfo[i].name, employeeInfo[i].location)
  }
}

