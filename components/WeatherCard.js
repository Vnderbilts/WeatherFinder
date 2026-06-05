// components/WeatherCard.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { GLASS, GLASS_DARK, TEXT, SPACING } from '../constants/theme';
import { getWeatherInfo } from '../utils/weatherCodes';
import { degreesToCompass, windArrowRotation } from '../utils/windDirection';

export default function WeatherCard({ weather, accentColor }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Fade-in micro-animation saat kartu muncul
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [weather.city]);

  const { label, emoji } = getWeatherInfo(weather.weathercode);
  const wind = degreesToCompass(weather.winddirection);
  const dayLabel = weather.is_day === 1 ? '☀️ Siang' : '🌙 Malam';

  return (
    <Animated.View
      style={[
        styles.card,
        GLASS,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* ── Baris atas: kota + negara + siang/malam ── */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.cityName}>{weather.city}</Text>
          <Text style={styles.country}>{weather.country}</Text>
        </View>
        <View style={[styles.dayBadge, { borderColor: accentColor + '55' }]}>
          <Text style={[styles.dayText, { color: accentColor }]}>{dayLabel}</Text>
        </View>
      </View>

      {/* ── Suhu utama ── */}
      <View style={styles.tempRow}>
        <Text style={styles.tempValue}>{weather.temperature}°</Text>
        <View style={styles.conditionBox}>
          <Text style={styles.conditionEmoji}>{emoji}</Text>
          <Text style={styles.conditionLabel}>{label}</Text>
        </View>
      </View>

      {/* ── Min/Maks ── */}
      {weather.tempMax !== null && (
        <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.10)' }]} />
      )}
      {weather.tempMax !== null && (
        <View style={styles.minMaxRow}>
          <StatChip
            icon="🔼"
            label="Maks"
            value={`${Math.round(weather.tempMax)}°C`}
            accent={accentColor}
          />
          <StatChip
            icon="🔽"
            label="Min"
            value={`${Math.round(weather.tempMin)}°C`}
            accent={accentColor}
          />
          <StatChip
            icon="💨"
            label={`Angin ${wind.short}`}
            value={`${Math.round(weather.windspeed)} km/j`}
            accent={accentColor}
          />
        </View>
      )}
    </Animated.View>
  );
}

// Sub-komponen chip statistik
function StatChip({ icon, label, value, accent }) {
  return (
    <View style={[styles.chip, GLASS_DARK]}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={[styles.chipLabel, { color: accent }]}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.lg,
    marginTop: 8,
  },

  // Top row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cityName: {
    fontSize: 26,
    fontWeight: '700',
    color: TEXT.primary,
    letterSpacing: -0.3,
  },
  country: {
    fontSize: 14,
    color: TEXT.secondary,
    marginTop: 2,
  },
  dayBadge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Suhu
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tempValue: {
    fontSize: 80,
    fontWeight: '200',
    color: TEXT.primary,
    lineHeight: 88,
    letterSpacing: -4,
  },
  conditionBox: {
    alignItems: 'center',
    gap: 6,
  },
  conditionEmoji: {
    fontSize: 44,
  },
  conditionLabel: {
    fontSize: 13,
    color: TEXT.secondary,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 100,
  },

  // Divider
  divider: {
    height: 1,
    marginBottom: 16,
  },

  // Min/Maks + Angin
  minMaxRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 4,
  },
  chipIcon: {
    fontSize: 18,
  },
  chipLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipValue: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT.primary,
  },
});