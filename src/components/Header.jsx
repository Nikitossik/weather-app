import clsx from "clsx";
import { useState } from "react";

import { endpoints, fetcher } from "../api";
import useSWR from "swr";

const defaultCities = ["London", "Berlin", "Tokyo", "Paris", "Warsaw", "Kyiv"];

function SearchSuggestions({
  querySuggestions,
  query,
  handleSelectSuggestion,
}) {
  function highlightText(text, highlights) {
    if (!highlights || highlights.length === 0) return text;

    const result = [];
    let lastIndex = 0;

    highlights.forEach(({ start, end }) => {
      if (lastIndex < start) {
        result.push(text.slice(lastIndex, start));
      }
      result.push(
        <span key={start} className="bg-yellow-200">
          {text.slice(start, end)}
        </span>
      );
      lastIndex = end;
    });

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  }

  return (
    <div className="absolute -bottom-1.5 left-0 translate-y-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full">
      <ul
        className="scrollbar py-2 text-sm text-gray-700 max-h-80 dark:text-gray-200 overflow-y-auto"
        aria-labelledby="dropdownHoverButton"
      >
        {querySuggestions.length > 0 ? (
          querySuggestions.map((suggestion, index) => (
            <li key={index}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {highlightText(
                  suggestion.address.label,
                  suggestion.highlights.address.label
                )}
              </a>
            </li>
          ))
        ) : (
          <li>
            <span href="#" className="block px-4 py-2 ">
              No data for {query}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

function Header({ setSearchQuery }) {
  const [query, setQuery] = useState("");
  const {
    data: querySuggestions,
    error,
    isLoading,
    mutate: setQuerySuggestions,
  } = useSWR(query ? endpoints.autocomplete(query) : null, fetcher);

  const handleSelectSuggestion = (suggestion) => {
    setQuery("");
    setQuerySuggestions([]);
    setSearchQuery(suggestion.title);
  };

  return (
    <header className="bg-sky-500 absolute z-50 left-0 top-0 w-full">
      <div
        className="max-w-6xl my-0 mx-auto px-6
      "
      >
        <div className="flex justify-between items-center gap-4 py-4">
          <a href="#" className="text-white text-xl">
            WeatherApp
          </a>
          <nav className="flex gap-6 text-white">
            {defaultCities.map((city) => (
              <a href="#" key={city} onClick={() => setSearchQuery(city)}>
                {city}
              </a>
            ))}
          </nav>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(query);
            }}
            className="flex items-center gap-2 relative"
            action="/"
            method="GET"
          >
            <input
              type="text"
              name="city"
              placeholder="Enter location"
              value={query}
              onInput={(e) => setQuery(e.target.value)}
              className={clsx(
                "rounded-lg border-2 border-sky-300 bg-white/10 py-1.5 px-3 text-sm/6 text-white placeholder:text-white",
                "focus:outline-2 focus:outline-sky-100"
              )}
            />
            <button
              type="submit"
              className="cursor-pointer rounded-lg py-1.5 px-3 bg-white text-sky-500 hover:bg-sky-500 hover:text-white focus:outline-2 focus:outline-sky-100 font-medium border-2"
            >
              Search
            </button>
            {querySuggestions && (
              <SearchSuggestions
                querySuggestions={querySuggestions.items}
                query={query}
                handleSelectSuggestion={handleSelectSuggestion}
              />
            )}
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
