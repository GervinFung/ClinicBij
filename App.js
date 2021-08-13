import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import RegistryScreen from './src/components/RegistryScreen';
import MainScreen from './src/components/MainScreen';
import HomeScreen from './src/components/HomeScreen';

import CreateAppointmentScreen from './src/components/appointment/CreateAppointment';
import ReadAppointmentScreen from './src/components/appointment/ReadAppointment';
import UpdateAppointmentScreen from './src/components/appointment/UpdateAppointment';
import DeleteAppointmentScreen from './src/components/appointment/DeleteAppointment';

import UpdateDecisionScreen from './src/components/appointment/update/UpdateDecision';

import UpdatePurposeScreen from './src/components/appointment/update/UpdatePurpose';
import UpdateDateTimeScreen from './src/components/appointment/update/UpdateDateTime';
import UpdateDoctorScreen from './src/components/appointment/update/UpdateDoctor';

const WelcomeStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
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

const BottomNav = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name={'Welcome'} component={WelcomeStackNav} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="MySejahtera">
            <Drawer.Screen name={'MySejahtera'} component={BottomNav} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
};

export const USER = 'USER';
export const ADMIN = 'ADMIN';

const App = () => {

    return (
        <NavigationContainer>
            <DrawerNav/>
        </NavigationContainer>
    );
};

export default App;
