import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import {checkNullOrUndefined} from '../../logic/nullOrUndefinedInput';

const whiteButtonStyle = () => {
    return StyleSheet.create({
        button: {
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
        text: {
            color: '#059862',
            fontSize: 17,
        },
    });
};

const greenButtonStyle = () => {
    return StyleSheet.create({
        button: {
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
        text: {
            color: '#FFFFFFE3',
            fontSize: 17,
        },
    });
};

const redButtonStyle = () => {
    return StyleSheet.create({
        button: {
            backgroundColor: '#DC143C',
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
        text: {
            color: '#FFFFFFE3',
            fontSize: 17,
        },
    });
};

const TouchableButton = ({buttonStyle, viewStyle, text, onPress}) => {

    const getStyle = () => {
        if (buttonStyle.toLowerCase() === 'white') {
            return whiteButtonStyle();
        } else if (buttonStyle.toLowerCase() === 'green') {
            return greenButtonStyle();
        } else if (buttonStyle.toLowerCase() === 'red') {
            return redButtonStyle();
        }
        throw new Error('Either white, green or red button is available. Want another style? Create one');
    };

    const style = getStyle();

    return (
        <SafeAreaView style={checkNullOrUndefined(viewStyle) ? styles.generalView : viewStyle}>
            <TouchableOpacity
                style={style.button}
                onPress={() => onPress()}
            >
                <Text style={style.text}>{text.toUpperCase()}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
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
    buttonText: {
        color: '#FFFFFFE3',
        fontSize: 17,
    },
});

export const buttonStyleDict = {
    WHITE: 'white',
    GREEN: 'green',
    RED: 'red',
};

export default TouchableButton;
