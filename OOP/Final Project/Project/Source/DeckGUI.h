/*
  ==============================================================================

    DeckGUI.h
    Created: 13 Mar 2020 6:44:48pm
    Author:  matthew

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"
#include "DJAudioPlayer.h"
#include "WaveformDisplay.h"

//==============================================================================
/*
 */
class DeckGUI : public Component,
                public Button::Listener,
                public Slider::Listener,
                public FileDragAndDropTarget,
                public Timer
{
public:
  DeckGUI(DJAudioPlayer *player,
          AudioFormatManager &formatManagerToUse,
          AudioThumbnailCache &cacheToUse);
  ~DeckGUI();

  void paint(Graphics &) override;
  void resized() override;

  void buttonClicked(Button *) override;

  void sliderValueChanged(Slider *slider) override;

  bool isInterestedInFileDrag(const StringArray &files) override;
  void filesDropped(const StringArray &files, int x, int y) override;

  void timerCallback() override;

  void loadTrack(const juce::String &trackPath);

private:
  juce::FileChooser fChooser{"Select a file..."};

  TextButton playButton{"PLAY"};
  TextButton stopButton{"STOP"};
  TextButton loadButton{"LOAD"};
  TextButton setCueButton{"Set Cue"};
  TextButton jumpToCueButton{"Jump to Cue"};

  Slider volSlider;
  Slider speedSlider;
  Slider posSlider;

  WaveformDisplay waveformDisplay;

  DJAudioPlayer *player;

  JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DeckGUI)
};
