
// const params = new Proxy(new URLSearchParams(window.location.search), {
//      get: (searchParams, prop) => searchParams.get(prop),
// });
// let value = params.code;
const login = () => {

     var u = document.getElementById("inputUsername").value;
     var p = document.getElementById("inputPassword").value;

     loginAsync(u, p)

}
document.getElementById("myButton").addEventListener("click", login);
const body = (x, y) => ({
     identifier: x,
     password: y
})
const loginAsync = async (x, y) => {
     try {
          const development = false;
          const url = development ? 'http://localhost:1337/api/auth/local/' : 'https://app.trnr.com/api/auth/local/';
          await fetch(url, {
               method: 'POST',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(body(x, y))
          }).then((response) => {
               response.json().then((data) => {
                    if (data?.jwt) {
                         alert('login Successfull!')
                         window.localStorage.setItem('url-defense-csv', data?.jwt);
                         window.location.href = "/index.html";
                    }
                    else {
                         alert('login unsuccessfull! Try Again later.')
                    }
               })
          }).catch((error) => console.log(error));
     }
     catch (err) {
          alert(' Try Again later.')
     }

}
