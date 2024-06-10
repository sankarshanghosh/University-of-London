#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <vector>
#include <string>
#include <iomanip>
#include <stdexcept>
#include <limits>
#include <numeric>

class Candlestick {
public:
    std::string date;
    float open;
    float high;
    float low;
    float close;

    Candlestick(const std::string& d, float o, float h, float l, float c)
        : date(d), open(o), high(h), low(l), close(c) {}
};

std::map<std::string, std::map<std::string, std::vector<float> > > extractTemperatures(const std::string& filePath) {
    std::ifstream file(filePath);
    if (!file.is_open()) {
        throw std::runtime_error("Failed to open file: " + filePath);
    }

    std::string line;
    std::map<std::string, std::map<std::string, std::vector<float> > > temperatures;

    // Read the header to get country codes
    std::getline(file, line);
    std::istringstream headerStream(line);
    std::vector<std::string> countryCodes;
    std::string token;
    // Skip the timestamp column
    std::getline(headerStream, token, ',');
    while (std::getline(headerStream, token, ',')) {
        countryCodes.push_back(token);
    }

    // Read the rest of the data
    while (std::getline(file, line)) {
        std::istringstream ss(line);
        std::string year = line.substr(0, 4); // Assume date format is "YYYY-MM-DDTHH:MM:SSZ"
        std::string temperature;
        // Skip the timestamp token
        std::getline(ss, temperature, ',');

        int index = 0;
        while (std::getline(ss, temperature, ',')) {
            if (!temperature.empty()) {
                try {
                    float tempValue = std::stof(temperature);
                    temperatures[year][countryCodes[index]].push_back(tempValue);
                } catch (const std::exception& e) {
                    std::cerr << "Failed to convert temperature: " << temperature << " for country " << countryCodes[index] << std::endl;
                }
            }
            if (index < static_cast<int>(countryCodes.size() - 1)) {
                index++;
            }
        }
    }

    file.close();
    return temperatures;
}

float computeAverage(const std::vector<float>& temperatures) {
    return std::accumulate(temperatures.begin(), temperatures.end(), 0.0f) / temperatures.size();
}

Candlestick computeYearlyCandlestick(const std::vector<float>& temperatures, const std::vector<float>& previousYearTemperatures, const std::string& year) {
    float open;
    if (!previousYearTemperatures.empty()) {
        open = computeAverage(previousYearTemperatures);
    } else {
        open = temperatures.front(); // For the first year, use the first temperature
    }
    float close = computeAverage(temperatures);
    float high = *std::max_element(temperatures.begin(), temperatures.end());
    float low = *std::min_element(temperatures.begin(), temperatures.end());
    return Candlestick(year, open, high, low, close);
}

void outputCandlesticksToFile(const std::map<std::string, std::map<std::string, std::vector<float> > >& temperatures, const std::string& outputPath) {
    std::ofstream outFile(outputPath);
    if (!outFile.is_open()) {
        throw std::runtime_error("Failed to open file: " + outputPath);
    }

    std::map<std::string, std::map<std::string, std::vector<float> > >::const_iterator previousYearIter = temperatures.end();
    for (std::map<std::string, std::map<std::string, std::vector<float> > >::const_iterator yearIter = temperatures.begin(); yearIter != temperatures.end(); ++yearIter) {
        outFile << "Year: " << yearIter->first << std::endl;
        for (std::map<std::string, std::vector<float> >::const_iterator countryIter = yearIter->second.begin(); countryIter != yearIter->second.end(); ++countryIter) {
            std::vector<float> previousYearTemperatures;
            if (previousYearIter != temperatures.end()) {
                previousYearTemperatures = previousYearIter->second.at(countryIter->first);
            }
            Candlestick cs = computeYearlyCandlestick(countryIter->second, previousYearTemperatures, yearIter->first);
            outFile << "  Country: " << countryIter->first << std::endl;
            outFile << "    Open: " << cs.open << ", High: " << cs.high << ", Low: " << cs.low << ", Close: " << cs.close << std::endl;
        }
        previousYearIter = yearIter;
        outFile << std::endl;
    }

    outFile.close();
}

int main() {
    std::string filePath = "simpleData.csv";
    std::string outputPath = "candlesticks_output.txt";
    try {
        std::map<std::string, std::map<std::string, std::vector<float> > > temperatures = extractTemperatures(filePath);
        outputCandlesticksToFile(temperatures, outputPath);
        std::cout << "Candlestick data has been successfully written to " << outputPath << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
}
