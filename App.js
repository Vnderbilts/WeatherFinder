// App.js
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useWeather } from './hooks/useWeather';
import { getTheme } from './utils/dynamicTheme';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import EmptyState from './components/EmptyState';
import ForecastCard from './components/ForecastCard';
import FavoritesList from './components/FavoritesList';

const MAX_HISTORY = 5;

export default function App() {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { weather, loading, error, status } = useWeather(query);

  // Saat fetch sukses, simpan ke riwayat
  const addToHistory = useCallback((cityName) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      return [cityName, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  // Panggil addToHistory saat weather berhasil dimuat
  React.useEffect(() => {
    if (weather?.city) {
      addToHistory(weather.city);
    }
  }, [weather?.city]);

  const theme = getTheme(weather?.weathercode, weather?.is_day);
  const gradientColors = theme.gradient;

  return (
    <LinearGradient colors={gradientColors} style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.kav}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.appTitle}>WeatherFinder</Text>
              <Text style={styles.appSubtitle}>Cuaca dunia, satu ketikan</Text>
            </View>

            {/* Search */}
            <SearchBar value={query} onChangeText={setQuery} />

            {/* Favorites (Level 3) */}
            <FavoritesList
              currentCity={weather?.city}
              onSelect={(city) => setQuery(city)}
              onFavoritesChange={setFavorites}
            />

            {/* Riwayat pencarian */}
            {history.length > 0 && status !== 'loading' && (
              <SearchHistory
                history={history}
                onSelect={(city) => setQuery(city)}
              />
            )}

            {/* Status kondisi UI */}
            {status === 'idle' && <EmptyState />}

            {status === 'loading' && (
              <View style={styles.centerBox}>
                <ActivityIndicator size="large" color="rgba(255,255,255,0.8)" />
                <Text style={styles.loadingText}>Mencari kota…</Text>
              </View>
            )}

            {status === 'error' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorEmoji}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {status === 'success' && weather && (
              <>
                <WeatherCard weather={weather} accentColor={theme.accent} />
                {/* Forecast 7 Hari (Level 3) */}
                <ForecastCard
                  forecast7Days={weather.forecast7Days}
                  accentColor={theme.accent}
                />
              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, paddingTop: Platform.OS === 'android' ? 36 : 0 },
  kav: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  header: { marginTop: 20, marginBottom: 28 },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 4,
    letterSpacing: 0.2,
  },

  centerBox: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
  },

  errorBox: {
    alignItems: 'center',
    marginTop: 48,
    backgroundColor: 'rgba(255,80,80,0.12)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,80,80,0.25)',
    padding: 24,
  },
  errorEmoji: { fontSize: 36, marginBottom: 10 },
  errorText: {
    color: '#ff6b6b',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});