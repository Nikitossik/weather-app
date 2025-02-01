const endpoints = {
  getWeather: (lat, lon) =>
    `${
      import.meta.env.VITE_APP_WEATHER_API_URL
    }?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`,
  autocomplete: (q) =>
    `${
      import.meta.env.VITE_APP_AUTOCOMPLETE_API_URL
    }?q=${q}&types=city&limit=10&lang=en-US&apiKey=${
      import.meta.env.VITE_HERE_API_KEY
    }`,
  geocode: (q) =>
    `${
      import.meta.env.VITE_APP_GEOCODE_API_URL
    }?q=${q}&types=city&limit=1&lang=en-US&apiKey=${
      import.meta.env.VITE_HERE_API_KEY
    }`,
  revgeocode: (lat, lon) =>
    `${
      import.meta.env.VITE_APP_REVGEOCODE_API_URL
    }?at=${lat},${lon}&types=city&limit=1&lang=en-US&apiKey=${
      import.meta.env.VITE_HERE_API_KEY
    }`,
  revgeocodeDefault: () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve(endpoints.revgeocode(latitude, longitude));
        },
        (err) => {
          reject("Failed to retrieve the user's geolocation: " + err.message);
        }
      );
    });
  },
};
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export { endpoints, fetcher };
