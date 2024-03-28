document.getElementById('myButton').addEventListener('click', function () {
     const email = document.getElementById('inputEmail').value;
     const password = document.getElementById('confirmPassword').value;

     fetch('https://app.trnr.com/api/auth/local/', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify({ identifier: email, password: password })
     })
          .then(response => response.json())
          .then(data => {
               const jwtToken = data.jwt;
               // Use jwtToken for further authentication or store it securely
               console.log('JWT Token:', jwtToken);
               // Hide login form and show delete form
               document.querySelector('.bg-white').style.display = 'none';
               document.getElementById('deleteForm').style.display = 'block';
          })
          .catch(error => {
               console.error('Error:', error);
          });
});
