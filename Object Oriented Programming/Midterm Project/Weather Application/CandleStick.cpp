#include "CandleStick.h"
#include <numeric>
#include <algorithm>
#include <fstream>
#include <iostream>
#include <stdexcept>
#include <map>

Candlestick::Candlestick(const std::string &d, float o, float h, float l, float c)
    : date(d), open(o), high(h), low(l), close(c) {}

float Candlestick::computeAverage(const std::vector<float>& temperatures) {
    return std::accumulate(temperatures.begin(), temperatures.end(), 0.0f) / temperatures.size();
}

Candlestick::computeYearlyCandlestick(const std::vector<float>& temperatures, const std::vector<float>& previousYearTemperatures, const std::string& year) {
    float open;
    if (!previousYearTemperatures.empty()) {
        open = computeAverage(previousYearTemperatures);
    } else {
        open = temperatures.front(); // For the first year, use the first temperature
    }
    float close = computeAverage(temperatures);
    float high = *std::max_element(temperatures.begin(), temperatures.end());
    float low = *std::min_element(temperatures.begin(), temperatures.end());
    return Candlestick(year, open, high, low, close);
}

std::vector<Candlestick> getCandlesticksForCountry(const std::string& country, const std::map<std::string, std::map<std::string, std::vector<float>>>& temperatures) {
    std::vector<Candlestick> candlesticks;

    for (const auto& yearData : temperatures) {
        const std::string& year = yearData.first;
        const std::map<std::string, std::vector<float>>& countryTemperatures = yearData.second;

        if (countryTemperatures.find(country) != countryTemperatures.end()) {
            const std::vector<float>& yearlyTemperatures = countryTemperatures.at(country);
            std::vector<float> previousYearTemperatures;

            if (year != temperatures.begin()->first) {
                const std::string& previousYear = std::prev(temperatures.find(year))->first;
                previousYearTemperatures = temperatures.at(previousYear).at(country);
            }

            Candlestick candlestick = Candlestick::computeYearlyCandlestick(yearlyTemperatures, previousYearTemperatures, year);
            candlesticks.push_back(candlestick);
        }
    }

    return candlesticks;
}