import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const GridView = ({onPress, image, type}) => {

    const gridStyle = StyleSheet.create({
        button: {
            borderRadius: 20,
            margin: 20,
            marginBottom: 20,
            width: 150,
            elevation: 5,
            backgroundColor:'#FEFEFE',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            alignItems: 'center',
            padding: 20,
        },
        imageTextView: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: 95,
            height: 95,
        },
        text: {
            textAlign: 'center',
        },
    });

    return (
        <TouchableOpacity style={gridStyle.button} underlayColor={'#F4B65F'} onPress={onPress}>
            <View style={gridStyle.imageTextView}>
                <Image source={image} style={gridStyle.image}/>
                <Text style={gridStyle.text}>{type}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default GridView;
