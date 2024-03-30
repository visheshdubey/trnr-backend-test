// Hide delete form initially
$('#deleteForm').hide();
// ----------------------------------------------------------------------- -->
//                          Login form submission                          -->
// ----------------------------------------------------------------------- -->
$('#loginBtn').click(function async() {
     const email = $('#username').val();
     const password = $('#password').val();
     // Show spinner
     $('#spinner').removeClass('hidden');
     $(this).prop('disabled', true);

     fetch('http://localhost:1337/api/auth/local/', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({ identifier: email, password: password })
     })
          .then(response => response.json())
          .then(data => {
               localStorage.setItem('jwtToken', data.jwt);
               if (data.jwt) {
                    console.log('JWT Token:', data.jwt);
                    // Hide spinner
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar').text('Login successful!').removeClass('hidden').addClass('block').delay(3000).fadeOut(400);

                    // Hide login form and show delete form
                    $('#loginForm').hide();
                    $('#deleteForm').show();
               }
               else {
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar').text('Login failed. Please try again.').removeClass('hidden').removeClass('bg-gray-800').addClass('block').addClass('bg-red-800').delay(3000).fadeOut(400).removeClass('bg-red-800').addClass('bg-gray-800');
               }

          })
          .catch(error => {
               console.error('Error:', error); // Hide spinner
               $('#spinner').addClass('hidden');
               $('#loginBtn').prop('disabled', false);

               // Update snackbar text and show it
               $('#snackbar').text('Login failed. Please try again.').removeClass('hidden').removeClass('bg-gray-800').addClass('block').addClass('bg-red-800').delay(3000).fadeOut(400);

          });
});
// ----------------------------------------------------------------------- -->
//                           Delete Button Click                           -->
// ----------------------------------------------------------------------- -->
$('#deleteBtn').click(function () {
     // Get the value of the checked radio button
     var selectedReason = $('input[name="deleteReason"]:checked').val();
     console.log("Selected reason for leaving: ", selectedReason);

     // Check if 'Other' is selected and get the textarea value
     if (selectedReason === "Other") {
          var otherReason = $("#otherReasonInput").val();
          console.log("Other reason specified: ", otherReason);
     }
     // const email = $('#username').val();
     // const password = $('#password').val();
     // Show spinner
     $('#spinner').removeClass('hidden');
     $(this).prop('disabled', true);
     var jwtToken = localStorage.getItem('jwtToken');
     fetch('http://localhost:1337/api/delete', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          },
          body: JSON.stringify({ reason: selectedReason, explanation: otherReason })
     })
          .then(response => response.json())
          .then(data => {
               // jwtToken = data.message;
               if (data.message === 'success') {
                    // Hide spinner
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar').text('Login successful!').removeClass('hidden').addClass('block').delay(3000).fadeOut(400);

                    // Hide login form and show delete form
                    $('#loginForm').hide();
                    $('#deleteForm').show();
               }
               else {
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar').text('Login failed. Please try again.').removeClass('hidden').removeClass('bg-gray-800').addClass('block').addClass('bg-red-800').delay(3000).fadeOut(400).removeClass('bg-red-800').addClass('bg-gray-800');
               }

          })
          .catch(error => {
               console.error('Error:', error); // Hide spinner
               $('#spinner').addClass('hidden');
               $('#loginBtn').prop('disabled', false);

               // Update snackbar text and show it
               $('#snackbar').text('Login failed. Please try again.').removeClass('hidden').removeClass('bg-gray-800').addClass('block').addClass('bg-red-800').delay(3000).fadeOut(400);

          });
});
// Optional JavaScript for form submission handling
$(document).ready(function () {
     $('#loginForm').submit(function (e) {
          e.preventDefault();
          // Add form submission logic here
          // For demonstration, just log username and password to the console
          console.log('Username:', $('#username').val());
          console.log('Password:', $('#password').val());
          // Redirect or show login success message
     });
});