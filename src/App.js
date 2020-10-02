import React, { useState, useEffect } from "react";
import {
  getUserCountry,
  getUserCountryDetail,
  getRandomCountryDetail,
  getCalculation
} from "./logic";
import "./app.css";

function App() {
  const [showLable, setShowLable]=useState(false)
  const [country, setCountry] = useState({
    name: "",
    localPrice: 0,
    dollarPrice: 0,
    ppp: 0,
  });

  const [randomCountry, setRandomCountry] = useState({
    name: "",
    localPrice: 0,
    dollarPrice: 0,
    ppp: 0,
  });
  const [calculation, setCalculation] = useState({
    bigMacRandom: 0,
    bigMacLocal: 0,
    bigMacLookUP: 0,
  });
  const [currency, setCurrency] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserCountry();
      const countryName = result?.country_name;
      const local = await getUserCountryDetail(countryName);
      const roundm = await getRandomCountryDetail(countryName);
      setCountry({
        ...country,
        name: local["Country"],
        localPrice: local["Local price"],
        dollarPrice: local["Dollar price"],
        ppp: local["Dollar PPP"],
      });
      setRandomCountry({
        ...country,
        name: roundm["Country"],
        localPrice: roundm["Local price"],
        dollarPrice: roundm["Dollar price"],
        ppp: roundm["Dollar PPP"],
      });
    };
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    const value = e.target.value
    if (value !== "" && !isNaN(value)) {
      const result = getCalculation(value, country, randomCountry);
      setCalculation({
        ...calculation,
        bigMacRandom:result.bigMacRandom,
        bigMacLocal:result.bigMacLocal,
        bigMacLookUP:result.bigMacLookUP,
      });
      setCurrency(value);
      setShowLable(false)
    } else {
      setShowLable(true)
      setCalculation({
        ...calculation,
        bigMacRandom: 0,
        bigMacLocal: 0,
        bigMacLookUP: 0,
      });
      setCurrency(0);
    }
    if (value === "") { setShowLable(false)}
  };

  return (
    <div className="app">
      <div className="top">
        <p className='textOne'>
          You are in <strong>{country.name}</strong>{" "}
        </p>
        <p className='textTwo'>Please enter an amount of money in your local currency </p>
        <span className="inputHolder">
          <input name='currency' type="text" onChange={handleOnChange} />
          <br />
          {showLable && <label>Please enter only digits . </label>}
        </span>
      </div>
 
      <div className="middle">
        <p>
          You could buy <strong>{calculation.bigMacLookUP}</strong> of Big Macs
          in your country
        </p>
        <p>
          Your Dollar Purchasing parity (ppp) is <strong>{country.ppp}</strong>
        </p>
      </div>

      <div className="bottom">
        <p>
          Random Country :<strong>{randomCountry.name}</strong>
        </p>
        <p>
          You could buy <strong>{calculation.bigMacRandom}</strong> of Big Mac
          in <strong>{randomCountry.name}</strong> with{" "}
          <strong>{currency}</strong>
        </p>
        <p>
          Your <strong>{currency}</strong> is worth about{" "}
          <strong>{calculation.bigMacLocal}</strong> in{" "}
          <strong>{randomCountry.name}</strong>
        </p>
      </div>
    </div>
  );
}

export default App;
