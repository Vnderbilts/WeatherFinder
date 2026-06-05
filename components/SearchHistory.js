// components/SearchHistory.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TEXT } from '../constants/theme';

export default function SearchHistory({ history, onSelect }) {
  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Terakhir dicari</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {history.map((city) => (
          <TouchableOpacity
            key={city}
            style={styles.chip}
            onPress={() => onSelect(city)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipText}>🕘 {city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: TEXT.tertiary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  chipText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 13,
    fontWeight: '500',
  },
});