// hooks/useWeather.js
import { useState, useEffect } from 'react';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const DEBOUNCE_MS = 500;

/**
 * Custom hook: debounce → geocoding → forecast + daily + sunrise/sunset
 * Level 3: Forecast 7 hari + Sunrise/Sunset + Precipitation
 */
export function useWeather(query) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query.trim()) {
      setStatus('idle');
      setWeather(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const timerId = setTimeout(async () => {
      setStatus('loading');
      setLoading(true);
      setError(null);

      try {
        // ── Langkah 1: Geocoding ──────────────────────────────────
        const geoRes = await fetch(
          `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=1&language=id`,
          { signal }
        );
        if (!geoRes.ok) throw new Error('Gagal menghubungi server geocoding.');

        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error(`Kota "${query}" tidak ditemukan. Coba nama lain.`);
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // ── Langkah 2: Forecast (Extended - Level 3) ───────────────
        const forecastRes = await fetch(
          `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
            `&current_weather=true` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunset,sunrise` +
            `&timezone=auto`,
          { signal }
        );
        if (!forecastRes.ok) throw new Error('Gagal mengambil data cuaca.');

        const forecastData = await forecastRes.json();
        const cw = forecastData.current_weather;
        const daily = forecastData.daily;
        const tz = forecastData.timezone;

        // Build 7-day forecast
        const forecast7Days = daily.time.slice(0, 7).map((date, idx) => ({
          date,
          weathercode: daily.weather_code[idx],
          tempMax: Math.round(daily.temperature_2m_max[idx]),
          tempMin: Math.round(daily.temperature_2m_min[idx]),
          precipitation: Math.round(daily.precipitation_sum[idx] * 10) / 10,
          sunrise: daily.sunrise[idx],
          sunset: daily.sunset[idx],
        }));

        setWeather({
          city: name,
          country,
          latitude,
          longitude,
          timezone: tz,
          temperature: Math.round(cw.temperature),
          weathercode: cw.weathercode,
          windspeed: cw.windspeed,
          winddirection: cw.winddirection,
          is_day: cw.is_day,
          // Today's data
          tempMax: daily.temperature_2m_max[0],
          tempMin: daily.temperature_2m_min[0],
          precipitation: daily.precipitation_sum[0],
          sunrise: daily.sunrise[0],
          sunset: daily.sunset[0],
          // 7-day forecast (Level 3)
          forecast7Days,
        });

        setStatus('success');
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Terjadi kesalahan tidak terduga.');
        setStatus('error');
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query]);

  return { weather, loading, error, status };
}