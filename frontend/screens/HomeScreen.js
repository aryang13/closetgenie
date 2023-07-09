import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import LaundryStackScreen from './pages/LaundryScreen';
import { ClosetStackScreen } from './pages/ClosetScreen';
import OutfitsStackScreen from './pages/OutfitScreen';
import ProfileScreen from './pages/ProfileScreen';
import React from 'react';

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            size = 35;

            if (route.name === 'Outfits') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Laundry') {
              iconName = focused
                ? 'local-laundry-service'
                : 'local-laundry-service';
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else if (route.name === 'Closet') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#82b0fe',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Closet"
          component={ClosetStackScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Outfits"
          component={OutfitsStackScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Laundry"
          component={LaundryStackScreen}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
