// utils/weatherCodes.js

/**
 * WMO Weather Interpretation Codes
 * Referensi: https://open-meteo.com/en/docs#weathervariables
 */
const WEATHER_CODES = {
  0:  { label: 'Cerah',               emoji: '☀️',  group: 'clear'  },
  1:  { label: 'Hampir Cerah',        emoji: '🌤️', group: 'clear'  },
  2:  { label: 'Sebagian Berawan',    emoji: '⛅',  group: 'cloud'  },
  3:  { label: 'Mendung',             emoji: '☁️',  group: 'cloud'  },
  45: { label: 'Berkabut',            emoji: '🌫️', group: 'fog'    },
  48: { label: 'Kabut Beku',          emoji: '🌫️', group: 'fog'    },
  51: { label: 'Gerimis Ringan',      emoji: '🌦️', group: 'rain'   },
  53: { label: 'Gerimis Sedang',      emoji: '🌦️', group: 'rain'   },
  55: { label: 'Gerimis Lebat',       emoji: '🌧️', group: 'rain'   },
  61: { label: 'Hujan Ringan',        emoji: '🌧️', group: 'rain'   },
  63: { label: 'Hujan Sedang',        emoji: '🌧️', group: 'rain'   },
  65: { label: 'Hujan Lebat',         emoji: '🌧️', group: 'rain'   },
  71: { label: 'Salju Ringan',        emoji: '🌨️', group: 'snow'   },
  73: { label: 'Salju Sedang',        emoji: '❄️',  group: 'snow'   },
  75: { label: 'Salju Lebat',         emoji: '❄️',  group: 'snow'   },
  80: { label: 'Hujan Lokal',         emoji: '🌦️', group: 'rain'   },
  81: { label: 'Hujan Deras Lokal',   emoji: '🌧️', group: 'rain'   },
  82: { label: 'Badai Hujan',         emoji: '⛈️', group: 'storm'  },
  95: { label: 'Badai Petir',         emoji: '⛈️', group: 'storm'  },
  96: { label: 'Badai + Hujan Es',    emoji: '⛈️', group: 'storm'  },
  99: { label: 'Badai + Es Besar',    emoji: '⛈️', group: 'storm'  },
};

const FALLBACK = { label: 'Tidak diketahui', emoji: '🌡️', group: 'clear' };

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] ?? FALLBACK;
}