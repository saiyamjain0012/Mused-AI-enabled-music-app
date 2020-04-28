# -*- coding: utf-8 -*-
"""
Created on Wed Apr  8 17:04:24 2020

@author: Saiyam_Jain
"""
import os
from spleeter.separator import Separator
from spleeter.audio.adapter import get_default_audio_adapter

    # Using embedded configuration.
def split_it():
    separator = Separator('spleeter:4stems')
        
        # Using custom configuration file.
        #separator = Separator('/path/to/config.json')
    audio_loader = get_default_audio_adapter()
    sample_rate = 44100
    waveform, _ = audio_loader.load('static/audio/audio.mp3', sample_rate=sample_rate)
        
        # Perform the separation :
    
    separator.separate_to_file('static/audio/audio.mp3', 'static/')
    print('done',os.getcwd())
