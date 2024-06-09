#include "WeatherApp.h"
#include <iostream>

// Constructor implementation
WeatherApp::WeatherApp(const std::string& dataFilename) : orderBook(dataFilename) {
    // Initialization from the file
    currentTime = orderBook.getEarliestTime();
}

// Function to initialize the application
void WeatherApp::init() {
    int input;
    while (true) {
        printMenu();
        input = getUserOption();
        if (input == 0) break; // Assuming 0 is the exit option
        processUserOption(input);
    }
}

// Print the command-line menu
void WeatherApp::printMenu() const {
    std::cout << "1: Print help\n";
    std::cout << "2: Show weather statistics\n";
    std::cout << "3: Enter date range for data filtering\n";
    std::cout << "4: Display weather candlestick chart\n";
    std::cout << "0: Exit\n";
    std::cout << "Current time frame: " << currentTime << std::endl;
    std::cout << "==============\n";
}

// Display help
void WeatherApp::printHelp() const {
    std::cout << "Help - Your aim is to analyze weather data. Use the options to view and filter data.\n";
}

// Show weather statistics for a particular region or time
void WeatherApp::showWeatherStats() const {
    // Example implementation, add more functionality as needed
    std::cout << "Displaying weather statistics..." << std::endl;
}

// Set the date range for the candlestick data visualization
void WeatherApp::enterDateRange() {
    std::cout << "Enter start date (YYYY-MM-DD): ";
    std::string startDate;
    std::getline(std::cin, startDate);
    std::cout << "Enter end date (YYYY-MM-DD): ";
    std::string endDate;
    std::getline(std::cin, endDate);
    // Potentially check and store the date range
}

// Display the weather candlestick data
void WeatherApp::displayWeatherChart() const {
    std::cout << "Displaying candlestick data for the selected date range..." << std::endl;
    // Placeholder for actual data display
}

// Helper to get user's menu choice
int WeatherApp::getUserOption() const {
    std::cout << "Enter an option: ";
    std::string input;
    std::getline(std::cin, input);
    try {
        return std::stoi(input);
    } catch (std::exception& e) {
        return -1; // return an invalid option on error
    }
}

// Process user's menu option
void WeatherApp::processUserOption(int option) {
    switch(option) {
        case 1:
            printHelp();
            break;
        case 2:
            showWeatherStats();
            break;
        case 3:
            enterDateRange();
            break;
        case 4:
            displayWeatherChart();
            break;
        case 0:
            std::cout << "Exiting application.\n";
            exit(0); // Exit the application
        default:
            std::cout << "Invalid option, please try again.\n";
            break;
    }
}
