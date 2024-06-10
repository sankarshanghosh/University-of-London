#include <iostream>
#include <fstream>
#include <sstream>
#include <map>
#include <vector>
#include <string>
#include <iomanip>
#include <stdexcept>

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

void outputTemperaturesToFile(const std::map<std::string, std::map<std::string, std::vector<float> > >& temperatures, const std::string& outputPath) {
    std::ofstream outFile(outputPath);
    if (!outFile.is_open()) {
        throw std::runtime_error("Failed to open file: " + outputPath);
    }

    for (std::map<std::string, std::map<std::string, std::vector<float> > >::const_iterator yearIter = temperatures.begin(); yearIter != temperatures.end(); ++yearIter) {
        outFile << "Year: " << yearIter->first << std::endl;
        for (std::map<std::string, std::vector<float> >::const_iterator countryIter = yearIter->second.begin(); countryIter != yearIter->second.end(); ++countryIter) {
            outFile << "  Country: " << countryIter->first << std::endl;
            outFile << "    Temperatures: ";
            for (std::vector<float>::const_iterator tempIter = countryIter->second.begin(); tempIter != countryIter->second.end(); ++tempIter) {
                outFile << *tempIter << " ";
            }
            outFile << std::endl;
        }
        outFile << std::endl;
    }

    outFile.close();
}

int main() {
    std::string filePath = "weather_data_EU_1980-2019_temp_only.csv";
    std::string outputPath = "temperatures_output.txt";
    try {
        std::map<std::string, std::map<std::string, std::vector<float> > > temperatures = extractTemperatures(filePath);
        outputTemperaturesToFile(temperatures, outputPath);
        std::cout << "Temperature data has been successfully written to " << outputPath << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
}
