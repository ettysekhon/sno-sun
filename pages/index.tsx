import Head from 'next/head';
import { useEffect, useState } from 'react';
import { WeatherSummary } from '../components/WeatherSummary';

type WeatherSummaryState = {
  temp: number;
  summary: string;
  location: string;
  sunrise: string;
  sunset: string;
} | null;

export default function HomePage() {
  const [currentWeather, setCurrentWeather] =
    useState<WeatherSummaryState>(null);

  useEffect(() => {
    // TODO: add a hook for this logic
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&units=metric`;

        const fetchWeather = async () => {
          const response = await fetch(endpoint);
          const json = await response.json();

          console.log('json', json);

          const { temp } = json?.main;
          const { main } = json?.weather[0];
          const { sunrise, sunset } = json?.sys;
          const location = json?.name;

          console.log('data', {
            temp: Math.round(temp),
            summary: main,
            location,
            sunrise: new Date(sunrise).toLocaleTimeString(),
            sunset: new Date(sunset).toLocaleTimeString(),
          });

          setCurrentWeather({
            temp: Math.round(temp),
            summary: main,
            location,
            sunrise: new Date(sunrise).toLocaleTimeString(),
            sunset: new Date(sunset).toLocaleTimeString(),
          });
        };

        fetchWeather().catch(console.error);
      }
    );
  }, []);

  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Next Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-screen bg-blue-300">
        <div className="bg-white w-96 rounded-lg">
          {currentWeather !== null && <WeatherSummary {...currentWeather} />}
        </div>
      </main>
    </div>
  );
}
