# Importing needed dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
from flask import Flask, jsonify
import datetime as dt
from datetime import date

#Setup Database
engine = create_engine("sqlite:///hawaii.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)

# Table References
Measurement = Base.classes.measurement
Station = Base.classes.station

#Create flask
app = Flask(__name__)

#Index routing
@app.route("/")
def index():
    # Listing all available routes
    return (f'Please use the following routes:<br/>'
    f'/api/v1.0/precipitation<br/>'
    f'/api/v1.0/stations<br/>'
    '/api/v1.0/tobs<br/>'
    '/api/v1.0/(start-date)<br/>'
    '/api/v1.0/(start-date)/(end-date)<br/>'
    '<br/>Please use yyyy-mm-dd for api calls')

# Route to get JSON precipitation data by date
@app.route("/api/v1.0/precipitation")
def precipitation():
    prec_session = Session(engine)
    prec_results = prec_session.query(Measurement.date, Measurement.prcp).filter()
    prec_dict = []
    for date, prec in prec_results:
        current_dict = {}
        current_dict['Date'] = date
        current_dict['Precipitation'] = prec
        prec_dict.append(current_dict)
    return jsonify(prec_dict)

#Route to get the stations and how many entries they have
@app.route("/api/v1.0/stations")
def stations():
    station_session = Session(engine)
    count_station = station_session.query(Measurement.station, func.count(Measurement.station), Station.name).\
    group_by(Measurement.station).order_by(func.count(Measurement.station).desc())\
    .filter(Measurement.station == Station.station).all()
    return jsonify(count_station)

# Route to get the last years temperature recordings for the most active station
@app.route("/api/v1.0/tobs")
def tobs():
    tobs_session = Session(engine)
    top_station = tobs_session.query(Measurement.station).group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).first()
    last_year_date = dt.date(2017,8,23) - dt.timedelta(days=365)
    last_year = tobs_session.query(Measurement.tobs, Measurement.date).filter(Measurement.station == top_station[0]).filter(Measurement.date >= last_year_date).all()
    return jsonify(last_year)

#Route to retrieve the Max, Min, and Avg of temperatures from given start date to present
@app.route("/api/v1.0/<start>")
def temp_start(start):
    start_session = Session(engine)
    start_query = start_session.query(func.max(Measurement.tobs), func.min(Measurement.tobs), func.avg(Measurement.tobs)).filter(Measurement.date >= start).all()
    return jsonify(max = start_query[0][0],min=start_query[0][1],avg=start_query[0][2])

#Route to retrieve the Max, Min, and Avg of temperatures from given start date to end date
@app.route("/api/v1.0/<start>/<end>")
def temp_range(start, end):
    range_session = Session(engine)
    range_query = range_session.query(func.max(Measurement.tobs), func.min(Measurement.tobs), func.avg(Measurement.tobs)).filter(Measurement.date >= start).filter(Measurement.date <= end).all()
    return jsonify(max = range_query[0][0],min=range_query[0][1],avg=range_query[0][2])


# Running in debug mode
if __name__ == '__main__':
    app.run(debug=True)