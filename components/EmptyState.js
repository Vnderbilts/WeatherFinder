// components/EmptyState.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT, GLASS } from '../constants/theme';

export default function EmptyState() {
  return (
    <View style={[styles.container, GLASS]}>
      <Text style={styles.emoji}>⛅</Text>
      <Text style={styles.title}>Temukan cuaca kotamu</Text>
      <Text style={styles.hint}>
        Ketik nama kota di kolom pencarian.{'\n'}
        Data langsung diperbarui secara otomatis.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 44,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  hint: {
    fontSize: 14,
    color: TEXT.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});