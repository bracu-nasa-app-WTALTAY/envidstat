import pandas as pd

#####cleaning the dataset######
stations, curr_station = 1, None
df = pd.read_csv('washington.csv')
df_1 = pd.read_csv('Washington_Covid-19.csv')
df = df.dropna(axis=0, subset=['TAVG', 'AWND'])
df = df[(df['DATE'] > '2020-02-29') & (df['DATE'] < '2020-05-11')]
# print(df_1.head())
df_1.drop(df_1.columns[[0, 1, 4, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 21]], axis=1, inplace=True)
# print(df_1.columns)

####filling missing values###############
df = df.interpolate(method='linear', limit_direction='forward')

###calculating the rate######

df.rename(columns={'DATE': 'date'}, inplace=True)
df_1.rename(columns={'lastUpdate': 'date'}, inplace=True)

df_1['date'] = pd.to_datetime(df_1.date).dt.date
df_1 = df_1.astype({'date': object})
df_1['date'] = pd.to_datetime(df_1.date).dt.date
df['date'] = pd.to_datetime(df.date).dt.date

'''
#grouping environmental data by datewise
df.groupby(df.date)
df=df.drop('station')
'''

# merging two datasets
merged = df.merge(df_1, how='inner', on=["date"])
merged.set_index('date', inplace=True)

# calculating case rate
merged['Case rate per day in %'] = 0
merged = merged.astype({'Case rate per day in %': float})
merged = merged.astype({'positiveIncrease': float})
merged = merged.astype({'totalTestResultsIncrease': float})

for index, row in merged.iterrows():
    x = round((row['positiveIncrease'] / row['totalTestResultsIncrease']) * 100, 2)
    merged.at[index, 'Case rate per day in %'] = x
# threat level-->one hot encoding
merged['threat level'] = 'default'
for index, row in merged.iterrows():

    if (row['Case rate per day in %'] > 0) and (row['Case rate per day in %'] < 9):
        merged.at[index, 'threat level'] = 'SAFE'
    elif (row['Case rate per day in %'] >= 9) and (row['Case rate per day in %'] <= 18):
        merged.at[index, 'threat level'] = 'MODERATE'
    elif row['Case rate per day in %'] >= 18:
        merged.at[index, 'threat level'] = 'RISKY'

# final_cleaning
merged = merged.drop(['DAPR', 'MDPR', 'PGTM', 'PSUN', 'TOBS', 'TSUN', 'WDFG', 'WDMV', 'WSFG'], axis=1)
merged.to_csv('wsh_all.csv')
# generating stationwise csv

for i in range(len(merged)):

    if merged.iloc[i, 0] != merged.iloc[i - 1, 0]:
        curr_station = merged.iloc[i, 0]
        merged_station = merged[merged['STATION'] == curr_station]
        merged_station.to_csv('WSH_final_' + curr_station + '.csv')
        stations += 1
