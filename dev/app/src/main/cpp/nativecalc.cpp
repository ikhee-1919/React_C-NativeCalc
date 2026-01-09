#include <jni.h>

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_example_cotcalc_MainActivity_nativeCalc(JNIEnv* env, jobject /*thiz*/,
                                                 jdouble a, jdouble b, jint op) {
    // op: 1=add, 2=sub, 3=mul, 4=div
    switch (op) {
        case 1: return a + b;
        case 2: return a - b;
        case 3: return a * b;
        case 4:
            if (b == 0.0) return 0.0; // Kotlin에서 Error 처리
            return a / b;
        default:
            return 0.0;
    }
}
