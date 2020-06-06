import pandas as pd

stations, curr_station = 1, None
df = pd.read_csv('D:/Education/Projects/COVID APP/Dataset/NYC_data.csv')
df_1 = pd.read_csv('D:/Education/Projects/COVID APP/COVID-NYC/coronavirus-data-master/tests.csv')
df = df.dropna(axis=0, subset=['TAVG'])
df = df.drop(['PGTM', 'TMAX', 'TMIN', 'TOBS', 'WDF2', 'WDF5', 'WSF2', 'WSF5', 'WT01', 'WT02', 'WT03', 'WT04', 'WT05',
              'WT06', 'WT07', 'WT08', 'WT09', 'WT11'], axis=1)
df = df[df['DATE'] > '2020-02-29']

df_final = pd.read_csv('NYC_USW00014733.csv')
df_final.drop(df_final.index, inplace=True)

curr_station = df.iloc[0, 0]

for i in range(len(df)):

    if df.iloc[i, 0] != df.iloc[i-1, 0]:
        curr_station = df.iloc[i, 0]
        df_station = df[df['STATION'] == curr_station]
        covid_pos = df_1.loc[0:len(df_station)-1, 'PERCENT_POSITIVE'].tolist()
        df_station = df_station.assign(COVID_POS_PER=covid_pos)

        df_station.to_csv('NYC_'+curr_station+'.csv')
        df_station = pd.read_csv('NYC_'+curr_station+'.csv')
        df_station['COVID_POS_PER'] = df_station['COVID_POS_PER']*100
        df_station['COVID_POS_PER'] = df_station['COVID_POS_PER'].round(2)
        df_station['THREAT_LEVEL'] = 'default'

        # ONE HOT ENCODING -->
        for row in range(len(df_station)):
            if (df_station.iloc[row, 5] > 0) and (df_station.iloc[row, 5] < 9):
                df_station.iloc[row, 6] = 'SAFE'
            elif (df_station.iloc[row, 5] >= 9) and (df_station.iloc[row, 5] < 18):
                df_station.iloc[row, 6] = 'MODERATE'
            elif df_station.iloc[row, 5] >= 18:
                df_station.iloc[row, 6] = 'RISKY'

        df_final = df_final.append(df_station)
        df_station.to_csv('NYC_'+curr_station+'.csv')
        print(df_station)
        stations += 1

# MERGING THE DATASETS HAVING BOTH AWND AND TAVG INTO ONE -->
df_final = df_final.dropna(axis=0, subset=['AWND', 'TAVG'])
df_final = df_final.drop(['STATION', 'Unnamed: 0'], axis=1)
df_final = df_final[['DATE', 'AWND', 'TAVG', 'COVID_POS_PER', 'THREAT_LEVEL']]

df_final.to_csv('NYC_FINAL.csv')
