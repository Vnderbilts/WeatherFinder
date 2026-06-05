// hooks/useWeather.js
import { useState, useEffect } from 'react';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const DEBOUNCE_MS = 500;

/**
 * Custom hook: debounce → geocoding → forecast
 * Mengembalikan { weather, loading, error, status }
 * Status: 'idle' | 'loading' | 'success' | 'error'
 */
export function useWeather(query) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    // Reset ke idle jika query dikosongkan
    if (!query.trim()) {
      setStatus('idle');
      setWeather(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    // Debounce: tunda fetch 500ms
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

        // ── Langkah 2: Forecast ───────────────────────────────────
        const forecastRes = await fetch(
          `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
            `&current_weather=true` +
            `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
          { signal }
        );
        if (!forecastRes.ok) throw new Error('Gagal mengambil data cuaca.');

        const forecastData = await forecastRes.json();
        const cw = forecastData.current_weather;
        const daily = forecastData.daily;

        setWeather({
          city: name,
          country,
          latitude,
          longitude,
          temperature: Math.round(cw.temperature),
          weathercode: cw.weathercode,
          windspeed: cw.windspeed,        // km/h
          winddirection: cw.winddirection, // derajat
          is_day: cw.is_day,              // 0 | 1
          tempMax: daily?.temperature_2m_max?.[0] ?? null,
          tempMin: daily?.temperature_2m_min?.[0] ?? null,
        });

        setStatus('success');
      } catch (err) {
        // AbortError bukan error nyata — request dibatalkan oleh cleanup
        if (err.name === 'AbortError') return;
        setError(err.message || 'Terjadi kesalahan tidak terduga.');
        setStatus('error');
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }, DEBOUNCE_MS);

    // ── Cleanup: batalkan timer & request jika query berubah ──────
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [query]); // dependency array: hanya [query]

  return { weather, loading, error, status };
}