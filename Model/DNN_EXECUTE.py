import numpy as np
import pickle as pk

model = pk.load(open('dnn_model.sav', 'rb'))

Xnew = np.array([4.03, 36.0])

if Xnew.ndim == 1:
    Xnew = np.array([Xnew])

print(Xnew.shape)
ynew = model.predict(Xnew)
ynew = np.array(ynew.ravel())
print(ynew)

i = np.where(ynew == np.amax(ynew))
i = i[0][0]

if i == 0:
    print('Moderate')
elif i == 1:
    print('Risky')
elif i == 2:
    print('Safe')
