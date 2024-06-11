#pragma once

#include <map>
#include <string>
#include <vector>

// Declares a function to extract temperatures from a CSV file
std::map<std::string, std::map<std::string, std::vector<float>>> extractTemperatures(const std::string &filePath);
