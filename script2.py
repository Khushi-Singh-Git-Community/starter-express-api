from keras.models import load_model
import librosa
import librosa.display
import glob as gb
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.models import load_model
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

import os
os.environ['TF_CPP_MIN_LOG_LEVEL']='2'

# base_path = 'D:/AI_ML_Cl3/'
base_path = './'
def audio_features(filename): 
    sound, sample_rate = librosa.load(filename, sr=None, offset=2, duration=6)
    if sample_rate != 4000:
        sound = librosa.resample(sound,sample_rate, 4000)
        sample_rate = 4000
    stft = np.abs(librosa.stft(sound))  
 
    mfccs = np.mean(librosa.feature.mfcc(y=sound, sr=sample_rate, n_mfcc=40),axis=1)
    chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate),axis=1)
    mel = np.mean(librosa.feature.melspectrogram(sound, sr=sample_rate),axis=1)

    contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate, fmin=30),axis=1)
    tonnetz = np.mean(librosa.feature.tonnetz(y=librosa.effects.harmonic(sound), sr=sample_rate, chroma=librosa.feature.chroma_stft(S=stft, sr=sample_rate)),axis=1)

    concat = np.concatenate((mfccs,chroma,mel,contrast,tonnetz))
    concat = np.reshape(concat, (1,concat.shape[0], 1))
    
    return concat

labels = {0: 'Healthy', 1: 'Pneumonia', 2: 'RDS'}
model = load_model(base_path+'CDAC_PneumoniaF.h5')

sound_dir_loc=np.array(gb.glob('upload/*.wav'))
# print('\nTotal audio(wav) files :',len(sound_dir_loc))
#print(sound_dir_loc[0])
X = []
#file_names = []
for file in sound_dir_loc:
    input_data = np.array(audio_features(file))
    X.append(input_data)
    #sfile_name = file.split('\\')[1]
    #i = int(sfile_name.split('_')[0])
    #file_names.append(sfile_name)
    #print('Preprocessing done for',sfile_name)
X = np.array(X)
X = np.reshape(X, (X.shape[0], X.shape[2],  1))
preds = model.predict(X)
y = np.argmax(preds, axis=1)
Predicted = [labels[k] for k in y]
#print(Predicted)
a = Predicted.count(labels[0])
b = Predicted.count(labels[1])
c = Predicted.count(labels[2])
#print('Healthy',a)
#print('Pneumonia',b)
#print('RDS',c)
'''Modified logic: a, b, c are prediction count: If (b+c> a) then compare b,c: 
If b=c then its sus pneomonia, b>c conformed pneumonia; b< c : its RDC; if (b+c< a) its healthy'''
if (b+c)>=a:
    if b==c:
    #Prediction.configure(foreground='#FF8C00')
    #labelvar.set("Suspected Pneumonia")
        print("Suspected Pneumonia")
    elif b>c:
    #Prediction.configure(foreground='red')
    #labelvar.set("Confirmed Pneumonia")
        print("Confirmed Pneumonia")
    elif b<c:
        #Prediction.configure(foreground='#EE82EE')
        #labelvar.set("RDS")
        print("RDS")
else:
        #Prediction.configure(foreground='green')
        #labelvar.set("Healthy")
    print("Healthy")