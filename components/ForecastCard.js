// components/ForecastCard.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { GLASS_DARK, TEXT, SPACING } from '../constants/theme';
import { getWeatherInfo } from '../utils/weatherCodes';

export default function ForecastCard({ forecast7Days, accentColor }) {
  if (!forecast7Days || forecast7Days.length === 0) return null;

  // Format time HH:MM dari ISO string
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return isoString.split('T')[1].substring(0, 5);
  };

  // Format date ke format lokal
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prakiraan 7 Hari</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
        scrollEventThrottle={16}
      >
        {forecast7Days.map((day, idx) => {
          const { emoji } = getWeatherInfo(day.weathercode);
          return (
            <View key={idx} style={[styles.dayCard, GLASS_DARK]}>
              <Text style={styles.dayName}>{formatDate(day.date)}</Text>
              <Text style={styles.emoji}>{emoji}</Text>

              <View style={styles.tempRow}>
                <Text style={styles.tempMax}>{day.tempMax}°</Text>
                <Text style={styles.tempMin}>{day.tempMin}°</Text>
              </View>

              {day.precipitation > 0 && (
                <View style={[styles.precipBadge, { borderColor: accentColor + '55' }]}>
                  <Text style={[styles.precipText, { color: accentColor }]}>
                    💧 {day.precipitation}mm
                  </Text>
                </View>
              )}

              <View style={styles.sunRow}>
                <View style={styles.sunItem}>
                  <Text style={styles.sunIcon}>🌅</Text>
                  <Text style={styles.sunTime}>{formatTime(day.sunrise)}</Text>
                </View>
                <View style={styles.sunItem}>
                  <Text style={styles.sunIcon}>🌇</Text>
                  <Text style={styles.sunTime}>{formatTime(day.sunset)}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    color: TEXT.secondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    paddingHorizontal: 0,
  },
  scroll: {
    flexDirection: 'row',
  },
  dayCard: {
    width: 100,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 8,
    alignItems: 'center',
    gap: 6,
  },
  dayName: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emoji: {
    fontSize: 24,
  },
  tempRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempMax: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT.primary,
  },
  tempMin: {
    fontSize: 11,
    fontWeight: '500',
    color: TEXT.secondary,
  },
  precipBadge: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  precipText: {
    fontSize: 9,
    fontWeight: '600',
  },
  sunRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  sunItem: {
    alignItems: 'center',
    gap: 1,
  },
  sunIcon: {
    fontSize: 12,
  },
  sunTime: {
    fontSize: 8,
    color: TEXT.tertiary,
    fontWeight: '500',
  },
});
