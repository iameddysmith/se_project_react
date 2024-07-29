export const coordinates = {
  latitude: 33.3528,
  longitude: -111.789,
};

export const APIkey = "da6f40b14c798d1e3e13b03b020a4d37";

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

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
