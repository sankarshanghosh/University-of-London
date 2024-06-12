#include "CandleStick.h"
#include <algorithm>

Candlestick::Candlestick(const std::string &d, float o, float h, float l, float c)
    : date(d), open(o), high(h), low(l), close(c) {}

float Candlestick::computeAverage(const std::vector<float> &temperatures)
{
    return std::accumulate(temperatures.begin(), temperatures.end(), 0.0f) / temperatures.size();
}

Candlestick Candlestick::computeYearlyCandlestick(const std::vector<float> &temperatures, const std::vector<float> &previousYearTemperatures, const std::string &year)
{
    float open;
    if (!previousYearTemperatures.empty())
    {
        open = computeAverage(previousYearTemperatures);
    }
    else
    {
        open = temperatures.front(); // For the first year, use the first temperature
    }
    float close = computeAverage(temperatures);
    float high = *std::max_element(temperatures.begin(), temperatures.end());
    float low = *std::min_element(temperatures.begin(), temperatures.end());
    return Candlestick(year, open, high, low, close);
}

std::vector<Candlestick> Candlestick::getCandlesticksForCountry(const std::string &country, const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures)
{
    std::vector<Candlestick> candlesticks;

    for (const auto &yearData : temperatures)
    {
        const std::string &year = yearData.first;
        const std::map<std::string, std::vector<float>> &countryTemperatures = yearData.second;

        if (countryTemperatures.find(country) != countryTemperatures.end())
        {
            const std::vector<float> &currentYearTemperatures = countryTemperatures.at(country);
            std::vector<float> previousYearTemperatures;

            // Calculate the previous year's average mean temperatures if available
            if (year != temperatures.begin()->first)
            {
                const std::string &previousYear = std::prev(temperatures.find(year))->first;
                previousYearTemperatures = temperatures.at(previousYear).at(country);
            }

            Candlestick candlestick = Candlestick::computeYearlyCandlestick(currentYearTemperatures, previousYearTemperatures, year);
            candlesticks.push_back(candlestick);
        }
    }

    return candlesticks;
}

std::vector<Candlestick> Candlestick::getCandlesticksForCountry(const std::string &country, const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures, const std::string &startYear, const std::string &endYear)
{
    std::vector<Candlestick> candlesticks;

    for (const auto &yearData : temperatures)
    {
        const std::string &year = yearData.first;

        // Only process data within the specified year range
        if (year >= startYear && year <= endYear)
        {
            const std::map<std::string, std::vector<float>> &countryTemperatures = yearData.second;

            if (countryTemperatures.find(country) != countryTemperatures.end())
            {
                const std::vector<float> &currentYearTemperatures = countryTemperatures.at(country);
                std::vector<float> previousYearTemperatures;

                // Calculate the previous year's average mean temperatures if available
                if (year != temperatures.begin()->first)
                {
                    auto it = temperatures.find(year);
                    if (it != temperatures.begin())
                    {
                        const std::string &previousYear = (--it)->first;
                        if (previousYear >= startYear)
                        { // Ensure previous year is within the range
                            previousYearTemperatures = temperatures.at(previousYear).at(country);
                        }
                    }
                }

                Candlestick candlestick = computeYearlyCandlestick(currentYearTemperatures, previousYearTemperatures, year);
                candlesticks.push_back(candlestick);
            }
        }
    }

    return candlesticks;
}
