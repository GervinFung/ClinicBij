import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import RegistryScreen from './src/components/RegistryScreen';
import MainScreen from './src/components/MainScreen';
import HomeScreen from './src/components/HomeScreen';

import ProfileScreen from './src/components/profile/ProfileScreen';
import UpdateProfileScreen from './src/components/profile/UpdateProfileScreen';
import DeleteProfileScreen from './src/components/profile/DeleteProfileScreen';

import CreateAppointmentScreen from './src/components/appointment/CreateAppointment';
import ReadAppointmentScreen from './src/components/appointment/ReadAppointment';
import UpdateAppointmentScreen from './src/components/appointment/UpdateAppointment';
import DeleteAppointmentScreen from './src/components/appointment/DeleteAppointment';

import UpdateDecisionScreen from './src/components/appointment/update/UpdateDecision';
import UpdatePurposeScreen from './src/components/appointment/update/UpdatePurpose';
import UpdateDateTimeScreen from './src/components/appointment/update/UpdateDateTime';
import UpdateDoctorScreen from './src/components/appointment/update/UpdateDoctor';

import {hasCurrentUser, getAuth} from './src/components/util/UserUtil';

const WelcomeStackNav = () => {

    const getFirstRoute = (hasUser) => {
        return hasUser ? 'HomeScreen' : 'WelcomeScreen';
    };

    const Stack = createStackNavigator();

    const [firstRoute, setFirstRoute] = useState(getFirstRoute(hasCurrentUser()));

    useEffect(() => getAuth().onAuthStateChanged((user) => {
        setFirstRoute(getFirstRoute(user !== null));
    }), []);

    return (
        <Stack.Navigator initialRouteName={firstRoute}>
            <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} options={{ title: 'Welcome' }}/>
            <Stack.Screen name={'MainScreen'} component={MainScreen} options={{ title: 'Main' }}/>
            <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{ title: 'Login' }}/>
            <Stack.Screen name={'RegistryScreen'} component={RegistryScreen} options={{ title: 'Sign Up' }}/>

            <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name={'CreateAppointmentScreen'} component={CreateAppointmentScreen} options={{ title: 'Add Appointment' }}/>
            <Stack.Screen name={'ReadAppointmentScreen'} component={ReadAppointmentScreen} options={{ title: 'View Appointment' }}/>
            <Stack.Screen name={'UpdateAppointmentScreen'} component={UpdateAppointmentScreen} options={{ title: 'Update Appointment' }}/>
            <Stack.Screen name={'UpdateDecisionScreen'} component={UpdateDecisionScreen} options={{ title: 'Update Chosen Appointment' }}/>
            <Stack.Screen name={'DeleteAppointmentScreen'} component={DeleteAppointmentScreen} options={{ title: 'Cancel Appointment' }}/>
            <Stack.Screen name={'UpdatePurposeScreen'} component={UpdatePurposeScreen} options={{ title: 'Update Appointment Purpose' }}/>
            <Stack.Screen name={'UpdateDateTimeScreen'} component={UpdateDateTimeScreen} options={{ title: 'Update Appointment Date/Time' }}/>
            <Stack.Screen name={'UpdateDoctorScreen'} component={UpdateDoctorScreen} options={{ title: 'Update Appointment Doctor' }}/>
        </Stack.Navigator>
    );
};

const ProfileStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} options={{ title: 'Profile' }}/>
            <Stack.Screen name={'UpdateProfileScreen'} component={UpdateProfileScreen} options={{ title: 'Update' }}/>
            <Stack.Screen name={'DeleteProfileScreen'} component={DeleteProfileScreen} options={{ title: 'Delete' }}/>
        </Stack.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen name={'MySejahtera'} component={WelcomeStackNav} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
};

const BottomNav = () => {
    const Tab = createBottomTabNavigator();

    const [hasUser, setHasUser] = useState(hasCurrentUser());

    useEffect(() => getAuth().onAuthStateChanged((user) => {
        setHasUser(user !== null);
    }), []);

    const bottomTab = () => {
        if (hasUser) {
            return (
                <Tab.Navigator initialRouteName="DrawerNav">
                    <Tab.Screen name={'DrawerNav'} component={DrawerNav} options={{ headerShown: false }}/>
                    <Tab.Screen name={'Profile'} component={ProfileStackNav} options={{ headerShown: false }}/>
                </Tab.Navigator>
            );
        } else {
            return (
                <Tab.Navigator>
                    <Tab.Screen name={'DrawerNav'} component={DrawerNav} options={{ headerShown: false }} />
                </Tab.Navigator>
            );
        }
    };

    return (
        bottomTab()
    );
};

export const USER = 'USER';
export const ADMIN = 'ADMIN';

const App = () => {

    return (
        <NavigationContainer>
            <BottomNav/>
        </NavigationContainer>
    );
};

export default App;
