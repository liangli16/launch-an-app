'use client';

import { useEffect, useState } from 'react';
import { apiClient, WeatherData, GreetingData } from '../../config/api';

interface RootData {
  message: string;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [root, setRoot] = useState<RootData | null>(null); // Added root state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use Promise.all to fetch both endpoints concurrently
        const [weatherData, greetingData, rootData] = await Promise.all([ // Added rootData to Promise.all
          apiClient.getWeather('New York'),
          apiClient.getGreeting('Mike'),
          apiClient.getRoot() // Added root API call
        ]);
        
        setWeather(weatherData);
        setGreeting(greetingData);
        setRoot(rootData); // Added root data setter
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('API fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        {root && <p className="mt-4 font-semibold text-green-600">{root.message}</p>} {/* Added root message display */}
        {greeting && <p className="mt-4">{greeting.message}</p>}
        {weather && (
          <div className="mt-4 p-4 border rounded">
            <h3 className="font-bold">Weather in {weather.city}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Description: {weather.description}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind Speed: {weather.wind_speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}