#pragma once

#include <string>

class Candlestick
{
public:
    std::string date;
    float open;
    float high;
    float low;
    float close;

    Candlestick(const std::string &d, float o, float h, float l, float c);

    static float computeAverage(const std::vector<float> &temperatures);

    static Candlestick computeYearlyCandlestick(const std::vector<float> &temperatures, const std::vector<float> &previousYearTemperatures, const std::string &year);
};;