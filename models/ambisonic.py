# -*- coding: utf-8 -*-
"""
Created on Thu Mar 19 23:27:52 2020

@author: Saiyam_Jain
"""

from glob import glob
from pydub import AudioSegment
from pydub.generators import WhiteNoise
from math import *
from random import *
import sys
import os



def calc_pan(index):
	return cos(radians(index))

def to_ambisonic():
    song = AudioSegment.from_file('static/audio/audio.mp3')
    interval = 0.2 * 1000 # sec
    song_inverted = song.invert_phase()
    song.overlay(song_inverted)
    
    splitted_song = splitted_song_inverted = []
    song_start_point = 0
    
    print ("split song in part")
    while song_start_point+interval < len(song):
        splitted_song.append(song[song_start_point:song_start_point+interval])
        song_start_point += interval
    
    if song_start_point < len(song):
        splitted_song.append(song[song_start_point:])
    
    print ("end splitting")
    print ("total pieces: " + str(len(splitted_song)))
    
    ambisonics_song = splitted_song.pop(0)
    pan_index = 0
    for piece in splitted_song:
        pan_index += 5
        piece = piece.pan(calc_pan(pan_index))
        ambisonics_song = ambisonics_song.append(piece, crossfade=interval/50)
    
    #print("done")
    # lets save it!
    if os.path.exists('static/audio/ambisonic.mp3'):
        os.remove('static/audio/ambisonic.mp3')
        print("removed")
    out_f = open("static/audio/ambisonic.mp3", 'wb')
    ambisonics_song.export(out_f, format='mp3')