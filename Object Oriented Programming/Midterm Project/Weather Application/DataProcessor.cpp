#pragma once
#include <vector>
#include <unordered_map>
#include <map>
#include <string>
#include <fstream>
#include <sstream>
#include <iostream>
#include "Candlestick.h"

class DataProcessor {
public:
    DataProcessor(const std::string& filename);
    std::vector<Candlestick> processYearlyDataForCountry(const std::string& countryCode);

private:
    std::string filePath;
    std::unordered_map<std::string, int> countryColumnMap;
    std::map<std::string, std::map<std::string, std::vector<double>>> yearlyTemperatureData;

    void loadTemperatureData();
    void initializeCountryColumnMap();
    std::vector<double> extractTemperaturesForYear(const std::string& countryCode, const std::string& year);
    double computeYearlyOpen(const std::vector<double>& temps);
    double computeYearlyHigh(const std::vector<double>& temps);
    double computeYearlyLow(const std::vector<double>& temps);
    double computeYearlyClose(const std::vector<double>& temps);
};

DataProcessor::DataProcessor(const std::string& filename) : filePath(filename) {
    initializeCountryColumnMap();
    loadTemperatureData();
}

void DataProcessor::loadTemperatureData() {
    std::ifstream file(filePath);
    if (!file.is_open()) {
        throw std::runtime_error("Failed to open file: " + filePath);
    }

    std::string line;
    // Read the header to get country codes
    std::getline(file, line);
    std::istringstream headerStream(line);
    std::string token;
    // Skip the timestamp column
    std::getline(headerStream, token, ',');
    while (std::getline(headerStream, token, ',')) {
        countryColumnMap[token] = countryColumnMap.size(); // Maps country to its column index
    }

    // Read the rest of the data
    while (std::getline(file, line)) {
        std::istringstream ss(line);
        std::string year = line.substr(0, 4); // Assume date format is "YYYY-MM-DDTHH:MM:SSZ"
        std::getline(ss, token, ','); // Skip timestamp
        int columnIndex = 0;
        while (std::getline(ss, token, ',')) {
            if (!token.empty()) {
                double temp = std::stod(token);
                std::string country = std::find_if(countryColumnMap.begin(), countryColumnMap.end(),
                                                  [columnIndex](const auto& pair) { return pair.second == columnIndex; })->first;
                yearlyTemperatureData[year][country].push_back(temp);
            }
            columnIndex++;
        }
    }
    file.close();
}

std::vector<double> DataProcessor::extractTemperaturesForYear(const std::string& countryCode, const std::string& year) {
    return yearlyTemperatureData[year][countryCode];
}

// Implement computeYearlyOpen, High, Low, Close as needed using the extracted data

std::vector<Candlestick> DataProcessor::processYearlyDataForCountry(const std::string& countryCode) {
    std::vector<Candlestick> results;
    for (const auto& yearData : yearlyTemperatureData) {
        const auto& temps = extractTemperaturesForYear(countryCode, yearData.first);
        double open = computeYearlyOpen(temps);
        double high = computeYearlyHigh(temps);
        double low = computeYearlyLow(temps);
        double close = computeYearlyClose(temps);
        results.emplace_back(yearData.first, open, high, low, close);
    }
    return results;
}
