/*
  ==============================================================================

    DeckGUI.cpp
    Created: 13 Mar 2020 6:44:48pm
    Author:  matthew

  ==============================================================================
*/

#include "../JuceLibraryCode/JuceHeader.h"
#include "DeckGUI.h"

//==============================================================================
DeckGUI::DeckGUI(DJAudioPlayer *_player,
                 AudioFormatManager &formatManagerToUse,
                 AudioThumbnailCache &cacheToUse) : player(_player),
                                                    waveformDisplay(formatManagerToUse, cacheToUse)
{

    addAndMakeVisible(playButton);
    addAndMakeVisible(stopButton);
    addAndMakeVisible(loadButton);

    addAndMakeVisible(volSlider);
    addAndMakeVisible(speedSlider);
    addAndMakeVisible(posSlider);

    addAndMakeVisible(waveformDisplay);

    // Styling Buttons
    playButton.setColour(TextButton::buttonColourId, Colours::green);
    stopButton.setColour(TextButton::buttonColourId, Colours::red);
    loadButton.setColour(TextButton::buttonColourId, Colours::blue);

    // Styling Sliders
    volSlider.setColour(Slider::thumbColourId, Colours::purple);
    speedSlider.setColour(Slider::thumbColourId, Colours::orange);
    posSlider.setColour(Slider::thumbColourId, Colours::yellow);

    playButton.addListener(this);
    stopButton.addListener(this);
    loadButton.addListener(this);

    volSlider.addListener(this);
    speedSlider.addListener(this);
    posSlider.addListener(this);

    volSlider.setRange(0.0, 1.0);
    speedSlider.setRange(0.0, 100.0);
    posSlider.setRange(0.0, 1.0);

    startTimer(500);
}

DeckGUI::~DeckGUI()
{
    stopTimer();
}

void DeckGUI::paint(Graphics &g)
{
    // Stylish background with a gradient
    ColourGradient gradient(Colour::fromRGB(50, 50, 60), 0, 0, Colour::fromRGB(25, 25, 30), getWidth(), getHeight(), false);
    g.setGradientFill(gradient);
    g.fillAll();

    g.setColour(Colours::whitesmoke);
    g.setFont(14.0f);
    g.drawText("DeckGUI", getLocalBounds(), Justification::centred, true);
}
void DeckGUI::resized()
{
    auto area = getLocalBounds();
    auto rowH = area.getHeight() / 8;
    playButton.setBounds(area.removeFromTop(rowH));
    stopButton.setBounds(area.removeFromTop(rowH));
    volSlider.setBounds(area.removeFromTop(rowH));
    speedSlider.setBounds(area.removeFromTop(rowH));
    posSlider.setBounds(area.removeFromTop(rowH));
    waveformDisplay.setBounds(area.removeFromTop(rowH * 2));
    loadButton.setBounds(area.removeFromTop(rowH));
}

void DeckGUI::buttonClicked(Button *button)
{
    if (button == &playButton)
    {
        std::cout << "Play button was clicked " << std::endl;
        player->start();
    }
    if (button == &stopButton)
    {
        std::cout << "Stop button was clicked " << std::endl;
        player->stop();
    }
    if (button == &loadButton)
    {
        auto fileChooserFlags =
            FileBrowserComponent::canSelectFiles;
        fChooser.launchAsync(fileChooserFlags, [this](const FileChooser &chooser)
                             {
            File chosenFile = chooser.getResult();
            if (chosenFile.exists()){
                player->loadURL(URL{chooser.getResult()});
                waveformDisplay.loadURL(URL{chooser.getResult()});
            } });
    }
}

void DeckGUI::sliderValueChanged(Slider *slider)
{
    if (slider == &volSlider)
    {
        player->setGain(slider->getValue());
    }

    if (slider == &speedSlider)
    {
        player->setSpeed(slider->getValue());
    }

    if (slider == &posSlider)
    {
        player->setPositionRelative(slider->getValue());
    }
}

bool DeckGUI::isInterestedInFileDrag(const StringArray &files)
{
    std::cout << "DeckGUI::isInterestedInFileDrag" << std::endl;
    return true;
}

void DeckGUI::filesDropped(const StringArray &files, int x, int y)
{
    std::cout << "DeckGUI::filesDropped" << std::endl;
    if (files.size() == 1)
    {
        player->loadURL(URL{File{files[0]}});
    }
}

void DeckGUI::timerCallback()
{
    // std::cout << "DeckGUI::timerCallback" << std::endl;
    waveformDisplay.setPositionRelative(
        player->getPositionRelative());
}

void DeckGUI::loadTrack(const juce::String &trackPath)
{
    player->loadURL(URL{File{trackPath}});
    waveformDisplay.loadURL(URL{File{trackPath}});
}
