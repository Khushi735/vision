# Import the required modules
from gtts import gTTS
import pygame
import time

# The text that you want to convert to audio
mytext = 'Team Troubleshoot welcomes you!'

# Language in which you want to convert
language = 'en'

# Passing the text and language to the engine, 
# here we have marked slow=False. Which tells 
# the module that the converted audio should 
# have a high speed
myobj = gTTS(text=mytext, lang=language, slow=False)

# Saving the converted audio in a mp3 file named welcome
myobj.save("welcome.mp3")

# Initialize the mixer module
pygame.mixer.init()

# Load the mp3 file
pygame.mixer.music.load("welcome.mp3")

# Play the loaded mp3 file
pygame.mixer.music.play()

# Wait for the audio to finish playing
while pygame.mixer.music.get_busy():
    time.sleep(1)  # Wait for 1 second intervals while audio is playing
