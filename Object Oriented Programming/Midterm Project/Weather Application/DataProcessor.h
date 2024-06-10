#pragma once
#include <vector>
#include <unordered_map>
#include "Candlestick.h"

class DataProcessor {
public:
    DataProcessor(const std::string& filename);
    std::vector<Candlestick> processYearlyDataForCountry(const std::string& countryCode);

private:
    std::string filePath;
    std::unordered_map<std::string, int> countryColumnMap;

    void initializeCountryColumnMap();
    std::vector<double> extractTemperaturesForCountry(const std::string& countryCode, std::ifstream& file);
    double computeYearlyOpen(const std::vector<double>& temps);
    double computeYearlyHigh(const std::vector<double>& temps);
    double computeYearlyLow(const std::vector<double>& temps);
    double computeYearlyClose(const std::vector<double>& temps);
};
