import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome to MySejahtera</Text></View>
            <View style={styles.generalView}><Image style={styles.welcomeImage} source={require('../img/welcomeScreen.jpg')}/></View>
            <View style={[styles.generalView]}>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('RegistryScreen')}
                >
                <Text style={styles.signupText}>SIGN UP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto'/>
        </SafeAreaView>
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
        fontSize: 30,
        paddingBottom: 10,
    },
    welcomeImage: {
        width: 230,
        height: 230,
        resizeMode: "contain",
    },
    loginButton: {
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
    loginText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    signupButton: {
        //iOS
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        //iOS
        //android
        elevation: 2,
        //android
        backgroundColor: '#FFF',
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
    signupText: {
        backgroundColor: 'transparent',
        color: '#059862',
        fontSize: 17,
    }
});

export default WelcomeScreen;