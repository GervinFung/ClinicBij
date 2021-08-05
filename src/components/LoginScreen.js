import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {getUserFromUserList} from '../logic/tempUserList';

const LoginScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [inputInvalid, setInputInvalid] = useState(false);
    const [user, setUser] = useState({});
    // maybe user can use props, pass down to another components

    const userNameInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);
    const loginButton = useRef(TouchableOpacity);

    const loginButtonPressed = () => {
        const userFound = getUserFromUserList(userName, password);
        if (userFound === undefined) {
            setInputInvalid(true);
        } else {
            setUser(userFound);
            setInputInvalid(false);
            navigation.navigate('RegistryScreen');
        }
    }

    const showInputInvalidText = () => {
        if (inputInvalid) {
            return (
                <View style={styles.inputInvalid}>
                    <Text style={styles.inputInvalidText}>Invalid username/password</Text>
                    <Text style={styles.inputInvalidText}>Please try again</Text>
                </View>
            )
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>MySejahtera</Text></View>
            <View style={[styles.generalView, styles.inputView]}>
                <TextInput
                    ref={userNameInput}
                    style={styles.inputBox}
                    placeholder='Username'
                    onChangeText={(text) => setUserName(text)}
                    onSubmitEditing={() => passwordInput.current.focus()}
                />
                <TextInput
                    ref={passwordInput}
                    secureTextEntry={true}
                    style={styles.inputBox}
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => loginButton.current.focus()}
                />
                <View style={styles.generalView}>
                    {showInputInvalidText()}
                </View>
            </View>
            <View style={[styles.generalView]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegistryScreen')}
                >
                    <Text style={styles.signupText}>Don't have an account? Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    ref={loginButton}
                    style={styles.loginButton}
                    onPress={() => loginButtonPressed()}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto'/>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 10,
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
    inputBox: {
        // backgroundColor: '#121212',
        borderColor: '#121212',
        width: '80%',
        color: '#000',//'#FFFFFF99',
        borderWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
    inputView: {
        paddingBottom: 40,
    },
    inputInvalid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
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
    signupText: {
        color: '#121212',
        paddingBottom: 10,
        fontSize: 17,
    }
});

export default LoginScreen;