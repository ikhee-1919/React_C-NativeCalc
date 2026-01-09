# Android Native Calculator App

JNI 기반 네이티브(C++) 연산을 사용하는  
간단한 Android 계산기 애플리케이션입니다.

덧셈, 뺄셈, 곱셈, 나눗셈 연산을 지원하며  
실제 계산 로직은 Java/Kotlin이 아닌 **Native 라이브러리(.so)**에서 처리됩니다.

---

## Features

- 기본 사칙연산 지원
- Android UI + Native(C++) 연산 구조
- JNI를 통한 Java ↔ Native 함수 호출
- ARM64 환경에서 동작

---

## Tech Stack

- Android (Kotlin)
- C++ (NDK)
- JNI
- Android Studio

---

## Native Structure

- Java/Kotlin 코드에서 `native` 메서드 선언
- 앱 실행 시 `System.loadLibrary()`로 네이티브 라이브러리 로드
- 실제 연산은 `.so` 파일 내부에서 처리

---

## How to Run

1. Android Studio에서 프로젝트 열기
2. 실제 디바이스 또는 에뮬레이터 실행
3. 앱 실행 후 계산기 버튼 입력

---

## Native Frida  Study

- 안드로이드 계산기 개발 과정
- Native단 so파일을 IDA로 분석 후 Frida 코드 작성에 대한 내용
- https://fuzzy-waitress-cad.notion.site/2e24a3b6966180e3a4a9f18de24d7610?pvs=74

