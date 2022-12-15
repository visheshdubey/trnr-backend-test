const params = new Proxy(new URLSearchParams(window.location.search), {
     get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.code;
const reset = () => {

     var p = document.getElementById("inputPassword").value;
     var cp = document.getElementById("confirmPassword").value;

     if (p !== cp) {
          alert('Password and confirm password dont match');
     }
     else if (p.length < 8 || p.length > 20) {
          alert(' Your password must be 8-20 characters long, contain letters and numbers.');
     }
     else {
          resetPassword(p, value)
     }
}
const body = (x, y) => ({
     password: x,
     passwordConfirmation: x,
     code: y
})
const resetPassword = async (x, y) => {
     try {

          await fetch('https://apiapp.trnr.com/api/auth/reset-password/', {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(body(x, y))
          }).then((response) => {
               response.json().then((data) => {
                    if (data?.jwt) {
                         alert('Password Changed Successfully!')
                    }
                    else {
                         alert('Password change unsuccessfull! Try Again later.')
                    }
               })
          }).catch((error) => console.log(error));
     }
     catch (err) {
          alert('Password change unsuccessfull! Try Again later.')
     }

}
