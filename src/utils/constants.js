export const weatherConditions = [
  {
    isDay: true,
    name: "sunny day",
    weather: "sunny",
    image: new URL("../assets/weathercards/day/day_sunny.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "cloudy day",
    weather: "cloudy",
    image: new URL("../assets/weathercards/day/day_cloudy.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "rainy day",
    weather: "rain",
    image: new URL("../assets/weathercards/day/day_rain.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "stormy day",
    weather: "stormy",
    image: new URL("../assets/weathercards/day/day_storm.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "snow day",
    weather: "snow",
    image: new URL("../assets/weathercards/day/day_snow.png", import.meta.url)
      .href,
  },
  {
    isDay: true,
    name: "foggy day",
    weather: "fog",
    image: new URL("../assets/weathercards/day/day_fog.png", import.meta.url)
      .href,
  },
  {
    isDay: false,
    name: "sunny night",
    weather: "sunny",
    image: new URL(
      "../assets/weathercards/night/night_sunny.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "cloudy night",
    weather: "cloudy",
    image: new URL(
      "../assets/weathercards/night/night_cloudy.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "rainy night",
    weather: "rain",
    image: new URL(
      "../assets/weathercards/night/night_rain.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "stormy night",
    weather: "stormy",
    image: new URL(
      "../assets/weathercards/night/night_storm.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "snow night",
    weather: "snow",
    image: new URL(
      "../assets/weathercards/night/night_snow.png",
      import.meta.url
    ).href,
  },
  {
    isDay: false,
    name: "foggy night",
    weather: "fog",
    image: new URL(
      "../assets/weathercards/night/night_fog.png",
      import.meta.url
    ).href,
  },
];

export const coordinates = {
  latitude: 33.352825,
  longitude: -111.789024,
};

export const APIkey = "da6f40b14c798d1e3e13b03b020a4d37";
