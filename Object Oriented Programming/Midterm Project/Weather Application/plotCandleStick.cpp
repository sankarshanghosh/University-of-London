#include <iostream>
#include <vector>
#include <string>
#include <map>
#include "CandleStick.h"
#include "CSVReader.h"
#include "plotCandleStick.h"

// Function to display the candlestick plot for a given country
void displayCandlestickPlot(const std::vector<Candlestick> &candlesticks)
{
    for (const auto &candle : candlesticks)
    {
        std::cout << "Year: " << candle.date << "\n";
        std::cout << "     High: |" << "\n";
        float range = candle.high - candle.low; // Calculate the temperature range
        int steps = 10;                         // You can adjust the granularity of the plot

        // Calculate positions for open and close within the range
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

void plotCandlestickData(const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures)
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
    displayCandlestickPlot(candlesticks);
}