/*
  ==============================================================================

    DJAudioPlayer.h
    Created: 13 Mar 2020 4:22:22pm
    Author:  matthew

  ==============================================================================
*/

#pragma once

#include "../JuceLibraryCode/JuceHeader.h"

class DJAudioPlayer : public AudioSource
{
public:
  DJAudioPlayer(AudioFormatManager &_formatManager);
  ~DJAudioPlayer();

  // implement AudioSource
  void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
  void getNextAudioBlock(const AudioSourceChannelInfo &bufferToFill) override;
  void releaseResources() override;

  // Load a URL
  void loadURL(URL audioURL);
  
  // Set the gain of the player
  void setGain(double gain);
  
  // Set the speed of the player
  void setSpeed(double ratio);
  
  // Set the position of the playhead
  void setPosition(double posInSecs);
  
  // Set the position of the playhead relative to the length of the track
  void setPositionRelative(double pos);

  void start();
  void stop();

  /** get the relative position of the playhead */
  double getPositionRelative();
  double cuePointRelative = 0.0;

  void setCuePoint();    // Set the cue point to the current position
  void jumpToCuePoint(); // Jump to the saved cue point

private:
  AudioFormatManager &formatManager;
  std::unique_ptr<AudioFormatReaderSource> readerSource;
  AudioTransportSource transportSource;
  ResamplingAudioSource resampleSource{&transportSource, false, 2};
};
