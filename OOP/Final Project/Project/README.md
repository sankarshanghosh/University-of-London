# Project Submission README

## Overview
This project utilizes CMake for building as encouraged in the Weekly Video Lectures and does not rely on Projucer. The provided CMakeLists.txt file is essential for building the project.

## Directory Structure
- **Source/**: Contains all the source code.
- **tracks/**: Contains audio files used in the project.
- **playlist.xml**: Contains paths to the audio files.

## Requirements
- The project assumes the presence of the JUCE library in a subdirectory named 'JUCE' relative to the project's root directory.

## Building the Project
- Ensure CMake is installed and configured.
- Build the project by navigating to the project directory and running CMake commands.

## Notes
- The XML file and the tracks directory are included to ease the evaluation process, ensuring that all paths are resolved correctly without further configuration.
- PlaylistComponent uses chained getParentDirectory() functions to identify the project directory relative to the executable file / application.

Thank you for reviewing my project!