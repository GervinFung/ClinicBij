import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import RegistryScreen from './src/components/RegistryScreen';
import MainScreen from './src/components/MainScreen';

const StackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} options={{ title: 'Welcome' }}/>
            <Stack.Screen name={'MainScreen'} component={MainScreen} options={{ title: 'Main' }}/>
            <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{ title: 'Login' }}/>
            <Stack.Screen name={'RegistryScreen'} component={RegistryScreen} options={{ title: 'Sign Up' }}/>
        </Stack.Navigator>
    );
};

const BottomNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name={'Welcome'} component={StackNav} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="BottomNav">
            <Drawer.Screen name={'Welcome'} component={BottomNav} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
};

export const USER = 'USER';
export const ADMIN = 'ADMIN';

const App = () => {

    const [userType, setUserType] = useState('');

    return (
        <NavigationContainer>
            <DrawerNav/>
        </NavigationContainer>
    );
};

export default App;
