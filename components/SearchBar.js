// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { GLASS, TEXT } from '../constants/theme';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={[styles.container, GLASS]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Ketik nama kota…"
        placeholderTextColor="rgba(255,255,255,0.35)"
        autoCorrect={false}
        autoCapitalize="words"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: TEXT.primary,
    fontWeight: '400',
  },
});