from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__) 
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

import  get_prediction

@app.route("/")
def welcome():
    return(f"Welcome, you shouldn't see this")

@app.route("/predict/<chord1>/<chord2>/<chord3>")
def predict(chord1, chord2, chord3):
    predictions = get_prediction.make_predictions(chord1, chord2, chord3)
    return(predictions)

if __name__ == "__main__":
    app.run(debug=False)