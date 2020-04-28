from pytube import YouTube
import pytube
import os

def yt2audio(video_url):
    title=YouTube(video_url).title
    if os.name == 'nt':
        path = os.getcwd()+'\\'
    else:
        path = os.getcwd()+'/'

    name = pytube.extract.video_id(video_url)
    
    if os.path.exists('static/audio/audio.mp3'):
        os.remove('static/audio/audio.mp3')
    YouTube(video_url).streams.filter(only_audio=True).first().download(filename=name)
    location = path + name + '.mp4'
    renametomp3 = 'static/audio/audio.mp3'
    #renametomp3 = path + name + '.mp3'
    if os.name == 'nt':
        #os.system('ren {0} {1}'. format(location, renametomp3))
        os.rename(location,renametomp3) 
    else:
        os.rename(location,renametomp3)
        #os.system('mv {0} {1}'. format(location, renametomp3))
    return(title)
