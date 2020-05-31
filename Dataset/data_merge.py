import pandas as pd

df = pd.read_csv('WSH_FINAL.csv')
df_1 = pd.read_csv('NYC_FINAL.csv')

df = df.drop(['PRCP', 'SNOW', 'SNWD', 'TMAX', 'TMIN', 'WDF2', 'WDF5',
         'WSF2', 'WSF5', 'positive', 'negative', 'hospitalizedCurrently', 'death', 'posNeg',
         'deathIncrease', 'hospitalizedIncrease', 'totalTestResultsIncrease', 'negativeIncrease',
              'positiveIncrease', 'STATION'], axis=1)

df = df.rename(columns={'date': 'DATE', 'Case rate per day in %': 'COVID_POS_PER',
                   'threat level': 'THREAT_LEVEL'})

df = df[['DATE', 'AWND', 'TAVG', 'COVID_POS_PER', 'THREAT_LEVEL']]
df_1 = df_1[['DATE', 'AWND', 'TAVG', 'COVID_POS_PER', 'THREAT_LEVEL']]

df_final = df_1.append(df)
print(df_final)
df_final = df_final.sample(frac=1, random_state=1)
df_final = df_final.sort_values(by='THREAT_LEVEL')
df_final.to_csv('NY&WA_FINAL.csv')
print(df_final)
