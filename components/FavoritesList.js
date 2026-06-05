// components/FavoritesList.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TEXT } from '../constants/theme';

const FAVORITES_KEY = '@weatherfinder_favorites';
const MAX_FAVORITES = 10;

export default function FavoritesList({ currentCity, onSelect, onFavoritesChange }) {
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Load favorites dari storage
  useEffect(() => {
    loadFavorites();
  }, []);

  // Check jika city saat ini sudah di-favorite
  useEffect(() => {
    const isFav = favorites.some(fav => fav.toLowerCase() === currentCity?.toLowerCase());
    setIsFavorited(isFav);
  }, [currentCity, favorites]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
        onFavoritesChange?.(parsed);
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

  const saveFavorites = async (newFavs) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
      setFavorites(newFavs);
      onFavoritesChange?.(newFavs);
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  };

  const toggleFavorite = () => {
    if (!currentCity) {
      Alert.alert('Peringatan', 'Cari kota terlebih dahulu untuk menambahkan favorite');
      return;
    }

    if (isFavorited) {
      // Remove
      const updated = favorites.filter(f => f.toLowerCase() !== currentCity.toLowerCase());
      saveFavorites(updated);
      Alert.alert('Berhasil', `${currentCity} dihapus dari favorite`);
    } else {
      // Add
      if (favorites.length >= MAX_FAVORITES) {
        Alert.alert('Batas', `Maksimal ${MAX_FAVORITES} favorite. Hapus yang lama dulu.`);
        return;
      }
      const updated = [currentCity, ...favorites];
      saveFavorites(updated);
      Alert.alert('Berhasil', `${currentCity} ditambahkan ke favorite`);
    }
  };

  const removeFavorite = (city) => {
    Alert.alert('Hapus', `Hapus "${city}" dari favorite?`, [
      { text: 'Batal', onPress: () => {} },
      {
        text: 'Hapus',
        onPress: () => {
          const updated = favorites.filter(f => f.toLowerCase() !== city.toLowerCase());
          saveFavorites(updated);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Add to Favorites Button */}
      <TouchableOpacity
        style={[
          styles.addBtn,
          isFavorited
            ? { backgroundColor: 'rgba(255, 215, 0, 0.25)', borderColor: '#FFD700' }
            : { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderColor: 'rgba(255,255,255,0.18)' },
        ]}
        onPress={toggleFavorite}
      >
        <Text style={styles.addBtnIcon}>{isFavorited ? '⭐' : '☆'}</Text>
        <Text
          style={[
            styles.addBtnText,
            isFavorited ? { color: '#FFD700' } : { color: TEXT.secondary },
          ]}
        >
          {isFavorited ? 'Favorite' : 'Tambah Favorite'}
        </Text>
      </TouchableOpacity>

      {/* Favorites List */}
      {favorites.length > 0 && (
        <>
          <Text style={styles.label}>Kota Favorit ({favorites.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
            {favorites.map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.favChip}
                onPress={() => onSelect(city)}
                onLongPress={() => removeFavorite(city)}
              >
                <Text style={styles.favText}>⭐ {city}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  addBtnIcon: {
    fontSize: 16,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: TEXT.tertiary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  scroll: {
    flexDirection: 'row',
  },
  favChip: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  favText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '500',
  },
});
