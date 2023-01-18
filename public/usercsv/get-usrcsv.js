
const download = function (data) {

     // Creating a Blob for having a csv file format
     // and passing the data with type
     const blob = new Blob([data], { type: 'text/csv' });

     // Creating an object for downloading url
     const url = window.URL.createObjectURL(blob)

     // Creating an anchor(a) tag of HTML
     const a = document.createElement('a')

     // Passing the blob downloading url
     a.setAttribute('href', url)

     // Setting the anchor tag attribute for downloading
     // and passing the download file name
     a.setAttribute('download', 'download.csv');

     // Performing a download with click
     a.click()
}
const get = async function () {

     // Json Get url
     const development = false;
     const domain = development ? 'http://localhost:1337' : 'https://app.trnr.com';
     const url = `${domain}/api/usercsv`

     // Fetching a data in a form of json objects
     try {
          await fetch(url, {
               method: 'GET',
               headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('url-defense-csv')}`
               }
          }).then((response) => {
               response.json().then((data) => {
                    if (!data?.error) {
                         const csvString = [
                              [
                                   "id",
                                   "First Name",
                                   "Last Name",
                                   "Email",
                                   "Birthday",
                                   "Gender",
                                   "Country",
                                   "Joined on"
                              ],
                              ...data.map(item => [
                                   item.id,
                                   item.user_firstName,
                                   item.user_lastName,
                                   item.email,
                                   item.DOB,
                                   item.gender,
                                   item.country,
                                   item.joined
                              ])
                         ].map(e => e.join(","))
                              .join("\n");
                         download(csvString);
                    }
                    else {
                         alert(`Try Again later. ${data?.error?.message}`)
                         window.location.href = `./urldefense-login.html`;
                    }
               })
          }).catch((error) => console.log(error));
     }
     catch (err) {
          alert(' Try Again later.')
     }
}
get();