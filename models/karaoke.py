import pydub
from pydub import AudioSegment

def karaoke():

    sound1 = AudioSegment.from_file("static/audio/bass.wav")
    sound2 = AudioSegment.from_file("static/audio/drums.wav")
    sound3 = AudioSegment.from_file("static/audio/other.wav")   
    combined = sound1.overlay(sound2)
    final=combined.overlay(sound3)
    final.export("static/audio/karaoke.mp3", format='mp3')