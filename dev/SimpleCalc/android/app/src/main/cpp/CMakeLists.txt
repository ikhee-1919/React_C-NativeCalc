cmake_minimum_required(VERSION 3.22.1)
project(simplecalc)

add_library(calc SHARED calc.cpp)

find_library(log-lib log)

target_link_libraries(calc ${log-lib})
