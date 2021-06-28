/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=xxxxxx';

const feeling = document.getElementById('feelings').value;

/* Event Listener on generate */
document.getElementById('generate').addEventListener('click', performAction);

/*Function Definition*/
function performAction(e) {  
    const newZIP = document.getElementById('zip').value;
    getZIP  (baseURL, newZIP, apiKey)

    .then(function(data) {
        console.log(data);
        postData('/addData', {date:d, temperature:data.temp, userResponse:feeling});
        updateUI();
    })
}

/* GET the data from the WEB API */
const getZIP = async (baseURL, zipCode, key) => {
    const res = await fetch (baseURL+zipCode+key);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

/* POST the data to the server */
const postData = async ( url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: `same-origin`,
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temp;
      document.getElementById('content').innerHTML = allData[0].content;
  
    } catch (error) {
      console.log("error", error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();