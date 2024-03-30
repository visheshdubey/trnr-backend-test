$(document).ready(function () {
     // Function to extract query parameters
     function getQueryParam(param) {
          var queryString = window.location.search;
          var urlParams = new URLSearchParams(queryString);
          return urlParams.get(param);
     }

     // Extract userId from URL
     var confirmationCode = getQueryParam('confirmationCode');

     // Make the GET request
     fetch(`https://app.trnr.com/api/delete/confirm/${confirmationCode}`, {
          method: 'GET'
     })
          .then(response => response.json())
          .then(data => {
               if (data.status === 200) {
                    $('#statusMessage').html(`
                    <h2 class="text-3xl font-medium text-gray-800 text-start">Request confirmed.</h2>
                    <p class="text-gray-600">Your account deletion request has been confirmed! Your data will be
                         deleted in next 3-4 working days.</p>`
                    );
               } else {
                    $('#statusMessage').html(`
                    <h2 class="text-3xl font-medium text-red-700 text-start">Request failed.</h2>
                    <p class="text-gray-600">Your account deletion request has been failed! Please raise a new request.</p>`);
               }
          })
          .catch(error => {
               console.error('Error:', error);
               $('#statusMessage').html('<h2 class="text-xl font-bold text-red-600">An error occurred while processing your request.</h2>');
          });
});