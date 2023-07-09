import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import React, { useState, useEffect } from 'react';
import { app, auth } from './firebase/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  const [user, setUser] = useState();

  function onAuthState(user) {
    if (user) {
      setUser(user);
    } else {
      setUser();
    }
  }

  useEffect(() => {
    if (app) {
      const subscriber = onAuthStateChanged(auth, onAuthState);
      return subscriber; // unsubscribe on unmount
    }
  }, []);

  return user == null ? <AuthScreen setUser={setUser} /> : <HomeScreen/>;
}
