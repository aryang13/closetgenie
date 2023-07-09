import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListItem, Button } from '@rneui/themed';
import laundryController from '../../controllers/laundryController.js';

function LaundryScreen() {
  [laundry, setLaundry] = useState([]);

  const getLaundry = async () => {
    const laundry = await laundryController.getAllLaundry();
    setLaundry(laundry.clothes);
  };

  useEffect(() => {
    getLaundry();
  }, []);

  const clothingSortedByWears = laundry.map((clothing) => {
    return (
      <ListItem.Swipeable
        key={clothing.id}
        containerStyle={{
          backgroundColor: '#cacaca',
          borderRadius: 10,
          marginVertical: 5,
          marginHorizontal: 15,
          color: '#e91e63',
        }}
        rightContent={(reset) => (
          <Button
            onPress={async () => {
              await laundryController.deleteLaundryItem(clothing.id);
              await getLaundry();
              reset();
            }}
            icon={{
              name: 'remove',
              type: 'font-awesome',
              color: 'white',
            }}
            buttonStyle={{
              height: '85%',
              backgroundColor: 'red',
              borderRadius: 10,
              marginVertical: 5,
              marginHorizontal: 15,
            }}
          />
        )}
      >
        <ListItem.Content>
          <ListItem.Title className="font-medium">
            {clothing.name !== "" ? clothing.name : `${clothing.colour} ${clothing.type}`}
          </ListItem.Title>
          <ListItem.Subtitle className="text-neutral-600 mt-1">
            <Text className="font-semibold">Wears: </Text>
            <Text>{clothing.timesOfWear}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  });

  return (
    <View className="h-full bg-white">
      <ScrollView className="">{clothingSortedByWears}</ScrollView>
      <View>
        <TouchableHighlight
          className="items-center fixed bottom-0 my-2"
          onPress={async () => {
            await laundryController.deleteAllLaundry();
            await getLaundry();
            reset();
          }}
        >
          <Image
            className="w-20 h-20"
            source={require('../../assets/basket-emoji.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const LaundryStack = createNativeStackNavigator();

export default function LaundryStackScreen() {
  return (
    <LaundryStack.Navigator>
      <LaundryStack.Screen name="Laundry" component={LaundryScreen} />
    </LaundryStack.Navigator>
  );
}
