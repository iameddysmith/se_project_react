export const coordinates = {
  latitude: 33.3528,
  longitude: -111.789,
};

export const APIkey = "da6f40b14c798d1e3e13b03b020a4d37";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.codemare.com"
    : "http://localhost:3001";

export const weatherConditions = [
  {
    isDay: true,
    name: "Clear",
    condition: "clear",
    image: new URL("../assets/weathercards/day/day_sunny.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "Clouds",
    condition: ["clouds", "haze"],
    image: new URL("../assets/weathercards/day/day_cloudy.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "Rain",
    condition: ["rain", "drizzle"],
    image: new URL("../assets/weathercards/day/day_rain.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "Thunderstorm",
    condition: "thunderstorm",
    image: new URL("../assets/weathercards/day/day_storm.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "Snow",
    condition: "snow",
    image: new URL("../assets/weathercards/day/day_snow.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "Fog",
    condition: "fog",
    image: new URL("../assets/weathercards/day/day_fog.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    name: "Clear",
    condition: "clear",
    image: new URL(
      "../assets/weathercards/night/night_sunny.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "Clouds",
    condition: ["clouds", "haze"],
    image: new URL(
      "../assets/weathercards/night/night_cloudy.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "Rain",
    condition: ["rain", "drizzle"],
    image: new URL(
      "../assets/weathercards/night/night_rain.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "Thunderstorm",
    condition: "thunderstorm",
    image: new URL(
      "../assets/weathercards/night/night_storm.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "Snow",
    condition: "snow",
    image: new URL(
      "../assets/weathercards/night/night_snow.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "Fog",
    condition: "fog",
    image: new URL(
      "../assets/weathercards/night/night_fog.png",
      import.meta.url
    ).href,
  },
];

export const defaultWeatherConditions = {
  day: {
    image: new URL("../assets/weathercards/day/default.png", import.meta.url)
      .href,
  },
  night: {
    image: new URL("../assets/weathercards/night/default.png", import.meta.url)
      .href,
  },
};
