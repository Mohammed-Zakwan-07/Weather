import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_apikey;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather({
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        });
      } else {
        alert("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.log(err);
      alert("Error fetching weather");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#cafbff] via-[#c084fc] to-[#a78bfa] font-mono p-4 sm:p-6 md:p-10 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-black font-bold text-center drop-shadow-md mt-16">
        Weather App
      </h1>

      <div className="bg-[#faf5ff] shadow-2xl p-6 sm:p-8 md:p-10 rounded-3xl mt-6 w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-4">
        <input
          className="flex-1 h-10 w-full sm:w-auto border border-gray-300 rounded-2xl px-4 text-sm"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={fetchWeather}
          className="bg-amber-200/80 px-5 py-2 rounded-2xl hover:scale-105 transition-all duration-200 shadow-md"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="bg-[#faf5ff] backdrop-blur-md mx-auto mt-6 w-full max-w-md rounded-3xl p-6 sm:p-8 flex flex-col items-center space-y-4 text-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            {weather.name}, {weather.country}
          </h3>
          <img
            className="w-24 sm:w-28 md:w-32"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <p className="text-2xl sm:text-3xl font-bold">{weather.temp}°C</p>
          <p className="capitalize text-lg sm:text-xl">{weather.description}</p>
          <p className="text-sm sm:text-base">
            💧Humidity: {weather.humidity}%   |   💨Wind: {weather.wind} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
