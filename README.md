# public_api_request
## Employee Directory: Public API Request

### Features I added:
* The `fetchEmployees(url)` is an async function that takes a url as an argument and makes an API call using the fetch API and returns the response data
* The `displayEmployeeGallery(employeeInfo)` function takes json of employees and displays the employee's image, first and last name, email and city or location
* The `countryOrState(location)` function takes the location and if the location's country is the United States it will return the state, otherwise it will return a country
* The `formatBirthday(dob)` and `formatPhoneNumber(phoneNumber)` functions will format the birthday (MM/DD/YYYY) and phone number ((XXX) XXX-XXXX) respectively
* A url to the randomuser API was passed to the `fetchEmployees(url)`; the query parameters of the url filter for 12 users that live in the United States or Canada
* Two AJAX requests from the JQuery library; one request will open the modal window of the employee that was clicked and the other one will close the modal window when the close button is clicked


### Instructions:
* Open the index.html file in Google Chrome
* 12 employees and their information (image, first and last name, email and location) should be displayed
* Clicking on any of the 12 employee's information will open up a modal window displaying additional information on the employee which includes their phone number, full address and birthday
* Clicking the "X" on the top right of the modal window should close the modal window and the 12 employees should be displayed