// utils/dynamicTheme.js
import { getWeatherInfo } from './weatherCodes';

/**
 * Mengembalikan palet gradien + warna aksen berdasarkan kode cuaca & is_day.
 * Setiap tema punya identitas visual unik, bukan sekadar ganti warna.
 */
export function getTheme(weathercode, is_day) {
  if (weathercode === undefined || weathercode === null) {
    // Default: malam gelap
    return {
      gradient: ['#0f0c29', '#302b63', '#24243e'],
      accent: '#a78bfa',
    };
  }

  const { group } = getWeatherInfo(weathercode);
  const isDay = is_day === 1;

  const THEMES = {
    clear: isDay
      ? { gradient: ['#1e3a5f', '#1a6b9a', '#48cae4'], accent: '#90e0ef' }
      : { gradient: ['#0a0a1a', '#0d1b3e', '#1a2744'], accent: '#a78bfa' },

    cloud: isDay
      ? { gradient: ['#2c3e50', '#4a5568', '#718096'], accent: '#cbd5e0' }
      : { gradient: ['#1a1a2e', '#2d2d44', '#3a3a5c'], accent: '#9ea3c9' },

    fog: isDay
      ? { gradient: ['#525252', '#737373', '#a3a3a3'], accent: '#e5e5e5' }
      : { gradient: ['#1c1c1c', '#2d2d2d', '#404040'], accent: '#a3a3a3' },

    rain: isDay
      ? { gradient: ['#1c2e4a', '#2d4a6b', '#1e3a5f'], accent: '#7dd3fc' }
      : { gradient: ['#0d1b2a', '#1b2838', '#243447'], accent: '#60a5fa' },

    snow: isDay
      ? { gradient: ['#c9d6df', '#dce8f0', '#eef3f7'], accent: '#60a5fa' }
      : { gradient: ['#1e2a3a', '#2d3d52', '#3d4f66'], accent: '#bae6fd' },

    storm: isDay
      ? { gradient: ['#1a0d2e', '#2d1b3d', '#3d2b4e'], accent: '#c084fc' }
      : { gradient: ['#0d0715', '#160d28', '#1f1235'], accent: '#e879f9' },
  };

  return THEMES[group] ?? THEMES.clear;
}