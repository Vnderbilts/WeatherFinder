# ⛅ WeatherFinder

Aplikasi cuaca modern berbasis React Native (Expo) yang menggunakan **Open-Meteo API** — gratis, tanpa API key, dengan fitur favorit & forecast lengkap.

## ✨ Fitur

### 🟢 Level 1 — Core
- [x] TextInput controlled (value + onChangeText)
- [x] Debounce 500ms (1 permintaan per kota, bukan per huruf)
- [x] `useEffect` dengan dependency array `[query]`
- [x] Fetch 2 langkah: **Geocoding → Forecast**
- [x] 4 kondisi UI: Kosong · Loading · Error · Sukses
- [x] `AbortController` di cleanup function (anti memory leak)
- [x] Mapping 20+ kode cuaca WMO → label + emoji
- [x] Tampil: nama kota, negara, suhu (°C), kondisi cuaca

### 🟡 Level 2 — Pengembangan
- [x] **🕘 Riwayat Pencarian** — 5 kota terakhir tampil sebagai chip horizontal yang bisa di-tap
- [x] **🎨 Background Dinamis** — Gradien berubah sesuai kondisi cuaca (cerah, hujan, badai, dll) + waktu (siang/malam)
- [x] **🧭 Arah & Kecepatan Angin** — Bonus: ditampilkan di kartu cuaca

### 🔵 Level 3 — Advanced Features
- [x] **⭐ Favorites Management** — Simpan hingga 10 kota favorit dengan AsyncStorage (persistent)
- [x] **📅 Forecast 7 Hari** — Scroll horizontal, lihat prediksi suhu max/min setiap hari
- [x] **🌅 Sunrise/Sunset Times** — Waktu terbit & terbenam matahari untuk setiap kota
- [x] **💧 Precipitation Data** — Tampil curah hujan harian dalam prakiraan
- [x] **💾 Persistent Storage** — Favorites tersimpan di phone storage, load otomatis saat buka app

## 📸 Screenshot

| Kosong | Loading | Sukses | Error |
|--------|---------|--------|-------|
| ![Kosong](./screenshoots/kosong.jpg) | ![Loaing](./screenshoots/loading.jpg) | ![Sukses](./screenshoots/berhasil.jpg) | ![Erorr](./screenshoots/erorr.jpg) |

## 🚀 Cara Menjalankan

```bash
# 1. Clone repo
git clone https://github.com/<username>/weatherfinder.git
cd weatherfinder

# 2. Install dependencies
npm install

# 3. Jalankan
npx expo start

# 4. Scan QR di aplikasi Expo Go (Android/iOS)
```

## 🛠 Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| React Native + Expo 52 | Framework mobile (SDK 52) |
| Open-Meteo API | Data cuaca real-time (gratis, tanpa API key) |
| expo-linear-gradient | Background gradien dinamis |
| @react-native-async-storage | Simpan favorites ke phone storage |
| React Hooks | useState, useEffect, useRef, useCallback |
| Animated API | Fade-in & slide animations |

## 📊 API Endpoints

### Geocoding
```
GET https://geocoding-api.open-meteo.com/v1/search
?name={city}&count=1&language=id
```
→ Convert nama kota menjadi lat/long

### Weather Forecast
```
GET https://api.open-meteo.com/v1/forecast
?latitude={lat}&longitude={long}
&current_weather=true
&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum
&timezone=auto
```
→ Cuaca saat ini + 7 hari ke depan

## 🔗 Links

- **Expo Snack**: https://snack.expo.dev/@Vnderbilts/weatherfinder
- **GitHub Repository**: https://github.com/Vnderbilts/WeatherFinder

## 📁 Struktur Project

```
WeatherFinder/
├── App.js                      # Main app component (Level 3 integrated)
├── index.js                    # Entry point
├── package.json                # Dependencies
├── app.json                    # Expo config
│
├── components/
│   ├── SearchBar.js           # Input search kota
│   ├── WeatherCard.js         # Tampil cuaca saat ini + sunrise/sunset
│   ├── ForecastCard.js        # Forecast 7 hari (Level 3)
│   ├── FavoritesList.js       # Manage favorites dengan AsyncStorage (Level 3)
│   ├── SearchHistory.js       # Riwayat pencarian (5 kota terakhir)
│   └── EmptyState.js          # Tampilan awal kosong
│
├── hooks/
│   └── useWeather.js          # Custom hook: fetch cuaca + daily forecast
│
├── utils/
│   ├── dynamicTheme.js        # 6 tema gradien dinamis per cuaca
│   ├── weatherCodes.js        # Map WMO codes → label + emoji
│   └── windDirection.js       # Convert derajat → arah mata angin
│
├── constants/
│   └── theme.js               # Design tokens (GLASS, TEXT, SPACING)
│
└── assets/
    └── icons, images           # Icons & splash images
```

## 🎯 Cara Menggunakan (User Guide)

### 1. Search Cuaca
- Ketik nama kota di search bar (mis: "Jakarta", "Bandung", "New York")
- Tunggu 500ms (debounce) → otomatis fetch data

### 2. Lihat Data Cuaca
- **Sekarang**: Suhu, kondisi, arah angin
- **Sunrise/Sunset**: Waktu terbit & terbenam matahari
- **7 Hari**: Swipe horizontal untuk lihat prakiraan

### 3. Simpan Favorit
- Tap tombol ☆ (bintang kosong) → **Tambah ke favorit**
- Tap tombol ⭐ (bintang penuh) → **Hapus dari favorit**
- Favorit otomatis tersimpan di phone & load ulang saat buka app
- Max: 10 favorit

## 🚀 Cara Menjalankan

### Lokal (Development)
```bash
# 1. Clone repo
git clone https://github.com/Vnderbilts/WeatherFinder.git
cd WeatherFinder

# 2. Install dependencies
npm install

# 3. Jalankan Expo
npx expo start

# 4. Scan QR code dengan Expo Go (Android/iOS)
```

### Via Expo Snack (Browser)
1. Buka: https://snack.expo.dev/@Vnderbilts/weatherfinder
2. Edit code online (web preview + mobile preview)
3. Scan QR dengan Expo Go untuk test di phone

## 💡 Development Tips

### Debug
```javascript
// Di hooks/useWeather.js - Console logs untuk tracking
console.log('Geocoding result:', geoData);
console.log('Weather data:', weatherData);
```

### Menambah Parameter API
Open-Meteo punya banyak parameter. Edit `useWeather.js`:
```javascript
// Tambahkan ke daily parameter
&daily=...,uv_index_max,relative_humidity_2m_max,...
```

### Styling & Theme
- Design tokens ada di `constants/theme.js`
- 6 tema cuaca di `utils/dynamicTheme.js`
- Modify THEMES object untuk custom gradients

## 📝 Version History

| Version | Fitur | Date |
|---------|-------|------|
| 1.0.0 | Level 3: Favorites, 7-day forecast, sunrise/sunset | June 5, 2026 |
| 0.5.0 | Level 2: History, dynamic theme, wind direction | June 4, 2026 |
| 0.1.0 | Level 1: Core search & display | June 3, 2026 |

## 📄 License

MIT License - Bebas digunakan & dimodifikasi

---

**Made with ❤️ using React Native & Expo**