#include <jni.h>

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_simplecalc_CalcNative_add(JNIEnv* env, jobject /*thiz*/, jdouble a, jdouble b) {
  return a + b;
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_simplecalc_CalcNative_sub(JNIEnv* env, jobject /*thiz*/, jdouble a, jdouble b) {
  return a - b;
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_simplecalc_CalcNative_mul(JNIEnv* env, jobject /*thiz*/, jdouble a, jdouble b) {
  return a * b;
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_simplecalc_CalcNative_div(JNIEnv* env, jobject /*thiz*/, jdouble a, jdouble b) {
  if (b == 0.0) return 0.0; // 일단 0 처리(원하면 에러로 바꿀 수 있음)
  return a / b;
}
