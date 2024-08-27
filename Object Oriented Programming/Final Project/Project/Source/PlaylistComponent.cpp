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
  // In your constructor, you should add any child components, and
  // initialise any special settings that your component needs.

  tableComponent.getHeader().addColumn("Track Title", 1, 400);
  tableComponent.getHeader().addColumn("Add to Player 1", 2, 200);
  tableComponent.getHeader().addColumn("Add to Player 2", 3, 200);
  tableComponent.setModel(this);

  addAndMakeVisible(tableComponent);

  juce::File playlistFile("/Users/sankarshanghosh/Documents/GitHub/University-of-London/Object Oriented Programming/Final Project/Project/playlist.xml");
  loadPlaylistFromXML(playlistFile);
}

PlaylistComponent::~PlaylistComponent()
{
}

void PlaylistComponent::paint(juce::Graphics &g)
{
  /* This demo code just fills the component's background and
     draws some placeholder text to get you started.

     You should replace everything in this method with your own
     drawing code..
  */

  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId)); // clear the background

  g.setColour(juce::Colours::grey);
  g.drawRect(getLocalBounds(), 1); // draw an outline around the component

  g.setColour(juce::Colours::white);
  g.setFont(juce::FontOptions(14.0f));
  g.drawText("PlaylistComponent", getLocalBounds(),
             juce::Justification::centred, true); // draw some placeholder text
}

void PlaylistComponent::resized()
{
  // This method is where you should set the bounds of any child
  // components that your component contains..
  tableComponent.setBounds(0, 0, getWidth(), getHeight());
}

int PlaylistComponent::getNumRows()
{
  return trackTitles.size();
}
void PlaylistComponent::paintRowBackground(juce::Graphics &g, int rowNumber, int width, int height, bool rowIsSelected)
{
  if (rowIsSelected)
  {
    g.fillAll(juce::Colours::lightblue);
  }
  else
  {
    g.fillAll(juce::Colours::darkgrey);
  }
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
  { // Assuming 2 and 3 are your button columns
    TextButton *btn = static_cast<TextButton *>(existingComponentToUpdate);
    if (btn == nullptr)
    {
      btn = new TextButton(columnId == 2 ? "Add to Player 1" : "Add to Player 2");
      btn->addListener(this);
      existingComponentToUpdate = btn;
    }
    btn->setComponentID(std::to_string(rowNumber) + (columnId == 2 ? "P1" : "P2")); // P1 or P2 to distinguish the buttons
  }
  return existingComponentToUpdate;
}

void PlaylistComponent::loadPlaylistFromXML(const juce::File &xmlFile)
{
  juce::XmlDocument xmlDoc(xmlFile);
  std::unique_ptr<juce::XmlElement> mainElement = xmlDoc.getDocumentElement();

  if (mainElement == nullptr || !mainElement->hasTagName("PLAYLIST"))
  {
    DBG("Error loading XML");
    return;
  }

  forEachXmlChildElement(*mainElement, trackElement)
  {
    if (trackElement->hasTagName("TRACK"))
    {
      juce::String path = trackElement->getStringAttribute("path");
      juce::File file(path);
      trackTitles.push_back(file.getFileNameWithoutExtension().toStdString());
      trackPaths.push_back(path.toStdString());
    }
  }

  tableComponent.updateContent();
}

void PlaylistComponent::buttonClicked(juce::Button *button)
{
  int id = std::stoi(button->getComponentID().toStdString());
  std::cout << "Selected: " << trackTitles[id] << " (" << trackPaths[id] << ")" << std::endl;
  // Logic to load the selected track into one of the decks goes here
}