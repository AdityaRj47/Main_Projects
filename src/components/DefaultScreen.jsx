import React, { useEffect, useState } from "react";
import CardLayout from "./UI/CardLayout";
import Sun from "../assets/images/sun.svg";
import Temperature from "../assets/images/temperature.svg";
import Eye from "../assets/images/eye.svg";
import ThermoMini from "../assets/images/temperature-mini.svg";
import Water from "../assets/images/water.svg";
import Windy from "../assets/images/windy.svg";
import Cloud from "../assets/images/cloud.svg";
import Search from "../assets/images/search.svg";
import { weatherCodesMapping } from "./util";
import moment from "moment";

const DefaultScreen = (props) => {
  //   const currentWeatherData = {
  //     date: "2024-12-10",
  //     values: {
  //       temperature: 24.5,
  //       weatherCondition: "Clear Sky",
  //       Visibility: 10000,
  //       apparentTemperature: 26,
  //       humidity: 65,
  //       windSpeed: 12,
  //     },
  //   };

  const [searchCityText, setSearchCityText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = (label) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${label}&format=json&addressdetails=1`
    )
      .then((response) => response.json())
      .then((suggestionFetched) => {
        const tempSuggestions = [];
        suggestionFetched?.length &&
          suggestionFetched.forEach((suggestedItem) => {
            tempSuggestions.push({
              label: `${
                suggestedItem?.address?.village ??
                suggestedItem?.address?.suburb ??
                suggestedItem?.address?.town ??
                suggestedItem?.address?.city
              },
                ${suggestedItem?.address?.state}, ${
                suggestedItem?.address?.country
              }`,
              lat: suggestedItem.lat,
              lng: suggestedItem.lng,
            });
          });
        setSuggestions(tempSuggestions);
      });
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchSuggestions(searchCityText);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchCityText]);

  return (
    <div className="home-main-div">
      <div className="default-home-container">
        {/* Weather Card */}
        <CardLayout>
          {props?.currentWeatherData?.length > 0 &&
            props?.currentWeatherData[0] && (
              <>
                <div className="default-card-city">
                  <img
                    src={
                      weatherCodesMapping[
                        props.currentWeatherData[0]?.values?.weatherCode
                      ].img
                    }
                    alt="weather icon"
                  />
                  <div>
                    <p className="city-name">{props.forecastLocation?.label}</p>
                    <p className="date-today">
                       {" "}
                       {moment(props.currentWeatherData[0].date).format("ddd DD/MM/YYYY"
                       )}
                      </p>
                  </div>
                </div>
                <div className="temp-container">
                  <img
                    src={Temperature}
                    alt="Thermometer"
                    className="thermometer-img"
                  />
                  <div>
                    <p style={{ fontSize: "144px" }}>
                      {parseFloat(
                        props.currentWeatherData[0].values?.temperature2m
                      ).toFixed(0)}
                    </p>
                    <p className="text-capitalize">
                      {props.currentWeatherData[0].values?.weatherCondition}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "24px",
                      alignSelf: "start",
                      paddingTop: "45px",
                    }}
                  >
                    &deg;C
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "60px",
                    width: "100%",
                    columnGap: "16px",
                  }}
                >
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={Eye} />
                      <p className="weather-params-label">Visibility</p>
                    </div>
                    <p>
                      {Math.floor(
                        props.currentWeatherData[0].values?.visibility / 1000
                      )}
                      km
                    </p>
                  </div>
                  <p>|</p>
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={ThermoMini} />
                      <p className="weather-params-label">Feels Like</p>
                    </div>
                    <p>
                      {Math.floor(
                        props.currentWeatherData[0].values?.apparentTemperature
                      )}
                      &deg; C
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "24px",
                    width: "100%",
                    columnGap: "16px",
                  }}
                >
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={Water} />
                      <p className="weather-params-label">Humidity</p>
                    </div>
                    <p>{props.currentWeatherData[0].values?.humidity} %</p>
                  </div>
                  <p>|</p>
                  <div className="weather-info-subtile">
                    <div className="flex">
                      <img src={Windy} />
                      <p className="weather-params-label">Wind</p>
                    </div>
                    <p>
                      {Math.floor(
                        props.currentWeatherData[0].values?.windSpeed
                      )}
                      km/h
                    </p>
                  </div>
                </div>
              </>
            )}
        </CardLayout>

        {/* Search Layout*/}
        <CardLayout>
          <div className="search-card">
            <div className="flex justify-center">
              <img src={Cloud} />
            </div>
            <div className="search-city-container city-results">
              <img src={Search} className="search-icon" />
              <input
                type="text"
                className="city-input"
                placeholder="Search City"
                value={searchCityText}
                onChange={(e)=>{setSearchCityText(e.target.value);}}
              />
            </div>
            <div className="search-city-suggestions">
              {suggestions.length>0 && suggestions.map((suggestionItem, suggestionIndex)=>{
                 if(suggestionIndex < 4){
                  return(
                    <p className="suggested-label"onClick={()=>{
                       props.clickHandler(suggestionItem);
                    }}>
                      {suggestionItem.label}
                    </p>
                  );
                 }
              })}
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
};

export default DefaultScreen;