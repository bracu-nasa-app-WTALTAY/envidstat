import numpy as np
import pickle as pk

model = pk.load(open('dnn_model.sav', 'rb'))

wind_speed = np.round(float(input('Input wind speed(in m/h): ')), 2)
temperature = np.round(input('Input temperature(in fahrenheit): '), 2)

X_new = np.array([wind_speed, temperature])

if X_new.ndim == 1:
    X_new = np.array([X_new])

print(X_new.shape)
y_new = model.predict(X_new)
y_new = np.array(y_new.ravel())
print(y_new)

i = np.where(y_new == np.amax(y_new))
i = i[0][0]

if i == 0:
    print('Moderate')
elif i == 1:
    print('Risky')
elif i == 2:
    print('Safe')
