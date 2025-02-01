import { useEffect, useState } from "react";
import Header from "./components/Header";
import WeatherSection from "./components/WeatherSection";

import { endpoints, fetcher } from "./api";
import useSWR from "swr";

const getLocationApiURL = (searchQuery) => {
  if (searchQuery) return endpoints.geocode(searchQuery);
  return endpoints.revgeocodeDefault();
};

const getWeatherApiURL = (locationData) => {
  if (locationData) {
    const {
      position: { lat, lng },
    } = locationData.items[0];
    return endpoints.getWeather(lat, lng);
  }
  return null;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: locationData,
    error: locationError,
    isLoading: isLocationLoading,
  } = useSWR(() => getLocationApiURL(searchQuery), fetcher);
  const {
    data: weatherData,
    error: weatherError,
    isLoading: isWeatherLoading,
  } = useSWR(() => getWeatherApiURL(locationData), fetcher);

  useEffect(() => {
    const getDefaultLocation = async () => {
      const apiUrl = await endpoints.revgeocodeDefault();
      const data = await fetcher(apiUrl);

      setSearchQuery(data.items[0].title);
    };

    if (!searchQuery) {
      getDefaultLocation();
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-lvh relative">
      <Header setSearchQuery={setSearchQuery} />
      <main className="basis-full grow-1 shrink-1 bg-sky-300">
        <div className="max-w-6xl my-0 mx-auto px-6 pt-30 pb-6">
          {(isLocationLoading || isWeatherLoading) && (
            <div className="grid place-items-center w-full p-6">
              <svg
                className="text-white animate-spin w-20 h-20"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sky-700"
                ></path>
              </svg>
            </div>
          )}
          {((locationData && locationData.items.length == 0) ||
            locationError) && (
            <h1 className="text-center text-white text-3xl">
              No data found...
            </h1>
          )}
          {locationData && locationData.items.length > 0 && weatherData && (
            <WeatherSection
              weatherData={weatherData}
              locationName={locationData.items[0].title}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
