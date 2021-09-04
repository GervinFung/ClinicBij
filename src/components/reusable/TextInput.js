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
    inputInvalidText: {
        color: '#990000',
        fontSize: 14,
    },
});

const PasswordTextInput = ({value, placeholder, setValue, setInputMessage, validationFunction, inputMessage, propsRef, nextRef}) => {

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
                <ShowInputInvalid inputMessage={inputMessage}/>
            </View>
        </View>
    );
};

const ConfirmPasswordTextInput = ({value, placeholder, setValue, inputMessage, propsRef}) => {

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
                <ShowInputInvalid inputMessage={inputMessage}/>
            </View>
        </View>
    );
};

const RegistryTextInput = ({value, secureTextEntry, placeholder, keyboardType, setValue, setInputMessage, validationFunction, inputMessage, propsRef, nextRef}) => {

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
                <ShowInputInvalid inputMessage={inputMessage}/>
            </View>
        </View>
    );
};

const ShowInputInvalid = ({inputMessage}) => validateInput(inputMessage) ? <Text style={styles.inputInvalidText}>{inputMessage}</Text> : null;

const CurrentPasswordTextInput = ({password, passwordMessage, setPassword}) => {
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
                <ShowInputInvalid inputMessage={passwordMessage}/>
            </View>
        </View>
    );
};

export {ConfirmPasswordTextInput, RegistryTextInput, PasswordTextInput, CurrentPasswordTextInput};
