#include "WeatherApp.h"
#include "CandleStick.h"
#include "CSVReader.h"
#include <iostream>
#include <vector>
#include "printCandleStickVector.h"
#include "plotCandleStick.h"

void WeatherApp::run() {
    std::string filePath = "simpleData.csv";
    auto temperatures = extractTemperatures(filePath);

    std::cout << "What would you like to do?\n";
    std::cout << "1. Show Candlestick vector for a country\n";
    std::cout << "2. Plot Candlestick representation of temperatures of a country\n";
    std::cout << "3. Plot within a desired time frame (Not yet implemented)\n";
    
    int choice;
    std::cin >> choice;

    switch (choice) {
        case 1:
            printCandlestickVector(temperatures);
            break;
        case 2:
            plotCandlestickData(temperatures);
            break;
        case 3:
            std::cout << "Functionality not yet implemented.\n";
            break;
        default:
            std::cerr << "Invalid option selected.\n";
    }
}
