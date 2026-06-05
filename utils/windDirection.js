// utils/windDirection.js

const DIRECTIONS = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'];
const DIRECTIONS_FULL = [
  'Utara', 'Timur Laut', 'Timur', 'Tenggara',
  'Selatan', 'Barat Daya', 'Barat', 'Barat Laut',
];

/**
 * Konversi derajat angin → singkatan arah mata angin
 * Rumus: round(derajat / 45) % 8
 */
export function degreesToCompass(degrees) {
  const idx = Math.round(degrees / 45) % 8;
  return {
    short: DIRECTIONS[idx],
    full: DIRECTIONS_FULL[idx],
  };
}

/**
 * Rotasi ikon panah sesuai arah angin (untuk transform rotate)
 */
export function windArrowRotation(degrees) {
  return `${degrees}deg`;
}