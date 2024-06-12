#include <iostream>
#include <vector>
#include <string>
#include "CandleStick.h"
#include "PrintCandleStickVector.h"

void printCandlestickVector(const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures)
{
    // Extract country codes from the map (assuming they are keys in the submap of the first year)
    std::vector<std::string> countryCodes;
    if (!temperatures.empty())
    {
        auto firstYear = temperatures.begin()->second; // Accessing temperatures of the first year
        for (const auto &entry : firstYear)
        {
            countryCodes.push_back(entry.first); // Push country code
        }
    }

    // Display available countries and map them to integers
    std::cout << "Select a country by entering the corresponding number:\n";
    for (size_t i = 0; i < countryCodes.size(); ++i)
    {
        std::cout << i + 1 << ": " << countryCodes[i] << "\n";
    }

    int choice;
    std::cin >> choice;
    if (choice < 1 || choice > countryCodes.size())
    {
        std::cerr << "Invalid choice!" << std::endl;
    }

    std::string countryCode = countryCodes[choice - 1]; // Get the selected country code and offset by 1 for 0-based indexing

    std::vector<Candlestick> candlesticks = Candlestick::getCandlesticksForCountry(countryCode, temperatures);

    std::cout << "Candlestick data for " << countryCode << ":\n";
    for (const Candlestick &candle : candlesticks)
    {
        std::cout << "Year: " << candle.date
                  << ", Open: " << candle.open
                  << ", High: " << candle.high
                  << ", Low: " << candle.low
                  << ", Close: " << candle.close << std::endl;
    }
}
