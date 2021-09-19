/* Global Variables */
let feeling = '';
let totalData = {};
// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = 'units=metric';
const apiKey = '9a426edfe26021172fda77da10e1542e';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// Event listener to add function to existing HTML DOM element
const errorMessage = document.getElementById('errorMessage');

document.getElementById('generate').addEventListener('click', performAction); 
/* Function called by event listener */
function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    const countryCode =  document.getElementById('country').value;
    feeling =  document.getElementById('feelings').value;
    getWeatherData(zipCode, countryCode).then((data)=>{
      if(data){
        /*Collect both user and API Data in one object*/
        totalData = {
          temp: Math.round(data.main.temp),
          pressure: data.main.pressure,
          city:data.name,
          hum: data.main.humidity,
          feeling: feeling,
          date:newDate
        };
      }
      //console.log(totalData);
    postData('/add', totalData); //Post data to server
    updateUI(); // Update user interface
    });
    
    }   
/* Function to GET Web API Data*/
const getWeatherData = async (zip, country)=>{
    
    const res = await fetch(`${baseURL}${zip},${country}&appid=${apiKey}&${units}`)
    try {
      const data = await res.json();
      if(data.cod != 200){ //Data successfully fetched 
        errorMessage.innerHTML = data.message;
        setTimeout(() => {
          errorMessage.innerHTML = ''
        }, 3000);
      }
      //console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
      alert(`Something went wrong, Error: ${error}!`);
    }
  }
/* Function to POST data to server*/
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const dataRecord = await response.json();
    console.log('Data have been saved to server...')
    console.log(dataRecord);
    return dataRecord
  }catch(error) {
  console.log("error", error);
  alert(`Something went wrong, Error: ${error}!`);
  }
}
/*Fuction to update user interface according to server fetched Data*/
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const dataRecord = await request.json();
    document.getElementById('date').innerHTML = `Date: ${dataRecord.date}`;
    document.getElementById('city').innerHTML = dataRecord.city;
    document.getElementById('temp').innerHTML = `Temperature: ${dataRecord.temp}&deg C`;
    document.getElementById('pressure').innerHTML = `Pressure: ${dataRecord.pressure} mbar`;
    document.getElementById('Humidity').innerHTML = `Humidity: ${dataRecord.hum}`;
    document.getElementById('content').innerHTML = `Feeling: ${dataRecord.feeling}`;

  }catch(error){
    console.log("error", error);
    alert(`Something went wrong, Error: ${error}!`);
  }
}