#pragma once

#include "WeatherApp.h"
#include "CandleStick.h"
#include "CSVReader.h"
#include <iostream>
#include <vector>
#include <map>

void printCandlestickVector(const std::map<std::string, std::map<std::string, std::vector<float> > > &temperatures);