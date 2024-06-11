#pragma once

#include <string>
#include <numeric>
#include <map>
#include "WeatherApp.h"

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

    static std::vector<Candlestick> getCandlesticksForCountry(const std::string &country, const std::map<std::string, std::map<std::string, std::vector<float> > > &temperatures);
};