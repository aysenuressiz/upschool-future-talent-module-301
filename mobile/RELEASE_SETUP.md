# UniShelf Mobile Release Setup

This project is configured for Android (Google Play) and iOS (App Store) release builds.

## Android (Google Play)

1. Create an upload keystore file (`upload-keystore.jks`) inside `mobile/android/`.
2. Copy `mobile/android/key.properties.example` as `mobile/android/key.properties`.
3. Fill real values in `key.properties`.
4. Build release bundle:

```bash
flutter build appbundle --release
```

Upload the generated `.aab` file from `build/app/outputs/bundle/release/`.

## iOS (App Store)

1. Open `mobile/ios/Runner.xcworkspace` in Xcode.
2. Select `Runner` target and set Team/Signing.
3. Ensure bundle id is `com.unishelf.app`.
4. Create archive and upload with Xcode Organizer.

CLI build check:

```bash
flutter build ipa --release
```
