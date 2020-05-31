import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io

df = pd.read_csv('WSC_finalUSW00024157.csv')
#print(df.dtypes)
df.drop(df.columns[[0,1]],axis=1,inplace=True)
#print(df.head())
df.DATE=pd.to_datetime(df.DATE)
sns.barplot(x='TAVG',y='Infected_Rate(per 1 million)',data=df)

print(df.shape)
fig= plt.figure(figsize=(7,7))
sns.heatmap(df.corr(), annot=True,fmt=".2f")
plt.show()