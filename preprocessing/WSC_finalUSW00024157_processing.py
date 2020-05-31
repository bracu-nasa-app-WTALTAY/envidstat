import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io

df = pd.read_csv('WSH_USW00024141.csv')

#heatmap
fig= plt.figure(figsize=(25,25))
sns.heatmap(df.corr(), annot=True,fmt=".2f")
plt.show()