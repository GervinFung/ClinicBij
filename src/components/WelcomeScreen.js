import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { DOCTOR, PATIENT } from '../../App';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';

const WelcomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Welcome to MySejahtera</Text></View>
            <View style={styles.generalView}><Image style={styles.welcomeImage} source={require('../../img/welcomeScreen.jpg')}/></View>
            <View style={[styles.generalView]}>
                <TouchableButton
                    onPress={() => navigation.navigate('RegistryScreen')}
                    text="Sign Up"
                    buttonStyle={buttonStyleDict.WHITE}
                />
                <TouchableButton
                    onPress={() => navigation.navigate('MainScreen', {
                        doctor: DOCTOR,
                        patient: PATIENT,
                    })}
                    text="Login"
                    buttonStyle={buttonStyleDict.GREEN}
                />
            </View>
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
        resizeMode: 'contain',
    },
});

export default WelcomeScreen;
