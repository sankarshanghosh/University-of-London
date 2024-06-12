#include "PredictTemperature.h"
#include <iostream>
#include <vector>
#include <numeric>

void predictTemperature(const std::map<std::string, std::map<std::string, std::vector<float>>> &temperatures)
{
    if (temperatures.empty())
    {
        std::cout << "No temperature data available.\n";
        return;
    }

    // Display available countries and map them to integers
    std::vector<std::string> countryCodes;
    for (const auto &yearData : temperatures.begin()->second)
    {
        countryCodes.push_back(yearData.first); // Collect country codes
    }

    std::cout << "Select a country by entering the corresponding number:\n";
    for (size_t i = 0; i < countryCodes.size(); ++i)
    {
        std::cout << i + 1 << ": " << countryCodes[i] << "\n";
    }

    int choice;
    std::cin >> choice;
    if (choice < 1 || choice > static_cast<int>(countryCodes.size()))
    {
        std::cerr << "Invalid choice!\n";
        return;
    }

    std::string countryCode = countryCodes[choice - 1];

    // Calculate the 5-year moving average and display predictions
    std::cout << "Predictions for " << countryCode << ":\n";
    std::string lastYear = temperatures.rbegin()->first;
    int lastYearInt = std::stoi(lastYear);
    bool sufficientData = true;

    for (int year = lastYearInt - 5; year <= lastYearInt; ++year)
    {
        std::string yearStr = std::to_string(year);
        if (temperatures.count(yearStr) && temperatures.at(yearStr).count(countryCode))
        {
            auto &yearlyTemps = temperatures.at(yearStr).at(countryCode);
            double average = std::accumulate(yearlyTemps.begin(), yearlyTemps.end(), 0.0) / yearlyTemps.size();
            std::cout << "Year " << yearStr << ": Actual average temperature: " << average << "°C\n";
        }
        else
        {
            std::cout << "Insufficient data for year " << yearStr << ".\n";
            sufficientData = false;
        }
    }

    if (sufficientData)
    {
        double forecast = 0.0;
        for (int year = lastYearInt - 4; year <= lastYearInt; ++year)
        {
            std::string yearStr = std::to_string(year);
            auto &yearlyTemps = temperatures.at(yearStr).at(countryCode);
            forecast += std::accumulate(yearlyTemps.begin(), yearlyTemps.end(), 0.0) / yearlyTemps.size();
        }
        forecast /= 5;
        std::cout << "Based on the data up to year " << lastYear << ", the predicted average temperature for year "
                  << lastYearInt + 1 << " is " << forecast << "°C.\n";
    }
}
