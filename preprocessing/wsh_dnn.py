from keras.models import Sequential
from keras.layers import Dense
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

np.random.seed(7)

df = pd.read_csv('wsh_all.csv')

X = np.array(df[['AWND', 'TAVG']])
y = np.array(df[['threat level']])


encoder = LabelEncoder()
y1 = encoder.fit_transform(y)

Y = pd.get_dummies(y1).values

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = Sequential()

model.add(Dense(100, input_dim=2, activation='tanh'))
model.add(Dense(50, activation='tanh'))
model.add(Dense(10, activation='relu'))
model.add(Dense(3, activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

model.fit(X_train, y_train, epochs=300)

scores = model.evaluate(X_test, y_test, verbose=0)
print("\nAccuracy:%.2f%%" % (scores[1]*100))

#model.save('dnn_model')
