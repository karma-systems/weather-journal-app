/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = 'units=metric';
const apiKey = '9a426edfe26021172fda77da10e1542e';
let tempreture = 0;
let pressure = 0;
let humidity = 0;
let feeling = "";
let city = 'Unkown';
/*
api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
*/
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction); 
/* Function called by event listener */
function performAction(e){
    const zipCode =  document.getElementById('zip').value;
    feeling =  document.getElementById('feelings').value;
    getWeatherData(baseURL,zipCode, apiKey).then(updateUI());
    
    }   
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, key)=>{
    
    const res = await fetch(`${baseURL}${zip},us&appid=${key}&${units}`)
    console.log(res);
    try {
  
      const data = await res.json();
      console.log(data)
      tempreture = data.main.temp + ' C';
      pressure = data.main.pressure + ' mbar';
      humidity = data.main.humidity + ' %';
      city = data.name;
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
/* Function to POST data */
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
    const newData = await response.json();
    return newData
  }catch(error) {
  console.log("error", error);
  }
}

/* Function to GET Project Data */
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json()
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('city').innerHTML = city;//allData[0].city;
    document.getElementById('date').innerHTML = newDate;//allData[0].date;
    document.getElementById('temp').innerHTML = tempreture;//allData[0].temp;
    document.getElementById('content').innerHTML = feeling;//allData[0].feeling;

  }catch(error){
    console.log("error", error);
  }
}