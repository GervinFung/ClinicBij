import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const offDayStyles = StyleSheet.create({
    containerView: {
        width: '100%',
        padding: 10,
    },
    spaceBetweenView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    importantText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 17,
    },
    statusText: {
        fontStyle: 'italic',
    },
    image: {
        width: 50,
        height: 50,
    },
    centerView: {
        justifyContent: 'center',
    },
});

const TouchableOffDayView = ({index, onShowUnderlay, onHideUnderlay, onPress, doctor, startDate, endDate}) => {

    return (
        <TouchableOpacity
            key={index}
            style={offDayStyles.containerView}
            onShowUnderlay={onShowUnderlay}
            onHideUnderlay={onHideUnderlay}
            onPress={onPress}
        >
            <View>
                <View style={offDayStyles.spaceBetweenView}>
                    <View><Text style={offDayStyles.importantText}>Off Day Period {index}</Text></View>
                </View>
                <View style={offDayStyles.spaceBetweenView}>
                    <View style={offDayStyles.centerView}>
                        <Text style={offDayStyles.text}>{doctor}</Text>
                        <Text style={offDayStyles.text}>{startDate}</Text>
                        <Text style={offDayStyles.text}>{endDate}</Text>
                    </View>
                    <View style={offDayStyles.centerView}>
                        <Image source={require('../../../img/doctor/delete.jpg')} style={offDayStyles.image}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export {TouchableOffDayView};
