import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

import { validateInput } from '../../logic/nullOrUndefinedInput';

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        borderColor: '#121212',
        width: '80%',
        color: '#000',
        borderWidth: 1,
        paddingBottom: 7,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 15,
        margin: 5,
        fontSize: 17,
    },
    confirmIdentityText: {
        color: '#000',
        fontSize: 20,
    },
    confirmIdentityView: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

const PasswordTextInput = ({value, placeholder, setValue, setInputMessage, validationFunction, showInputInvalid, inputMessage, propsRef, nextRef}) => {

    return (
        <View style={styles.generalView}>
            <TextInput
                ref={propsRef}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder={placeholder}
                onChangeText={(text) => {
                    setValue(text);
                    setInputMessage(validationFunction(text));
                }}
                onSubmitEditing={() => {
                    if (validateInput(value)){
                        nextRef.focus();
                    }
                }}
                onEndEditing={() => {
                    setInputMessage(validationFunction(value));
                }}
            />
            <View style={styles.generalView}>
                {showInputInvalid(inputMessage)}
            </View>
        </View>
    );
};

const ConfirmPasswordTextInput = ({value, placeholder, setValue, showInputInvalid, inputMessage, propsRef}) => {

    return (
        <View style={styles.generalView}>
            <TextInput
                ref={propsRef}
                value={value}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder={placeholder}
                onChangeText={(text) => {
                    setValue(text);
                }}
                onSubmitEditing={() => {
                    if (validateInput(value)){
                        return;
                    }
                }}
            />
            <View style={styles.generalView}>
                {showInputInvalid(inputMessage)}
            </View>
        </View>
    );
};

const RegistryTextInput = ({value, secureTextEntry, placeholder, keyboardType, setValue, setInputMessage, validationFunction, showInputInvalid, inputMessage, propsRef, nextRef}) => {

    return (
        <View style={styles.generalView}>
            <TextInput
                ref={propsRef}
                value={value}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={(text) => {
                    setValue(text);
                    setInputMessage(validationFunction(text));
                }}
                onSubmitEditing={() => {
                    if (validateInput(value)){
                        nextRef.focus();
                    }
                }}
                onEndEditing={() => {
                    setInputMessage(validationFunction(value));
                }}
            />
            <View style={styles.generalView}>
                {showInputInvalid(inputMessage)}
            </View>
        </View>
    );
};

const CurrentPasswordTextInput = ({password, passwordMessage, showInputInvalid, setPassword}) => {
    return (
        <View style={styles.generalView}>
            <View style={styles.confirmIdentityView}><Text style={styles.confirmIdentityText}>Please confirm your identity</Text></View>
            <TextInput
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputBox}
                placeholder="Current Password"
                onChangeText={(text) => {
                    setPassword(text);
                }}
            />
            <View style={styles.generalView}>
                {showInputInvalid(passwordMessage)}
            </View>
        </View>
    );
};

export {ConfirmPasswordTextInput, RegistryTextInput, PasswordTextInput, CurrentPasswordTextInput};
