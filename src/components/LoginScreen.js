import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import { DOCTOR, PATIENT } from '../../App';
import {getAuth} from './util/UserUtil';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';

const LoginScreen = ({ route, navigation }) => {

    const { userType } = route.params;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputInvalid, setInputInvalid] = useState(false);
    const [inputInvalidMsg, setInputInvalidMsg] = useState('');

    const emailInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);

    const loginButtonPressed = () => {
        getAuth().signInWithEmailAndPassword(email, password).then(() => {
            setInputInvalid(false);
            setInputInvalidMsg('');
        }).catch(error => {
            setInputInvalid(true);
            if (error.code === 'auth/invalid-email') {
                setInputInvalidMsg('Invalid email entered!');
            }
            if (error.code === 'auth/user-not-found') {
                setInputInvalidMsg('User not found!');
            }
            if (error.code === 'auth/wrong-password') {
                setInputInvalidMsg('Invalid password entered!');
            }
        });
    };

    const ShowInputInvalidText = () => {
        if (inputInvalid) {
            return (
                <View style={styles.inputInvalid}>
                    <Text style={styles.inputInvalidText}>{inputInvalidMsg} Please try again</Text>
                </View>
            );
        }
        return null;
    };

    const getImage = () => {
        if (userType.toLowerCase() === DOCTOR.toLowerCase()) {
            return require('../../img/doctor.jpg');
        } else if (userType.toLowerCase() === PATIENT.toLowerCase()) {
            return require('../../img/patient.jpg');
        }
        throw new Error('userType can only be DOCTOR or PATIENT only');
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}>
                    <Image style={styles.image} source={getImage()}/>
                    <Text style={styles.title}>{userType.toUpperCase()}</Text>
                </View>
                <View style={[styles.generalView, styles.inputView]}>
                    <TextInput
                        ref={emailInput}
                        style={styles.inputBox}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        onSubmitEditing={() => passwordInput.current.focus()}
                    />
                    <TextInput
                        ref={passwordInput}
                        secureTextEntry={true}
                        style={styles.inputBox}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={styles.generalView}><ShowInputInvalidText/></View>
                </View>
                <View style={[styles.generalView]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RegistryScreen')}
                    ><Text style={styles.signupText}>Don't have an account? Signup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordScreen', {
                            userType: userType,
                        })}
                    ><Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableButton
                        onPress={loginButtonPressed}
                        text="Login"
                        buttonStyle={buttonStyleDict.GREEN}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    generalView: {
        padding: 4,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    title: {
        color: '#2196F3',
        fontSize: 30,
        paddingBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    inputBox: {
        // backgroundColor: '#121212',
        borderColor: '#121212',
        width: '80%',
        color: '#000',
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
    signupText: {
        color: '#121212',
        paddingBottom: 10,
        fontSize: 17,
    },
    forgotPassword: {
        color: '#2196F3',
        fontSize: 17,
        paddingBottom: 10,
    },
});

export default LoginScreen;
