import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = ({ navigation }) => {

    const [hasUser, setHasUser] = useState(false);

    useEffect(() => { 
        auth().onAuthStateChanged((user) => {
            setHasUser(user !== null)
        })    
    }, []);

    const logoutButtonPressed = () => {
        auth().signOut().then(() => {
            navigation.navigate('WelcomeScreen');       
        })
        
    };

    const goSignInButtonPressed = () => {
        navigation.navigate('WelcomeScreen'); 
    };

    const checkUserAuth = () =>{
        console.log(auth().currentUser)

        if (hasUser === true){
            return( 
            <SafeAreaView style={styles.container}>
                <View style={styles.generalView}><Text style={styles.title}>User Profile</Text></View>
                <View style={styles.generalView}><Image style={styles.welcomeImage} source={require('../../img/user.jpg')}/></View>
                <View style={[styles.generalView]}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => logoutButtonPressed()}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>)
        } else {
            return( 
            <SafeAreaView style={styles.container}>
                <View style={styles.generalView}><Text style={styles.title}>Oops, you have no access to this page, {'\n'} please go and sign in first!</Text></View>
                <View style={[styles.generalView]}>
                    <TouchableOpacity
                        style={styles.goSignInButton}
                        onPress={() => goSignInButtonPressed()}
                    >
                        <Text style={styles.goSignInText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>)
        }
    }
    

    return (
        checkUserAuth()
    );
};

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
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
    welcomeImage: {
        width: 230,
        height: 230,
        resizeMode: 'contain',
    },
    logoutButton: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    logoutText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    goSignInButton: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    goSignInText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
});

export default ProfileScreen;
