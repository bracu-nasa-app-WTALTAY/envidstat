import requests as req
import pandas as pd

dates = pd.read_csv('NYC_USW00014771.csv')
dates = dates['DATE']

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
    df = pd.DataFrame.from_dict(data, orient='index').T
    df_wash = df_wash.append(df)

print(df_wash)
df_wash.to_csv('Washington_Covid-19.csv')
