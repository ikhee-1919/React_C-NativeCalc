# Android Native Hooking with Frida

Android 앱에서 **네이티브(.so) 라이브러리로 구현된 JNI 함수**를 대상으로  
Frida를 사용해 **동적 후킹 및 반환값 변조**를 실습한 예제입니다.

간단한 계산기 앱을 통해  
Java/Kotlin → Native(C++) 호출 흐름과  
ARM64 환경에서의 네이티브 후킹 방식을 확인할 수 있습니다.

---

## What this project demonstrates

- JNI 기반 네이티브 함수 호출 구조
- `.so` 라이브러리 Export 심볼 후킹
- Frida를 이용한 네이티브 함수 진입/종료 후킹
- 반환값 강제 변조 (연산 결과 무시)

---

## Environment

- Android (ARM64)
- Native library: `libnativecalc.so`
- Tool: Frida 17.x
- Device: Android real device (rooted)

---

## How to run

```bash
frida -U -f com.example.cotcalc -l script_native.js --no-pause
