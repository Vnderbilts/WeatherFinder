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

- **Expo Snack**: https://snack.expo.dev/@vnderbilts/weatherfinderapp

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

## 📄 License

MIT License - Bebas digunakan & dimodifikasi

---

**Made with ❤️ using React Native & Expo**
