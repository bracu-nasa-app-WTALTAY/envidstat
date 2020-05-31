from keras.models import Sequential
from keras.layers import Dense
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
import pickle as pk

np.random.seed(7)

df = pd.read_csv('D:/Education/Projects/COVID APP/Dataset/NY&WA_FINAL.csv')

X = df[['AWND', 'TAVG']]
y = df[['THREAT_LEVEL']]


encoder = LabelEncoder()
y1 = encoder.fit_transform(y)

Y = pd.get_dummies(y1).values
print(Y)
# Y.drop('THREAT_LEVEL')

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=0)
model = Sequential()

model.add(Dense(57, input_dim=2, activation='tanh'))
model.add(Dense(25, activation='relu'))
model.add(Dense(12, activation='tanh'))
model.add(Dense(6, activation='relu'))
# model.add(Dense(5, activation='relu'))
model.add(Dense(3, activation='softmax'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

model.fit(X_train, y_train, epochs=400)

scores = model.evaluate(X_test, y_test, verbose=0)
print("\nAccuracy:%.2f%%" % (scores[1]*100))

pk.dump(model, open('dnn_model.sav', 'wb'))

