import { useState } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Avatar } from '@rneui/themed';
import MainItem from '../../components/MainItem';
import ClothingItem from '../../components/ClothingItem';
import React, { useEffect, useCallback } from 'react';
import clothingController from '../../controllers/clothingController';
import PrimaryButton from '../../components/Buttons';
import CameraScreen from '../CameraScreen';

function ClosetScreen({ navigation }) {
  const [clothingType, setClothingType] = useState('Clothing');
  const [clothing, setClothing] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const changeStates = () => {
    clothingController.getAllClothes().then((allClothes) => {
      setClothing(allClothes.clothes);
    });
    clothingController.getFavoriteClothing().then((favouriteClothes) => {
      setFavourites(favouriteClothes.clothes);
    });
    setRefreshing(false);
  };

  useEffect(changeStates, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      changeStates();
    }, 1000);
  }, []);

  const clothingByType = {};
  const types = new Set(clothing.map((clothingPiece) => clothingPiece.type));
  Array.from(types).forEach((type) => {
    const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
    let currentClothingType = clothing.filter(
      (clothingPiece) =>
        clothingPiece.type === type && clothingPiece.inLaundry === false
    );
    let laundryCount = clothing.filter(
      (clothingPiece) =>
        clothingPiece.type === type && clothingPiece.inLaundry === true
    ).length;
    clothingByType[type] = {
      currentClothingType,
      laundryCount,
      capitalType,
    };
  });

  const clothingIcons = {
    tshirt: require('../../assets/clothing-types/tshirt.png'),
    pant: require('../../assets/clothing-types/pants.png'),
    sweatshirt: require('../../assets/clothing-types/hoodie-sweatshirt.png'),
    dress: require('../../assets/clothing-types/dress.png'),
    coat: require('../../assets/clothing-types/coat.png'),
    sandal: require('../../assets/clothing-types/sandal.png'),
    shirt: require('../../assets/clothing-types/shirt.png'),
    sneaker: require('../../assets/clothing-types/sneaker.png'),
    bag: require('../../assets/clothing-types/bag.png'),
    'ankle boot': require('../../assets/clothing-types/ankle-boot.png'),
  };

  return (
    <ScrollView
      className="bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MainItem
        onPress={() => {
          setClothingType('All Clothing');
          navigation.navigate('Clothing', {
            clothingType: clothingType,
            clothing: clothing,
          });
        }}
      >
        <Avatar source={require('../../assets/clothes_icon.png')} />
        <ListItem.Content>
          <ListItem.Title className="text-white font-bold">
            All Clothing
          </ListItem.Title>
          <ListItem.Subtitle className="font-light mt-1 text-slate-300">
            <Text>Inventory: </Text>
            <Text className="font-semibold">{clothing.length}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </MainItem>

      <MainItem
        onPress={() => {
          setClothingType('Favourites');
          navigation.navigate('Clothing', {
            clothingType: clothingType,
            clothing: favourites,
          });
        }}
      >
        <Avatar source={require('../../assets/star.png')} />
        <ListItem.Content>
          <ListItem.Title className="text-white font-bold">
            Favourites
          </ListItem.Title>
          <ListItem.Subtitle className="font-light mt-1 text-slate-300">
            <Text>Inventory: </Text>
            <Text className="font-semibold">{favourites.length}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </MainItem>

      {Object.keys(clothingByType).map((type) => {
        const capitalType = clothingByType[type].capitalType;
        const clothing = clothingByType[type].currentClothingType;
        const laundryCount = clothingByType[type].laundryCount;
        return (
          <MainItem
            onPress={() => {
              setClothingType(type);
              navigation.navigate('Clothing', {
                clothingType: capitalType,
                clothing: clothing,
              });
            }}
            key={type}
          >
            <Avatar source={clothingIcons[type]} />
            <ListItem.Content>
              <ListItem.Title className="text-white font-bold">
                {capitalType}
              </ListItem.Title>
              <ListItem.Subtitle className="font-light mt-1 text-slate-300">
                <Text>Inventory: </Text>
                <Text className="font-semibold">
                  {clothing.length}
                  {'\n'}
                </Text>
                <Text>In Laundry: </Text>
                <Text className="font-semibold">{laundryCount}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </MainItem>
        );
      })}
    </ScrollView>
  );
}

function ClothingScreen({ route }) {
  const { clothingType, clothing } = route.params;

  const allClothing = clothing.map((clothingPiece) => {
    const clothingTitle = clothingPiece.name !== "" ? `${clothingPiece.name}` : `${clothingPiece.colour} ${clothingPiece.type}`;
    return (
      <ClothingItem key={clothingPiece.id} clothingPiece={clothingPiece}>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '500' }}>
            {clothingTitle}
          </ListItem.Title>
        </ListItem.Content>
      </ClothingItem>
    );
  });

  return (
    <ScrollView className="bg-white">
      <Text className="text-4xl text-center my-4 font-semibold">
        {clothingType}
      </Text>
      {allClothing}
    </ScrollView>
  );
}

const ClosetStack = createNativeStackNavigator();

function ClosetStackScreen() {
  const navigation = useNavigation();
  return (
    <ClosetStack.Navigator>
      <ClosetStack.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Camera');
              }}
              icon={{
                  name: 'camera',
                  type: 'feather',
                  color: 'black',
              }}
              color='white'
            />
          ),
        }}
      />
      <ClosetStack.Screen name="Clothing" component={ClothingScreen} />
      <ClosetStack.Screen name="Camera" component={CameraScreen} options={{title: ""}}/>
    </ClosetStack.Navigator>
  );
}

export { ClothingScreen, ClosetStackScreen };
