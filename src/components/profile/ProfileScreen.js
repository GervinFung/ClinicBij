import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Alert } from 'react-native';
import {getUserFromUserListUUID} from '../../logic/tempUserList';
import GridView from '../reusable/GridView';
import {getCurrentUser, getAuth} from '../util/UserUtil';

const ProfileScreen = ({ navigation }) => {

    const [currentUser, setCurrentUser] = useState(getCurrentUser());

    useEffect(() => getAuth().onAuthStateChanged((user) => {
        setCurrentUser(user === null ? null : getUserFromUserListUUID(user.uid));
    }), []);

    const logoutProfile = () => {
        Alert.alert(
            'Log Out Confirmation', 'Are you sure you want to logout', [{
                    text: 'Cancel', style: 'cancel',
                }, {
                    text: 'OK', onPress: () => {
                        getAuth().signOut().then(() => {
                            navigation.navigate('WelcomeScreen');
                        });
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Image style={styles.welcomeImage} source={require('../../../img/user.jpg')}/></View>
            <View style={styles.generalView}><Text style={styles.title}>Bonjour {currentUser.fullName}</Text></View>
            <View style={styles.menuContainer}>
                <GridView
                    image={require('../../../img/update.jpg')}
                    type="Update"
                    onPress={() => navigation.navigate('UpdateProfileScreen')}
                />
                <GridView
                    image={require('../../../img/delete.jpg')}
                    type="Delete"
                    onPress={() => navigation.navigate('DeleteProfileScreen')}
                />
                <GridView
                    image={require('../../../img/delete.jpg')}
                    type="Logout"
                    onPress={() => logoutProfile()}
                />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    generalView: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#2196F3',
        fontSize: 20,
        paddingBottom: 10,
    },
    error: {
        color: '#DC143C',
        fontSize: 20,
        paddingBottom: 10,
    },
    welcomeImage: {
        width: 230,
        height: 230,
        resizeMode: 'contain',
    },
});

export default ProfileScreen;
