#include <iostream>
#include <vector>
#include <string>
#include <map>
#include "CandleStick.h"
#include "CSVReader.h"
#include "PlotCandleStick.h"

// Function to display the candlestick plot for a given country
void displayCandlestickPlot(const std::vector<Candlestick> &candlesticks)
{
    for (const auto &candle : candlesticks)
    {
        std::cout << "Year: " << candle.date << "\n";
        std::cout << "     High: |" << "\n";
        float range = candle.high - candle.low;
        int steps = 10;

        int openPos = static_cast<int>((candle.open - candle.low) / range * steps);
        int closePos = static_cast<int>((candle.close - candle.low) / range * steps);

        for (int i = steps; i >= 0; --i)
        {
            if (i == openPos && i == closePos)
            {
                std::cout << "          -O-C-" << "\n";
            }
            else if (i == openPos)
            {
                std::cout << "          -O-  " << "\n";
            }
            else if (i == closePos)
            {
                std::cout << "          -C-  " << "\n";
            }
            else
            {
                std::cout << "           |   " << "\n";
            }
        }
        std::cout << "     Low:  |" << "\n\n";
    }
}

void plotCandlestickData(const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures, const std::string &startYear, const std::string &endYear)
{
    std::vector<std::string> countryCodes;
    if (!temperatures.empty())
    {
        auto firstYear = temperatures.begin()->second;
        for (const auto &entry : firstYear)
        {
            countryCodes.push_back(entry.first);
        }
    }

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
        return;
    }

    std::string countryCode = countryCodes[choice - 1];

    std::vector<Candlestick> candlesticks;
    candlesticks = Candlestick::getCandlesticksForCountry(countryCode, temperatures, startYear, endYear);

    std::cout << "Candlestick data for " << countryCode << ":\n";
    displayCandlestickPlot(candlesticks);
}
