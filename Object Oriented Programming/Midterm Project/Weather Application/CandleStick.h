#pragma once

#include <string>
#include <numeric>
#include <map>
#include <vector>

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

    // Overload the function such that it works for both printing the whole data set and plotting based on year range if provided
    static std::vector<Candlestick> getCandlesticksForCountry(const std::string &country, const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures);
    static std::vector<Candlestick> getCandlesticksForCountry(const std::string &country, const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures, const std::string &startYear, const std::string &endYear);
};
