import java.util.Properties

plugins {
    id("com.android.application")
    id("kotlin-android")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")

if (keystorePropertiesFile.exists()) {
    keystorePropertiesFile.inputStream().use { stream ->
        keystoreProperties.load(stream)
    }
}

val releaseStoreFilePath = keystoreProperties["storeFile"] as String?
val releaseStoreFile = if (!releaseStoreFilePath.isNullOrBlank()) {
    rootProject.file(releaseStoreFilePath)
} else {
    null
}

val hasReleaseKeystore =
    keystorePropertiesFile.exists() &&
    (releaseStoreFile?.exists() == true) &&
    (keystoreProperties["storeFile"] as String?)?.isNotBlank() == true &&
    (keystoreProperties["storePassword"] as String?)?.isNotBlank() == true &&
    (keystoreProperties["keyAlias"] as String?)?.isNotBlank() == true &&
    (keystoreProperties["keyPassword"] as String?)?.isNotBlank() == true

android {
    namespace = "com.example.codigotech"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.example.codigotech"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    signingConfigs {
        create("release") {
            if (hasReleaseKeystore && releaseStoreFile != null) {
                storeFile = releaseStoreFile
                storePassword = keystoreProperties["storePassword"] as String
                keyAlias = keystoreProperties["keyAlias"] as String
                keyPassword = keystoreProperties["keyPassword"] as String
            }
        }
    }

    buildTypes {
        release {
            signingConfig = if (hasReleaseKeystore) {
                signingConfigs.getByName("release")
            } else {
                signingConfigs.getByName("debug")
            }
        }
    }
}

flutter {
    source = "../.."
}
