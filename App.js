import React, { useState, useEffect } from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {getUser} from './src/components/util/UserUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './src/components/WelcomeScreen';
import LoginScreen from './src/components/LoginScreen';
import RegistryScreen from './src/components/RegistryScreen';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';

import MainScreen from './src/components/MainScreen';
import HomeScreen from './src/components/HomeScreen';
import HelpScreen from './src/components/HelpScreen';

import PatientProfileScreen from './src/components/profile/PatientProfileScreen';
import DoctorProfileScreen from './src/components/profile/DoctorProfileScreen';
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

import DoctorHomeScreen from './src/components/doctor/DoctorHomeScreen';
import ManageAppointmentScreen from './src/components/doctor/ManageAppointmentScreen';
import SetOffDateScreen from './src/components/doctor/SetOffDateScreen';
import ReadAndDeleteOffDateScreen from './src/components/doctor/ReadAndDeleteOffDateScreen';

import {hasCurrentUser, getAuth} from './src/components/util/UserUtil';

import DrawerContent from './src/DrawerContent';

const colorCode = ['#009387', '#1f65ff', '#34b7f1', '#2a52be'];

const UserLessStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colorCode[0],
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'Welcome'}}/>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Main' }}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }}/>
            <Stack.Screen name="RegistryScreen" component={RegistryScreen} options={{ title: 'Sign Up' }}/>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }}/>
        </Stack.Navigator>
    );
};

const PatientStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colorCode[1],
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name="CreateAppointmentScreen" component={CreateAppointmentScreen} options={{ title: 'Add Appointment' }}/>
            <Stack.Screen name="ReadAppointmentScreen" component={ReadAppointmentScreen} options={{ title: 'View Appointment' }}/>
            <Stack.Screen name="UpdateAppointmentScreen" component={UpdateAppointmentScreen} options={{ title: 'Update Appointment' }}/>
            <Stack.Screen name="UpdateDecisionScreen" component={UpdateDecisionScreen} options={{ title: 'Update Chosen Appointment' }}/>
            <Stack.Screen name="DeleteAppointmentScreen" component={DeleteAppointmentScreen} options={{ title: 'Cancel Appointment' }}/>
            <Stack.Screen name="UpdatePurposeScreen" component={UpdatePurposeScreen} options={{ title: 'Update Appointment Purpose' }}/>
            <Stack.Screen name="UpdateDateTimeScreen" component={UpdateDateTimeScreen} options={{ title: 'Update Appointment Date/Time' }}/>
            <Stack.Screen name="UpdateDoctorScreen" component={UpdateDoctorScreen} options={{ title: 'Update Appointment Doctor' }}/>
        </Stack.Navigator>
    );
};

const DoctorStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colorCode[1],
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} options={{ title: 'Home' }}/>
            <Stack.Screen name="ManageAppointmentScreen" component={ManageAppointmentScreen} options={{ title: 'Manage Appointment' }}/>
            <Stack.Screen name="SetOffDateScreen" component={SetOffDateScreen} options={{ title: 'Set Off Date Screen' }}/>
            <Stack.Screen name="ReadAndDeleteOffDateScreen" component={ReadAndDeleteOffDateScreen} options={{ title: 'View Off Day' }}/>
            <Stack.Screen name="ReadAppointmentScreen" component={ReadAppointmentScreen} options={{ title: 'View Appointment' }}/>
            <Stack.Screen name="DeleteAppointmentScreen" component={DeleteAppointmentScreen} options={{ title: 'Cancel Appointment' }}/>
        </Stack.Navigator>
    );
};

const PatientProfileStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colorCode[2],
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="PatientProfileScreen" component={PatientProfileScreen} options={{title: 'Profile'}}/>
            <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} options={{ title: 'Update' }}/>
            <Stack.Screen name="DeleteProfileScreen" component={DeleteProfileScreen} options={{ title: 'Delete' }}/>
        </Stack.Navigator>
    );
};
const DoctorProfileStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: colorCode[2],
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="DoctorProfileScreen" component={DoctorProfileScreen} options={{title: 'Profile'}}/>
            <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} options={{ title: 'Update' }}/>
        </Stack.Navigator>
    );
};

const PatientProfileTabNav = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
            activeColor="#FFF"
        >
            <Tab.Screen
                name="Home"
                component={PatientStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[1],
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={PatientProfileStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[2],
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Help"
                component={HelpStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[3],
                    tabBarLabel: 'Help',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="help" color={color} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
};

const DoctorProfileTabNav = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            shifting={true}
            sceneAnimationEnabled={false}
            activeColor="#FFF"
        >
            <Tab.Screen
                name="Home"
                component={DoctorStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[1],
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={DoctorProfileStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[2],
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Help"
                component={HelpStackNav}
                options={{
                    headerShown: false,
                    tabBarColor: colorCode[3],
                    tabBarLabel: 'Help',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="help" color={color} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
};

const HelpStackNav = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colorCode[3],
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}
        >
            <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }}/>
        </Stack.Navigator>
    );
};

const PatientDrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="BottomNav" component={PatientProfileTabNav} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
};

const DoctorDrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="BottomNav" component={DoctorProfileTabNav} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
};

export const PATIENT = 'patient';
export const DOCTOR = 'doctor';

const App = () => {

    const [hasUser, setHasUser] = useState(hasCurrentUser());

    useEffect(() => getAuth().onAuthStateChanged((user) => {
        setHasUser(user !== null);
    }), []);

    const Show = () => {
        if (hasUser) {
           const user = getUser();
           return user.userType.toLowerCase() === PATIENT ? <PatientDrawerNav/> : <DoctorDrawerNav/>;
        }
        return <UserLessStackNav/>;
   };


    return (
        <NavigationContainer>
            <Show/>
        </NavigationContainer>
    );
};

export default App;
