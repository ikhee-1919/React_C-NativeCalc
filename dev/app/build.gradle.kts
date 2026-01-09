plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.example.cotcalc"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        applicationId = "com.example.cotcalc"
        minSdk = 29
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // ✅ JNI/CMake 설정(1) - defaultConfig 안에 넣는 부분
        externalNativeBuild {
            cmake {
                // 필요하면 옵션 추가 가능
                cppFlags += ""
            }
        }

        // ✅ ABI 필터(선택) - 빌드 시간/용량 관리용
        // 에뮬(x86_64) + 실기기(arm64-v8a) 정도면 보통 충분
        ndk {
            abiFilters += setOf("arm64-v8a", "x86_64")
            // armeabi-v7a까지 필요하면 아래처럼 추가
            // abiFilters += setOf("arm64-v8a", "armeabi-v7a", "x86_64")
        }
    }

    // ✅ JNI/CMake 설정(2) - CMakeLists 경로 연결 (핵심)
    externalNativeBuild {
        cmake {
            path = file("src/main/cpp/CMakeLists.txt")
            // CMake 버전을 강제하고 싶으면(선택)
            // version = "3.22.1"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}
