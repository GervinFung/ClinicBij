import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View, KeyboardAvoidingView, ScrollView, Alert, Text } from 'react-native';
import TouchableButton, {buttonStyleDict} from './reusable/TouchableButton';
import {validateEmail, checkEmailValid} from '../logic/email';
import {RegistryTextInput} from './reusable/TextInput';
import {getAuth} from './util/UserUtil';

const ForgotPasswordScreen = ({ route, navigation }) => {

    const { userType } = route.params;

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const sendEmailButtonPressed = () => {
        if (checkEmailValid(email)) {
            getAuth().sendPasswordResetEmail(email).then(user => {
                setEmailMessage('');
                Alert.alert('Reset Password', `A password reset email has been sent to ${email}`, [{
                        text: 'OK', onPress: () => navigation.navigate('LoginScreen', {
                            userType: userType,
                        }),
                    },
                ]);
            }).catch(error => {
                if (error.code === 'auth/invalid-email') {
                    setEmailMessage('Invalid email entered!');
                }
                if (error.code === 'auth/user-not-found') {
                    setEmailMessage('User not found!');
                }
            });
        }
    };

    const emailInput = useRef(TextInput);
    const identityCardInput = useRef(TextInput);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.generalView}><Text style={styles.title}>Forgot Password?</Text></View>
                <View style={styles.generalView}>
                    <RegistryTextInput
                        value={email}
                        propsRef={emailInput}
                        nextRef={identityCardInput.current}
                        placeholder={'Email'}
                        validationFunction={validateEmail}
                        setValue={setEmail}
                        inputMessage={emailMessage}
                        setInputMessage={setEmailMessage}
                        secureTextEntry={false}
                        keyboardType="email-address"
                    />
                </View>
                <View style={[styles.generalView]}>
                    <TouchableButton
                        onPress={sendEmailButtonPressed}
                        text="Send Email"
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
});

export default ForgotPasswordScreen;
