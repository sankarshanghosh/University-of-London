#pragma once

#include <string>

class Candlestick
{
public:
    std::string date; // The year or specific date string
    double open;      // Average temperature at the start of the period
    double high;      // Highest temperature in the period
    double low;       // Lowest temperature in the period
    double close;     // Average temperature at the end of the period

    Candlestick(std::string d, double o, double h, double l, double c)
        : date(d), open(o), high(h), low(l), close(c) {}
};
