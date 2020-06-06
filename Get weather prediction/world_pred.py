from datetime import datetime
import pandas as pd
import pickle as pk
import requests as req
import numpy as np
import time

# req_count = 0
countries = open('list_of_all_countries.txt', 'r')
df = pd.DataFrame(columns=['Countries', 'Wind_Speed', 'Temperature', 'Threat_Level'])
model = pk.load(open('D:/Education/Projects/COVID APP/Model/dnn_model.sav', 'rb'))

for country in countries.readlines():

    country = country.replace(' ', '')
    country = country.replace(',', '')
    country = country.replace('-', '')
    country = country.replace('\n', '')

    response = req.get('http://api.weatherapi.com/v1/current.json?key=0ba49f35560742af9f5131425200506&q='+country)
    # req_count += 1

    '''
    if req_count == 10:

        time.sleep(60)
    '''

    print('response status: ' + str(response.status_code))

    if response.status_code == 200:

        data = response.json()

        location = data['location']['country']
        temp = data['current']['temp_f']
        wind = data['current']['wind_mph']
        threat_level = None

        X_new = np.array([wind, temp])

        if X_new.ndim == 1:

            X_new = np.array([X_new])

        y_new = model.predict(X_new)
        y_new = np.array(y_new.ravel())

        i = np.where(y_new == np.amax(y_new))
        i = i[0][0]

        if i == 0:

            threat_level = 'Moderate'

        elif i == 1:

            threat_level = 'Risky'

        elif i == 2:

            threat_level = 'Safe'

        df = df.append({'Countries': location, 'Wind_Speed': wind, 'Temperature': temp,
                        'Threat_Level': threat_level}, ignore_index=True)

df.to_json('World_status'+datetime.today().strftime('%Y-%m-%d')+'.json')
df.to_csv('World_status'+datetime.today().strftime('%Y-%m-%d')+'.csv')
