import { useState } from "react";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

import cloud from "../assets/cloud.svg";
import humidity from "../assets/humidity.svg";
import pressure from "../assets/pressure.svg";
import wind from "../assets/wind.svg";

import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import PeriodicForecast from "./PeriodicForecast";

const getPeriodicHorlyData = (weatherDayData) => {
  return Object.keys(weatherDayData.feels_like).reduce((acc, item) => {
    acc[item] = {
      temp: weatherDayData.temp[item],
      feels_like: weatherDayData.feels_like[item],
    };
    return acc;
  }, {});
};

function WeatherSection({ weatherData, locationName }) {
  const [selectedDay, setSelectedDay] = useState(0);

  const handleDaySelect = (index) => {
    setSelectedDay(index);
  };

  const isToday = selectedDay == 0;
  const weatherDayData = weatherData.daily[selectedDay];
  const weather = isToday ? weatherData.current : weatherDayData;
  const hourlyData = isToday
    ? weatherData.hourly
    : getPeriodicHorlyData(weatherDayData);

  return (
    <section className="text-sky-900 bg-sky-200 p-6 rounded-3xl">
      <div className="flex flex-wrap gap-4">
        <div className="basis-1/2">
          <h1 className="text-2xl font-bold">{locationName}</h1>
          <p>
            {format(
              new TZDate(weather.dt * 1000, weatherData.timezone),
              isToday ? "HH:mm z, eeee d LLLL" : "d LLLL"
            )}
          </p>
          <div className="flex px-12 items-center gap-4 mt-4">
            <div className="">
              <h3 className="text-xl font-medium">
                {format(
                  new TZDate(weather.sunrise * 1000, weatherData.timezone),
                  "HH:mm"
                )}
              </h3>
              <span>Sunrise</span>
            </div>
            <div className="flex justify-center flex-wrap items-center flex-auto">
              <img
                className="object-cover max-w-full"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <div className="">
                <h3 className="text-5xl">
                  {Math.floor(isToday ? weather.temp : weather.temp.day)}
                  °C
                </h3>
                <p>{weather.weather[0].description}</p>
              </div>
              <p className="basis-full text-center">
                feels like{" "}
                {Math.floor(
                  isToday ? weather.feels_like : weather.feels_like.day
                )}
                °
              </p>
            </div>
            <div className="">
              <h3 className="text-xl font-medium">
                {format(
                  new TZDate(weather.sunset * 1000, weatherData.timezone),
                  "HH:mm"
                )}
              </h3>
              <span>Sunset</span>
            </div>
          </div>
        </div>
        <div className="flex-auto grid grid-cols-2 grid-rows-2 gap-2">
          <div className="bg-white/50 rounded-3xl p-4 flex items-center gap-4">
            <img className="max-w-[40px]" src={wind} alt="wind icon" />
            <div className="flex-auto">
              <h4 className="text-lg leading-none font-medium">
                {weather.wind_speed} km/h, {weather.wind_deg} deg
              </h4>
              <p>Wind</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-4 flex items-center gap-4">
            <img className="max-w-[40px]" src={pressure} alt="pressure icon" />
            <div className="flex-auto">
              <h4 className="text-xl leading-none font-medium">
                {weather.pressure} hPa
              </h4>
              <p>Pressure</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-4 flex items-center gap-4">
            <img className="max-w-[40px]" src={humidity} alt="humidity icon" />
            <div className="flex-auto">
              <h4 className="text-xl leading-none font-medium">
                {weather.humidity}%
              </h4>
              <p>Humidity</p>
            </div>
          </div>
          <div className="bg-white/50 rounded-3xl p-4 flex items-center gap-4">
            <img className="max-w-[40px]" src={cloud} alt="cloud icon" />
            <div className="flex-auto">
              <h4 className="text-xl leading-none font-medium">
                {weather.clouds}%
              </h4>
              <p>Cloudiness</p>
            </div>
          </div>
        </div>
      </div>
      {isToday ? (
        <HourlyForecast
          hourlyData={hourlyData}
          timezone={weatherData.timezone}
        />
      ) : (
        <PeriodicForecast periodData={hourlyData} />
      )}
      <DailyForecast
        dailyData={weatherData.daily}
        timezone={weatherData.timezone}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
      />
    </section>
  );
}

export default WeatherSection;
