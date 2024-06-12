#include "WeatherApp.h"
#include "CandleStick.h"
#include "CSVReader.h"
#include <iostream>
#include <vector>
#include "printCandleStickVector.h"
#include "plotCandleStick.h"

void WeatherApp::run()
{
    std::string filePath = "simpleData.csv";
    auto temperatures = extractTemperatures(filePath);

    std::string defaultStartYear, defaultEndYear;
    if (!temperatures.empty())
    {
        defaultStartYear = temperatures.begin()->first; // Get the first year (smallest)
        defaultEndYear = temperatures.rbegin()->first;  // Get the last year (largest)
    }

    int choice = 0;     // Initialize choice
    while (choice != 4) // Continue until 4 is pressed
    {
        std::cout << "What would you like to do?\n";
        std::cout << "1. Show Candlestick vector for a country\n";
        std::cout << "2. Plot Candlestick representation of temperatures of a country\n";
        std::cout << "3. Plot within a desired time frame\n";
        std::cout << "4. Exit\n"; // Option to exit

        std::cin >> choice;

        switch (choice)
        {
        case 1:
            printCandlestickVector(temperatures);
            break;
        case 2:
            plotCandlestickData(temperatures, defaultStartYear, defaultEndYear);
            break;
        case 3:
        {
            std::string startYear, endYear;
            std::cout << "Enter start year: ";
            std::cin >> startYear;
            std::cout << "Enter end year: ";
            std::cin >> endYear;
            plotCandlestickData(temperatures, startYear, endYear);
        }
        break;
        case 4:
            std::cout << "Exiting...\n";
            break;
        default:
            std::cerr << "Invalid option selected.\n";
        }
    }
}
