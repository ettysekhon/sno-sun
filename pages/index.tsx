import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../components/Alert';
import { WeatherSummary } from '../components/WeatherSummary';

type WeatherState = {
  temp: number;
  summary: string;
  location: string;
  sunrise: string;
  sunset: string;
};

export default function HomePage() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<GeolocationPosition>();
  const [currentWeather, setCurrentWeather] = useState<WeatherState>(null);

  useEffect(() => {
    if (!position?.coords.latitude || !position?.coords.longitude) {
      return;
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position?.coords.latitude}&lon=${position?.coords.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}&units=metric`;

    const fetchWeather = async () => {
      const response = await fetch(endpoint);
      const json = await response.json();

      const { temp } = json?.main;
      const { main } = json?.weather[0];
      const { sunrise, sunset } = json?.sys;
      const location = json?.name;

      setLoading(false);

      setCurrentWeather({
        temp: Math.round(temp),
        summary: main,
        location,
        sunrise: new Date(sunrise).toLocaleTimeString(),
        sunset: new Date(sunset).toLocaleTimeString(),
      });
    };

    fetchWeather().catch(() => {
      setLoading(false);
      console.error;
    });
  }, [position?.coords.latitude, position?.coords.longitude]);

  const onClick = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setPosition(position);
      },
      (error: GeolocationPositionError) => {
        setLoading(false);
        setError(error.message);
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
        <div className="flex items-center flex-col bg-white w-96 rounded-lg">
          {currentWeather === null ? (
            <div className="p-8">
              <button
                disabled={loading}
                type="button"
                onClick={onClick}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {loading ? 'Retrieving weather' : 'Use device location'}
              </button>
            </div>
          ) : (
            <WeatherSummary {...currentWeather} />
          )}
          {error && (
            <div className="pt-3">
              <Alert message={error} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
