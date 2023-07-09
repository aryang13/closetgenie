import React, { useRef } from 'react';
import LoginScreen from "react-native-login-screen";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import userController from "../controllers/userController.js";
import image from '../assets/ClosetGenie_logo.png';

const Stack = createNativeStackNavigator();

function Login_Screen({ setUser }) {
  let email = useRef();
  let password = useRef();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email.current, password.current)
      .then(userCredentials => {
        setUser(userCredentials.user);
        console.log('Logged in with user:', userCredentials.user.email);
      })
      .catch(() => alert("User does not exist"))
  }

  const changeEmail = (text) => {
    email.current = text;
  }

  const changePassword = (text) => {
    password.current = text;
  }

  const navigation = useNavigation();
  return (
      <LoginScreen
        logoImageSource={image}
        onLoginPress={handleLogin}
        onSignupPress={() => {navigation.navigate('Signup')}}
        onEmailChange={changeEmail}
        onPasswordChange={changePassword}
        disableSocialButtons={true}
        style={{justifyContent: 'center'}}
      />
  );  
}

function SignupScreen({ setUser }) {
  let email = useRef();
  let password = useRef();

  const changeEmail = (text) => {
    email.current = text;
  }

  const changePassword = (text) => {
    password.current = text;
  }

  const handleSignup = async () => {
    try {
      await userController.addNewUser(email.current, password.current);
      alert("User created successfully");
      signInWithEmailAndPassword(auth, email.current, password.current)
        .then(userCredentials => {
          setUser(userCredentials.user);
          console.log('Logged in with user:', userCredentials.user.email);
        })
        .catch(() => alert("User does not exist"))
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <LoginScreen
        logoImageSource={image}
        onLoginPress={async () => {await handleSignup()}}
        onEmailChange={changeEmail}
        onPasswordChange={changePassword}
        disableSocialButtons={true}
        disableSignup={true}
        loginButtonText={'Sign Up'}
        style={{justifyContent: 'center'}}
    />
  );
}

export default function AuthScreen({ setUser }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' options={{title: ""}}>
          {props => <Login_Screen {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name='Signup' options={{title: ""}}>
          {props => <SignupScreen {...props} setUser={setUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}