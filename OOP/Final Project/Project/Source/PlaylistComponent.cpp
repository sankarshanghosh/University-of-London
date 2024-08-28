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
  tableComponent.getHeader().addColumn("Track Title", 1, 400);
  tableComponent.getHeader().addColumn("Add to Player 1", 2, 200);
  tableComponent.getHeader().addColumn("Add to Player 2", 3, 200);
  tableComponent.setModel(this);
  addAndMakeVisible(tableComponent);

  // Determine the OS and set the correct path
  File exeDir;

  #if JUCE_WINDOWS
    exeDir = File::getSpecialLocation(File::currentExecutableFile)
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory();
  #elif JUCE_MAC
    exeDir = File::getSpecialLocation(File::currentApplicationFile)
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory()
                .getParentDirectory();
  #endif

  DBG("Executable directory: " + exeDir.getFullPathName());

  File playlistFile = exeDir.getChildFile("playlist.xml");

  if (playlistFile.exists())
  {
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
  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
  g.setColour(juce::Colours::grey);
  g.drawRect(getLocalBounds(), 1);
  g.setColour(juce::Colours::white);
  g.setFont(14.0f);
  g.drawText("PlaylistComponent", getLocalBounds(), juce::Justification::centred, true);
}

void PlaylistComponent::resized()
{
  tableComponent.setBounds(getLocalBounds());
}

int PlaylistComponent::getNumRows()
{
  return trackTitles.size();
}

void PlaylistComponent::paintRowBackground(juce::Graphics &g, int rowNumber, int width, int height, bool rowIsSelected)
{
  g.fillAll(rowIsSelected ? juce::Colours::lightblue : juce::Colours::darkgrey);
}

void PlaylistComponent::paintCell(juce::Graphics &g, int rowNumber, int columnId, int width, int height, bool rowIsSelected)
{
  if (columnId == 1)
  {
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
      String path = trackElement->getStringAttribute("path");
      File trackFile = xmlFile.getSiblingFile(path);
      if (trackFile.exists())
      {
        trackTitles.push_back(trackFile.getFileNameWithoutExtension().toStdString());
        trackPaths.push_back(trackFile.getFullPathName().toStdString());
      }
      else
      {
        DBG("Track file does not exist: " + trackFile.getFullPathName());
      }
    }
  }

  tableComponent.updateContent();
}

void PlaylistComponent::setDeckGUI1(DeckGUI *deck)
{
  deckGUI1 = deck;
}
void PlaylistComponent::setDeckGUI2(DeckGUI *deck)
{
  deckGUI2 = deck;
}

void PlaylistComponent::buttonClicked(juce::Button *button)
{
  String id = button->getComponentID();
  int row = std::stoi(id.substring(0, id.length() - 2).toStdString());
  bool isPlayerOne = id.endsWith("P1");

  if (isPlayerOne && deckGUI1)
  {
    deckGUI1->loadTrack(trackPaths[row]);
  }
  else if (!isPlayerOne && deckGUI2)
  {
    deckGUI2->loadTrack(trackPaths[row]);
  }
}
