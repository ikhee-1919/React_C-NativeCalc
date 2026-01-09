cmake_minimum_required(VERSION 3.22.1)
project("cotcalc")

add_library(nativecalc SHARED nativecalc.cpp)

find_library(log-lib log)

target_link_libraries(nativecalc ${log-lib})
