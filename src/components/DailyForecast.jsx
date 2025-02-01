import clsx from "clsx";
import { format } from "date-fns";

import { TZDate } from "@date-fns/tz";

function DailyForecastItem({
  data,
  onDaySelect,
  dayIndex,
  timezone,
  selected = false,
}) {
  return (
    <div
      onClick={() => {
        onDaySelect(dayIndex);
      }}
      className={clsx(
        "cursor-pointer rounded-3xl py-4 px-6 inline-flex flex-col items-center",
        selected && "bg-white/50"
      )}
    >
      <h4 className="text-lg leading-none font-medium">
        {format(new TZDate(data.dt * 1000, timezone), "E")}
      </h4>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt=""
      />
      <p className="">{Math.floor(data.temp.day)}°C</p>
      <p className="text-sm">{Math.floor(data.feels_like.day)}°</p>
    </div>
  );
}

function DailyForecast({ dailyData, onDaySelect, selectedDay, timezone }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-3">Daily</h2>
      <div className="flex gap-4">
        {dailyData.map((hour, index) => {
          return (
            <DailyForecastItem
              key={index}
              data={hour}
              timezone={timezone}
              selected={index == selectedDay}
              dayIndex={index}
              onDaySelect={onDaySelect}
            />
          );
        })}
      </div>
    </>
  );
}

export default DailyForecast;
