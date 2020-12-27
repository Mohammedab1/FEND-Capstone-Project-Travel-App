 const handleSubmit = async (event) => {
  event.preventDefault();

  let srcImage = "";
  let Country = "";
  let CityA = "";
  let max_temp = "";
  let low_temp = "";
  let city = document.getElementById("city").value;
  let cityto = document.getElementById("cityto").value;
  let FromD = document.getElementById("Datef").value;
  let ToD = document.getElementById("Datet").value;



//Chick user empty input
    if(ToD === "" || FromD === ""){
    alert("Please Fill All dates")
    return;
    }
    if(city === "" || cityto === ""){
    alert("Please Fill the the Home and Destination cities")
    return;
    }
    if(city == cityto){
      alert("Please Type defrent cities")
      return;
    }

let WeatheData = {};

// Geonames Api
     const geonames = await fetch("http://localhost:3000/genoames", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: city }),
    });
    try {
      const GeoData = await geonames.json();
      // console.log(GeoData);
       CityA = GeoData.geonames[0].name;
       Country = GeoData.geonames[0].countryName;
       WeatheData = {
         lat: GeoData.geonames[0].lat,
         lng: GeoData.geonames[0].lng
       }

    } catch (err) {
      console.log("Error: "+ err);
    }

    //Proxi For City TO Image
    const proxi = await fetch("http://localhost:3000/proxi", {
     method: "POST",
     credentials: "same-origin",
     mode: "cors",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ city: city }),
    });
   try {
     const proxiData = await proxi.json();
     srcImage = proxiData.hits[0].webformatURL;
   } catch (err) {
     console.log("Error: "+ err);
   }

//Sendle Lat , Lng to recuve High and Low
   const weather = await fetch("http://localhost:3000/weather", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({WeatheData: WeatheData}),
  });
  try {
    const weatherData = await weather.json();
     max_temp = weatherData.data[0].high_temp;
     low_temp = weatherData.data[0].low_temp;
  } catch (err) {
    console.log("Error: "+ err);
  }

    let DataF = new Date(FromD);
  	let DateE = new Date(ToD);
  	let Duration = (DateE.getTime()-DataF.getTime())/(1000*3600*24);

    if(DataF.getTime() > DateE.getTime()){
      alert("Please Chick From Date And To dates")
      return;
    }
// Update USer page With Data
  document.getElementById("DesImage").src = srcImage;
  document.getElementById("DesImage").alt = CityA;
  document.getElementById("Fromcity").innerHTML = "Flying From " + cityto;
  document.getElementById("DestnitionCity").innerHTML = "Arriving to " + CityA +", " + Country;
  // document.getElementById("DestnitionCountry").innerHTML = "City is : " + Country;
  document.getElementById("TravelDates").innerHTML = "From: " + FromD + " To: " + ToD;
  document.getElementById("Duration").innerHTML = "Total Duration is " + Duration + " Days";

  document.getElementById("High").innerHTML = "Max temp is : " + max_temp;
  document.getElementById("Lowest").innerHTML = "Low temp is : " + low_temp;

}
export { handleSubmit };
