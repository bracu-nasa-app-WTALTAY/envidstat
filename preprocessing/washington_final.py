import pandas as pd

stations, curr_station = 1, None
df = pd.read_csv('washington.csv')
df_1 = pd.read_excel('US_clean data.xlsx')
# print(df_1.head())
df = df.dropna(axis=0, subset=['TAVG', 'AWND'])
# df = df.drop(['DAPR','MDPR','PGTM','PRCP','PSUN','SNOW','SNWD','TMAX',
#             'TMIN','TOBS','TSUN','WDF2','WDF5','WDFG','WDMV','WSF2', 'WSF5', 'WSFG'], axis=1)
df = df[(df['DATE'] > '2020-02-29') & (df['DATE'] < '2020-05-11')]
df_1 = df_1[(df_1['date'] > '2/29/2020') & (df_1['date'] < '11/5/2020')]
df_1 = df_1.drop(['fips'], axis=1)
df_1 = df_1[df_1['state'] == 'Washington']
df = df.interpolate(method='linear', limit_direction='forward')
df_1 = df_1.interpolate(method='linear', limit_direction='forward')

df.rename(columns={'DATE': 'date'}, inplace=True)

# converting to datetime
df.date = pd.to_datetime(df.date)
df_1.date = pd.to_datetime(df_1.date)
# print(df.head())
# print(df_1.head())


# merging two datasets
merged = pd.merge(df, df_1, on='date', how='inner')
merged.set_index('date', inplace=True)
# print(merged.head())

# generating stationwise csv

for i in range(len(merged)):

    if merged.iloc[i, 0] != merged.iloc[i - 1, 0]:
        curr_station = merged.iloc[i, 0]
        merged_station = merged[merged['STATION'] == curr_station]
        merged_station.to_csv('WSH_' + curr_station + '.csv')
        stations += 1
