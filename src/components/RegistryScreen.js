import React, { useRef, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { checkInputNullOrUndefined } from '../logic/nullOrUndefinedInput';
import {validateEmail} from '../logic/email';
import {validateFullname} from '../logic/fullName';
import {validateIdentityCard} from '../logic/identityCard';
import {validatePassword} from '../logic/password';
import {addUser} from '../logic/tempUserList';
import auth from '@react-native-firebase/auth';
import { ADMIN, USER } from '../../App';

const RegistryTextInput = (props) => {

    return (
        <View style={styles.generalView}>
            <TextInput
                value={props.value}
                ref={props.propsRef}
                secureTextEntry={props.secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                onChangeText={(text) => {
                    props.setInput(text);
                    props.setInputMessage(props.validationFunction(text));
                }}
                onSubmitEditing={() => {
                    if (checkInputNullOrUndefined(props.value) || props.nextRef.focus === undefined){
                        return;
                    }
                    props.nextRef.focus();
                }}
                onEndEditing={() => {
                    props.setInputMessage(props.validationFunction(props.input));
                }}
            />
            <View style={styles.generalView}>
                {props.showInputInvalid(props.inputMessage)}
            </View>
        </View>
    );
};

const ConfirmPasswordTextInput = (props) => {

    return (
        <View style={styles.generalView}>
            <TextInput
                ref={props.propsRef}
                editable={props.editable}
                selectTextOnFocus={props.editable}
                secureTextEntry={props.secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder={props.placeholder}
                onChangeText={(text) => props.setInputMessage(props.checkBothPasswordSame(text))}
                onSubmitEditing={() => props.nextRef.focus()}
            />
            <View style={styles.generalView}>
                {props.showInputInvalid(props.inputMessage)}
            </View>
        </View>
    );
};


const RegistryScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const [identityCard, setIdentityCard] = useState('');
    const [identityCardMessage, setIdentityCardMessage] = useState('');

    const [fullName, setFullName] = useState('');
    const [fullNameMessage, setFullNameMessage] = useState('');

    const [password, setPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const stringIsEmpty = (message) => {
        return message.length === 0;
    };

    const signUp = () => {
        auth()
        .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
            navigation.navigate('LoginScreen', {
                userType: 'user',
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already exist!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        });
    }

    const signupButtonPressed = () => {
        if (stringIsEmpty(emailMessage) &&
        stringIsEmpty(identityCardMessage) &&
        stringIsEmpty(fullNameMessage) &&
        stringIsEmpty(passwordMessage) &&
        stringIsEmpty(confirmPasswordMessage)) {
            addUser(fullName, password, identityCard, email);
            signUp();
        }
    };

    const showInputInvalid = (message) => {
        if (message.length !== 0) {
            return (
                <Text style={styles.inputInvalidText}>{message}</Text>
            );
        }
    };

    const checkBothPasswordSame = (confirmPassword) => {
        if (password === confirmPassword) {
            return '';
        }
        return 'Both passwords are not the same';
    };

    const fullNameInput = useRef(TextInput);
    const emailInput = useRef(TextInput);
    const identityCardInput = useRef(TextInput);
    const passwordInput = useRef(TextInput);
    const confirmPasswordInput = useRef(TextInput);
    const signUpButton = useRef(TouchableOpacity);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.generalView}><Text style={styles.title}>Sign Up</Text></View>
            <View style={[styles.generalView, styles.inputView]}>
                <RegistryTextInput
                    value={fullName}
                    propsRef={fullNameInput}
                    nextRef={emailInput.current}
                    showInputInvalid={showInputInvalid}
                    placeholder={'Fullname'}
                    validationFunction={validateFullname}
                    input={fullName}
                    setInput={setFullName}
                    inputMessage={fullNameMessage}
                    setInputMessage={setFullNameMessage}
                    secureTextEntry={false}
                    keyboardType="default"
                />
                <RegistryTextInput
                    value={email}
                    propsRef={emailInput}
                    nextRef={identityCardInput.current}
                    showInputInvalid={showInputInvalid}
                    placeholder={'Email'}
                    validationFunction={validateEmail}
                    input={email}
                    setInput={setEmail}
                    inputMessage={emailMessage}
                    setInputMessage={setEmailMessage}
                    secureTextEntry={false}
                    keyboardType="email-address"
                />
                <RegistryTextInput
                    value={identityCard}
                    propsRef={identityCardInput}
                    nextRef={passwordInput.current}
                    showInputInvalid={showInputInvalid}
                    placeholder={'Identity Card'}
                    validationFunction={validateIdentityCard}
                    input={identityCard}
                    setInput={setIdentityCard}
                    inputMessage={identityCardMessage}
                    setInputMessage={setIdentityCardMessage}
                    secureTextEntry={false}
                    keyboardType="numeric"
                />
                <RegistryTextInput
                    value={password}
                    propsRef={passwordInput}
                    nextRef={confirmPasswordInput.current}
                    showInputInvalid={showInputInvalid}
                    placeholder={'Password'}
                    validationFunction={validatePassword}
                    input={password}
                    setInput={setPassword}
                    inputMessage={passwordMessage}
                    setInputMessage={setPasswordMessage}
                    secureTextEntry={true}
                    keyboardType="default"
                />
                <ConfirmPasswordTextInput
                    propsRef={confirmPasswordInput}
                    nextRef={signUpButton.current}
                    showInputInvalid={showInputInvalid}
                    placeholder={'Confirm Password'}
                    checkBothPasswordSame={checkBothPasswordSame}
                    inputMessage={confirmPasswordMessage}
                    setInputMessage={setConfirmPasswordMessage}
                    secureTextEntry={true}
                    editable={stringIsEmpty(passwordMessage) && !stringIsEmpty(password)}
                />
            </View>
            <View style={[styles.generalView]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MainScreen', {
                        admin: ADMIN,
                        user: USER,
                    })}
                >
                    <Text style={styles.loginText}>Already haven an account? Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => signupButtonPressed()}
                    ref={signUpButton}
                >
                    <Text style={styles.signup}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 7,
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
        paddingBottom: 7,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
    inputView: {
        paddingBottom: 30,
    },
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
    signupButton: {
        backgroundColor: '#059862',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 7,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
    },
    signup: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
    loginText: {
        color: '#121212',
        paddingBottom: 10,
        fontSize: 17,
    },
});

export default RegistryScreen;
