import { format, differenceInHours, startOfTomorrow } from "date-fns";

import { TZDate } from "@date-fns/tz";

function HourlyForecastItem({ data, timezone }) {
  return (
    <div className="bg-white/50 rounded-3xl py-4 px-6 inline-flex flex-col items-center">
      <h4 className="text-lg leading-none font-medium">
        {format(new TZDate(data.dt * 1000, timezone), "HH:mm")}
      </h4>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt=""
      />
      <p className="">{Math.floor(data.temp)}°C</p>
      <p className="text-sm">{Math.floor(data.feels_like)}°</p>
    </div>
  );
}

function HourlyForecast({ hourlyData, timezone }) {
  const hoursLeft = differenceInHours(
    startOfTomorrow(),
    new Date(hourlyData[0].dt * 1000)
  );
  const todaysHours = hourlyData.slice(0, hoursLeft);

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Hourly</h2>
      <div className="scrollbar pb-3 flex min-w-full gap-4 overflow-y-hidden overflow-x-auto mb-3">
        {todaysHours.map((hour, index) => (
          <HourlyForecastItem key={index} data={hour} timezone={timezone} />
        ))}
      </div>
    </>
  );
}

export default HourlyForecast;
