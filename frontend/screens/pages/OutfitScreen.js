import { useState, React, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, RefreshControl, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import PrimaryButton from '../../components/Buttons';
import { ListItem, Avatar } from '@rneui/themed';
import * as Location from 'expo-location';
import RecentOutfit from '../../components/RecentOutfit';
import outfitController from '../../controllers/outfitController';
import { useNavigation } from '@react-navigation/native';
import userController from '../../controllers/userController';

function OutfitsScreen({ navigation }) {
  const [outfits, setOutfits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const changeStates = () => {
    outfitController.getAllOutfits().then((outfits) => {
      setOutfits(outfits);
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

  return (
    <ScrollView
      className="bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <PrimaryButton
        title="New Outfit"
        onPress={() => navigation.navigate('New Outfit')}
        className="my-5 items-center"
      />

      <Text className="text-4xl text-center my-4 font-semibold">
        Recent Outfits
      </Text>

      {/* Placeholder for recent outfit component */}
      {outfits
        .sort((a, b) => {
          return a.date.seconds < b.date.seconds;
        })
        .map((outfit) => {
          const date = new Date(outfit.date.seconds * 1000);
          return (
            <RecentOutfit key={outfit.id}>
              <Avatar
                size={40}
                source={require('../../assets/outfit-icon-white.png')}
                containerStyle={{
                  marginHorizontal: 10,
                  width: 40,
                  height: 40,
                }}
              />
              <ListItem.Content>
                <ListItem.Title className="text-white font-semibold text-xl pb-2">
                  {date.toDateString()}
                </ListItem.Title>
                <ListItem.Subtitle className="text-slate-300 font-light">
                  <Text className="font-semibold">
                    <Text className="font-light">Top: </Text>
                    {outfit.top.name !== ''
                      ? outfit.top.name
                      : `${outfit.top.colour} ${outfit.top.type}`}
                    {'\n'}
                    <Text className="font-light">Bottom: </Text>
                    {outfit.bottom.name !== ''
                      ? outfit.bottom.name
                      : `${outfit.bottom.colour} ${outfit.bottom.type}`}
                    {'\n'}
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </RecentOutfit>
          );
        })}
    </ScrollView>
  );
}

function GenerateOutfitScreen() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Formal', value: 'formal' },
    { label: 'Casual', value: 'casual' },
    { label: 'Comfy', value: 'comfy' },
  ]);
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);

  const [outfit, setOutfit] = useState(null);

  const getOutfit = async (occasion) => {
    const res = await outfitController.getOutfit(occasion);
    setOutfit(res);
  };

  const selectedOutfit = async () => {
    await outfitController.postOutfit(outfit);
    setOutfit(null);
    navigation.navigate('Outfits');
  };

  const getWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    });
    const key = '1119c35f8e88022ee07e0cc041b335a8';
    const coords = `${location.coords.latitude},${location.coords.longitude}`;
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${key}&query=${coords}`
    );
    const data = await response.json();
    const temp = data.current.temperature;
    setTemperature(temp);
    setWeatherCondition(data.current.weather_descriptions[0]);

    await userController.updateUserTemp(temp);
  };

  useEffect(getWeather, []);

  return (
    <View className="p-4 bg-white gap-4 h-full">
      <Text className="text-3xl font-medium text-center">
        Generate Today's Outfit!
      </Text>

      <View>
        <Text className="text-xl font-normal">Weather right now:</Text>
        <Text className="text-base ">
          <Text className="font-bold">{temperature}°C </Text>
          and
          <Text className="font-bold"> {weatherCondition}</Text>
        </Text>
      </View>

      <View style={Platform.OS === 'ios' ? { zIndex: 100 } : {}}>
        <Text className="text-xl font-normal">What's the occasion?</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      <View className="items-center justify-center">
        <PrimaryButton
          title="Generate!"
          onPress={async () => {
            await getOutfit(value);
          }}
        />
      </View>

      {outfit ? (
        <View className="items-center bg-[#002665] p-4 rounded-xl">
          <Text className="text-slate-100 text-lg font-light pb-5">
            <Text className="text-2xl font-normal text-slate-100">
              Today's New Outfit {'\n'}
            </Text>
            Top:{' '}
            <Text className="font-bold">
              {outfit.top.name !== ''
                ? outfit.top.name
                : `${outfit.top.colour} ${outfit.top.type}`}
              {'\n'}
              {/* GREEN TOP {'\n'} */}
            </Text>
            Bottom:{' '}
            <Text className="font-bold">
              {outfit.bottom.name !== ''
                ? outfit.bottom.name
                : `${outfit.bottom.colour} ${outfit.bottom.type}`}
              {/* GREEN PANTS */}
            </Text>
          </Text>
          <View className="flex-row gap-10">
            <Button
              title="No"
              type="outline"
              buttonStyle={{
                width: 100,
                borderRadius: 10,
                borderColor: 'white',
                borderWidth: 1,
              }}
              titleStyle={{
                color: 'white',
              }}
              onPress={() => {
                setOutfit(null);
              }}
            />
            <Button
              title="Yes"
              buttonStyle={{
                backgroundColor: '#3982ff',
                width: 100,
                borderRadius: 10,
              }}
              onPress={selectedOutfit}
            />
          </View>
        </View>
      ) : undefined}
    </View>
  );
}

const OutfitsStack = createNativeStackNavigator();

export default function OutfitsStackScreen() {
  return (
    <OutfitsStack.Navigator>
      <OutfitsStack.Screen name="Outfits" component={OutfitsScreen} />
      <OutfitsStack.Screen name="New Outfit" component={GenerateOutfitScreen} />
    </OutfitsStack.Navigator>
  );
}
