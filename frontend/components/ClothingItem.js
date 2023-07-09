import { ListItem, Button } from '@rneui/themed';
import { View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Dialog from 'react-native-dialog';
import clothingController from '../controllers/clothingController.js';
import laundryController from '../controllers/laundryController.js';

export default function ClothingItem(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmission = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
    const clothing = {
      colour: props.clothingPiece.colour,
      inLaundry: props.clothingPiece.inLaundry,
      isFavourite: props.clothingPiece.isFavourite,
      lastTimeWorn: props.clothingPiece.lastTimeWorn,
      timesOfWear: props.clothingPiece.timesOfWear,
      type: props.clothingPiece.type,
      name: name,
    };
    await clothingController.updateClothes(clothing, props.clothingPiece.id);
    alert('Name changed to: ' + name);
    setName('');
    navigation.navigate('Closet');
  };

  return (
    <View>
      <ListItem.Swipeable
        {...props}
        containerStyle={{
          backgroundColor: '#cacaca',
          borderRadius: 10,
          marginVertical: 5,
          marginHorizontal: 15,
          color: '#e91e63',
        }}
        rightContent={(reset) => (
          <Button
            onPress={() => {
              if (!props.clothingPiece.isFavourite) {
                clothingController.addFavoriteClothes(props.clothingPiece.id);
                reset();
              } else {
                clothingController.removeFavoriteClothes(
                  props.clothingPiece.id
                );
                reset();
              }
            }}
            icon={
              !props.clothingPiece.isFavourite
                ? {
                    name: 'star',
                    type: 'ant-design',
                    color: 'white',
                  }
                : {
                    name: 'staro',
                    type: 'ant-design',
                    color: 'white',
                  }
            }
            buttonStyle={
              !props.clothingPiece.isFavourite
                ? {
                    backgroundColor: '#fec007',
                    borderRadius: 10,
                    height: '100%',
                  }
                : {
                    backgroundColor: 'red',
                    borderRadius: 10,
                    height: '100%',
                  }
            }
          />
        )}
        leftContent={(reset) => (
          <Button
            onPress={() => {
              if (!props.clothingPiece.inLaundry) {
                laundryController.addToLaundry(props.clothingPiece.id);
                reset();
              } else {
                laundryController.deleteLaundryItem(props.clothingPiece.id);
                reset();
              }
            }}
            icon={
              !props.clothingPiece.inLaundry
                ? {
                    name: 'washing-machine',
                    type: 'material-community',
                    color: 'white',
                  }
                : {
                    name: 'washing-machine-off',
                    type: 'material-community',
                    color: 'white',
                  }
            }
            buttonStyle={
              !props.clothingPiece.inLaundry
                ? {
                    backgroundColor: '#82b0fe',
                    borderRadius: 10,
                    height: '100%',
                  }
                : { backgroundColor: 'red', borderRadius: 10, height: '100%' }
            }
          />
        )}
        onLongPress={showDialog}
        rightStyle={{
          marginVertical: 5,
          marginHorizontal: 15,
        }}
        leftStyle={{
          marginVertical: 5,
          marginHorizontal: 15,
        }}
      ></ListItem.Swipeable>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Rename Clothing</Dialog.Title>
        <Dialog.Input
          onChangeText={(name) => setName(name)}
          value={name}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Submit" onPress={handleSubmission} />
      </Dialog.Container>
    </View>
  );
}
