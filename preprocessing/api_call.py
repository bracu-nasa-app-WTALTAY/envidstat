import requests as req
import pandas as pd
import numpy as np

dates = pd.read_csv('WSH_USW00024141.csv')
dates = dates['date']

for i in range(len(dates)):
    dates[i] = dates[i].replace('-', '')

print(dates)

res = req.get('https://covidtracking.com/api/v1/states/WA/20200301.json')
df_wash = res.json()
df_wash = pd.DataFrame.from_dict(df_wash, orient='index').T
print(df_wash)
df_wash.drop(df_wash.index, inplace=True)
print(df_wash)

for i in dates:

    response = req.get('https://covidtracking.com/api/v1/states/WA/'+i+'.json')

    data = response.json()
    print(response.status_code)
    # print(response.content)
    # print(type(data))
    # print(data)
    df = pd.DataFrame.from_dict(data, orient='index').T
    df_wash = df_wash.append(df)
    # print(df)
    # test = df[df['state'] == 'NY']
    # print(test)

print(df_wash)
df_wash.to_csv('Washington_Covid-19.csv')
