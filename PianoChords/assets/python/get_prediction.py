from keras.models import model_from_json
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
import numpy as np
from flask import Flask, jsonify

def make_predictions(chord1, chord2, chord3):
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model.h5")

    encoder = LabelEncoder()
    encoder.classes_ = np.load('classes.npy')

    predictions = loaded_model.predict(tf.expand_dims(encoder.transform([chord1,chord2,chord3]), axis=0))
    guesses = predictions[0].argsort()[::-1][0:6]
    prediction_score = sorted(predictions[0],reverse=True)[0:6]
    prediction = encoder.inverse_transform(guesses)

    data = []
    for i in range(0,len(prediction)):
        perc = "{:.2%}".format(prediction_score[i])
        dict1 = [{prediction[i]: perc}]
        data.append(dict1)
    print(data)
    return jsonify(data)
    