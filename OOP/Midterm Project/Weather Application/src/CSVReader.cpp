#include "CSVReader.h"
#include <fstream>
#include <sstream>
#include <iostream>
#include <stdexcept>

// Function to extract temperatures from the CSV file
std::map<std::string, std::map<std::string, std::vector<float> > > extractTemperatures(const std::string &filePath)
{
    std::ifstream file(filePath);
    if (!file.is_open())
    {
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
    while (std::getline(headerStream, token, ','))
    {
        countryCodes.push_back(token);
    }

    // Read the rest of the data
    while (std::getline(file, line))
    {
        std::istringstream ss(line);
        std::string year = line.substr(0, 4);
        std::string temperature;
        // Skip the timestamp token
        std::getline(ss, temperature, ',');

        int index = 0;
        while (std::getline(ss, temperature, ','))
        {
            if (!temperature.empty())
            {
                try
                {
                    float tempValue = std::stof(temperature);
                    temperatures[year][countryCodes[index]].push_back(tempValue);
                }
                catch (const std::exception &e)
                {
                    std::cerr << "Failed to convert temperature: " << temperature << " for country " << countryCodes[index] << std::endl;
                }
            }
            if (index < static_cast<int>(countryCodes.size() - 1))
            {
                index++;
            }
        }
    }

    file.close();
    return temperatures;
}
