// config/api.ts

// Define your API response types
export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    wind_speed: number;
  }
  
  export interface GreetingData {
    message: string;
  }
  
  export interface ApiError {
    error: string;
  }
  
  // API client functions
  export const apiClient = {
    // Root endpoint
    async getRoot(): Promise<{ message: string }> {
      const response = await fetch('/api/root');
      if (!response.ok) {
        throw new Error('Failed to fetch root data');
      }
      return response.json();
    },
  
    // Greeting endpoint
    async getGreeting(name: string): Promise<GreetingData> {
      const response = await fetch(`/api/greet/${encodeURIComponent(name)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }
      return response.json();
    },
  
    // Weather endpoint
    async getWeather(city: string = 'London'): Promise<WeatherData> {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    },
  };