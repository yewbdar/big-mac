import axios from "axios";
import key from './apiKey'



export const getCalculation = (curr , country , randomCountry) => {
  
  const bigMacLookUP = curr / country.localPrice;
  const bigMacRandom =
    (curr / country.localPrice) *
    (country.dollarPrice / randomCountry.dollarPrice);
  const bigMacLocal =
    (curr * country.dollarPrice) / randomCountry.dollarPrice;
  
  const result = {
    bigMacLookUP: bigMacLookUP,
    bigMacRandom: bigMacRandom,
    bigMacLocal:bigMacLocal
  }
  return result
}
export const getUserCountry = async () => {
  let response
  try {
    response = await axios.get(`https://geolocation-db.com/json/${key}`);
    console.log('responce',response);
  } catch (error) {
    console.error(error);
  }
   return response?.data
}

export const getUserCountryDetail = async (UserCountry) => {
    let response
    try {
      response = await axios.get(`http://localhost:3001/getRate?country=${UserCountry}`);
      console.log('responce getUserCountryDetail',response.data);
    } catch (error) {
      console.error(error);
    }
     return response?.data  
  
};

export const getRandomCountryDetail = async (country) => {
  let response
  try {
    response = await axios.get(`http://localhost:3001/getRandom?country=${country}`);
    console.log('responce getUserCountryDetail',response.data);
  } catch (error) {
    console.error(error);
  }
   return response?.data  
  };