#include <iostream>
#include <string>
#include "WeatherApp.h"

int main() {
    WeatherApp app; // The application class handling the logic
    app.loadData("path/to/weather/data.csv"); // Load the weather data

    bool running = true;
    while (running) {
        std::cout << "====================================\n";
        std::cout << "Weather Data Visualization and Prediction\n";
        std::cout << "1. Display Candlestick Data\n";
        std::cout << "2. Filter Data and Display Text Plot\n";
        std::cout << "3. Exit\n";
        std::cout << "Enter your choice: ";
        
        int choice;
        std::cin >> choice;
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Clear input buffer

        switch (choice) {
            case 1:
                app.displayCandlestickData();
                break;
            case 2:
                app.filterDataAndDisplayTextPlot();
                break;
            case 3:
                running = false;
                std::cout << "Exiting the application...\n";
                break;
            default:
                std::cout << "Invalid choice, please try again.\n";
        }
    }

    return 0;
}
