/*
  ==============================================================================

    PlaylistComponent.h
    Created: 26 Aug 2024 12:47:40pm
    Author:  Sankarshan Ghosh

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include <vector>
#include <string>
#include "DeckGUI.h"

//==============================================================================

class PlaylistComponent : public juce::Component,
                          public juce::TableListBoxModel,
                          public juce::Button::Listener
{
public:
  PlaylistComponent();
  ~PlaylistComponent();

  void paint(juce::Graphics &) override;
  void resized() override;

  // TableListBoxModel methods
  int getNumRows() override; // Number of rows in the table
  void paintRowBackground(juce::Graphics &g, int rowNumber, int width, int height, bool rowIsSelected) override;
  void paintCell(juce::Graphics &g, int rowNumber, int columnId, int width, int height, bool rowIsSelected) override;
  Component *refreshComponentForCell(int rowNumber, int columnId, bool isRowSelected, Component *existingComponentToUpdate) override;

  void buttonClicked(juce::Button *button) override;

  // Load a playlist from an XML file
  void loadPlaylistFromXML(const juce::File &xmlFile);

  // Set the DeckGUI components
  void setDeckGUI1(DeckGUI *deck);
  void setDeckGUI2(DeckGUI *deck);

private:
  TableListBox tableComponent;

  std::vector<std::string> trackTitles;
  std::vector<std::string> trackPaths;

  DeckGUI *deckGUI1 = nullptr;
  DeckGUI *deckGUI2 = nullptr;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PlaylistComponent)
};
