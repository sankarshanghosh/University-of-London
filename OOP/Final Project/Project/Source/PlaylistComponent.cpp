/*
  ==============================================================================

    PlaylistComponent.cpp
    Created: 26 Aug 2024 12:47:40pm
    Author:  Sankarshan Ghosh

  ==============================================================================
*/

#include "PlaylistComponent.h"

//==============================================================================
PlaylistComponent::PlaylistComponent()
{
  // Add columns to the table component
  tableComponent.getHeader().addColumn("Track Title", 1, 400);
  tableComponent.getHeader().addColumn("Add to Player 1", 2, 200);
  tableComponent.getHeader().addColumn("Add to Player 2", 3, 200);
  tableComponent.setModel(this);
  addAndMakeVisible(tableComponent);

  // Determine the OS and set the correct path to the Project Directory
  File projectDir;

  #if JUCE_WINDOWS
    projectDir = File::getSpecialLocation(File::currentExecutableFile)
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory();
  #elif JUCE_MAC
    projectDir = File::getSpecialLocation(File::currentApplicationFile)
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory();
  #endif

  // Get the playlist file path
  File playlistFile = projectDir.getChildFile("playlist.xml");

  if (playlistFile.exists())
  {
    // Load the playlist from XML file
    loadPlaylistFromXML(playlistFile);
  }
  else
  {
    DBG("Playlist file does not exist: " + playlistFile.getFullPathName());
  }
}

PlaylistComponent::~PlaylistComponent()
{
}

void PlaylistComponent::paint(juce::Graphics &g)
{
  // Set the background color
  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
  g.setColour(juce::Colours::grey);
  g.drawRect(getLocalBounds(), 1);
  g.setColour(juce::Colours::white);
  g.setFont(14.0f);
  g.drawText("PlaylistComponent", getLocalBounds(), juce::Justification::centred, true);
}

void PlaylistComponent::resized()
{
  // Set the bounds of the table component
  tableComponent.setBounds(getLocalBounds());
}

int PlaylistComponent::getNumRows()
{
  // Return the number of rows in the table
  return trackTitles.size();
}

void PlaylistComponent::paintRowBackground(juce::Graphics &g, int rowNumber, int width, int height, bool rowIsSelected)
{
  // Set the background color of each row
  g.fillAll(rowIsSelected ? juce::Colours::lightblue : juce::Colours::darkgrey);
}

void PlaylistComponent::paintCell(juce::Graphics &g, int rowNumber, int columnId, int width, int height, bool rowIsSelected)
{
  if (columnId == 1)
  {
    // Draw the track title in the cell
    g.drawText(trackTitles[rowNumber], 2, 0, width - 4, height, juce::Justification::centredLeft, true);
  }
}

Component *PlaylistComponent::refreshComponentForCell(int rowNumber, int columnId, bool isRowSelected, Component *existingComponentToUpdate)
{
  if (columnId == 2 || columnId == 3)
  {
    TextButton *btn = static_cast<TextButton *>(existingComponentToUpdate);
    if (btn == nullptr)
    {
      // Create a new button if it doesn't exist
      btn = new TextButton(columnId == 2 ? "Add to Player 1" : "Add to Player 2");
      btn->addListener(this);
      existingComponentToUpdate = btn;
    }
    btn->setComponentID(std::to_string(rowNumber) + (columnId == 2 ? "P1" : "P2"));
  }
  return existingComponentToUpdate;
}

void PlaylistComponent::loadPlaylistFromXML(const juce::File &xmlFile)
{
  XmlDocument xmlDoc(xmlFile);
  std::unique_ptr<XmlElement> mainElement = xmlDoc.getDocumentElement();

  if (mainElement == nullptr || !mainElement->hasTagName("PLAYLIST"))
  {
    DBG("Error loading XML");
    return;
  }

  forEachXmlChildElement(*mainElement, trackElement)
  {
    if (trackElement->hasTagName("TRACK"))
    {
      // Get the path attribute of each track element
      String path = trackElement->getStringAttribute("path");
      File trackFile = xmlFile.getSiblingFile(path);
      if (trackFile.exists())
      {
        // Add the track title and path to the vectors
        trackTitles.push_back(trackFile.getFileNameWithoutExtension().toStdString());
        trackPaths.push_back(trackFile.getFullPathName().toStdString());
      }
      else
      {
        DBG("Track file does not exist: " + trackFile.getFullPathName());
      }
    }
  }

  // Update the content of the table component
  tableComponent.updateContent();
}

void PlaylistComponent::setDeckGUI1(DeckGUI *deck)
{
  // Set the DeckGUI object for Player 1
  deckGUI1 = deck;
}

void PlaylistComponent::setDeckGUI2(DeckGUI *deck)
{
  // Set the DeckGUI object for Player 2
  deckGUI2 = deck;
}

void PlaylistComponent::buttonClicked(juce::Button *button)
{
  String id = button->getComponentID();
  int row = std::stoi(id.substring(0, id.length() - 2).toStdString());
  bool isPlayerOne = id.endsWith("P1");

  if (isPlayerOne && deckGUI1)
  {
    // Load the track to Player 1
    deckGUI1->loadTrack(trackPaths[row]);
  }
  else if (!isPlayerOne && deckGUI2)
  {
    // Load the track to Player 2
    deckGUI2->loadTrack(trackPaths[row]);
  }
}
