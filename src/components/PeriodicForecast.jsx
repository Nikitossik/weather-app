const timePeriodMap = {
  night: "Night",
  day: "Day",
  morn: "Morning",
  eve: "Evening",
};

function PeriodicForecastItem({ data, periodName }) {
  return (
    <div className="bg-white/50 basis-48 rounded-3xl py-4 px-6 inline-flex flex-col items-center">
      <h4 className="text-lg font-medium">
        {timePeriodMap[periodName]} {Math.floor(data.temp)}°C (
        {Math.floor(data.feels_like)}°)
      </h4>
    </div>
  );
}

function PeriodicForecast({ periodData }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-3">Periodly</h2>
      <div className="flex gap-4 mb-3">
        <PeriodicForecastItem
          key={"night"}
          data={periodData.night}
          periodName="night"
        />
        <PeriodicForecastItem
          key={"morn"}
          data={periodData.morn}
          periodName="morn"
        />
        <PeriodicForecastItem
          key={"day"}
          data={periodData.day}
          periodName="day"
        />
        <PeriodicForecastItem
          key={"eve"}
          data={periodData.eve}
          periodName="eve"
        />
      </div>
    </>
  );
}

export default PeriodicForecast;
