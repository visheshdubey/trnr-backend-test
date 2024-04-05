$(document).ready(function () {
     // Hide delete form initially
     $('#deleteForm').hide();
     // Listen for any change on any radio input with name 'deleteReason'
     $('input[type=radio][name=deleteReason]').change(function () {
          // Check if the 'Other' radio button is selected
          if ($('#otherOption').is(':checked')) {
               // Show the textarea
               $('#otherReasonInput').show();
          } else {
               // Hide the textarea
               $('#otherReasonInput').hide();
          }
     });
});
// ----------------------------------------------------------------------- -->
//                          Login form submission                          -->
// ----------------------------------------------------------------------- -->
$('#loginBtn').click(function async() {
     const email = $('#username').val();
     const password = $('#password').val();
     // Show spinner
     $('#spinner').removeClass('hidden');
     $('#loginBtn').prop('disabled', true);

     fetch('https://app.trnr.com/api/auth/local/', {
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
                    // Hide spinner and enable login button
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar').text('Login successful!').fadeIn(100).removeClass('hidden').addClass('block').delay(3000).fadeOut(400).addClass('hidden');

                    // Hide login form and show delete form
                    $('#loginForm').hide();
                    $('#deleteForm').show();
               }
               else {
                    $('#spinner').addClass('hidden');
                    $('#loginBtn').prop('disabled', false);

                    // Update snackbar text and show it
                    $('#snackbar_error').text('Login failed. Please try again.').fadeIn(100).removeClass('hidden').addClass('block').delay(3000).fadeOut(400).addClass('hidden');
               }

          })
          .catch(error => {
               $('#spinner').addClass('hidden');
               $('#loginBtn').prop('disabled', false);

               // Update snackbar text and show it
               $('#snackbar_error').text('Login failed. Please try again.').fadeIn(100).removeClass('hidden').addClass('block').delay(3000).fadeOut(400).addClass('hidden');
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

     // Show spinner
     $('#spinner').removeClass('hidden');
     $(this).prop('disabled', true);
     var jwtToken = localStorage.getItem('jwtToken');
     fetch('https://app.trnr.com/api/delete', {
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