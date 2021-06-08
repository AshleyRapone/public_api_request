// Gallery mockup

function getEmployee() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
        console.log(data);
        const profile_image = data.results[0].picture.thumbnail;
        const email = data.results[0].email;
        const name = data.results[0].name;
        const location = data.results[0].location;
        formatUser(profile_image, email, name, location)
        }
    });
}


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

function displayEmployeeGallery(numberOfEmployees) {
  counter = 0
  while (counter < numberOfEmployees) {
    getEmployee();
    counter+= 1;
  }

}

displayEmployeeGallery(12);