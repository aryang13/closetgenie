
# model = getModelFromPath('src/model/ClosetGenieModel.h5') #modify this line according to the path of the model
# test_x = getImageTensorArray('src/samples/tshirt.png') #modify this line according to the path of the image

from keras.models import load_model
import tensorflow as tf
import numpy as np
from keras.utils import load_img, img_to_array

def getModelFromPath(path):
    model = load_model(path)
    return model

def getImageTensorArray(path):
    img = load_img(path, target_size=(150, 150))
    img_arr = img_to_array(img)
    img_arr = np.expand_dims(img_arr, axis=0)
    img_arr = img_arr.astype("float32") / 255
    return img_arr

def main():
    model = getModelFromPath('src/model/clothing_classifier.h5') # modify this line according to the path of the model
    test_x = getImageTensorArray('src/predict.jpg') # modify this line according to the path of the image
    predicted_classes = model.predict(test_x)
    predicted_clothing_type = np.argmax(predicted_classes[0])
    print(predicted_clothing_type)
    return predicted_clothing_type

main()